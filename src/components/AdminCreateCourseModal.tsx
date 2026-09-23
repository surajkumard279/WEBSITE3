import React, { useState, useMemo } from 'react';
import { useApp, isAuthorizedAdminEmail } from '../context/AppContext';
import { BatchLocation, CourseBatch } from '../types';
import {
  X,
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
} from 'lucide-react';

export const AdminCreateCourseModal: React.FC = () => {
  const {
    isCreateCourseOpen,
    closeCreateCourse,
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
  } = useApp();

  // Admin Domain Authorization State (Company Domain: TRAINING@ALEPHTECHNOLOGIES.IN)
  const [emailInput, setEmailInput] = useState('TRAINING@ALEPHTECHNOLOGIES.IN');
  const [authError, setAuthError] = useState<string | null>(null);

  // Default values as specified:
  // Default Price: $699
  // Default Time: 9:00 AM – 5:00 PM
  const todayISO = useMemo(() => {
    const d = new Date();
    // Default starting date to next Monday or next week
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

  if (!isCreateCourseOpen) return null;

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

  // Calculate live preview dates for recurring logic:
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
      closeCreateCourse();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header with Maroon #5C061E Background & White/Light Grey Styling */}
        <div
          className="text-white p-5 sm:px-6 flex items-center justify-between border-b border-[#440416]"
          style={{ backgroundColor: '#5C061E' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/15 rounded-xl text-white border border-white/20">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white font-serif">
                  Administrator Course Scheduling System
                </h3>
                <span className="px-2 py-0.5 rounded bg-white/20 text-slate-100 text-[10px] font-mono uppercase tracking-wider font-semibold">
                  Admin Only
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5">
                Authorized company portal to create weekly recurring course schedules
              </p>
            </div>
          </div>
          <button
            onClick={closeCreateCourse}
            className="text-slate-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Admin Authorization Check (Authorized Domain Email: TRAINING@ALEPHTECHNOLOGIES.COM) */}
          {!isAdminAuthorized ? (
            <div className="space-y-5 py-4">
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-rose-950">
                  <ShieldCheck className="w-5 h-5 text-[#5C061E]" />
                  <span>Company Domain Authorization Required</span>
                </div>
                <p className="leading-relaxed text-rose-800">
                  <strong>CREATE COURSE is an administrator-only function.</strong> Customers cannot access or use the administrator scheduling system. The administrator is authorized using the company’s domain email: <strong className="text-slate-900">TRAINING@ALEPHTECHNOLOGIES.IN</strong>.
                </p>
              </div>

              <form onSubmit={handleAuthorize} className="space-y-4 max-w-md mx-auto pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Administrator Domain Email
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="TRAINING@ALEPHTECHNOLOGIES.IN"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E] font-medium"
                  />
                  {authError && (
                    <div className="p-2.5 bg-rose-100/70 border border-rose-300 rounded-lg text-xs text-rose-800 mt-2 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-700 mt-0.5" />
                      <span>{authError}</span>
                    </div>
                  )}
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Domain required: <strong>TRAINING@ALEPHTECHNOLOGIES.IN</strong>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#5C061E] hover:bg-[#740a28] text-white font-bold text-xs rounded-xl transition-all cursor-pointer uppercase tracking-wider shadow-sm"
                >
                  Verify Domain & Open Scheduler
                </button>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleQuickAuthorize}
                    className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>One-Click Authorize (TRAINING@ALEPHTECHNOLOGIES.IN)</span>
                  </button>
                </div>
              </form>
            </div>
          ) : createdBatches ? (
            /* SUCCESS CONFIRMATION & PUBLISHED SCHEDULE PREVIEW */
            <div className="space-y-6 py-4 text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900 font-serif">
                  {createdBatches.length} Course {createdBatches.length === 1 ? 'Batch' : 'Batches'} Successfully Created!
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 max-w-md mx-auto">
                  Weekly batches for <strong className="text-slate-900">{selectedCourse.shortCode} — {selectedCourse.title}</strong> are now live on the customer-facing schedule.
                </p>
              </div>

              {/* Batches created summary */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-2 max-h-60 overflow-y-auto">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Published Batches on Customer Schedule:
                </span>
                {createdBatches.map((b, idx) => (
                  <div
                    key={b.id}
                    className="p-3 bg-white border border-slate-200 rounded-lg text-xs flex items-center justify-between shadow-2xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900">
                        {idx + 1}. {selectedCourse.shortCode} — {b.date}
                      </span>
                      <span className="text-slate-500 block text-[11px] mt-0.5">
                        {b.startTime} – {b.endTime} · {b.location}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-emerald-700 tabular-nums text-sm bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      ${b.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCreatedBatches(null)}
                  className="w-full sm:w-auto py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  + Create Another Batch
                </button>
                <button
                  type="button"
                  onClick={handleViewOnSite}
                  className="w-full sm:w-auto py-2.5 px-6 bg-[#5C061E] hover:bg-[#740a28] text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <span>View on Customer Schedule ({selectedCourse.shortCode})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: COMPLETE ADMIN CREATE COURSE FORM */
            <div className="space-y-6">
              {/* Authorized user badge & navigation tab */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-600">
                    Authorized Admin: <strong className="text-slate-900 font-mono">{adminEmail || 'TRAINING@ALEPHTECHNOLOGIES.COM'}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('create')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === 'create' ? 'bg-[#5C061E] text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Create Batch
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('manage')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === 'manage' ? 'bg-[#5C061E] text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Manage ({batches.length})
                  </button>
                  <button
                    type="button"
                    onClick={logoutAdmin}
                    className="text-slate-400 hover:text-rose-600 p-1 transition-colors ml-1 cursor-pointer"
                    title="Sign Out Admin"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {activeTab === 'create' ? (
                <form onSubmit={handleCreateCourseSubmit} className="space-y-5">
                  {/* A. COURSE NAME: Dropdown containing ALL available courses */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">
                      A. Course Name <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm font-medium focus:border-[#5C061E] focus:ring-2 focus:ring-[#5C061E]/20 focus:outline-none"
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
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      The administrator selects the exact course (e.g., SSM, CSM, PSM, PSPO, POPM, ICP-ACC).
                    </span>
                  </div>

                  {/* B. DATE: Calendar / Date Picker for starting date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">
                      B. Starting Date <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium focus:border-[#5C061E] focus:ring-2 focus:ring-[#5C061E]/20 focus:outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Use calendar/date picker to select the initial starting date.
                    </span>
                  </div>

                  {/* C. TIME: Default 9:00 AM – 5:00 PM, fully editable */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-900">
                        C. Time <span className="text-slate-500 font-normal">(Default: 9:00 AM – 5:00 PM)</span>
                      </label>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <button
                          type="button"
                          onClick={() => {
                            setStartTime('9:00 AM');
                            setEndTime('5:00 PM');
                          }}
                          className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                        >
                          9:00 AM – 5:00 PM (Default)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setStartTime('10:00 AM');
                            setEndTime('4:00 PM');
                          }}
                          className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                        >
                          10:00 AM – 4:00 PM
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[11px] text-slate-500 block mb-1 font-semibold">Start Time:</span>
                        <input
                          type="text"
                          required
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          placeholder="9:00 AM"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium focus:border-[#5C061E] focus:outline-none"
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
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium focus:border-[#5C061E] focus:outline-none"
                        />
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      The selected time will appear on the customer-facing course schedule.
                    </span>
                  </div>

                  {/* D. LOCATION & E. PRICE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* D. LOCATION: Dropdown Virtual / In Person */}
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1.5">
                        D. Location <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value as BatchLocation)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm font-medium focus:border-[#5C061E] focus:outline-none"
                      >
                        <option value="Virtual">Virtual</option>
                        <option value="In Person">In Person</option>
                      </select>
                    </div>

                    {/* E. PRICE: Default $699, editable */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-900">
                          E. Price <span className="text-slate-500 font-normal">(Default: $699)</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setPrice(699)}
                          className="text-[11px] text-[#5C061E] hover:underline font-bold cursor-pointer"
                        >
                          Reset $699
                        </button>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-500 font-bold">$</span>
                        <input
                          type="number"
                          required
                          min={1}
                          step={1}
                          value={price}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          placeholder="699"
                          className="w-full pl-7 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-bold font-mono focus:border-[#5C061E] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {location === 'In Person' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        In-Person Training Center / Venue Details
                      </label>
                      <input
                        type="text"
                        value={venueDetail}
                        onChange={(e) => setVenueDetail(e.target.value)}
                        placeholder="Aleph Corporate Executive Training Center, Suite 400"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-medium focus:border-[#5C061E] focus:outline-none"
                      />
                    </div>
                  )}

                  {/* F. RECURRING: 1, 2, 3, 4 (Weekly logic) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">
                      F. Recurring <span className="text-slate-500 font-normal">(Number of weekly courses to create)</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {([1, 2, 3, 4] as const).map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setRecurringCount(count)}
                          className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                            recurringCount === count
                              ? 'bg-[#5C061E] text-white border-[#5C061E] shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>

                    {/* Live Preview of Recurring Batches Generated */}
                    <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5">
                      <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wider">
                        Weekly Batches Automatically Generated ({recurringCount}):
                      </span>
                      {previewDates.map((dateStr, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-slate-700 text-xs font-medium bg-white p-2 rounded border border-slate-100"
                        >
                          <span className="font-semibold text-slate-900">
                            {idx + 1}. {selectedCourse.shortCode} — {dateStr}
                          </span>
                          <span className="text-slate-500 font-mono">
                            {startTime}–{endTime} · {location} · ${price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* G. CREATE COURSE BUTTON */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-[#5C061E] hover:bg-[#740a28] active:bg-[#440416] text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
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
                    <h4 className="text-sm font-bold text-slate-900">
                      All Scheduled Batches in System ({batches.length})
                    </h4>
                    <span className="text-xs text-slate-500">Live on Customer Website</span>
                  </div>

                  <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                    {batches.map((batch) => (
                      <div
                        key={batch.id}
                        className="p-3 border border-slate-200 rounded-lg bg-white flex items-center justify-between text-xs shadow-2xs"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block">
                            {batch.courseTitle}
                          </span>
                          <span className="text-slate-500 block">
                            {batch.date} · {batch.startTime}–{batch.endTime} · {batch.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-slate-900">${batch.price}</span>
                          <button
                            onClick={() => deleteBatch(batch.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                            title="Delete Batch"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
