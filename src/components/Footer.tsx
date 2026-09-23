import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, CheckCircle2, Mail, Phone, MapPin, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, brands, openCreateCourse, openLogin, openRegister, isAdminAuthorized } = useApp();

  return (
    <footer
      className="text-white pt-16 pb-12 border-t border-[#440416]"
      style={{ backgroundColor: '#5C061E' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-white/15">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-slate-200 shrink-0 mt-1" />
            <div>
              <h5 className="text-white font-bold text-sm">100% Exam Pass Guarantee</h5>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                Comprehensive course study guides, practice question pools, and free retake exam voucher support.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="w-6 h-6 text-slate-200 shrink-0 mt-1" />
            <div>
              <h5 className="text-white font-bold text-sm">Accredited Global Partner</h5>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                Authorized training provider for Scaled Agile, Scrum Alliance, Scrum.org, ICAgile, and Kanban University.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-slate-200 shrink-0 mt-1" />
            <div>
              <h5 className="text-white font-bold text-sm">Enterprise Delivery Faculty</h5>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                Classes facilitated strictly by SPCTs, Certified Scrum Trainers (CSTs), and Professional Scrum Trainers (PSTs).
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-white/15 text-xs">
          {/* Col 1: About wordmark (White logo with light grey accent) */}
          <div className="space-y-3">
            <span className="text-2xl font-black tracking-tight text-white block font-serif">
              ALEPH TECHNOLOGIES
            </span>
            <p className="text-slate-200 leading-relaxed">
              Global executive education and corporate agile certification academy delivering accredited SAFe, Scrum, ICAgile, and Kanban masterclasses.
            </p>
            <div className="pt-2 text-slate-200 space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-300" />
                <span>training@alephtechnologies.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-300" />
                <span>+1 888-955-9155</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-300" />
                <span>2425 N Central Expy #700, Richardson, TX 75080, United States</span>
              </div>
            </div>
          </div>

          {/* Col 2: Certification Brands */}
          <div>
            <h6 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
              Certification Brands
            </h6>
            <ul className="space-y-2">
              {brands.map((brand) => (
                <li key={brand.id}>
                  <button
                    onClick={() => navigateTo('brand', { brandId: brand.id })}
                    className="hover:text-white transition-colors cursor-pointer text-slate-200 text-left"
                  >
                    {brand.name} Certification Training
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h6 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
              Academy Resources
            </h6>
            <ul className="space-y-2 text-slate-200">
              <li>
                <button onClick={() => navigateTo('courses-overview')} className="hover:text-white transition-colors cursor-pointer">
                  All Courses Catalog
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blogs')} className="hover:text-white transition-colors cursor-pointer">
                  Agile Leadership Blogs (12 Articles)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  About ALEPH TECHNOLOGIES
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Enterprise Bulk Training Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Portal Login & Administrator Portal Link */}
          <div>
            <h6 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
              Faculty & Student Portal
            </h6>
            <p className="text-slate-200 leading-relaxed mb-3">
              Access your digital credentials, official exam vouchers, and batch scheduling records.
            </p>
            <div className="space-y-2">
              <button
                onClick={openLogin}
                className="w-full inline-flex items-center justify-between px-3.5 py-2.5 bg-white text-[#5C061E] rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs hover:bg-slate-100"
              >
                <span>Student / Faculty Login & Register</span>
                <span>→</span>
              </button>
              <a
                href="/aleph-technologies-source.zip"
                download="aleph-technologies-source.zip"
                className="w-full inline-flex items-center justify-between px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer border border-white/20"
                title="Download complete project source code (.zip)"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5 text-slate-200" />
                  <span>Download Backup Copy (.ZIP)</span>
                </span>
                <span className="text-[10px] text-slate-300 font-mono">ZIP</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © {new Date().getFullYear()} ALEPH TECHNOLOGIES. All rights reserved. Scaled Agile Framework and SAFe are registered trademarks of Scaled Agile, Inc.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Accreditation Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
