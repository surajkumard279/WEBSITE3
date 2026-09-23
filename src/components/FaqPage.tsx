import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, HelpCircle, ShieldCheck, Award } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Exams & Credentials',
    question: 'Is the official exam fee included in the course tuition?',
    answer:
      'Yes, 100% of our certification courses include the official examination fee and digital voucher. For SAFe, Scrum Alliance, Scrum.org, ICAgile, and Kanban University, you will receive full testing access, practice exams, and official community access upon class completion.',
  },
  {
    category: 'Exams & Credentials',
    question: 'What is your 100% Exam Pass Guarantee policy?',
    answer:
      'We maintain an audited 99.4% first-time pass rate. In the rare event an attendee does not pass their assessment on the initial attempt, ALEPH TECHNOLOGIES provides an instructor diagnostic review and sponsors a second retake exam voucher completely free of charge.',
  },
  {
    category: 'Schedules & Batches',
    question: 'Are class schedules guaranteed to run as published?',
    answer:
      'Yes. Every course batch published on our calendar is 100% guaranteed to run. We do not cancel or postpone classes due to low enrollment thresholds, ensuring your professional timeline remains intact.',
  },
  {
    category: 'Schedules & Batches',
    question: 'What is the difference between Virtual and In-Person batches?',
    answer:
      'Virtual batches are delivered via secure live high-definition video conferencing (Zoom/Teams) with real-time interactive breakout rooms, Miro collaboration boards, and master trainer facilitation. In-person batches take place at modern corporate executive training facilities in central metropolitan hubs.',
  },
  {
    category: 'Corporate & Payments',
    question: 'Can my company pay via corporate invoice or purchase order?',
    answer:
      'Yes. In addition to credit card payment through our secure checkout, corporate accounts purchasing 5 or more seats can request net-30 invoicing, group discounts, and private tailored cohorts by contacting our enterprise team.',
  },
  {
    category: 'Credits & PDUs',
    question: 'Can I claim PDUs and SEUs for maintaining PMI or Scrum credentials?',
    answer:
      'Yes. Our 2-day courses qualify for 14–16 PDUs with the Project Management Institute (PMI) under Category A/Education, and 14–16 Scrum Education Units (SEUs) with the Scrum Alliance.',
  },
  {
    category: 'Registration & Pricing',
    question: 'What is the standard price and can prices vary?',
    answer:
      'The standard default price for our courses is $699 USD. However, course batch pricing can be individually scheduled and customized by our academic administration depending on location, faculty tier, and corporate requirements.',
  },
];

export const FaqPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Exams & Credentials', 'Schedules & Batches', 'Corporate & Payments', 'Credits & PDUs'];

  const filteredFaqs = FAQS.filter(
    (faq) => activeCategory === 'All' || faq.category === activeCategory
  );

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
            <span className="text-white font-medium">FAQ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-serif">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
            Find immediate answers regarding accreditation, examination vouchers, schedule guarantees, and enterprise enrollment.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#5C061E] text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {faq.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-[#5C061E]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 text-center space-y-3 mt-8 shadow-xs">
          <HelpCircle className="w-8 h-8 text-[#5C061E] mx-auto" />
          <h4 className="text-base font-bold text-slate-900">Have a custom question or need a syllabus?</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Our educational advisors can evaluate your agile background and recommend the appropriate credential pathway.
          </p>
          <button
            onClick={() => navigateTo('contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5C061E] hover:bg-[#740a28] text-white text-xs font-bold rounded-xl transition-all cursor-pointer uppercase tracking-wider"
          >
            Contact Advisor
          </button>
        </div>
      </div>
    </div>
  );
};
