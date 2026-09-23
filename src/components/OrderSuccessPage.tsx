import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Laptop,
  Download,
  Mail,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { lastOrder, navigateTo } = useApp();

  if (!lastOrder) {
    return (
      <div className="min-h-[60vh] bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-sm text-slate-600 mb-4">No recent order found.</p>
          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
              Order Confirmed & Registration Complete!
            </h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{lastOrder.customer.fullName}</strong>. Your seat has been reserved. A confirmation receipt and class onboarding materials have been sent to{' '}
              <strong className="text-slate-900">{lastOrder.customer.email}</strong>.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 rounded-md font-mono text-xs font-bold tracking-wider">
                Order Reference: {lastOrder.orderId}
              </span>
            </div>
          </div>

          {/* Enrolled Batches Details */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Enrolled Scheduled Courses
            </h2>

            <div className="space-y-3">
              {lastOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">{item.courseName}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                      <div className="flex items-center gap-1 font-semibold text-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>{item.selectedDate}</span>
                      </div>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.selectedTime}</span>
                      </div>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        {item.location === 'Virtual' ? (
                          <Laptop className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        )}
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs text-slate-500 block">
                      {item.quantity} {item.quantity === 1 ? 'Seat' : 'Seats'}
                    </span>
                    <span className="text-sm font-black text-slate-900 font-mono">
                      ${item.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendee Details & Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700">
            <div>
              <span className="text-slate-400 block font-semibold mb-1 uppercase text-[10px]">
                Registered Attendee
              </span>
              <p className="font-bold text-slate-900">{lastOrder.customer.fullName}</p>
              <p>{lastOrder.customer.email}</p>
              <p>{lastOrder.customer.contactNumber}</p>
              {lastOrder.customer.companyName && (
                <p className="text-slate-500">Org: {lastOrder.customer.companyName}</p>
              )}
            </div>

            <div>
              <span className="text-slate-400 block font-semibold mb-1 uppercase text-[10px]">
                Payment Summary
              </span>
              <p className="font-semibold text-slate-900">{lastOrder.paymentMethod}</p>
              <p className="text-slate-500">Total Paid: <strong className="text-slate-900 font-mono">${lastOrder.totalAmount.toLocaleString()} USD</strong></p>
              <p className="text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Status: Verified & Processed</span>
              </p>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="p-5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
            <h3 className="font-bold text-sm text-blue-950">Next Steps & Course Access</h3>
            <ul className="space-y-1.5 list-disc pl-4 text-blue-800">
              <li>
                <strong>Calendar Invite: </strong>You will receive calendar invites with video conference access (Zoom/Teams) 48 hours prior to the batch start date.
              </li>
              <li>
                <strong>Digital Courseware: </strong>Your official community login credentials and electronic workbook will be issued 3 days before class.
              </li>
              <li>
                <strong>Exam Voucher: </strong>Your exam voucher will be automatically assigned to your profile upon completion of required classroom attendance.
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 flex-wrap">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Tax Receipt</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => navigateTo('student-profile')}
                className="w-full sm:w-auto py-2.5 px-5 bg-white border border-[#5C061E]/30 text-[#5C061E] hover:bg-[#5C061E]/5 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>View My Student Profile</span>
              </button>

              <button
                onClick={() => navigateTo('courses-overview')}
                className="w-full sm:w-auto py-2.5 px-6 bg-[#5C061E] hover:bg-[#740a28] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>Browse Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
