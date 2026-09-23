import React, { useState } from 'react';
import { useApp, isAuthorizedAdminEmail } from '../context/AppContext';
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  Building,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  ShoppingBag,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    loginUser,
    registerUser,
    currentUser,
    logoutUser,
    openCreateCourse,
    navigateTo,
    pendingBatchToBuy,
    setPendingBatchToBuy,
    getUserOrders,
  } = useApp();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [regError, setRegError] = useState('');

  const [forgotSent, setForgotSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleUserLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError('');
    if (!loginEmail || !loginEmail.includes('@')) {
      setLoginError('Please enter a valid personal or corporate email.');
      return;
    }
    const cleanEmail = loginEmail.trim().toLowerCase();
    if (isAuthorizedAdminEmail(cleanEmail)) {
      setLoginError('TRAINING@ALEPHTECHNOLOGIES.IN is an administrator account. Please use the ADMIN LOGIN button.');
      return;
    }
    const success = loginUser(cleanEmail, loginPassword, 'student');
    if (!success) {
      setLoginError('Invalid credentials. Please verify your email.');
    }
  };

  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError('');
    if (!loginEmail || !loginEmail.includes('@')) {
      setLoginError('Please enter the administrator email.');
      return;
    }
    const cleanEmail = loginEmail.trim().toLowerCase();
    if (!isAuthorizedAdminEmail(cleanEmail)) {
      setLoginError('Access Denied: Admin Login is reserved for company administrators only.');
      return;
    }
    const success = loginUser(cleanEmail, loginPassword, 'admin');
    if (success) {
      closeAuthModal();
      navigateTo('admin-create-course');
    } else {
      setLoginError('Administrator authentication failed.');
    }
  };

  const handleUserRegister = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setRegError('');
    if (!regName.trim()) {
      setRegError('Please enter your full legal name for certification vouchers.');
      return;
    }
    if (!regEmail || !regEmail.includes('@')) {
      setRegError('Please enter a valid corporate or personal email.');
      return;
    }
    const cleanEmail = regEmail.trim().toLowerCase();
    if (isAuthorizedAdminEmail(cleanEmail)) {
      setRegError('TRAINING@ALEPHTECHNOLOGIES.IN is an administrator account. Please use the ADMIN REGISTER button.');
      return;
    }
    if (!agreeTerms) {
      setRegError('Please agree to the Academy Terms & Conditions.');
      return;
    }

    const success = registerUser({
      name: regName,
      email: cleanEmail,
      phone: regPhone,
      company: regCompany,
      password: regPassword,
      role: 'student',
    });

    if (!success) {
      setRegError('Registration failed. Please check your information.');
    }
  };

  const handleAdminRegister = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setRegError('');
    if (!regName.trim()) {
      setRegError('Please enter administrator full name.');
      return;
    }
    if (!regEmail || !regEmail.includes('@')) {
      setRegError('Please enter administrator email.');
      return;
    }
    const cleanEmail = regEmail.trim().toLowerCase();
    if (!isAuthorizedAdminEmail(cleanEmail)) {
      setRegError('Access Denied: Admin Registration is reserved for company administrators only.');
      return;
    }
    if (!agreeTerms) {
      setRegError('Please agree to the Academy Terms & Conditions.');
      return;
    }

    const success = registerUser({
      name: regName,
      email: regEmail,
      phone: regPhone,
      company: regCompany || 'Aleph Technologies',
      password: regPassword,
      role: 'admin',
    });

    if (success) {
      closeAuthModal();
      navigateTo('admin-create-course');
    } else {
      setRegError('Admin registration failed.');
    }
  };

  // If already logged in, show user profile / account management view
  if (currentUser) {
    const userOrders = getUserOrders();
    const allPurchasedItems = userOrders.flatMap((order) =>
      order.items.map((item) => ({
        ...item,
        orderId: order.orderId,
      }))
    );

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div
            className="text-white p-6 relative border-b border-[#440416]"
            style={{ backgroundColor: '#5C061E' }}
          >
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white text-lg font-bold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-serif">{currentUser.name}</h3>
                <span className="text-xs text-slate-200">{currentUser.email}</span>
                <div className="mt-1 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                    {currentUser.role === 'admin' ? 'Faculty / Administrator' : 'Verified Student'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
            {/* Student Personal Details */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
              <div className="flex justify-between text-slate-600">
                <span className="font-semibold text-slate-700">Account Status:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active & Verified Learner
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="font-semibold text-slate-700">Student ID:</span>
                <span className="font-mono font-bold text-slate-900">
                  AGC-STU-{Math.abs(currentUser.name.split('').reduce((a, b) => a + b.charCodeAt(0), 10000))}
                </span>
              </div>
              {currentUser.company && (
                <div className="flex justify-between text-slate-600">
                  <span className="font-semibold text-slate-700">Organization:</span>
                  <span className="font-semibold text-slate-900">{currentUser.company}</span>
                </div>
              )}
              {currentUser.phone && (
                <div className="flex justify-between text-slate-600">
                  <span className="font-semibold text-slate-700">Contact:</span>
                  <span className="font-semibold text-slate-900">{currentUser.phone}</span>
                </div>
              )}
            </div>

            {/* Courses Purchased Section */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#5C061E]" />
                  <span>Purchased Courses ({allPurchasedItems.length})</span>
                </span>
                <button
                  onClick={() => {
                    closeAuthModal();
                    navigateTo('student-profile');
                  }}
                  className="text-[11px] font-bold text-[#5C061E] hover:underline cursor-pointer"
                >
                  View Full Dashboard →
                </button>
              </div>

              {allPurchasedItems.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {allPurchasedItems.map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      className="p-3 bg-white rounded-xl border border-slate-200 hover:border-[#5C061E]/40 transition-colors shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 truncate">{item.courseName}</span>
                        <span className="font-mono font-bold text-slate-900 shrink-0">
                          ${item.price}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>{item.selectedDate}</span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          Exam Voucher Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-slate-500">
                  <p>No courses purchased yet.</p>
                </div>
              )}
            </div>

            {/* Navigation Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  closeAuthModal();
                  navigateTo('student-profile');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#5C061E] hover:bg-[#740a28] text-white font-bold transition-colors flex items-center justify-between cursor-pointer shadow-xs"
              >
                <span>Go to My Student Profile & Vouchers</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => {
                  closeAuthModal();
                  navigateTo('cart');
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Cart & Checkout</span>
                <ShoppingBag className="w-4 h-4 text-slate-400" />
              </button>

              {currentUser.role === 'admin' && (
                <button
                  onClick={() => {
                    closeAuthModal();
                    openCreateCourse();
                  }}
                  className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#5C061E] font-bold transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>Admin Course Batch Scheduling</span>
                  <ArrowRight className="w-4 h-4 text-[#5C061E]" />
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={logoutUser}
                className="w-full py-2 px-4 rounded-xl text-rose-600 hover:bg-rose-50 font-bold transition-colors text-center cursor-pointer"
              >
                Sign Out from ALEPH TECHNOLOGIES Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header with Maroon #5C061E Background */}
        {/* Modal Header */}
        <div
          className="text-white p-5 sm:p-6 border-b border-[#440416] relative flex items-center justify-between"
          style={{ backgroundColor: '#5C061E' }}
        >
          <div>
            <span className="text-2xl font-black tracking-tight text-white font-serif block">
              ALEPH TECHNOLOGIES
            </span>
          </div>

          <button
            onClick={closeAuthModal}
            className="text-slate-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pending Batch Enrollment Notice (When BUY was clicked while logged out) */}
        {pendingBatchToBuy && (
          <div className="bg-amber-50 border-b border-amber-200 p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#5C061E] text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-[#5C061E] uppercase tracking-wider">
                  Course Enrollment In Progress
                </span>
                <span className="text-sm font-black text-slate-900 font-mono">
                  ${pendingBatchToBuy.price}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                {pendingBatchToBuy.courseTitle}
              </h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {pendingBatchToBuy.date} · {pendingBatchToBuy.startTime}–{pendingBatchToBuy.endTime} ({pendingBatchToBuy.location})
              </p>
              <p className="text-[11px] font-semibold text-emerald-800 mt-1">
                ✓ Sign in or create an account below to complete your seat registration.
              </p>
            </div>
          </div>
        )}

        {/* Tab Switcher: LOGIN vs REGISTER */}
        <div className="grid grid-cols-2 border-b border-slate-200 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => {
              setAuthModalTab('login');
              setLoginError('');
              setRegError('');
            }}
            className={`py-3 text-center transition-colors cursor-pointer ${
              authModalTab === 'login'
                ? 'text-[#5C061E] border-b-2 border-[#5C061E] bg-[#5C061E]/5'
                : 'text-slate-500 hover:text-slate-900 bg-slate-50'
            }`}
          >
            LOGIN / SIGN IN
          </button>
          <button
            onClick={() => {
              setAuthModalTab('register');
              setLoginError('');
              setRegError('');
            }}
            className={`py-3 text-center transition-colors cursor-pointer ${
              authModalTab === 'register'
                ? 'text-[#5C061E] border-b-2 border-[#5C061E] bg-[#5C061E]/5'
                : 'text-slate-500 hover:text-slate-900 bg-slate-50'
            }`}
          >
            REGISTER / SIGN UP
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {/* TAB 1: LOGIN */}
          {authModalTab === 'login' && (
            <form onSubmit={handleUserLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {loginError}
                </div>
              )}

              {forgotSent && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-medium">
                  Password reset link sent to your registered email address.
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Corporate / Personal Email <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@enterprise.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800">
                    Password <span className="text-rose-600">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotSent(true)}
                    className="text-[11px] text-[#5C061E] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-3.5 h-3.5 rounded border-slate-300 text-[#5C061E] focus:ring-[#5C061E]"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleUserLogin}
                  className="w-full py-3 px-4 bg-[#5C061E] hover:bg-[#740a28] active:bg-[#440416] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <User className="w-4 h-4 text-white" />
                  <span>{pendingBatchToBuy ? 'USER LOGIN & BUY' : 'USER LOGIN'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAdminLogin}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-black active:bg-slate-950 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider border border-slate-800"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>ADMIN LOGIN</span>
                </button>
              </div>

              <div className="text-center pt-2 text-xs text-slate-600">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalTab('register')}
                  className="font-bold text-[#5C061E] hover:underline cursor-pointer"
                >
                  Register Now
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {authModalTab === 'register' && (
            <form onSubmit={handleUserRegister} className="space-y-3.5">
              {regError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {regError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Full Legal Name <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Green (As printed on Certificate)"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Corporate or Personal Email <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. rachel@enterprise.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Company / Employer
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Microsoft"
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Create Password <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 rounded border-slate-300 text-[#5C061E] focus:ring-[#5C061E]"
                  />
                  <span>
                    I agree to the Academy enrollment terms, accreditation disclosures, and official exam pass guarantee policies.
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleUserRegister}
                  className="w-full py-3 px-4 bg-[#5C061E] hover:bg-[#740a28] active:bg-[#440416] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <User className="w-4 h-4 text-white" />
                  <span>{pendingBatchToBuy ? 'USER REGISTER & BUY' : 'USER REGISTER'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAdminRegister}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-black active:bg-slate-950 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider border border-slate-800"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>ADMIN REGISTER</span>
                </button>
              </div>

              <div className="text-center pt-2 text-xs text-slate-600">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalTab('login')}
                  className="font-bold text-[#5C061E] hover:underline cursor-pointer"
                >
                  Log In Here
                </button>
              </div>
            </form>
          )}

          {/* Trust assurances footer */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5C061E]" /> 256-Bit SSL Encrypted
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Authorized Partner
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
