export type BrandId = 'safe' | 'scrum-alliance' | 'scrum-org' | 'icagile' | 'kanban';

export interface CertificationBrand {
  id: BrandId;
  name: string;
  tagline: string;
  logoText: string;
  badge: string;
  accreditation: string;
  description: string;
  overview: string;
  benefits: string[];
  examInfo: string;
  bannerGradient: string;
  accentColor: string;
  logoBg: string;
}

export interface Course {
  id: string;
  brandId: BrandId;
  shortCode: string;
  title: string;
  subTitle?: string;
  description: string;
  overview: string;
  learningObjectives: string[];
  targetAudience: string[];
  prerequisites: string;
  duration: string;
  pdus: string;
  defaultPrice: number;
  currentPrice: number;
  certificationDetails: {
    examName: string;
    format: string;
    duration: string;
    passingScore: string;
    credentialTitle: string;
    validity: string;
  };
  syllabus: {
    module: string;
    topics: string[];
  }[];
}

export type BatchLocation = 'Virtual' | 'In Person';

export interface CourseBatch {
  id: string;
  courseId: string;
  courseTitle: string;
  brandId: BrandId;
  date: string; // Formatted date e.g. "October 1, 2026"
  rawDate: string; // YYYY-MM-DD for sorting
  startTime: string; // e.g. "9:00 AM"
  endTime: string; // e.g. "5:00 PM"
  location: BatchLocation;
  venueDetail?: string;
  price: number;
  instructor: string;
  availableSeats: number;
}

export interface CartItem {
  id: string; // usually batch.id
  batchId: string;
  courseId: string;
  courseName: string;
  brandId: BrandId;
  selectedDate: string;
  selectedTime: string;
  location: BatchLocation;
  price: number;
  quantity: number;
  total: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  contactNumber: string;
  companyName: string;
}

export interface PaymentDetails {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  billingZip: string;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  customer: CustomerDetails;
  totalAmount: number;
  paymentMethod: string;
  userId?: string;
  userEmail?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role: 'student' | 'admin';
  enrolledCourses?: string[];
  registeredAt?: string;
}

export type PageView =
  | 'home'
  | 'courses-overview'
  | 'brand'
  | 'course'
  | 'browse'
  | 'blogs'
  | 'about'
  | 'faq'
  | 'contact'
  | 'cart'
  | 'payment'
  | 'order-success'
  | 'student-profile'
  | 'admin-create-course';

