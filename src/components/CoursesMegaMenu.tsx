import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrandId } from '../types';
import { CalendarPlus, ChevronRight, Sparkles } from 'lucide-react';

interface CoursesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoursesMegaMenu: React.FC<CoursesMegaMenuProps> = ({ isOpen, onClose }) => {
  const { brands, courses, navigateTo, openCreateCourse, isAdminAuthorized } = useApp();
  const [activeBrandTab, setActiveBrandTab] = useState<BrandId>('safe');

  if (!isOpen) return null;

  const activeBrand = brands.find((b) => b.id === activeBrandTab) || brands[0];
  const brandCourses = courses.filter((c) => c.brandId === activeBrandTab);

  const handleBrandSelect = (brandId: BrandId) => {
    setActiveBrandTab(brandId);
  };

  const handleOpenBrandPage = (brandId: BrandId) => {
    navigateTo('brand', { brandId });
    onClose();
  };

  const handleSelectCourse = (brandId: BrandId, courseId: string) => {
    navigateTo('course', { brandId, courseId });
    onClose();
  };

  const handleCreateCourseClick = () => {
    onClose();
    openCreateCourse();
  };

  return (
    <div
      className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Header inside dropdown */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 uppercase tracking-wider">Accredited Certifications</span>
            <span aria-hidden="true">·</span>
            <span>Select a certification brand or explore specific courses</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigateTo('courses-overview');
                onClose();
              }}
              className="text-[#5C061E] hover:text-[#740a28] font-bold transition-colors cursor-pointer"
            >
              View All Courses Catalog →
            </button>
          </div>
        </div>

        {/* 2-Column Mega Menu Body */}
        <div className="grid grid-cols-12 gap-6 pt-4">
          {/* Brand Selector Sidebar (Column 1) */}
          <div className="col-span-12 md:col-span-4 border-r border-slate-100 pr-4 space-y-1.5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Certification Brands
            </p>
            {brands.map((brand) => {
              const count = courses.filter((c) => c.brandId === brand.id).length;
              const isSelected = activeBrandTab === brand.id;
              return (
                <div
                  key={brand.id}
                  onMouseEnter={() => handleBrandSelect(brand.id)}
                  onClick={() => handleBrandSelect(brand.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#5C061E] text-white font-semibold shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isSelected ? 'bg-white' : 'bg-slate-300'
                      }`}
                    />
                    <span className="truncate">{brand.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 text-xs">
                    <span className={isSelected ? 'text-slate-200' : 'text-slate-400'}>
                      {count} {count === 1 ? 'course' : 'courses'}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}

            {/* View Full Brand Page Link */}
            <div className="pt-3 px-3">
              <button
                onClick={() => handleOpenBrandPage(activeBrand.id)}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-left flex items-center justify-between cursor-pointer"
              >
                <span>Go to {activeBrand.name} Brand Page</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Courses List for Selected Brand (Column 2) */}
          <div className="col-span-12 md:col-span-8 pl-2">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-base font-bold text-slate-900">{activeBrand.name} Courses</h4>
                <p className="text-xs text-slate-500 mt-0.5">{activeBrand.tagline}</p>
              </div>
              <button
                onClick={() => handleOpenBrandPage(activeBrand.id)}
                className="text-xs text-[#5C061E] hover:text-[#740a28] font-bold cursor-pointer"
              >
                Explore Brand Details →
              </button>
            </div>

            {/* Scrollable Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {brandCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleSelectCourse(course.brandId, course.id)}
                  className="p-3 border border-slate-200/80 rounded-xl hover:border-[#5C061E]/50 hover:bg-slate-50 transition-all cursor-pointer group text-left"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-[#5C061E] tracking-wide font-mono">
                      {course.shortCode}
                    </span>
                    <span className="text-xs font-black text-slate-900 tabular-nums">
                      ${course.currentPrice}
                    </span>
                  </div>
                  <h5 className="text-sm font-semibold text-slate-900 group-hover:text-[#5C061E] transition-colors mt-1 line-clamp-1">
                    {course.title}
                  </h5>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {course.subTitle || course.description}
                  </p>
                  <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span>{course.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.pdus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
