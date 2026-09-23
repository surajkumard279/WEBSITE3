import React from 'react';
import { useApp } from '../context/AppContext';
import { BrandId } from '../types';
import { CourseBanner } from './CourseBanner';
import { Award, CheckCircle, Clock, ShieldCheck, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';

export const BrandPage: React.FC = () => {
  const { selectedBrandId, getBrand, courses, navigateTo, getCourseDisplayPrice } = useApp();

  const brand = getBrand(selectedBrandId || 'safe') || getBrand('safe')!;
  const brandCourses = courses.filter((c) => c.brandId === brand.id);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Brand Hero Banner with Maroon #5C061E Background & White/Light Grey Text */}
      <div
        className="text-white py-16 px-4 sm:px-6 lg:px-8 shadow-inner border-b border-[#440416] relative overflow-hidden"
        style={{ backgroundColor: '#5C061E' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => navigateTo('courses-overview')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Courses
            </button>
            <span>/</span>
            <span className="text-white font-medium">{brand.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              {/* Brand Logo & Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="px-3.5 py-1.5 bg-white/15 backdrop-blur-md rounded-lg border border-white/20 text-white font-bold text-sm tracking-wide">
                  {brand.logoText}
                </div>
                <div className="text-xs font-semibold text-slate-100 bg-white/10 border border-white/20 px-3 py-1 rounded-lg">
                  {brand.badge}
                </div>
                <span className="text-xs text-slate-300">
                  {brand.accreditation}
                </span>
              </div>

              {/* Title & Tagline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-serif">
                {brand.name} Certification Training
              </h1>
              <p className="text-lg text-slate-200 font-normal leading-relaxed max-w-3xl">
                {brand.tagline}
              </p>

              {/* Brand Introduction */}
              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl pt-2">
                {brand.description}
              </p>
            </div>

            {/* Right Card: Certification Summary */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/15">
                <Award className="w-5 h-5 text-slate-200" />
                <h3 className="font-bold text-sm text-white">Official Certification Guarantee</h3>
              </div>

              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span>Includes official exam fee & 100% pass assurance support</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span>Licensed expert trainers with real enterprise transformation leadership</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  <span>Official digital badge, verifiable certificate & community membership</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-300 border-t border-white/15">
                <span className="font-semibold text-white">Exam Format: </span>
                {brand.examInfo}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Details & Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            About {brand.name} Enterprise Certification & Training
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {brand.overview}
          </p>

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Key Learning Outcomes & Inclusions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {brand.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium"
              >
                <CheckCircle className="w-4 h-4 text-[#5C061E] shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Display ALL courses belonging to that brand */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-[#5C061E] uppercase tracking-wider">
                Full Course Catalog
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                All {brand.name} Courses ({brandCourses.length})
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Select any course to view full learning objectives, exam details, syllabus, and browse scheduled batch dates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandCourses.map((course) => {
              const displayPrice = getCourseDisplayPrice(course.id);
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-[#5C061E]/50 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group p-5 shadow-2xs"
                >
                  <div>
                    {/* Course Banner Component */}
                    <div className="mb-4">
                      <CourseBanner course={course} brand={brand} variant="card" />
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-[#5C061E]">
                        {brand.name}
                      </span>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Tuition</span>
                        <span className="text-base font-black text-slate-900 tabular-nums font-mono">
                          ${displayPrice}
                        </span>
                      </div>
                    </div>

                    <h3
                      onClick={() => navigateTo('course', { brandId: course.brandId, courseId: course.id })}
                      className="text-base font-bold text-slate-900 group-hover:text-[#5C061E] transition-colors cursor-pointer line-clamp-2"
                    >
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {course.subTitle || course.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.duration}</span>
                      </div>
                      <span className="font-semibold text-slate-700">{course.pdus}</span>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => navigateTo('course', { brandId: course.brandId, courseId: course.id })}
                      className="flex-1 py-2.5 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => navigateTo('browse', { brandId: course.brandId, courseId: course.id })}
                      className="flex-1 py-2.5 px-3 text-xs font-extrabold text-white bg-[#5C061E] hover:bg-[#740a28] rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-xs uppercase tracking-wider"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>BROWSE</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
