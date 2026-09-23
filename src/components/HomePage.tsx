import React from 'react';
import { useApp } from '../context/AppContext';
import { CourseBanner } from './CourseBanner';
import { BLOG_POSTS } from '../data/blogsData';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Users,
  Building,
  TrendingUp,
  Laptop,
  BookOpen,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { brands, courses, navigateTo, getCourseDisplayPrice } = useApp();

  // Highlighted marquee courses
  const featuredCourseIds = [
    'safe-ssm',
    'scrum-csm',
    'scrumorg-psm',
    'safe-popm',
    'icagile-icp-acc',
    'kanban-kmp1',
  ];

  const featuredCourses = courses.filter((c) => featuredCourseIds.includes(c.id));
  const recentBlogs = BLOG_POSTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. HERO SECTION with Maroon #5C061E Background & White/Light Grey Styling */}
      <section
        className="relative overflow-hidden text-white py-20 lg:py-28 border-b border-[#440416]"
        style={{ backgroundColor: '#5C061E' }}
      >
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="home-hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-hero-pattern)" />
          </svg>
        </div>

        {/* Ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-3xl space-y-6">
            {/* Accreditation Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-slate-200 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-bold text-white tracking-wide">Global Accreditation</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="text-slate-200">SAFe · Scrum Alliance · Scrum.org · ICAgile · Kanban</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-serif leading-tight">
              Enterprise Agile & Certification Academy
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
              Accelerate your leadership and technical agility with globally certified credentials. Guaranteed batch dates, official examination vouchers included, and experiential workshops led strictly by SPCTs, CSTs, and PSTs.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => navigateTo('courses-overview')}
                className="py-4 px-8 bg-white hover:bg-slate-100 text-[#5C061E] font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>Explore All Certifications</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTo('browse', { brandId: 'safe', courseId: 'safe-ssm' })}
                className="py-4 px-8 bg-[#440416] hover:bg-[#340210] text-white border border-white/20 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Calendar className="w-4 h-4 text-slate-200" />
                <span>Browse Schedule</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-white/20 text-left">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono block tabular-nums">
                  99.4%
                </span>
                <span className="text-xs text-slate-300 mt-0.5 block">
                  First-Time Pass Rate
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono block tabular-nums">
                  45,000+
                </span>
                <span className="text-xs text-slate-300 mt-0.5 block">
                  Graduated Alumni
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono block tabular-nums">
                  100%
                </span>
                <span className="text-xs text-slate-300 mt-0.5 block">
                  Guaranteed Batches
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono block tabular-nums">
                  $699
                </span>
                <span className="text-xs text-slate-300 mt-0.5 block">
                  Default Course Tuition
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ACCREDITED CERTIFICATION BRANDS SHOWCASE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5C061E] block">
            Accreditation Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif">
            Five Premier Global Certification Bodies
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Select any brand to explore accredited curricula, syllabus, and examination requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => {
            const count = courses.filter((c) => c.brandId === brand.id).length;
            return (
              <div
                key={brand.id}
                onClick={() => navigateTo('brand', { brandId: brand.id })}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#5C061E]/50 p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-sm font-extrabold text-[#5C061E] tracking-wide font-mono px-3 py-1 bg-[#5C061E]/10 rounded-lg group-hover:bg-[#5C061E] group-hover:text-white transition-colors">
                      {brand.name}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {count} Courses
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#5C061E] transition-colors">
                    {brand.tagline}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                    {brand.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#5C061E] group-hover:translate-x-0.5 transition-all">
                  <span>Explore {brand.name} Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED COURSES WITH CUSTOM COURSE BANNERS */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C061E] block">
                Top Rated Enrollments
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif">
                Featured Certification Programs
              </h2>
            </div>
            <button
              onClick={() => navigateTo('courses-overview')}
              className="text-xs font-bold text-[#5C061E] hover:text-[#740a28] flex items-center gap-1 cursor-pointer"
            >
              <span>View All 32 Courses Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => {
              const displayPrice = getCourseDisplayPrice(course.id);
              const brand = brands.find((b) => b.id === course.brandId);

              return (
                <div
                  key={course.id}
                  className="bg-slate-50 rounded-2xl border border-slate-200 hover:border-[#5C061E]/50 p-5 flex flex-col justify-between transition-all group shadow-2xs hover:shadow-md"
                >
                  <div>
                    {/* Course Banner on card (Requirement 3: Banner for each course) */}
                    <div className="mb-4">
                      <CourseBanner course={course} brand={brand!} variant="card" />
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-[#5C061E]">
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
                      className="text-base font-bold text-slate-900 group-hover:text-[#5C061E] transition-colors cursor-pointer line-clamp-2"
                    >
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {course.subTitle || course.description}
                    </p>

                    <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#5C061E]" />
                        <span>{course.pdus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2">
                    <button
                      onClick={() => navigateTo('course', { brandId: course.brandId, courseId: course.id })}
                      className="flex-1 py-2.5 px-3 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer text-center"
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
      </section>

      {/* 4. RECENT BLOGS & INSIGHTS (Highlighting lengthy 12-article knowledge base) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C061E] block">
              Knowledge Repository ({BLOG_POSTS.length} Articles)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif">
              Latest Agile Research & Exam Guides
            </h2>
          </div>
          <button
            onClick={() => navigateTo('blogs')}
            className="text-xs font-bold text-[#5C061E] hover:text-[#740a28] flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All {BLOG_POSTS.length} In-Depth Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigateTo('blogs')}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#5C061E]/50 p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-[#5C061E] uppercase tracking-wider bg-[#5C061E]/10 px-2.5 py-0.5 rounded-md">
                  {blog.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#5C061E] transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {blog.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{blog.readTime}</span>
                <span className="text-[#5C061E] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Article →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ENTERPRISE VALUE & ACCREDITATION STANDARDS */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Institutional Rigor
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-serif leading-tight">
                Why Global Fortune 500 Enterprises Choose ALEPH TECHNOLOGIES
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We do not deliver shallow slide presentations. Every masterclass is an intensive, simulation-driven laboratory designed to transform organizational performance, speed delivery cycles, and pass exams on the first try.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Official Exam Voucher & 100% Pass Assurance</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Your registration fee includes the official examination fee and an immediate second review voucher in the unlikely event you do not pass.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-slate-200 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Guaranteed Schedule Reliability</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Once published on our calendar, your scheduled batch is 100% guaranteed to run. No last-minute cancellations or unexpected postponements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-slate-200 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Enterprise SPCT & CST Faculty</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Taught strictly by accredited Fellows and practitioners who have led digital transformations inside defense, healthcare, and Tier-1 banking.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Proof Card with Maroon Accents */}
            <div
              className="lg:col-span-6 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6 border border-white/10"
              style={{ backgroundColor: '#5C061E' }}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
                Enterprise Outcomes
              </span>
              <h3 className="text-2xl font-bold text-white font-serif">
                Trusted by 45,000+ Agile Practitioners and Tech Leaders
              </h3>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-black/20 border border-white/10">
                  <span className="text-2xl font-black text-white font-mono">+42%</span>
                  <span className="text-xs text-slate-200 block mt-1">
                    Faster Delivery Lead Time
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-black/20 border border-white/10">
                  <span className="text-2xl font-black text-white font-mono">100%</span>
                  <span className="text-xs text-slate-200 block mt-1">
                    Accredited Credentials
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20 text-xs text-slate-200">
                <p className="italic">
                  "ALEPH TECHNOLOGIES' SAFe Scrum Master and Leading SAFe cohorts allowed our 250-person engineering organization to align value streams in less than 90 days. Exceptional trainer caliber."
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-white">David Chen</span>
                  <span className="text-slate-300">VP of Software Engineering, Global FinTech</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
