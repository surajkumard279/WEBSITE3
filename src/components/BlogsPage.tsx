import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BLOG_POSTS, BlogPost } from '../data/blogsData';
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  Tag,
  BookOpen,
  Search,
  CheckCircle2,
  ChevronRight,
  Share2,
  Award,
  Sparkles,
  ArrowLeft,
  Filter,
} from 'lucide-react';

export const BlogsPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Categories list
  const categories = useMemo(() => {
    const unique = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));
    return ['All', ...unique];
  }, []);

  // Filtered blogs
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const selectedPost = useMemo(() => {
    if (!selectedPostId) return null;
    return BLOG_POSTS.find((p) => p.id === selectedPostId) || null;
  }, [selectedPostId]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Banner with Maroon #5C061E Background & White/Light-Grey Text */}
      <div
        className="text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#440416] relative overflow-hidden"
        style={{ backgroundColor: '#5C061E' }}
      >
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blog-hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blog-hero-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-white font-medium">Blogs & Insights</span>
            {selectedPost && (
              <>
                <span>/</span>
                <span className="text-slate-300 truncate max-w-xs">{selectedPost.title}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-serif leading-tight">
            Insights & Certification Research
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            In-depth academic analyses, executive scaling architectures, exam strategies, and flow metric research authored by licensed SPCTs, CSTs, PSTs, and Enterprise Fellows.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {selectedPost ? (
          /* =========================================================================
             SINGLE BLOG POST DETAILED LENGTHY READER VIEW
             ========================================================================= */
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Back button */}
            <button
              onClick={() => {
                setSelectedPostId(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#5C061E] hover:text-[#740a28] bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Articles ({BLOG_POSTS.length})</span>
            </button>

            {/* Article Card */}
            <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xs space-y-8">
              {/* Header Info */}
              <div className="space-y-4 border-b border-slate-100 pb-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-[#5C061E]/10 text-[#5C061E] font-bold text-xs rounded-lg uppercase tracking-wider">
                    {selectedPost.category}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {selectedPost.readTime}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {selectedPost.date}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-serif leading-tight">
                  {selectedPost.title}
                </h1>

                {/* Author Card */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-12 h-12 rounded-full bg-[#5C061E] text-white flex items-center justify-center font-bold text-base shadow-sm">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{selectedPost.author}</h4>
                    <p className="text-xs text-slate-500">{selectedPost.authorRole}</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic border-l-4 border-[#5C061E] pl-4 py-1 bg-slate-50 rounded-r-xl">
                  {selectedPost.summary}
                </p>
              </div>

              {/* Key Takeaways Callout */}
              <div className="bg-[#5C061E]/5 border border-[#5C061E]/20 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#5C061E] uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#5C061E]" />
                  <span>Executive Key Takeaways</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {selectedPost.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#5C061E] font-bold shrink-0">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Subsections (Extensive lengthy content) */}
              <div className="space-y-8 pt-2">
                {selectedPost.sections.map((section, idx) => (
                  <section key={idx} className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                      {section.heading}
                    </h2>
                    <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                      {section.content.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Topics:
                </span>
                {selectedPost.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Author Bio Box */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  About the Author
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  {selectedPost.author} — {selectedPost.authorRole}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedPost.authorBio}
                </p>
              </div>

              {/* Related Certification Course CTA Banner */}
              <div
                className="p-6 sm:p-8 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md"
                style={{ backgroundColor: '#5C061E' }}
              >
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    Accredited Certification Path
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Advance your credentials in {selectedPost.relatedCourseCode}
                  </h3>
                  <p className="text-xs text-slate-200 max-w-md">
                    Guaranteed scheduled batches with 100% exam pass guarantee, study guides, and vouchers included.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('courses-overview')}
                  className="py-3 px-5 bg-white hover:bg-slate-100 text-[#5C061E] font-black text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm"
                >
                  Browse Course Batches →
                </button>
              </div>
            </article>
          </div>
        ) : (
          /* =========================================================================
             BLOGS LISTING GRID (Minimum 10 Blogs - 12 Available)
             ========================================================================= */
          <div className="space-y-8">
            {/* Search and Category Filter Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles by title, topic, framework, author..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E] font-medium"
                  />
                </div>

                <div className="text-xs text-slate-500 font-semibold shrink-0">
                  Showing <strong className="text-slate-900">{filteredPosts.length}</strong> of{' '}
                  {BLOG_POSTS.length} In-Depth Articles
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {categories.map((cat) => {
                  const isSelected = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#5C061E] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setSelectedPostId(post.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-[#5C061E]/60 p-6 sm:p-7 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#5C061E] uppercase tracking-wider bg-[#5C061E]/10 px-2.5 py-0.5 rounded-md">
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#5C061E] transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#5C061E] text-white flex items-center justify-center font-bold text-[10px]">
                        {post.author.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-800">{post.author}</span>
                    </div>

                    <span className="text-[#5C061E] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read Full Guide →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
