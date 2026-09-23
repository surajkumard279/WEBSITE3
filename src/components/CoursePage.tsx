import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseBanner } from './CourseBanner';
import {
  Award,
  CheckCircle2,
  Clock,
  Users,
  FileCheck,
  Calendar,
  ShieldCheck,
  Zap,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Building,
  Check,
} from 'lucide-react';

export const CoursePage: React.FC = () => {
  const {
    selectedCourseId,
    getCourse,
    getBrand,
    navigateTo,
    getCourseDisplayPrice,
    getBatchesForCourse,
  } = useApp();

  const course = getCourse(selectedCourseId || 'safe-ssm') || getCourse('safe-ssm')!;
  const brand = getBrand(course.brandId) || getBrand('safe')!;
  const displayPrice = getCourseDisplayPrice(course.id);
  const scheduledBatches = getBatchesForCourse(course.id);

  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'certification' | 'audience'>('overview');

  const handleBrowseClick = () => {
    navigateTo('browse', { brandId: course.brandId, courseId: course.id });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Custom Distinctive Course Banner (Requirement 3: Banner for each course instead of blue colour) */}
      <CourseBanner
        course={course}
        brand={brand}
        variant="hero"
        scheduledBatchCount={scheduledBatches.length}
        onNavigateHome={() => navigateTo('home')}
        onNavigateBrand={() => navigateTo('brand', { brandId: brand.id })}
      />

      {/* Main Course Layout: 2 Columns (Course Info Left | Configured Price & BROWSE Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: Course Information, Overview, Learning Objectives, Certification Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
              {[
                { id: 'overview', label: 'Course Overview' },
                { id: 'syllabus', label: 'Curriculum & Modules' },
                { id: 'certification', label: 'Certification & Exam' },
                { id: 'audience', label: 'Target Audience' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-4 text-xs font-bold rounded-t-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-[#5C061E] text-[#5C061E] bg-white shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">Course Description</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">Comprehensive Overview</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {course.overview}
                  </p>
                </div>

                {/* Learning Objectives */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    Key Learning Objectives
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {course.learningObjectives.map((obj, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 font-medium"
                      >
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Details Cards */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Prerequisites
                    </span>
                    <p className="text-xs text-slate-700 mt-1 font-medium leading-relaxed">
                      {course.prerequisites}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Professional Development Units
                    </span>
                    <p className="text-xs text-slate-700 mt-1 font-medium leading-relaxed">
                      {course.pdus} (PMI PDU / Scrum Alliance SEU claimable)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SYLLABUS */}
            {activeTab === 'syllabus' && (
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Course Syllabus & Curriculum</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Structured enterprise agile learning delivered across {course.duration}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                    Official Courseware
                  </span>
                </div>

                <div className="space-y-4">
                  {course.syllabus.map((item, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                      <div className="bg-slate-50 px-4 py-3 font-semibold text-xs text-slate-900 border-b border-slate-200 flex items-center justify-between">
                        <span>{item.module}</span>
                        <span className="text-[11px] text-slate-500">Classroom Hands-on</span>
                      </div>
                      <div className="p-4 bg-white">
                        <ul className="space-y-2">
                          {item.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: CERTIFICATION & EXAM */}
            {activeTab === 'certification' && (
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Certification & Assessment Details</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Official accreditation provided directly by {brand.name}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-400 font-semibold block uppercase">Official Exam Name</span>
                    <span className="text-sm font-bold text-slate-900 mt-1 block">
                      {course.certificationDetails.examName}
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-400 font-semibold block uppercase">Credential Awarded</span>
                    <span className="text-sm font-bold text-slate-900 mt-1 block">
                      {course.certificationDetails.credentialTitle}
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-400 font-semibold block uppercase">Format & Length</span>
                    <span className="text-sm font-bold text-slate-900 mt-1 block">
                      {course.certificationDetails.format} ({course.certificationDetails.duration})
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-xs text-slate-400 font-semibold block uppercase">Passing Score</span>
                    <span className="text-sm font-bold text-slate-900 mt-1 block text-emerald-700">
                      {course.certificationDetails.passingScore}
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 sm:col-span-2">
                    <span className="text-xs text-slate-400 font-semibold block uppercase">Credential Validity</span>
                    <span className="text-sm font-bold text-slate-900 mt-1 block">
                      {course.certificationDetails.validity}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    Pass Assurance & Retake Policy
                  </div>
                  <p className="leading-relaxed text-blue-800">
                    We maintain an audited 99.4% first-time pass rate. In the rare event you need another attempt, your enrollment includes personalized instructor review and guidance.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: TARGET AUDIENCE */}
            {activeTab === 'audience' && (
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Who Should Attend This Program</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Tailored for professionals driving value in modern enterprise environments
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.targetAudience.map((role, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800"
                    >
                      <Users className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-slate-100 rounded-lg text-xs text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-900">Corporate & Group Teams: </span>
                  Teams of 5 or more receive dedicated private cohort scheduling, customized domain case studies, and corporate invoice billing.
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: COURSE PRICE & BROWSE BUTTON
              Exact prompt requirement:
              "On the RIGHT SIDE of the course information, show the course price.
               DEFAULT PRICE: The default price for EVERY course is: $699.
               This $699 is only the DEFAULT price.
               The administrator must be able to change the price from the CREATE COURSE form in Point 10.
               Below the price show: BROWSE button.
               The price displayed on the course page and scheduled course must reflect the price configured by the administrator." */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-xl border-2 border-slate-900 p-6 sm:p-8 shadow-lg">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Course Enrollment
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  Active Registration
                </span>
              </div>

              {/* Course Price */}
              <div className="py-6">
                <span className="text-xs text-slate-500 font-medium block">Tuition / Registration Fee</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tabular-nums font-mono">
                    ${displayPrice}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">USD / Attendee</span>
                </div>
                {displayPrice === 699 ? (
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Standard Course Pricing ($699 default)
                  </span>
                ) : (
                  <span className="text-[11px] text-[#5C061E] font-bold mt-1 block">
                    Administrator Configured Batch Pricing
                  </span>
                )}
              </div>

              {/* BROWSE BUTTON (Requirement: Maroon background, white text) */}
              <div className="space-y-3">
                <button
                  onClick={handleBrowseClick}
                  className="w-full py-4 px-6 bg-[#5C061E] hover:bg-[#740a28] active:bg-[#440416] text-white font-extrabold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <Calendar className="w-5 h-5" />
                  <span>BROWSE</span>
                </button>
                <p className="text-center text-xs text-slate-500">
                  Click to view {scheduledBatches.length} scheduled batch {scheduledBatches.length === 1 ? 'date' : 'dates'}
                </p>
              </div>

              {/* Inclusions List */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Official courseware & accredited digital workbook</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Official examination fee & voucher included</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Interactive cohort led by Certified Master Trainer</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Earn {course.pdus} professional development units</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full 100% exam pass guarantee with retake review</span>
                </div>
              </div>

              {/* Corporate Inquiries Notice */}
              <div className="mt-6 p-3 bg-slate-50 rounded-lg text-center border border-slate-100">
                <span className="text-[11px] text-slate-500 block">
                  Need private team training for 10+ seats?
                </span>
                <button
                  onClick={() => navigateTo('contact')}
                  className="text-xs font-bold text-[#5C061E] hover:underline mt-0.5 block mx-auto cursor-pointer"
                >
                  Request Enterprise Custom Quote →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
