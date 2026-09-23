import React from 'react';
import { Course, CertificationBrand } from '../types';
import {
  Clock,
  Award,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Layers,
  Cpu,
  Target,
  Users,
  Compass,
  Zap,
} from 'lucide-react';

interface CourseBannerProps {
  course: Course;
  brand: CertificationBrand;
  variant?: 'hero' | 'card';
  scheduledBatchCount?: number;
  onNavigateHome?: () => void;
  onNavigateBrand?: () => void;
}

// Visual theme configurations per brand tailored around requested Maroon #5C061E with crisp white and light grey
const BRAND_THEMES: Record<
  string,
  {
    bgGradient: string;
    accentBadge: string;
    decorIcon: React.ElementType;
    patternType: string;
    subAccent: string;
    codeBg: string;
  }
> = {
  safe: {
    bgGradient: 'from-[#440416] via-[#5C061E] to-[#360311]',
    accentBadge: 'bg-amber-400/20 text-amber-200 border-amber-300/30',
    decorIcon: Layers,
    patternType: 'tracks',
    subAccent: 'text-amber-200',
    codeBg: 'bg-white/10 text-white border-white/20',
  },
  'scrum-alliance': {
    bgGradient: 'from-[#5C061E] via-[#4d0519] to-[#3a0312]',
    accentBadge: 'bg-emerald-400/20 text-emerald-200 border-emerald-300/30',
    decorIcon: Target,
    patternType: 'sprint',
    subAccent: 'text-emerald-200',
    codeBg: 'bg-white/10 text-white border-white/20',
  },
  'scrum-org': {
    bgGradient: 'from-[#3e0414] via-[#5C061E] to-[#4e051a]',
    accentBadge: 'bg-slate-200/20 text-slate-100 border-slate-300/30',
    decorIcon: Cpu,
    patternType: 'empiricism',
    subAccent: 'text-slate-200',
    codeBg: 'bg-white/10 text-white border-white/20',
  },
  icagile: {
    bgGradient: 'from-[#5C061E] via-[#50051a] to-[#380312]',
    accentBadge: 'bg-purple-300/20 text-purple-200 border-purple-300/30',
    decorIcon: Compass,
    patternType: 'coaching',
    subAccent: 'text-purple-200',
    codeBg: 'bg-white/10 text-white border-white/20',
  },
  'kanban-university': {
    bgGradient: 'from-[#490518] via-[#5C061E] to-[#340210]',
    accentBadge: 'bg-teal-300/20 text-teal-200 border-teal-300/30',
    decorIcon: Zap,
    patternType: 'flow',
    subAccent: 'text-teal-200',
    codeBg: 'bg-white/10 text-white border-white/20',
  },
};

export const CourseBanner: React.FC<CourseBannerProps> = ({
  course,
  brand,
  variant = 'hero',
  scheduledBatchCount = 0,
  onNavigateHome,
  onNavigateBrand,
}) => {
  const theme = BRAND_THEMES[course.brandId] || BRAND_THEMES['safe'];
  const DecorIcon = theme.decorIcon;

  // CARD VARIANT (Used on Course Cards in catalogs instead of plain blue)
  if (variant === 'card') {
    return (
      <div
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${theme.bgGradient} p-4 text-white border border-[#740a28]/40 shadow-sm`}
      >
        {/* Subtle geometric agile background SVG */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={`grid-${course.id}`}
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 24 0 L 0 0 0 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${course.id})`} />
          </svg>
        </div>

        {/* Decorative background ambient glow */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between gap-2">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block">
              {brand.name}
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/15 border border-white/20 backdrop-blur-sm text-xs font-mono font-bold text-white">
              <DecorIcon className="w-3 h-3 text-slate-200" />
              <span>{course.shortCode}</span>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/30 text-slate-200 border border-white/10">
            {course.duration}
          </span>
        </div>
      </div>
    );
  }

  // HERO VARIANT (Expansive, rich course header on CoursePage.tsx)
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-r ${theme.bgGradient} text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#440416]`}
      style={{ backgroundColor: '#5C061E' }}
    >
      {/* Intricate Geometric Agile Background Pattern */}
      <div className="absolute inset-0 opacity-12 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={`hero-grid-${course.id}`}
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="18" cy="18" r="1" fill="#FFFFFF" />
              <path
                d="M 36 0 L 0 0 0 36"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="0.5"
                strokeDasharray="2,4"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#hero-grid-${course.id})`}
          />
        </svg>
      </div>

      {/* Radiant Executive Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-80 h-80 bg-black/25 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-5">
          <button
            onClick={onNavigateHome}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={onNavigateBrand}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {brand.name}
          </button>
          <span>/</span>
          <span className="text-white font-medium">{course.shortCode}</span>
        </div>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-lg border border-white/25 text-xs font-bold tracking-wider text-white flex items-center gap-1.5">
            <DecorIcon className="w-3.5 h-3.5 text-slate-200" />
            <span>{brand.name} Authorized</span>
          </span>

          <span className="px-2.5 py-1 bg-black/30 border border-white/20 rounded-lg text-xs font-mono font-bold text-white">
            Code: {course.shortCode}
          </span>

          <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 rounded-lg text-xs font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            Guaranteed Batch Execution
          </span>
        </div>

        {/* Course Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-serif max-w-4xl leading-tight">
          {course.title}
        </h1>

        {/* Subtitle / Description */}
        <p className="text-base sm:text-lg text-slate-200 mt-3 max-w-3xl leading-relaxed">
          {course.subTitle || course.description}
        </p>

        {/* Key Metrics Bar */}
        <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-200 border-t border-white/20 pt-5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-300" />
            <span>
              Duration: <strong className="text-white">{course.duration}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-slate-300" />
            <span>
              Credits: <strong className="text-white">{course.pdus}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-300" />
            <span>Official Exam & Retake Voucher Included</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-300" />
            <span>
              <strong className="text-white font-mono">{scheduledBatchCount}</strong>{' '}
              Batches Scheduled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
