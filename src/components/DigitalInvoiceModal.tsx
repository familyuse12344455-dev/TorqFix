import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  FileCheck,
  CreditCard,
  Banknote,
  QrCode,
  ShieldCheck
} from 'lucide-react';
import { Booking } from '@shared/types';

interface DigitalInvoiceModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onPaySuccess?: () => void;
}

export const DigitalInvoiceModal: React.FC<DigitalInvoiceModalProps> = ({
  booking,
  isOpen,
  onClose,
  onPaySuccess
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa' | 'raast' | 'card'>('cod');
  const [isPaid, setIsPaid] = useState(booking.status === 'DELIVERED');
  const [isProcessing, setIsProcessing] = useState(false);

  const pickupFee = booking.pickupFeePkr || 1500;
  const baseServiceCost = (booking.estimatedCostPkr || 10000) - pickupFee;
  const approvedPartsLabor = booking.approvedAdditionalPkr || 0;
  const subtotal = pickupFee + baseServiceCost + approvedPartsLabor;
  const salesTax = Math.round(subtotal * 0.05); // 5% PRA / ICT
  const totalPkr = subtotal + salesTax;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      if (onPaySuccess) onPaySuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#071426] border border-[#263B5C] rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#0B1B3A] to-[#102445] border-b border-[#263B5C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/20 border border-[#FFD700]/50 flex items-center justify-center text-[#FFD700]">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white font-display">
                Torqfix Tax Invoice & Work Order
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                INV-2026-{booking.bookingCode} • NTN: 8291044-7
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#102445] text-slate-400 hover:text-white flex items-center justify-center border border-[#263B5C]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Invoice Body (Document Format) */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Company & Customer Banner */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#263B5C] text-xs">
            <div>
              <div className="text-base font-black text-white font-display tracking-wider mb-1">
                TORQ<span className="text-[#FFD700]">FIX</span> TECHNOLOGIES
              </div>
              <p className="text-slate-400">Torqfix Central Workshop, Plot 44, I-9/2</p>
              <p className="text-slate-400">Islamabad, Federal Capital Territory, Pakistan</p>
              <p className="text-slate-400">UAN: +92 51 8847000 • support@torqfix.pk</p>
            </div>
            <div className="text-right">
              <div className="text-slate-400 uppercase font-bold text-[10px]">Billed To:</div>
              <div className="text-sm font-bold text-white">{booking.user?.name || 'Hamza Khan'}</div>
              <p className="text-slate-400">{booking.user?.phone || '+92 300 1234567'}</p>
              <p className="text-slate-400 truncate">{booking.pickupAddress}</p>
              <div className="mt-1 inline-block px-2 py-0.5 rounded bg-[#102445] border border-[#263B5C] font-mono text-[#FFD700]">
                {booking.vehicle?.year} {booking.vehicle?.make} {booking.vehicle?.model} ({booking.vehicle?.registrationNumber})
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
              Itemized Charges
            </h4>
            <div className="rounded-2xl border border-[#263B5C] overflow-hidden bg-[#0B1B3A]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#102445] text-slate-300 font-bold border-b border-[#263B5C]">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Amount (PKR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#263B5C]/60 text-slate-300 font-mono">
                  <tr>
                    <td className="p-3">
                      <div className="font-sans font-bold text-white">
                        Torqfix Hydraulic Flatbed Carrier Logistics
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans">
                        Roundtrip doorstep pickup and return delivery
                      </div>
                    </td>
                    <td className="p-3 text-center">1</td>
                    <td className="p-3 text-right text-white font-bold">
                      {pickupFee.toLocaleString()}
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3">
                      <div className="font-sans font-bold text-white">
                        {booking.service?.title || 'Comprehensive Service Package'}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans">
                        Pre-service computerized scan, lubricants, multi-point health check
                      </div>
                    </td>
                    <td className="p-3 text-center">1</td>
                    <td className="p-3 text-right text-white font-bold">
                      {baseServiceCost.toLocaleString()}
                    </td>
                  </tr>

                  {/* Approved Diagnosis Parts & Labor */}
                  {booking.diagnosis?.items
                    .filter((i) => i.approved)
                    .map((item) => (
                      <tr key={item.id}>
                        <td className="p-3">
                          <div className="font-sans font-bold text-white">{item.name}</div>
                          <div className="text-[10px] text-[#FFD700] font-sans">
                            {item.itemType.toUpperCase()} • Part #{item.partNumber || 'OEM'}
                          </div>
                        </td>
                        <td className="p-3 text-center">{item.quantity}</td>
                        <td className="p-3 text-right text-white font-bold">
                          {item.totalPricePkr.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 p-4 rounded-2xl bg-[#0B1B3A] border border-[#263B5C]">
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> 6-Month / 10,000 KM Warranty Active
              </div>
              <p className="text-slate-400 text-[11px]">
                Payment status:{' '}
                <span className={`font-bold ${isPaid ? 'text-emerald-400' : 'text-[#FFD700]'}`}>
                  {isPaid ? 'PAID IN FULL' : 'PAYMENT PENDING'}
                </span>
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="text-white">PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Sales Tax (5% PRA/SRB):</span>
                <span className="text-white">PKR {salesTax.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-[#263B5C] flex justify-between text-base font-black">
                <span className="text-white font-display">Net Total:</span>
                <span className="text-[#FFD700]">PKR {totalPkr.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Selection (If Not Paid) */}
          {!isPaid && (
            <div className="p-4 rounded-2xl bg-[#102445] border border-[#263B5C] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Choose Payment Method
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'cod', label: 'Cash on Delivery', sub: 'Pay on Handover' },
                  { id: 'jazzcash', label: 'JazzCash', sub: 'Instant Mobile' },
                  { id: 'easypaisa', label: 'Easypaisa', sub: 'Instant Mobile' },
                  { id: 'card', label: 'Visa / Mastercard', sub: 'Credit / Debit' }
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      paymentMethod === method.id
                        ? 'bg-[#FFD700]/15 border-[#FFD700] text-[#FFD700]'
                        : 'bg-[#0B1B3A] border-[#263B5C] text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{method.label}</div>
                    <div className="text-[10px] text-slate-400">{method.sub}</div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleSimulatePayment}
                className="w-full btn-gold py-2.5 rounded-xl text-xs font-bold shadow-gold-sm flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Processing Transaction...' : `Confirm & Pay PKR ${totalPkr.toLocaleString()}`}
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => alert('Tax Invoice sent to user email and ready for print!')}
              className="px-4 py-2 rounded-xl bg-[#102445] hover:bg-[#1B3B6F] text-slate-300 border border-[#263B5C] text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4 text-[#FFD700]" /> Print Work Order
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl btn-gold text-xs font-bold"
            >
              Close Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
