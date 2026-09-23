import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, Users, CheckCircle2, Building2, Globe, HeartHandshake } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Banner with Maroon #5C061E Background & White/Light Grey Text */}
      <div
        className="text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#440416] relative overflow-hidden"
        style={{ backgroundColor: '#5C061E' }}
      >
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-white font-medium">About Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-serif">
            Empowering Agile Leaders Across Global Enterprises
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            ALEPH TECHNOLOGIES is a premier executive agile certification and transformation institute. We partner with the world’s leading certification governing bodies to deliver rigorous, accredited, and career-defining agile education.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#5C061E]/10 text-[#5C061E] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Accredited Excellence</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We uphold the highest standard of instructional integrity as authorized training partners of Scaled Agile, Scrum Alliance, Scrum.org, ICAgile, and Kanban University.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Guaranteed Schedule Integrity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every scheduled course batch published on our calendar is guaranteed to run. We never disrupt your career roadmap with cancellations.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#5C061E]/10 text-[#5C061E] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Practitioner Faculty</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our master trainers are former enterprise CIOs, VP engineers, and transformation leaders who combine textbook theory with deep organizational combat wisdom.
            </p>
          </div>
        </div>

        {/* Institutional Story & Numbers */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C061E]">
                Our Pedagogy & Track Record
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
                A Decade of Scaled Transformation Leadership
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Founded by certified SPCTs and Scrum Fellows, ALEPH TECHNOLOGIES bridged the gap between sterile certification test prep and actual enterprise impact. Our graduates do not merely pass the exam; they learn how to facilitate Product Increment (PI) planning with 500 engineers, coach resistant C-suite executives, and stabilize continuous delivery pipelines.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#5C061E]" />
                  <span>Licensed official exam vouchers</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#5C061E]" />
                  <span>Guaranteed running batches</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#5C061E]" />
                  <span>Miro & Jira simulation labs</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#5C061E]" />
                  <span>100% Pass Assurance Retakes</span>
                </div>
              </div>
            </div>

            <div
              className="lg:col-span-5 rounded-2xl p-8 text-white space-y-6 border border-[#440416]"
              style={{ backgroundColor: '#5C061E' }}
            >
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Institutional Milestones
              </h4>
              <div className="space-y-4">
                <div>
                  <span className="text-3xl font-black font-mono block text-white">45,000+</span>
                  <span className="text-xs text-slate-200">Professionals certified across 60+ countries</span>
                </div>
                <div>
                  <span className="text-3xl font-black font-mono block text-white">99.4%</span>
                  <span className="text-xs text-slate-200">First-attempt certification pass rate</span>
                </div>
                <div>
                  <span className="text-3xl font-black font-mono block text-white">500+</span>
                  <span className="text-xs text-slate-200">Corporate enterprise transformation clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
