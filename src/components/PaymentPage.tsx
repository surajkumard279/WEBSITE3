import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentDetails } from '../types';
import {
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Laptop,
  ArrowLeft,
  Loader2,
  Building,
} from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const {
    cart,
    cartTotal,
    customerDetails,
    processOrder,
    navigateTo,
  } = useApp();

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardholderName: customerDetails.fullName || '',
    cardNumber: '4532 •••• •••• 8812',
    expiryDate: '08/29',
    cvc: '742',
    billingZip: '10001',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center max-w-md">
          <p className="text-sm text-slate-600 mb-4">No active courses in cart for payment.</p>
          <button
            onClick={() => navigateTo('courses-overview')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentDetails.cardholderName.trim()) {
      setPaymentError('Please provide the cardholder name.');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    // Simulate real enterprise payment gateway transaction latency
    setTimeout(() => {
      setIsProcessing(false);
      processOrder(paymentDetails);
      navigateTo('order-success');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
            <button
              onClick={() => navigateTo('cart')}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Cart & Attendee Details</span>
            </button>
            <span>/</span>
            <span className="flex items-center gap-1.5 text-[#5C061E] font-bold">
              <span className="w-5 h-5 rounded-full bg-[#5C061E] text-white flex items-center justify-center text-[11px]">
                2
              </span>
              Secure Payment Processing
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 font-serif">
            Finalize Certification Registration
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Customer & Order Summary
              Requirement from Point 8:
              Show:
              * Customer/order summary
              * Course name
              * Course date
              * Course time
              * Location
              * Quantity
              * Price
              * Total amount */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">
                  Customer & Order Summary
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  Review & Confirm
                </span>
              </div>

              {/* Registered Customer Details */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                  Registered Attendee
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-400 block">Name:</span>
                    <span className="font-semibold text-slate-900">{customerDetails.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email:</span>
                    <span className="font-semibold text-slate-900 truncate block">{customerDetails.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Contact:</span>
                    <span className="font-semibold text-slate-900">{customerDetails.contactNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Company:</span>
                    <span className="font-semibold text-slate-900">
                      {customerDetails.companyName || 'Individual'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Item Summary List */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Enrolled Scheduled Batches
                </span>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg border border-slate-200 bg-white space-y-3"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {item.courseName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
                        {/* Course Date */}
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="font-medium text-slate-900">{item.selectedDate}</span>
                        </div>

                        {/* Course Time */}
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{item.selectedTime}</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1.5">
                          {item.location === 'Virtual' ? (
                            <Laptop className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          )}
                          <span className="font-medium">{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Quantity: <strong className="text-slate-900">{item.quantity}</strong> seat(s) @ ${item.price}
                      </span>
                      <span className="font-bold text-slate-900 tabular-nums font-mono text-sm">
                        ${item.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Amount Summary */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Total Amount Due</span>
                  <span className="text-xs text-slate-500">Includes all taxes, fees, and exam voucher</span>
                </div>
                <span className="text-3xl font-black text-slate-900 tabular-nums font-mono">
                  ${cartTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Online / Card Payment Details & PAY button */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Payment Method
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Encrypted and securely processed with instant voucher issuance.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px] font-semibold text-emerald-700">256-Bit SSL</span>
                </div>
              </div>

              <form onSubmit={handleCompleteOrder} className="space-y-4">
                {paymentError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium">
                    {paymentError}
                  </div>
                )}

                {/* Cardholder Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentDetails.cardholderName}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, cardholderName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm transition-all focus:outline-none font-medium"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Credit / Debit Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={paymentDetails.cardNumber}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm transition-all focus:outline-none font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {/* Expiry & CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={paymentDetails.expiryDate}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm transition-all focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1">
                      CVC / Security Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={paymentDetails.cvc}
                      onChange={(e) =>
                        setPaymentDetails({ ...paymentDetails, cvc: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm transition-all focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Billing Zip */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Billing Postal / ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentDetails.billingZip}
                    onChange={(e) =>
                      setPaymentDetails({ ...paymentDetails, billingZip: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm transition-all focus:outline-none font-mono"
                  />
                </div>

                {/* Payment trust signals */}
                <div className="pt-2 text-[11px] text-slate-500 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Authorized Merchant Billing: "ALEPH TECHNOLOGIES"</span>
                  </div>
                  <p>
                    By clicking Pay, you authorize the charge of ${cartTotal.toLocaleString()} USD. Official exam key & calendar invitation will be issued immediately upon confirmation.
                  </p>
                </div>

                {/* Final Button: PAY / COMPLETE ORDER (Exact requirement from Point 8) */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider disabled:opacity-75"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>PROCESSING ENROLLMENT...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>PAY / COMPLETE ORDER (${cartTotal.toLocaleString()})</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
