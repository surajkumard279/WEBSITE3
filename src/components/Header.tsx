import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CoursesMegaMenu } from './CoursesMegaMenu';
import { ShoppingBag, ChevronDown, Menu, X, CalendarPlus, User, LogOut, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    cartItemCount,
    cartTotal,
    openCreateCourse,
    isAdminAuthorized,
    brands,
    courses,
    currentUser,
    openLogin,
    logoutUser,
  } = useApp();

  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCoursesExpanded, setMobileCoursesExpanded] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCoursesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'HOME', page: 'home' as const },
    { name: 'COURSES', isCourses: true },
    { name: 'BLOGS', page: 'blogs' as const },
    { name: 'ABOUT US', page: 'about' as const },
    { name: 'FAQ', page: 'faq' as const },
    { name: 'CONTACT US', page: 'contact' as const },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#5C061E] border-b border-[#440416] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Title (White Logo & Text with light grey accent) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="text-left group cursor-pointer"
            >
              <span className="text-2xl font-black tracking-tight text-white block font-serif group-hover:text-slate-100 transition-colors">
                ALEPH TECHNOLOGIES
              </span>
            </button>
          </div>

          {/* Zone 2: Main Navigation Menu (ONLY: HOME, COURSES, BLOGS, ABOUT US, FAQ, CONTACT US) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wider text-white">
            {navLinks.map((link) => {
              if (link.isCourses) {
                const isActive =
                  currentPage === 'courses-overview' ||
                  currentPage === 'brand' ||
                  currentPage === 'course' ||
                  currentPage === 'browse';

                return (
                  <div
                    key="courses-dropdown-wrapper"
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setIsCoursesOpen(true)}
                  >
                    <button
                      onClick={() => {
                        setIsCoursesOpen((prev) => !prev);
                        if (!isCoursesOpen) navigateTo('courses-overview');
                      }}
                      className={`flex items-center gap-1.5 py-2 transition-colors cursor-pointer hover:text-slate-200 ${
                        isActive ? 'text-white font-bold border-b-2 border-white -mb-[2px]' : 'text-slate-100'
                      }`}
                    >
                      <span>COURSES</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isCoursesOpen ? 'rotate-180 text-white' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  </div>
                );
              }

              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    setIsCoursesOpen(false);
                    navigateTo(link.page!);
                  }}
                  className={`py-2 transition-colors cursor-pointer hover:text-slate-200 whitespace-nowrap ${
                    isActive ? 'text-white font-bold border-b-2 border-white -mb-[2px]' : 'text-slate-100'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}

            {/* ONLY VISIBLE TO LOGGED IN ADMIN (TRAINING@ALEPHTECHNOLOGIES.IN) */}
            {isAdminAuthorized && (
              <button
                onClick={() => {
                  setIsCoursesOpen(false);
                  openCreateCourse();
                }}
                className="py-1.5 px-3 bg-white hover:bg-slate-100 text-[#5C061E] rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0 active:scale-95"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-[#5C061E]" />
                <span>CREATE COURSE</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Primary Action (Login / Register & Cart Icon) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* User Login / Register Button (Desktop) */}
            {currentUser ? (
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 py-2 px-3.5 rounded-xl border border-white/25 bg-white/10 hover:bg-white/20 text-white transition-all text-xs font-bold cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-white text-[#5C061E] flex items-center justify-center text-xs font-black">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[110px] truncate">{currentUser.name}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-300 transition-transform ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-900 block truncate">
                        {currentUser.name}
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate">
                        {currentUser.email}
                      </span>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-100 text-[#5C061E] text-[10px] font-bold uppercase tracking-wider">
                        {currentUser.role === 'admin' ? 'Faculty / Admin' : 'Student Learner'}
                      </span>
                    </div>

                    <div className="py-1 text-xs">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigateTo('student-profile');
                        }}
                        className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>My Student Profile</span>
                      </button>

                      {(currentUser.role === 'admin' || isAdminAuthorized) && (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            openCreateCourse();
                          }}
                          className="w-full text-left px-4 py-2 text-[#5C061E] font-bold hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                        >
                          <CalendarPlus className="w-4 h-4 text-[#5C061E]" />
                          <span>CREATE COURSE (Admin)</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigateTo('cart');
                        }}
                        className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <ShoppingBag className="w-4 h-4 text-slate-400" />
                        <span>Cart & Checkout</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logoutUser();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openLogin}
                className="flex items-center gap-2 py-2 px-3.5 sm:px-4 rounded-xl bg-white hover:bg-slate-100 text-[#5C061E] font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-95"
                title="Student & Faculty Login or Register"
              >
                <User className="w-4 h-4 text-[#5C061E] shrink-0" />
                <span>LOGIN / REGISTER</span>
              </button>
            )}

            {/* Shopping Cart Button */}
            <button
              onClick={() => navigateTo('cart')}
              className="relative p-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 transition-all flex items-center gap-2.5 text-white cursor-pointer shadow-xs"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#5C061E] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Cart</span>
                <span className="text-xs font-bold text-white tabular-nums">
                  ${cartTotal.toLocaleString()}
                </span>
              </div>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu for Courses */}
      <CoursesMegaMenu
        isOpen={isCoursesOpen}
        onClose={() => setIsCoursesOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#440416] border-b border-[#30020e] shadow-xl max-h-[85vh] overflow-y-auto text-white">
          <div className="px-4 pt-3 pb-6 space-y-3">
            {/* Mobile LOGIN / REGISTER Button */}
            <div className="pb-3 border-b border-white/20">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="bg-[#5C061E] p-3 rounded-xl border border-white/25 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white text-[#5C061E] font-bold flex items-center justify-center text-xs">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{currentUser.name}</span>
                        <span className="text-[10px] text-slate-300 block">{currentUser.email}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logoutUser();
                      }}
                      className="text-[11px] text-rose-300 hover:text-white underline cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigateTo('student-profile');
                      }}
                      className="py-2.5 px-3 bg-white text-[#5C061E] rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-[#5C061E]" />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigateTo('cart');
                      }}
                      className="py-2.5 px-3 bg-white/15 border border-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Cart & Checkout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openLogin();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-white text-[#5C061E] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer hover:bg-slate-100"
                >
                  <User className="w-4 h-4 text-[#5C061E]" />
                  <span>LOGIN / REGISTER</span>
                </button>
              )}
            </div>
            {/* HOME */}
            <button
              onClick={() => {
                navigateTo('home');
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2.5 px-3 text-sm font-semibold rounded-lg ${
                currentPage === 'home' ? 'bg-[#5C061E] text-white' : 'text-slate-200'
              }`}
            >
              HOME
            </button>

            {/* COURSES Expandable */}
            <div className="border border-white/15 rounded-lg overflow-hidden">
              <button
                onClick={() => setMobileCoursesExpanded(!mobileCoursesExpanded)}
                className="flex items-center justify-between w-full py-2.5 px-3 text-sm font-semibold text-white bg-[#5C061E]"
              >
                <span>COURSES</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileCoursesExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileCoursesExpanded && (
                <div className="p-3 bg-[#380312] space-y-4">
                  {brands.map((brand) => (
                    <div key={brand.id} className="space-y-1">
                      <div
                        onClick={() => {
                          navigateTo('brand', { brandId: brand.id });
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-xs font-bold text-white flex items-center justify-between py-1 cursor-pointer"
                      >
                        <span>{brand.name}</span>
                        <span className="text-[10px] text-slate-300">View Brand →</span>
                      </div>
                      <div className="pl-2 space-y-1 border-l border-white/20">
                        {courses
                          .filter((c) => c.brandId === brand.id)
                          .map((c) => (
                            <button
                              key={c.id}
                              onClick={() => {
                                navigateTo('course', { brandId: brand.id, courseId: c.id });
                                setIsMobileMenuOpen(false);
                              }}
                              className="block w-full text-left text-xs py-1 text-slate-300 hover:text-white truncate"
                            >
                              {c.title}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}

                  {/* Mobile Admin Create Course Option (Only if Logged in as Admin) */}
                  {isAdminAuthorized && (
                    <div className="pt-3 border-t border-white/15">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          openCreateCourse();
                        }}
                        className="w-full py-2 px-3 bg-white text-[#5C061E] rounded-lg text-xs font-black flex items-center justify-center gap-2 border border-white/20 shadow-sm"
                      >
                        <CalendarPlus className="w-4 h-4 text-[#5C061E]" />
                        <span>CREATE COURSE (ADMIN)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* BLOGS */}
            <button
              onClick={() => {
                navigateTo('blogs');
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2.5 px-3 text-sm font-semibold rounded-lg ${
                currentPage === 'blogs' ? 'bg-[#5C061E] text-white' : 'text-slate-200'
              }`}
            >
              BLOGS
            </button>

            {/* ABOUT US */}
            <button
              onClick={() => {
                navigateTo('about');
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2.5 px-3 text-sm font-semibold rounded-lg ${
                currentPage === 'about' ? 'bg-[#5C061E] text-white' : 'text-slate-200'
              }`}
            >
              ABOUT US
            </button>

            {/* FAQ */}
            <button
              onClick={() => {
                navigateTo('faq');
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2.5 px-3 text-sm font-semibold rounded-lg ${
                currentPage === 'faq' ? 'bg-[#5C061E] text-white' : 'text-slate-200'
              }`}
            >
              FAQ
            </button>

            {/* CONTACT US */}
            <button
              onClick={() => {
                navigateTo('contact');
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2.5 px-3 text-sm font-semibold rounded-lg ${
                currentPage === 'contact' ? 'bg-[#5C061E] text-white' : 'text-slate-200'
              }`}
            >
              CONTACT US
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
