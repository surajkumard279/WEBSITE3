import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  Laptop,
  CheckCircle2,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    customerDetails,
    updateCustomerDetails,
    navigateTo,
    currentUser,
    openLogin,
    openRegister,
  } = useApp();

  // Keep customer details populated with logged-in user profile info
  useEffect(() => {
    if (currentUser) {
      updateCustomerDetails({
        fullName: currentUser.name || customerDetails.fullName || '',
        email: currentUser.email || customerDetails.email || '',
        contactNumber: currentUser.phone || customerDetails.contactNumber || '',
        companyName: currentUser.company || customerDetails.companyName || '',
      });
    }
  }, [currentUser]);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    contactNumber?: string;
  }>({});

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!customerDetails.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }
    if (!customerDetails.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!customerDetails.contactNumber.trim()) {
      errs.contactNumber = 'Contact number is mandatory for certification registration.';
    } else if (customerDetails.contactNumber.trim().length < 7) {
      errs.contactNumber = 'Please enter a valid phone number (minimum 7 digits).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!currentUser) {
      openLogin();
      return;
    }
    if (validate()) {
      navigateTo('payment');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 text-center max-w-md w-full shadow-xs space-y-5">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Explore our accredited certification courses across SAFe, Scrum Alliance, Scrum.org, ICAgile, and Kanban to reserve your seat.
            </p>
          </div>
          <button
            onClick={() => navigateTo('courses-overview')}
            className="w-full py-3 px-4 bg-[#5C061E] hover:bg-[#740a28] text-white text-xs font-bold rounded-xl transition-all cursor-pointer uppercase tracking-wider"
          >
            Explore Courses Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5 text-[#5C061E] font-bold">
              <span className="w-5 h-5 rounded-full bg-[#5C061E] text-white flex items-center justify-center text-[11px]">
                1
              </span>
              Cart & Attendee Details
            </span>
            <span>→</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[11px]">
                2
              </span>
              Secure Payment
            </span>
            <span>→</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[11px]">
                3
              </span>
              Confirmation & Vouchers
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 font-serif">
            Shopping Cart & Registration Checkout
          </h1>
        </div>

        {/* 2-Column Cart Structure: Exact Requirement from Point 7:
            LEFT SIDE:
            * Course name
            * Course date
            * Course time
            * Location
            * Quantity
            * Price
            * Total price

            RIGHT SIDE:
            * Name — Mandatory
            * Email — Mandatory
            * Contact Number — MANDATORY
            * Company Name — Optional
            Below customer details form: NEXT button (with mandatory validation) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-base font-bold text-slate-900">
                  Selected Scheduled Courses ({cart.length})
                </h2>
                <button
                  onClick={() => navigateTo('courses-overview')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  + Add Another Course
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.id} className="py-5 first:pt-4 last:pb-0 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {item.courseName}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
                          {/* Course Date */}
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span className="font-semibold text-slate-900">{item.selectedDate}</span>
                          </div>

                          {/* Course Time */}
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{item.selectedTime}</span>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-1.5">
                            {item.location === 'Virtual' ? (
                              <Laptop className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            )}
                            <span className="font-medium">{item.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.batchId)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                        title="Remove course from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity, Unit Price & Total */}
                    <div className="flex items-center justify-between pt-2 text-xs">
                      {/* Quantity Controller */}
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-medium">Attendees:</span>
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.batchId, item.quantity - 1)}
                            className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            aria-label="Decrease seats"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 font-bold text-slate-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.batchId, item.quantity + 1)}
                            className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            aria-label="Increase seats"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Unit Price & Total */}
                      <div className="text-right">
                        <span className="text-slate-400 text-[11px] block">
                          ${item.price} × {item.quantity}
                        </span>
                        <span className="text-base font-black text-slate-900 tabular-nums font-mono">
                          ${item.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total Row */}
              <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Total Tuition Fee</span>
                  <span className="text-[11px] text-emerald-600 font-medium">Includes exam vouchers & materials</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums font-mono">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-100 rounded-xl text-xs text-slate-600 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                100% Money-back guarantee and free batch rescheduling policy up to 48 hours prior to start date.
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Mandatory Customer Information Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <div className="pb-4 border-b border-slate-100 mb-5">
                <h2 className="text-base font-bold text-slate-900">
                  Customer & Attendee Details
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Required by the certification body for exam authorization and digital credentials.
                </p>
              </div>

              {!currentUser ? (
                <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2 text-amber-900">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                      !
                    </span>
                    <span>
                      <strong>Account Sign-In Required:</strong> Please log in or register your student account to proceed to payment.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={openLogin}
                      className="px-3 py-1 bg-[#5C061E] hover:bg-[#740a28] text-white rounded-lg font-bold cursor-pointer"
                    >
                      Log In
                    </button>
                    <button
                      type="button"
                      onClick={openRegister}
                      className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg font-bold cursor-pointer"
                    >
                      Register
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between text-emerald-800">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Logged in as <strong className="font-bold">{currentUser.name}</strong>
                  </span>
                  <span className="text-[10px] text-emerald-700 uppercase font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                    Verified Learner
                  </span>
                </div>
              )}

              <form onSubmit={handleNext} className="space-y-4">
                {/* Full Name — Mandatory */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alexander Hamilton"
                    value={customerDetails.fullName}
                    onChange={(e) => {
                      updateCustomerDetails({ fullName: e.target.value });
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/30'
                        : 'border-slate-300 focus:border-[#5C061E] focus:ring-[#5C061E]/20'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Must match your legal identification for exam proctoring.
                  </span>
                </div>

                {/* Email — Mandatory */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. alexander@enterprise.com"
                    value={customerDetails.email}
                    onChange={(e) => {
                      updateCustomerDetails({ email: e.target.value });
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/30'
                        : 'border-slate-300 focus:border-[#5C061E] focus:ring-[#5C061E]/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Class link and examination voucher key will be sent here.
                  </span>
                </div>

                {/* Contact Number — MANDATORY */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Contact Number <span className="text-rose-600 font-extrabold">* (MANDATORY)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (555) 382-9921"
                    value={customerDetails.contactNumber}
                    onChange={(e) => {
                      updateCustomerDetails({ contactNumber: e.target.value });
                      if (errors.contactNumber)
                        setErrors((prev) => ({ ...prev, contactNumber: undefined }));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.contactNumber
                        ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/30'
                        : 'border-slate-300 focus:border-[#5C061E] focus:ring-[#5C061E]/20'
                    }`}
                  />
                  {errors.contactNumber && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.contactNumber}</span>
                    </p>
                  )}
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Required for urgent schedule updates & session SMS reminders.
                  </span>
                </div>

                {/* Company Name — Optional */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Company Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. J.P. Morgan Chase & Co."
                    value={customerDetails.companyName}
                    onChange={(e) => updateCustomerDetails({ companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#5C061E] focus:ring-2 focus:ring-[#5C061E]/20 text-sm transition-all focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Will appear on your tax receipt invoice for corporate expense reimbursement.
                  </span>
                </div>

                {/* Mandatory Check note */}
                <div className="pt-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Validation Notice: </span>
                  Mandatory fields must be completed before advancing to the payment processing step.
                </div>

                {/* NEXT BUTTON */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-[#5C061E] hover:bg-[#740a28] active:bg-[#440416] text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    <span>NEXT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
