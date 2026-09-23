import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BrandId,
  Course,
  CourseBatch,
  CartItem,
  CustomerDetails,
  PaymentDetails,
  OrderRecord,
  PageView,
  UserAccount,
} from '../types';
import { BRANDS, COURSES, INITIAL_BATCHES } from '../data/coursesData';

interface AppContextType {
  // Navigation
  currentPage: PageView;
  selectedBrandId: BrandId | null;
  selectedCourseId: string | null;
  navigateTo: (
    page: PageView,
    params?: { brandId?: BrandId; courseId?: string }
  ) => void;

  // Courses & Brands data
  brands: typeof BRANDS;
  courses: typeof COURSES;
  getBrand: (brandId: BrandId) => (typeof BRANDS)[0] | undefined;
  getCourse: (courseId: string) => Course | undefined;
  getCourseDisplayPrice: (courseId: string) => number;

  // Batches
  batches: CourseBatch[];
  getBatchesForCourse: (courseId: string) => CourseBatch[];
  createScheduledBatches: (config: {
    courseId: string;
    startDateStr: string; // YYYY-MM-DD
    startTime: string;
    endTime: string;
    location: 'Virtual' | 'In Person';
    venueDetail?: string;
    price: number;
    recurringCount: 1 | 2 | 3 | 4;
  }) => CourseBatch[];
  deleteBatch: (batchId: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (batch: CourseBatch, quantity?: number) => void;
  removeFromCart: (batchId: string) => void;
  updateCartQuantity: (batchId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;

  // Checkout & Orders
  customerDetails: CustomerDetails;
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void;
  lastOrder: OrderRecord | null;
  orders: OrderRecord[];
  getUserOrders: () => OrderRecord[];
  processOrder: (payment: PaymentDetails) => OrderRecord;

  // User Authentication & Student/Faculty Portal
  currentUser: UserAccount | null;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  pendingBatchToBuy: CourseBatch | null;
  setPendingBatchToBuy: (batch: CourseBatch | null) => void;
  openLogin: () => void;
  openRegister: () => void;
  closeAuthModal: () => void;
  setAuthModalTab: (tab: 'login' | 'register') => void;
  initiateBuy: (batch: CourseBatch) => void;
  loginUser: (email: string, password?: string, role?: 'student' | 'admin', name?: string) => boolean;
  registerUser: (data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    password?: string;
    role?: 'student' | 'admin';
  }) => boolean;
  logoutUser: () => void;

  // Admin
  isAdminAuthorized: boolean;
  adminEmail: string;
  authorizeAdmin: (email: string) => boolean;
  logoutAdmin: () => void;
  isCreateCourseOpen: boolean;
  openCreateCourse: () => void;
  closeCreateCourse: () => void;
}

export const isAuthorizedAdminEmail = (email?: string | null): boolean => {
  if (!email || !email.includes('@')) return false;
  const clean = email.trim().toLowerCase();
  return (
    clean === 'training@alephtechnologies.in' ||
    clean === 'training@alephtechnologies.com' ||
    clean.endsWith('@alephtechnologies.in') ||
    clean.endsWith('@alephtechnologies.com')
  );
};

const AppContext = createContext<AppContextType | undefined>(undefined);


const BATCHES_STORAGE_KEY = 'agilecorp_scheduled_batches_v1';
const CART_STORAGE_KEY = 'agilecorp_shopping_cart_v1';
const PRICES_STORAGE_KEY = 'agilecorp_course_prices_v1';
const ADMIN_STORAGE_KEY = 'agilecorp_admin_email_v1';
const USER_STORAGE_KEY = 'agilecorp_user_session_v1';
const ORDERS_STORAGE_KEY = 'agilecorp_user_orders_v1';

const INITIAL_DEMO_ORDERS: OrderRecord[] = [
  {
    orderId: 'AGC-914820',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    customer: {
      fullName: 'Alex Rivera',
      email: 'training@alephtechnologies.in',
      contactNumber: '+1 888-955-9155',
      companyName: 'ALEPH TECHNOLOGIES',
    },
    totalAmount: 699,
    paymentMethod: 'Credit Card ending in 4242',
    items: [
      {
        id: 'batch-safe-ssm-demo',
        batchId: 'batch-safe-ssm-1',
        courseId: 'safe-ssm',
        courseName: 'SAFe® Scrum Master (SSM)',
        brandId: 'safe',
        selectedDate: 'October 1, 2026',
        selectedTime: '9:00 AM – 5:00 PM',
        location: 'Virtual',
        price: 699,
        quantity: 1,
        total: 699,
      },
    ],
  },
  {
    orderId: 'AGC-839215',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    customer: {
      fullName: 'Alex Rivera',
      email: 'training@alephtechnologies.in',
      contactNumber: '+1 888-955-9155',
      companyName: 'ALEPH TECHNOLOGIES',
    },
    totalAmount: 699,
    paymentMethod: 'Credit Card ending in 8891',
    items: [
      {
        id: 'batch-scrum-csm-demo',
        batchId: 'batch-scrum-csm-1',
        courseId: 'scrum-csm',
        courseName: 'Certified ScrumMaster (CSM®)',
        brandId: 'scrum-alliance',
        selectedDate: 'September 15, 2026',
        selectedTime: '9:00 AM – 5:00 PM',
        location: 'Virtual',
        price: 699,
        quantity: 1,
        total: 699,
      },
    ],
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedBrandId, setSelectedBrandId] = useState<BrandId | null>('safe');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('safe-ssm');

  // Batches state initialized from localStorage
  const [batches, setBatches] = useState<CourseBatch[]>(() => {
    try {
      const saved = localStorage.getItem(BATCHES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_BATCHES;
  });

  // Course prices override configured by admin
  const [coursePrices, setCoursePrices] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(PRICES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {};
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Customer Details for Checkout
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    contactNumber: '',
    companyName: '',
  });

  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(() => {
    try {
      const saved = localStorage.getItem('agilecorp_last_order_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  // Orders history state
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_DEMO_ORDERS;
  });

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email && isAuthorizedAdminEmail(parsed.email)) {
          parsed.role = 'admin';
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [pendingBatchToBuy, setPendingBatchToBuy] = useState<CourseBatch | null>(null);

  // Admin Auth State
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const isAdminAuthorized = Boolean(
    (currentUser && (currentUser.role === 'admin' || isAuthorizedAdminEmail(currentUser.email))) ||
    (adminEmail && isAuthorizedAdminEmail(adminEmail))
  );
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(BATCHES_STORAGE_KEY, JSON.stringify(batches));
    } catch {
      // ignore
    }
  }, [batches]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(PRICES_STORAGE_KEY, JSON.stringify(coursePrices));
    } catch {
      // ignore
    }
  }, [coursePrices]);

  useEffect(() => {
    try {
      if (adminEmail) {
        localStorage.setItem(ADMIN_STORAGE_KEY, adminEmail);
      } else {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [adminEmail]);

  // Navigation function
  const navigateTo = (
    page: PageView,
    params?: { brandId?: BrandId; courseId?: string }
  ) => {
    if (params?.brandId) setSelectedBrandId(params.brandId);
    if (params?.courseId) setSelectedCourseId(params.courseId);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getBrand = (brandId: BrandId) => {
    return BRANDS.find((b) => b.id === brandId);
  };

  const getCourse = (courseId: string) => {
    return COURSES.find((c) => c.id === courseId);
  };

  const getCourseDisplayPrice = (courseId: string): number => {
    if (coursePrices[courseId]) {
      return coursePrices[courseId];
    }
    // Check if there is any scheduled batch for this course, take the latest batch price
    const courseBatches = batches.filter((b) => b.courseId === courseId);
    if (courseBatches.length > 0) {
      return courseBatches[0].price;
    }
    const course = getCourse(courseId);
    return course ? course.defaultPrice : 699;
  };

  const getBatchesForCourse = (courseId: string): CourseBatch[] => {
    return batches
      .filter((b) => b.courseId === courseId)
      .sort((a, b) => a.rawDate.localeCompare(b.rawDate));
  };

  // Format Date Helper
  const formatDateToReadable = (dateObj: Date): string => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  };

  const formatToISODate = (dateObj: Date): string => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Administrator batch creation with recurring logic
  const createScheduledBatches = (config: {
    courseId: string;
    startDateStr: string;
    startTime: string;
    endTime: string;
    location: 'Virtual' | 'In Person';
    venueDetail?: string;
    price: number;
    recurringCount: 1 | 2 | 3 | 4;
  }): CourseBatch[] => {
    const course = getCourse(config.courseId);
    if (!course) return [];

    // Update the course price preference
    setCoursePrices((prev) => ({
      ...prev,
      [config.courseId]: config.price,
    }));

    const newBatches: CourseBatch[] = [];
    const parts = config.startDateStr.split('-').map(Number);
    const startYear = parts[0];
    const startMonth = parts[1] - 1;
    const startDay = parts[2];

    for (let i = 0; i < config.recurringCount; i++) {
      const batchDate = new Date(startYear, startMonth, startDay + i * 7);

      const readableDate = formatDateToReadable(batchDate);
      const isoDate = formatToISODate(batchDate);
      const batchId = `batch-${config.courseId}-${Date.now()}-${i}`;

      const newBatch: CourseBatch = {
        id: batchId,
        courseId: config.courseId,
        courseTitle: course.title,
        brandId: course.brandId,
        date: readableDate,
        rawDate: isoDate,
        startTime: config.startTime,
        endTime: config.endTime,
        location: config.location,
        venueDetail:
          config.location === 'In Person'
            ? config.venueDetail || 'Corporate Executive Training Center'
            : undefined,
        price: config.price,
        instructor: 'Senior Certified Master Trainer',
        availableSeats: 16,
      };

      newBatches.push(newBatch);
    }

    setBatches((prev) => [...newBatches, ...prev]);
    return newBatches;
  };

  const deleteBatch = (batchId: string) => {
    setBatches((prev) => prev.filter((b) => b.id !== batchId));
  };

  // Cart operations
  const addToCart = (batch: CourseBatch, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.batchId === batch.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        return prev.map((item) =>
          item.batchId === batch.id
            ? { ...item, quantity: newQty, total: newQty * item.price }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: batch.id,
          batchId: batch.id,
          courseId: batch.courseId,
          courseName: batch.courseTitle,
          brandId: batch.brandId,
          selectedDate: batch.date,
          selectedTime: `${batch.startTime} – ${batch.endTime}`,
          location: batch.location,
          price: batch.price,
          quantity: quantity,
          total: batch.price * quantity,
        };
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (batchId: string) => {
    setCart((prev) => prev.filter((item) => item.batchId !== batchId));
  };

  const updateCartQuantity = (batchId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(batchId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.batchId === batchId
          ? { ...item, quantity, total: quantity * item.price }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.total, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const updateCustomerDetails = (details: Partial<CustomerDetails>) => {
    setCustomerDetails((prev) => ({ ...prev, ...details }));
  };

  const processOrder = (payment: PaymentDetails): OrderRecord => {
    const orderId = `AGC-${Math.floor(100000 + Math.random() * 900000)}`;
    const effectiveEmail = (
      currentUser?.email ||
      customerDetails.email ||
      'training@alephtechnologies.in'
    )
      .trim()
      .toLowerCase();

    const record: OrderRecord = {
      orderId,
      createdAt: new Date().toISOString(),
      items: [...cart],
      userId: currentUser?.id || `usr-${Date.now()}`,
      userEmail: effectiveEmail,
      customer: {
        fullName:
          customerDetails.fullName.trim() || currentUser?.name || 'Verified Student',
        email: effectiveEmail,
        contactNumber:
          customerDetails.contactNumber.trim() ||
          currentUser?.phone ||
          '+1 888-955-9155',
        companyName:
          customerDetails.companyName.trim() ||
          currentUser?.company ||
          'ALEPH TECHNOLOGIES',
      },
      totalAmount: cartTotal,
      paymentMethod: `Credit Card ending in ${payment.cardNumber.slice(-4) || '4242'}`,
    };

    setLastOrder(record);
    try {
      localStorage.setItem('agilecorp_last_order_v1', JSON.stringify(record));
    } catch {
      // ignore
    }

    setOrders((prev) => {
      const updated = [record, ...prev.filter((o) => o.orderId !== record.orderId)];
      try {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    if (currentUser) {
      const newCourseIds = cart.map((i) => i.courseId);
      const updatedUser: UserAccount = {
        ...currentUser,
        enrolledCourses: Array.from(
          new Set([...(currentUser.enrolledCourses || []), ...newCourseIds])
        ),
      };
      setCurrentUser(updatedUser);
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      } catch {
        // ignore
      }
    }

    clearCart();
    return record;
  };

  const getUserOrders = (): OrderRecord[] => {
    if (!currentUser) return [];
    const currentEmail = currentUser.email.trim().toLowerCase();
    const currentId = currentUser.id;

    // Filter matching orders strictly by this user's account ID or matching email
    const userMatched = orders.filter((o) => {
      if (o.userId && o.userId === currentId) return true;
      const orderUserEmail = (o.userEmail || '').trim().toLowerCase();
      if (orderUserEmail && orderUserEmail === currentEmail) return true;
      const customerEmail = (o.customer?.email || '').trim().toLowerCase();
      if (customerEmail && customerEmail === currentEmail) return true;
      if (
        currentEmail === 'training@alephtechnologies.in' &&
        (o.orderId.startsWith('AGC-914') || o.orderId.startsWith('AGC-839'))
      ) {
        return true;
      }
      return false;
    });

    // If lastOrder was created in this session by THIS user, ensure it is included
    if (
      lastOrder &&
      ((lastOrder.userId && lastOrder.userId === currentId) ||
        (lastOrder.userEmail && lastOrder.userEmail.trim().toLowerCase() === currentEmail) ||
        (lastOrder.customer?.email && lastOrder.customer.email.trim().toLowerCase() === currentEmail)) &&
      !userMatched.some((o) => o.orderId === lastOrder.orderId)
    ) {
      userMatched.unshift(lastOrder);
    }

    return userMatched;
  };

  const openLogin = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const initiateBuy = (batch: CourseBatch) => {
    if (currentUser) {
      // User is already authenticated: add batch to cart and proceed to Cart
      addToCart(batch, 1);
      navigateTo('cart');
    } else {
      // User is NOT logged in: Prompt for Login/Register first
      setPendingBatchToBuy(batch);
      setAuthModalTab('login');
      setIsAuthModalOpen(true);
    }
  };

  const loginUser = (
    email: string,
    _password?: string,
    role?: 'student' | 'admin',
    name?: string
  ): boolean => {
    if (!email || !email.includes('@')) return false;
    const cleanEmail = email.trim().toLowerCase();
    const isDomainAdmin = isAuthorizedAdminEmail(cleanEmail);

    let finalRole: 'student' | 'admin' = 'student';
    if (role === 'admin') {
      if (!isDomainAdmin) return false;
      finalRole = 'admin';
    } else if (role === 'student') {
      // Administrator emails must authenticate using the Admin Login action only
      if (isDomainAdmin) return false;
      finalRole = 'student';
    } else {
      finalRole = isDomainAdmin ? 'admin' : 'student';
    }

    const derivedName =
      name ||
      (finalRole === 'admin'
        ? 'Aleph Technologies Administrator'
        : cleanEmail
            .split('@')[0]
            .replace(/[._]/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase()));

    const user: UserAccount = {
      id: `usr-${Date.now()}`,
      name: derivedName,
      email: cleanEmail,
      role: finalRole,
      registeredAt: new Date().toISOString(),
    };

    setCurrentUser(user);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore
    }

    if (finalRole === 'admin') {
      setAdminEmail(cleanEmail);
      try {
        localStorage.setItem(ADMIN_STORAGE_KEY, cleanEmail);
      } catch {
        // ignore
      }
    } else {
      setAdminEmail('');
      try {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
      } catch {
        // ignore
      }
    }

    // Clean up any stale lastOrder from prior user sessions that does not belong to this user
    setLastOrder((prev) => {
      if (!prev) return null;
      const prevEmail = (prev.userEmail || prev.customer?.email || '').toLowerCase().trim();
      if (prevEmail === cleanEmail || (prev.userId && prev.userId === user.id)) {
        return prev;
      }
      try {
        localStorage.removeItem('agilecorp_last_order_v1');
      } catch {
        // ignore
      }
      return null;
    });

    setCustomerDetails({
      fullName: user.name,
      email: user.email,
      contactNumber: user.phone || '',
      companyName: user.company || '',
    });

    setIsAuthModalOpen(false);

    // If purchase was initiated before login, fulfill it now
    if (pendingBatchToBuy) {
      const batchToAdd = pendingBatchToBuy;
      setPendingBatchToBuy(null);
      addToCart(batchToAdd, 1);
      navigateTo('cart');
    }

    return true;
  };

  const registerUser = (data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    password?: string;
    role?: 'student' | 'admin';
  }): boolean => {
    if (!data.email || !data.email.includes('@') || !data.name) return false;
    const cleanEmail = data.email.trim().toLowerCase();
    const isDomainAdmin = isAuthorizedAdminEmail(cleanEmail);

    let finalRole: 'student' | 'admin' = 'student';
    if (data.role === 'admin') {
      if (!isDomainAdmin) return false;
      finalRole = 'admin';
    } else if (data.role === 'student') {
      // Administrator emails must register using the Admin Register action only
      if (isDomainAdmin) return false;
      finalRole = 'student';
    } else {
      finalRole = isDomainAdmin ? 'admin' : 'student';
    }

    const user: UserAccount = {
      id: `usr-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      phone: data.phone?.trim() || '',
      company: data.company?.trim() || '',
      role: finalRole,
      registeredAt: new Date().toISOString(),
    };

    setCurrentUser(user);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore
    }

    if (finalRole === 'admin') {
      setAdminEmail(cleanEmail);
      try {
        localStorage.setItem(ADMIN_STORAGE_KEY, cleanEmail);
      } catch {
        // ignore
      }
    } else {
      setAdminEmail('');
      try {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
      } catch {
        // ignore
      }
    }

    // Newly registered user starts with a clean slate
    setLastOrder(null);
    try {
      localStorage.removeItem('agilecorp_last_order_v1');
    } catch {
      // ignore
    }

    setCustomerDetails({
      fullName: user.name,
      email: user.email,
      contactNumber: user.phone || '',
      companyName: user.company || '',
    });

    setIsAuthModalOpen(false);

    // If purchase was initiated before registration, fulfill it now
    if (pendingBatchToBuy) {
      const batchToAdd = pendingBatchToBuy;
      setPendingBatchToBuy(null);
      addToCart(batchToAdd, 1);
      navigateTo('cart');
    }

    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setAdminEmail('');
    setLastOrder(null);
    setCustomerDetails({
      fullName: '',
      email: '',
      contactNumber: '',
      companyName: '',
    });
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      localStorage.removeItem('agilecorp_last_order_v1');
    } catch {
      // ignore
    }
    if (currentPage === 'admin-create-course') {
      navigateTo('home');
    }
  };

  const authorizeAdmin = (email: string): boolean => {
    if (!email || !email.includes('@')) return false;
    const clean = email.trim().toLowerCase();
    if (!isAuthorizedAdminEmail(clean)) return false;
    setAdminEmail(clean);
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, clean);
    } catch {
      // ignore
    }
    return true;
  };

  const logoutAdmin = () => {
    setAdminEmail('');
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {
      // ignore
    }
    if (currentPage === 'admin-create-course') {
      navigateTo('home');
    }
  };

  const openCreateCourse = () => {
    navigateTo('admin-create-course');
    setIsCreateCourseOpen(false);
  };

  const closeCreateCourse = () => {
    setIsCreateCourseOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        selectedBrandId,
        selectedCourseId,
        navigateTo,
        brands: BRANDS,
        courses: COURSES,
        getBrand,
        getCourse,
        getCourseDisplayPrice,
        batches,
        getBatchesForCourse,
        createScheduledBatches,
        deleteBatch,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        customerDetails,
        updateCustomerDetails,
        lastOrder,
        orders,
        getUserOrders,
        processOrder,
        currentUser,
        isAuthModalOpen,
        authModalTab,
        pendingBatchToBuy,
        setPendingBatchToBuy,
        openLogin,
        openRegister,
        closeAuthModal,
        setAuthModalTab,
        initiateBuy,
        loginUser,
        registerUser,
        logoutUser,
        isAdminAuthorized,
        adminEmail,
        authorizeAdmin,
        logoutAdmin,
        isCreateCourseOpen,
        openCreateCourse,
        closeCreateCourse,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
