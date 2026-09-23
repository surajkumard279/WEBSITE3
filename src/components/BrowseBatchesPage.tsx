import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseBatch } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Laptop,
  CheckCircle,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Filter,
  CalendarPlus,
} from 'lucide-react';

export const BrowseBatchesPage: React.FC = () => {
  const {
    selectedCourseId,
    getCourse,
    getBrand,
    getBatchesForCourse,
    initiateBuy,
    currentUser,
    openLogin,
    openRegister,
    navigateTo,
    openCreateCourse,
    isAdminAuthorized,
  } = useApp();

  const course = getCourse(selectedCourseId || 'safe-ssm') || getCourse('safe-ssm')!;
  const brand = getBrand(course.brandId) || getBrand('safe')!;
  const batches = getBatchesForCourse(course.id);

  // Filter state for convenience
  const [locationFilter, setLocationFilter] = useState<'All' | 'Virtual' | 'In Person'>('All');

  const filteredBatches = batches.filter((b) => {
    if (locationFilter === 'All') return true;
    return b.location === locationFilter;
  });

  const handleBuy = (batch: CourseBatch) => {
    initiateBuy(batch);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Banner with Maroon #5C061E Background & White/Light Grey Text */}
      <div
        className="text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#440416] relative overflow-hidden"
        style={{ backgroundColor: '#5C061E' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back to Course button */}
          <button
            onClick={() => navigateTo('course', { brandId: course.brandId, courseId: course.id })}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {course.shortCode} Overview</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="px-2.5 py-1 bg-white/15 border border-white/20 rounded text-xs font-bold tracking-wider text-white">
              {brand.name}
            </span>
            <span className="text-xs text-slate-200 font-mono font-semibold">
              Course Code: {course.shortCode}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-serif">
                Browse Scheduled Batches — {course.title}
              </h1>

              <p className="text-sm text-slate-200 mt-2 max-w-2xl leading-relaxed">
                Select an upcoming batch schedule below to enroll. All batches include live interactive instruction, examination vouchers, and official courseware.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filter Schedule:</span>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {(['All', 'Virtual', 'In Person'] as const).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocationFilter(loc)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    locationFilter === loc
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-900">{filteredBatches.length}</strong> available {filteredBatches.length === 1 ? 'batch' : 'batches'}
            </span>
          </div>
        </div>

        {/* User Auth Guidance Banner */}
        {!currentUser ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 sm:p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
            <div className="flex items-center gap-2.5 text-amber-900">
              <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                i
              </span>
              <span>
                <strong>Login / Registration Required:</strong> When you click <strong>BUY</strong>, you will be prompted to sign in or create your student account before adding to cart.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={openLogin}
                className="px-3 py-1.5 bg-[#5C061E] hover:bg-[#740a28] text-white rounded-lg font-bold text-xs cursor-pointer shadow-2xs"
              >
                Sign In Now
              </button>
              <button
                onClick={openRegister}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg font-bold text-xs cursor-pointer shadow-2xs"
              >
                Register
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-6 flex items-center justify-between text-xs text-emerald-850 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-800 font-medium">
              <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-xs font-bold">
                ✓
              </span>
              <span>
                Logged in as <strong>{currentUser.name}</strong> ({currentUser.email}). Clicking BUY will add the batch directly to your checkout.
              </span>
            </div>
          </div>
        )}

        {/* Batches List: Exact Requirement:
            Show for every scheduled batch:
            * Course name
            * Date
            * Start time
            * End time
            * Location
            * Price
            * BUY button
            Example for SSM:
            * SSM — October 1 — 9:00 AM–5:00 PM — Virtual — $699 — BUY */}
        {filteredBatches.length > 0 ? (
          <div className="space-y-3">
            {filteredBatches.map((batch) => {
              return (
                <div
                  key={batch.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-[#5C061E]/50 p-5 transition-all shadow-2xs hover:shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                >
                  {/* Left & Middle: Batch Specifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center flex-1">
                    {/* Course Code & Name (Col 1-5) */}
                    <div className="sm:col-span-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#5C061E]/10 text-[#5C061E] rounded text-xs font-bold font-mono tracking-wide">
                          {course.shortCode}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {brand.name}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                        {batch.courseTitle}
                      </h3>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">
                        Instructor: {batch.instructor}
                      </span>
                    </div>

                    {/* Date (Col 6-8) */}
                    <div className="sm:col-span-3">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Calendar className="w-4 h-4 text-[#5C061E] shrink-0" />
                        <span>{batch.date}</span>
                      </div>
                      <span className="text-xs text-slate-500 block pl-6">
                        Guaranteed Date
                      </span>
                    </div>

                    {/* Time (Col 9-10) */}
                    <div className="sm:col-span-3">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{batch.startTime} – {batch.endTime}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 block pl-5">
                        Timezone: Instructor Local & Interactive
                      </span>
                    </div>

                    {/* Location (Col 11-12) */}
                    <div className="sm:col-span-2">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        {batch.location === 'Virtual' ? (
                          <Laptop className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                        )}
                        <span className="font-semibold">{batch.location}</span>
                      </div>
                      {batch.venueDetail && (
                        <span className="text-[11px] text-slate-400 block truncate max-w-[140px]">
                          {batch.venueDetail}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Price & BUY Button */}
                  <div className="flex items-center justify-between lg:justify-end gap-5 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                    <div className="text-left lg:text-right">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                        Tuition
                      </span>
                      <span className="text-2xl font-black text-slate-900 tabular-nums font-mono">
                        ${batch.price}
                      </span>
                    </div>

                    {/* BUY button */}
                    <button
                      onClick={() => handleBuy(batch)}
                      className="py-3 px-6 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs min-w-[120px] bg-[#5C061E] hover:bg-[#740a28] active:bg-[#440416] text-white hover:shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4 text-white" />
                      <span>BUY</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No Batches Found For Selected Filter</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              There are currently no {locationFilter} batches for this course. Switch your filter or use the administrator scheduling tool to add batches.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setLocationFilter('All')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Reset Filter to All
              </button>
            </div>
          </div>
        )}

        {/* Informational Callout */}
        <div className="mt-8 p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
            <span>
              All scheduled courses include 100% Guaranteed Dates, official exam voucher, study materials, and direct post-class instructor mentorship.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
