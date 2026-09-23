import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, CheckCircle2, Building, MessageSquare, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: 'SAFe Certification Training',
    seats: '1-5 Seats',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Banner with Maroon #5C061E Background & White/Light Grey Text */}
      <div
        className="text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#440416] relative overflow-hidden"
        style={{ backgroundColor: '#5C061E' }}
      >
        <div className="max-w-7xl mx-auto space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-white font-medium">Contact Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-serif">
            Contact ALEPH TECHNOLOGIES
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
            Get in touch with our certified enterprise advisors for individual enrollments, corporate team cohorts, or custom scheduling inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Contact Information (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold text-[#5C061E] uppercase tracking-wider block">
                  Direct Inquiries
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  Global Academy Headquarters
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Our academic concierges and corporate training directors are available Monday through Friday, 8:00 AM – 7:00 PM EST.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#5C061E]/10 text-[#5C061E] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">General Admissions & Enrollment</span>
                    <span className="text-xs text-slate-600">training@alephtechnologies.in</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#5C061E]/10 text-[#5C061E] flex items-center justify-center shrink-0">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Corporate Enterprise Accounts</span>
                    <span className="text-xs text-slate-600">training@alephtechnologies.in</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#5C061E]/10 text-[#5C061E] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Toll-Free Telephone</span>
                    <span className="text-xs text-slate-600">+1 888-955-9155</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#5C061E]/10 text-[#5C061E] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Campus Address</span>
                    <span className="text-xs text-slate-600">2425 N Central Expy #700, Richardson, TX 75080, United States</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate Cohorts Info */}
            <div
              className="rounded-2xl p-6 text-white space-y-3 shadow-xs border border-[#440416]"
              style={{ backgroundColor: '#5C061E' }}
            >
              <h3 className="text-sm font-bold text-white">Private Cohort Scheduling</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Looking to train a squad of 10 or more engineers, product managers, or scrum masters? We offer discounted enterprise volume pricing and private dedicated dates.
              </p>
            </div>
          </div>

          {/* Contact Form (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Inquiry Received</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name || 'there'}. A certified agile academic advisor has received your message and will respond within 4 business hours with customized syllabus details and pricing.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#5C061E] hover:bg-[#740a28] text-white text-xs font-bold rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="pb-3 border-b border-slate-100 mb-2">
                    <h3 className="text-base font-bold text-slate-900">
                      Send an Inquiry or Request Team Training
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fill out this quick form and an educational advisor will connect with you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rachel Green"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Corporate Email <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rachel@enterprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +1 (555) 234-5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Organization / Employer
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Microsoft / Freelance"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Course or Framework Interest
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E] bg-white"
                      >
                        <option value="SAFe Certification Training">Scaled Agile Framework (SAFe)</option>
                        <option value="Scrum Alliance (CSM / CSPO)">Scrum Alliance (CSM / CSPO)</option>
                        <option value="Scrum.org (PSM / PSPO)">Scrum.org (PSM / PSPO)</option>
                        <option value="ICAgile Track">ICAgile Professional Coaching</option>
                        <option value="Kanban University">Kanban University (KSD / KSI)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1">
                        Estimated Attendees
                      </label>
                      <select
                        value={formData.seats}
                        onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E] bg-white"
                      >
                        <option value="1-5 Seats">1–5 Individual Seats</option>
                        <option value="6-15 Seats">6–15 Seats (Small Team)</option>
                        <option value="16-30 Seats">16–30 Seats (Department)</option>
                        <option value="30+ Seats">30+ Seats (Enterprise ART)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Message / Special Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please mention your preferred batch dates, timezone, or any corporate procurement requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5C061E]/20 focus:border-[#5C061E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-[#5C061E] hover:bg-[#740a28] active:bg-[#440416] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiries to Academic Advisor</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
