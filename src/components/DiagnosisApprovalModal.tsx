import React, { useState } from 'react';
import {
  X,
  Stethoscope,
  Clock,
  ShieldCheck,
  AlertTriangle,
  FileText,
  CheckCircle2,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { Booking } from '@shared/types';
import { SwipeToConfirm } from './SwipeToConfirm';

interface DiagnosisApprovalModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (approvedItemIds: string[]) => void;
  onReject: (reason: string) => void;
}

export const DiagnosisApprovalModal: React.FC<DiagnosisApprovalModalProps> = ({
  booking,
  isOpen,
  onClose,
  onApprove,
  onReject
}) => {
  if (!isOpen || !booking.diagnosis) return null;

  const diagnosis = booking.diagnosis;
  const initialSelected = diagnosis.items.map((i) => i.id);
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelected);
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedItemsTotal = diagnosis.items
    .filter((i) => selectedIds.includes(i.id))
    .reduce((sum, i) => sum + i.totalPricePkr, 0);

  const baseBookingCost = booking.estimatedCostPkr;
  const grandTotal = baseBookingCost + selectedItemsTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#071426] border border-[#263B5C] rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#0B1B3A] to-[#102445] border-b border-[#263B5C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/20 border border-[#FFD700]/50 flex items-center justify-center text-[#FFD700]">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white font-display">
                  Inspection & Diagnosis Report
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD700] text-[#071426]">
                  Awaiting Approval
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Booking #{booking.bookingCode} • {booking.vehicle?.year} {booking.vehicle?.make} {booking.vehicle?.model}
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

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Master Technician Notes */}
          <div className="p-4 rounded-2xl bg-[#0B1B3A] border border-[#263B5C]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-slate-200">
                  {diagnosis.technicianName}
                </span>
              </div>
              <span className="text-[11px] text-[#FFD700] font-mono flex items-center gap-1">
                <Clock className="w-3 h-3" /> Est. {diagnosis.estimatedCompletionHours} hrs
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{diagnosis.technicianNotes}"
            </p>
          </div>

          {/* Itemized Parts & Labor Checklist */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Recommended Parts & Labor (Select to Approve)
              </h4>
              <button
                type="button"
                onClick={() =>
                  setSelectedIds(
                    selectedIds.length === diagnosis.items.length
                      ? []
                      : diagnosis.items.map((i) => i.id)
                  )
                }
                className="text-[11px] text-[#FFD700] hover:underline font-semibold"
              >
                {selectedIds.length === diagnosis.items.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="space-y-2.5">
              {diagnosis.items.map((item) => {
                const isChecked = selectedIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isChecked
                        ? 'bg-[#102445] border-[#FFD700]/50 shadow-sm'
                        : 'bg-[#0B1B3A]/60 border-[#263B5C] opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                          isChecked
                            ? 'bg-[#FFD700] text-[#071426] border-[#FFD700]'
                            : 'border-[#263B5C] bg-[#071426]'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-white leading-tight">
                            {item.name}
                          </h5>
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#071426] text-slate-400 font-mono border border-[#263B5C]">
                            {item.itemType}
                          </span>
                        </div>
                        {item.partNumber && (
                          <div className="text-[10px] text-slate-400 font-mono">
                            OEM Part #{item.partNumber}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold font-mono text-[#FFD700]">
                        PKR {item.totalPricePkr.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Summary Breakdown */}
          <div className="p-4 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Original Booking & Towing:</span>
              <span className="text-white">PKR {baseBookingCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Approved Diagnostic Overhaul:</span>
              <span className="text-[#FFD700] font-bold">
                + PKR {selectedItemsTotal.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-[#263B5C] flex justify-between text-sm font-bold">
              <span className="text-white">Total Estimated Amount:</span>
              <span className="text-[#FFD700]">PKR {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Torqfix Guarantee Alert */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#FFD700]" />
            <span>
              <strong>Zero Hidden Charges:</strong> You will only be billed for parts & work you explicitly approve. All fitted parts carry a 6-month warranty.
            </span>
          </div>

          {/* Reject / Request Revision Mode Toggle */}
          {rejectMode ? (
            <div className="space-y-2 p-3 bg-red-950/20 border border-red-500/40 rounded-xl">
              <label className="text-xs font-bold text-red-300">
                Specify Reason or Question for Workshop:
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="E.g., Can we inspect the clutch bearing first before full replacement? Please call me."
                className="w-full p-2.5 rounded-xl bg-[#071426] border border-[#263B5C] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRejectMode(false)}
                  className="flex-1 py-1.5 rounded-lg bg-[#102445] text-xs text-slate-300 border border-[#263B5C]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => onReject(rejectReason)}
                  className="flex-1 py-1.5 rounded-lg bg-red-600 text-xs font-bold text-white hover:bg-red-500"
                >
                  Submit Revision Request
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Swipe to Approve */}
              <SwipeToConfirm
                label="Swipe to Approve Repair Cost"
                onConfirm={() => onApprove(selectedIds)}
              />

              {/* Decline / Request Clarification Button */}
              <button
                type="button"
                onClick={() => setRejectMode(true)}
                className="w-full py-2 rounded-xl text-center text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors"
              >
                Request Clarification or Decline Extra Items
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
