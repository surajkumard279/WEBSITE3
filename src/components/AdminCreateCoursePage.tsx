import React, { useState, useMemo, useEffect } from 'react';
import { useApp, isAuthorizedAdminEmail } from '../context/AppContext';
import { BatchLocation, CourseBatch } from '../types';
import {
  CalendarPlus,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Laptop,
  DollarSign,
  Repeat,
  ArrowRight,
  LogOut,
  Sparkles,
  Trash2,
  AlertCircle,
  Building,
  ChevronRight,
  Check,
  UserCheck,
} from 'lucide-react';

export const AdminCreateCoursePage: React.FC = () => {
  const {
    courses,
    brands,
    createScheduledBatches,
    navigateTo,
    isAdminAuthorized,
    adminEmail,
    authorizeAdmin,
    logoutAdmin,
    batches,
    deleteBatch,
    currentUser,
    openLogin,
  } = useApp();

  // If user logs out or is not authorized as admin, redirect immediately to home page
  useEffect(() => {
    if (!isAdminAuthorized) {
      navigateTo('home');
    }
  }, [isAdminAuthorized, navigateTo]);

  // Admin Domain Authorization State
  const [emailInput, setEmailInput] = useState('TRAINING@ALEPHTECHNOLOGIES.IN');
  const [authError, setAuthError] = useState<string | null>(null);

  // Default values:
  // Default Price: $699
  // Default Time: 9:00 AM – 5:00 PM
  const todayISO = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }, []);

  // Form Fields
  const [selectedCourseId, setSelectedCourseId] = useState<string>('safe-ssm');
  const [startDate, setStartDate] = useState<string>(todayISO);
  const [startTime, setStartTime] = useState<string>('9:00 AM');
  const [endTime, setEndTime] = useState<string>('5:00 PM');
  const [location, setLocation] = useState<BatchLocation>('Virtual');
  const [venueDetail, setVenueDetail] = useState<string>('Aleph Corporate Executive Training Center');
  const [price, setPrice] = useState<number>(699);
  const [recurringCount, setRecurringCount] = useState<1 | 2 | 3 | 4>(4);

  // Status & Feedback
  const [createdBatches, setCreatedBatches] = useState<CourseBatch[] | null>(null);
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');

  // Handle Admin Authorization
  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();

    if (!isAuthorizedAdminEmail(cleanEmail)) {
      setAuthError(
        'Access Denied: Customers cannot access or use the administrator scheduling system. Only company authorized domain administrators (TRAINING@ALEPHTECHNOLOGIES.IN) can schedule courses.'
      );
      return;
    }

    authorizeAdmin(cleanEmail);
    setAuthError(null);
  };

  const handleQuickAuthorize = () => {
    setEmailInput('TRAINING@ALEPHTECHNOLOGIES.IN');
    authorizeAdmin('training@alephtechnologies.in');
    setAuthError(null);
  };

  // Live preview dates for recurring logic:
  // Recurring = 1: selected date
  // Recurring = 2: selected date + 7 days
  // Recurring = 3: selected date + 7 days + 14 days
  // Recurring = 4: selected date + 7 days + 14 days + 21 days
  const previewDates = useMemo(() => {
    if (!startDate) return [];
    const dates: string[] = [];
    const parts = startDate.split('-').map(Number);
    const startYear = parts[0];
    const startMonth = parts[1] - 1;
    const startDay = parts[2];

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    for (let i = 0; i < recurringCount; i++) {
      const dt = new Date(startYear, startMonth, startDay + i * 7);
      dates.push(`${monthNames[dt.getMonth()]} ${dt.getDate()}`);
    }
    return dates;
  }, [startDate, recurringCount]);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleCreateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatches = createScheduledBatches({
      courseId: selectedCourseId,
      startDateStr: startDate,
      startTime,
      endTime,
      location,
      venueDetail: location === 'In Person' ? venueDetail : undefined,
      price: Number(price) || 699,
      recurringCount,
    });

    setCreatedBatches(newBatches);
  };

  const handleViewOnSite = () => {
    if (selectedCourse) {
      navigateTo('browse', { brandId: selectedCourse.brandId, courseId: selectedCourse.id });
    }
  };

  if (!isAdminAuthorized) {
    return null;
  }

  return (
    <div className="min-h-[85vh] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => navigateTo('courses-overview')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Courses
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-bold text-[#5C061E]">Admin Course Scheduling</span>
        </div>

        {/* Header Banner - Maroon #5C061E with White/Light Grey styling */}
        <div
          className="rounded-2xl text-white p-6 sm:p-8 shadow-xl relative overflow-hidden"
          style={{ backgroundColor: '#5C061E' }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-slate-100 text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-white/20">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Authorized Administrator System</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif tracking-tight text-white">
                Course Batch Scheduling Portal
              </h1>
              <p className="text-slate-200 text-sm mt-2 max-w-2xl leading-relaxed">
                Authorized company portal to configure course schedules, dates, timings, locations, and pricing. Batches created here publish directly to the customer-facing schedule.
              </p>
            </div>

            {isAdminAuthorized && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                <div className="bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/20 text-xs">
                  <span className="text-slate-300 block text-[10px] uppercase tracking-wider font-semibold">
                    Admin Account
                  </span>
                  <span className="font-bold text-white font-mono">
                    {currentUser?.email || adminEmail || 'TRAINING@ALEPHTECHNOLOGIES.IN'}
                  </span>
                </div>
                <button
                  onClick={logoutAdmin}
                  className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit Admin</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {createdBatches ? (
          /* SUCCESS SCREEN */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900">
                {createdBatches.length} Course {createdBatches.length === 1 ? 'Batch' : 'Batches'} Successfully Created!
              </h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Weekly batches for <strong className="text-slate-900">{selectedCourse.shortCode} — {selectedCourse.title}</strong> have been published to the system and are immediately active on the customer-facing schedule.
              </p>
            </div>

            {/* Published Batches List */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Published Batches on Customer Schedule:
              </span>
              <div className="space-y-2.5">
                {createdBatches.map((b, idx) => (
                  <div
                    key={b.id}
                    className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">
                        {idx + 1}. {selectedCourse.shortCode} — {b.date}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-3">
                        <span>{b.startTime} – {b.endTime}</span>
                        <span>·</span>
                        <span>{b.location}</span>
                        {b.venueDetail && (
                          <>
                            <span>·</span>
                            <span className="text-slate-600">{b.venueDetail}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="font-mono font-black text-emerald-700 tabular-nums text-base bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto">
                      ${b.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setCreatedBatches(null)}
                className="w-full sm:w-auto py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                + Create More Batches
              </button>
              <button
                type="button"
                onClick={handleViewOnSite}
                className="w-full sm:w-auto py-3 px-8 bg-[#5C061E] hover:bg-[#740a28] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>View on Customer Schedule ({selectedCourse.shortCode})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* MAIN FORM VIEW */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Form Nav Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50/70 p-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('create')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'create'
                    ? 'bg-[#5C061E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Create Weekly Batch</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('manage')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'manage'
                    ? 'bg-[#5C061E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>All Live Batches ({batches.length})</span>
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {activeTab === 'create' ? (
                <form onSubmit={handleCreateCourseSubmit} className="space-y-6">
                  {/* A. COURSE NAME: Dropdown containing ALL available courses */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      A. Course Name <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:border-[#5C061E] focus:ring-2 focus:ring-[#5C061E]/20 focus:outline-none shadow-2xs"
                    >
                      {brands.map((brand) => (
                        <optgroup key={brand.id} label={`${brand.name} Certifications`}>
                          {courses
                            .filter((c) => c.brandId === brand.id)
                            .map((course) => (
                              <option key={course.id} value={course.id}>
                                {course.shortCode} — {course.title}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                    </select>
                    <span className="text-[11px] text-slate-500 mt-1.5 block">
                      Select any accredited course from SAFe, Scrum Alliance, Scrum.org, ICAgile, or Kanban University.
                    </span>
                  </div>

                  {/* B. DATE: Starting date calendar picker */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      B. Starting Date <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:border-[#5C061E] focus:ring-2 focus:ring-[#5C061E]/20 focus:outline-none shadow-2xs"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1.5 block">
                      Select the initial cohort starting date using the calendar picker.
                    </span>
                  </div>

                  {/* C. TIME: Default: 9:00 AM – 5:00 PM, fully editable */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        C. Time <span className="text-slate-500 font-normal font-sans">(Default: 9:00 AM – 5:00 PM)</span>
                      </label>
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setStartTime('9:00 AM');
                            setEndTime('5:00 PM');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                        >
                          9:00 AM – 5:00 PM
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setStartTime('10:00 AM');
                            setEndTime('4:00 PM');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                        >
                          10:00 AM – 4:00 PM
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[11px] text-slate-500 block mb-1 font-semibold">Start Time:</span>
                        <input
                          type="text"
                          required
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          placeholder="9:00 AM"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-[#5C061E] focus:outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block mb-1 font-semibold">End Time:</span>
                        <input
                          type="text"
                          required
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          placeholder="5:00 PM"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-[#5C061E] focus:outline-none"
                        />
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1.5 block">
                      The selected time will appear on the customer-facing course schedule.
                    </span>
                  </div>

                  {/* D. LOCATION & E. PRICE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* D. LOCATION: Dropdown Virtual / In Person */}
                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        D. Location <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value as BatchLocation)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold focus:border-[#5C061E] focus:outline-none shadow-2xs"
                      >
                        <option value="Virtual">Virtual</option>
                        <option value="In Person">In Person</option>
                      </select>
                    </div>

                    {/* E. PRICE: Default $699, fully editable */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          E. Price <span className="text-slate-500 font-normal font-sans">(Default: $699)</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setPrice(699)}
                          className="text-xs text-[#5C061E] hover:underline font-bold cursor-pointer"
                        >
                          Reset to $699
                        </button>
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-slate-500 font-bold">$</span>
                        <input
                          type="number"
                          required
                          min={1}
                          step={1}
                          value={price}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          placeholder="699"
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-bold font-mono focus:border-[#5C061E] focus:outline-none shadow-2xs"
                        />
                      </div>
                    </div>
                  </div>

                  {location === 'In Person' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1.5">
                        In-Person Training Center / Venue Details
                      </label>
                      <input
                        type="text"
                        value={venueDetail}
                        onChange={(e) => setVenueDetail(e.target.value)}
                        placeholder="Aleph Corporate Executive Training Center, Suite 400"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:border-[#5C061E] focus:outline-none"
                      />
                    </div>
                  )}

                  {/* F. RECURRING: 1, 2, 3, 4 (Weekly logic) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      F. Recurring <span className="text-slate-500 font-normal font-sans">(Number of weekly batches to create)</span>
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {([1, 2, 3, 4] as const).map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setRecurringCount(count)}
                          className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                            recurringCount === count
                              ? 'bg-[#5C061E] text-white border-[#5C061E] shadow-sm ring-2 ring-[#5C061E]/20'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-lg font-black">{count}</span>
                          <span className="text-[10px] uppercase tracking-wider opacity-85">
                            {count === 1 ? '1 Week' : `${count} Weeks`}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Live Preview of Weekly Batches */}
                    <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <span className="font-bold text-slate-700 block text-xs uppercase tracking-wider">
                        Weekly Batches Automatically Generated ({recurringCount}):
                      </span>
                      <div className="space-y-2">
                        {previewDates.map((dateStr, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-700 text-xs font-medium bg-white p-3 rounded-lg border border-slate-200 shadow-2xs gap-1"
                          >
                            <span className="font-bold text-slate-900 text-sm">
                              {idx + 1}. {selectedCourse.shortCode} — {dateStr}
                            </span>
                            <span className="text-slate-500 font-mono text-xs">
                              {startTime} – {endTime} · {location} · <strong className="text-emerald-700 font-bold">${price}</strong>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* G. CREATE COURSE BUTTON */}
                  <div className="pt-4 border-t border-slate-200">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-[#5C061E] hover:bg-[#740a28] active:bg-[#440416] text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <CalendarPlus className="w-5 h-5 text-slate-200" />
                      <span>CREATE COURSE</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* MANAGE BATCHES TAB */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        All Live Batches on Customer Site ({batches.length})
                      </h3>
                      <p className="text-xs text-slate-500">
                        These batches appear on the customer-facing schedule and can be booked directly.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('create')}
                      className="py-2 px-3 bg-[#5C061E] text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Schedule New Course
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                    {batches.map((batch) => (
                      <div
                        key={batch.id}
                        className="p-4 border border-slate-200 rounded-xl bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block text-sm">
                            {batch.courseTitle}
                          </span>
                          <span className="text-xs text-slate-500 block mt-0.5">
                            {batch.date} · {batch.startTime}–{batch.endTime} · {batch.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 self-end sm:self-auto">
                          <span className="font-mono font-bold text-slate-900 text-sm bg-slate-100 px-2.5 py-1 rounded">
                            ${batch.price}
                          </span>
                          <button
                            onClick={() => deleteBatch(batch.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Batch"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
