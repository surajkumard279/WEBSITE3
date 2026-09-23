import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  BookOpen,
  Download,
  FileText,
  BadgeCheck,
} from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const {
    currentUser,
    getUserOrders,
    lastOrder,
    navigateTo,
    openLogin,
    getBrand,
    courses,
  } = useApp();

  const [downloadSuccessOrderId, setDownloadSuccessOrderId] = useState<string | null>(null);

  // If user is not logged in, prompt to log in
  if (!currentUser) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 text-center max-w-md w-full shadow-xs space-y-5">
          <div className="w-16 h-16 bg-[#5C061E]/10 text-[#5C061E] rounded-full flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Sign In Required</h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Please log in or register your student account to view your profile and purchased courses.
            </p>
          </div>
          <button
            onClick={openLogin}
            className="w-full py-3 px-4 bg-[#5C061E] hover:bg-[#740a28] text-white text-xs font-bold rounded-xl transition-all cursor-pointer uppercase tracking-wider"
          >
            Log In / Register
          </button>
        </div>
      </div>
    );
  }

  // Retrieve user orders specifically for this authenticated student
  const combinedOrders = getUserOrders();

  // Extract all purchased items across orders
  const allPurchasedItems = combinedOrders.flatMap((order) =>
    order.items.map((item) => ({
      ...item,
      orderId: order.orderId,
      orderDate: order.createdAt,
      paymentMethod: order.paymentMethod,
    }))
  );

  const handleDownloadInvoice = (orderId: string) => {
    setDownloadSuccessOrderId(orderId);
    setTimeout(() => setDownloadSuccessOrderId(null), 3000);
  };

  const studentId = `AGC-STU-${Math.abs(
    currentUser.name.split('').reduce((a, b) => a + b.charCodeAt(0), 10000)
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Clean Header Banner */}
      <div className="bg-[#5C061E] text-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8 border-b border-[#440416]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Top Left: Short Profile Pic with Full Name */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 border-2 border-white/25 flex items-center justify-center text-white text-xl sm:text-2xl font-black font-serif shadow-inner shrink-0">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-serif">
                {currentUser.name}
              </h1>
            </div>

            {/* Top Right: Browse More Courses */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('courses-overview')}
                className="py-2 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#5C061E] text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer shadow-md uppercase tracking-wider"
              >
                <BookOpen className="w-4 h-4 text-[#5C061E]" />
                <span>Browse More Courses</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* LEFT COLUMN: Simple Student Profile Details (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#5C061E]" />
                    <span>Student Profile Details</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your official student account details
                  </p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Full Legal Name
                  </label>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{currentUser.name}</p>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Email Address
                  </label>
                  <p className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{currentUser.email}</span>
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Contact Phone Number
                  </label>
                  <p className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{currentUser.phone || 'Not provided'}</span>
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Organization / Company
                  </label>
                  <p className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{currentUser.company || 'Individual Learner'}</span>
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Registration Date
                  </label>
                  <p className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {currentUser.registeredAt
                        ? new Date(currentUser.registeredAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'September 2026'}
                    </span>
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Student ID
                  </label>
                  <p className="font-mono font-bold text-slate-900 mt-0.5">
                    {studentId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Courses Purchased (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#5C061E]" />
                    <span>Courses Purchased</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your enrolled certification courses and cohort schedule
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#5C061E]/10 text-[#5C061E] text-xs font-bold self-start sm:self-auto">
                  {allPurchasedItems.length} {allPurchasedItems.length === 1 ? 'Course' : 'Courses'} Purchased
                </span>
              </div>

              {/* Course list */}
              {allPurchasedItems.length > 0 ? (
                <div className="space-y-4 mt-6">
                  {allPurchasedItems.map((item, index) => {
                    const brand = getBrand(item.brandId);
                    const courseObj = courses.find((c) => c.id === item.courseId);
                    const shortCode = courseObj?.shortCode || item.courseName.split(' ')[0];

                    return (
                      <div
                        key={`${item.id}-${index}`}
                        className="rounded-2xl border border-slate-200 bg-white hover:border-[#5C061E]/40 transition-all p-5 sm:p-6 shadow-2xs hover:shadow-xs space-y-4"
                      >
                        {/* Top row: Brand Badge, Code, Order Ref, Price */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2.5 py-1 bg-[#5C061E]/10 text-[#5C061E] rounded-md text-xs font-extrabold font-mono uppercase tracking-wide">
                              {shortCode}
                            </span>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-semibold">
                              {brand?.name || 'Accredited Partner'}
                            </span>
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-bold flex items-center gap-1">
                              <BadgeCheck className="w-3.5 h-3.5" /> Seat Confirmed & Enrolled
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400 font-mono">
                              Order #{item.orderId}
                            </span>
                            <span className="text-base font-extrabold text-slate-900 font-mono">
                              ${item.price}
                            </span>
                          </div>
                        </div>

                        {/* Title and Schedule */}
                        <div>
                          <h3 className="text-base font-bold text-slate-900 hover:text-[#5C061E] transition-colors">
                            {item.courseName}
                          </h3>
                          <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-[#5C061E] shrink-0" />
                              <span className="font-semibold text-slate-900">{item.selectedDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{item.selectedTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>
                                {item.location === 'Virtual'
                                  ? 'Live Virtual Classroom'
                                  : `In-Person (${item.location})`}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons row */}
                        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDownloadInvoice(item.orderId)}
                              className="py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5 text-slate-500" />
                              <span>
                                {downloadSuccessOrderId === item.orderId
                                  ? 'Receipt Downloaded!'
                                  : 'Tax Invoice / Receipt'}
                              </span>
                            </button>

                            <button
                              onClick={() => {
                                if (courseObj) {
                                  navigateTo('course', {
                                    brandId: item.brandId,
                                    courseId: item.courseId,
                                  });
                                } else {
                                  navigateTo('courses-overview');
                                }
                              }}
                              className="py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-500" />
                              <span>Course Syllabus</span>
                            </button>
                          </div>

                          <span className="text-[11px] text-slate-400">
                            Paid via {item.paymentMethod}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 px-4 space-y-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      No Courses Purchased Yet
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                      You have not enrolled in any certification batches yet. Explore our courses catalog to find upcoming batches and enroll.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo('courses-overview')}
                    className="py-2.5 px-6 rounded-xl bg-[#5C061E] hover:bg-[#740a28] text-white text-xs font-bold transition-all cursor-pointer shadow-md uppercase tracking-wider"
                  >
                    Browse More Courses →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
