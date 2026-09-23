import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrandId } from '../types';
import { CourseBanner } from './CourseBanner';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  BookOpen,
  CalendarPlus,
} from 'lucide-react';

export const CoursesOverviewPage: React.FC = () => {
  const { brands, courses, navigateTo, getCourseDisplayPrice, openCreateCourse, isAdminAuthorized } = useApp();
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((course) => {
    const matchesBrand =
      selectedBrandFilter === 'all' || course.brandId === selectedBrandFilter;
    const matchesQuery =
      searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Banner with Maroon #5C061E Background & White/Light Grey Text */}
      <div
        className="text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#440416] relative overflow-hidden"
        style={{ backgroundColor: '#5C061E' }}
      >
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-white font-medium">Courses Catalog</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-serif">
                All Accredited Certification Courses
              </h1>
              <p className="text-sm text-slate-200 max-w-2xl leading-relaxed mt-1">
                Browse our comprehensive curriculum across SAFe, Scrum Alliance, Scrum.org, ICAgile, and Kanban University.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by course title, code (e.g. SSM, CSM, PSM, ICP-ACC)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E] font-medium"
              />
            </div>

            {/* Results Count */}
            <div className="text-xs text-slate-500 shrink-0 font-medium">
              Showing <strong className="text-slate-900">{filteredCourses.length}</strong> of {courses.length} courses
            </div>
          </div>

          {/* Brand Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedBrandFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedBrandFilter === 'all'
                  ? 'bg-[#5C061E] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Brands ({courses.length})
            </button>
            {brands.map((brand) => {
              const count = courses.filter((c) => c.brandId === brand.id).length;
              return (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrandFilter(brand.id)}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedBrandFilter === brand.id
                      ? 'bg-[#5C061E] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {brand.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const displayPrice = getCourseDisplayPrice(course.id);
            const brand = brands.find((b) => b.id === course.brandId);

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#5C061E]/50 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Custom Course Banner Preview at Card Header */}
                  <div className="mb-4">
                    <CourseBanner course={course} brand={brand!} variant="card" />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      onClick={() => navigateTo('brand', { brandId: course.brandId })}
                      className="text-[11px] font-bold text-[#5C061E] hover:underline cursor-pointer"
                    >
                      {brand?.name}
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
                    className="text-base font-bold text-slate-900 group-hover:text-[#5C061E] transition-colors cursor-pointer line-clamp-2 leading-snug"
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
  );
};

