import React, { useState } from 'react';
import {
  Wrench,
  Building2,
  Stethoscope,
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  Sliders,
  CheckCheck
} from 'lucide-react';
import { Booking, BookingStatus } from '@shared/types';

interface WorkshopPortalProps {
  bookings: Booking[];
  onUpdateStatus: (bookingId: string, status: BookingStatus, note?: string) => void;
  onSubmitDiagnosis: (
    bookingId: string,
    notes: string,
    hours: number,
    items: any[]
  ) => void;
}

export const WorkshopPortal: React.FC<WorkshopPortalProps> = ({
  bookings,
  onUpdateStatus,
  onSubmitDiagnosis
}) => {
  const activeBookings = bookings.filter((b) =>
    ['IN_WORKSHOP', 'DIAGNOSIS', 'REPAIRING', 'TESTING', 'READY'].includes(b.status)
  );

  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    activeBookings[0]?.id || bookings[0]?.id || ''
  );

  const selectedBooking = bookings.find((b) => b.id === selectedBookingId) || activeBookings[0];

  // Diagnosis Builder Form State
  const [techNotes, setTechNotes] = useState<string>(
    selectedBooking?.diagnosis?.technicianNotes ||
      'AC compressor magnetic clutch bearing is worn out and slipping. Evacuating system and replacing bearing + R134a gas recharge.'
  );
  const [estHours, setEstHours] = useState<number>(
    selectedBooking?.diagnosis?.estimatedCompletionHours || 3.5
  );
  const [items, setItems] = useState<
    Array<{ name: string; itemType: string; partNumber: string; quantity: number; unitPricePkr: number }>
  >([
    {
      name: 'Toyota Genuine AC Compressor Magnetic Clutch & Bearing',
      itemType: 'part',
      partNumber: '88410-02210',
      quantity: 1,
      unitPricePkr: 5500
    },
    {
      name: 'DuPont R134a Ultra-Purity Refrigerant Gas Charge',
      itemType: 'fluid',
      partNumber: 'R134A-450G',
      quantity: 1,
      unitPricePkr: 3000
    },
    {
      name: 'Compressor Dismantle, Clutch Replacement & Vacuum Labor',
      itemType: 'labor',
      partNumber: 'LBR-AC-02',
      quantity: 1,
      unitPricePkr: 3500
    }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        name: 'New Replacement Part',
        itemType: 'part',
        partNumber: '',
        quantity: 1,
        unitPricePkr: 2000
      }
    ]);
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleDiagnosisSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    onSubmitDiagnosis(selectedBooking.id, techNotes, estHours, items);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-3xl bg-[#0B1B3A] border border-[#263B5C]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFE247] to-[#D4AF37] text-[#071426] flex items-center justify-center font-black shadow-gold-sm">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#FFD700] bg-[#FFD700]/20 px-2 py-0.5 rounded-full border border-[#FFD700]/30">
                Workshop Bay Manager
              </span>
              <span className="text-xs font-mono text-emerald-400">Bay Capacity: 5/12 Occupied</span>
            </div>
            <h2 className="text-xl font-black text-white font-display mt-0.5">
              Torqfix Central Hub — Islamabad (I-9)
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Lead Master Technician: Engr. Zeeshan Ali & Master Tech Irfan Shah
            </p>
          </div>
        </div>
      </div>

      {/* Bay Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {bookings.map((b) => (
          <button
            key={b.id}
            onClick={() => {
              setSelectedBookingId(b.id);
              if (b.diagnosis) {
                setTechNotes(b.diagnosis.technicianNotes);
                setEstHours(b.diagnosis.estimatedCompletionHours);
              }
            }}
            className={`p-3 rounded-2xl border text-left min-w-[240px] transition-all ${
              selectedBookingId === b.id
                ? 'bg-[#102445] border-[#FFD700] shadow-gold-sm'
                : 'bg-[#0B1B3A] border-[#263B5C] text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-[#FFD700] font-mono">
                #{b.bookingCode}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#071426] border border-[#263B5C] font-mono">
                {b.status}
              </span>
            </div>
            <div className="text-xs font-bold text-white truncate">
              {b.vehicle?.year} {b.vehicle?.make} {b.vehicle?.model}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              {b.vehicle?.registrationNumber} • {b.service?.title}
            </div>
          </button>
        ))}
      </div>

      {selectedBooking && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Workshop Stage Progression Controls */}
          <div className="space-y-5">
            <div className="glass-card p-5 rounded-3xl border border-[#263B5C] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#FFD700]" /> Bay Status Workflow
              </h3>

              <div className="space-y-2">
                {[
                  { status: 'IN_WORKSHOP', label: '1. Vehicle Received in Bay', desc: 'Loaded onto hydraulic hoist' },
                  { status: 'DIAGNOSIS', label: '2. Inspection & Quoting', desc: 'OBD2 scan & parts estimate' },
                  { status: 'REPAIRING', label: '3. Repairs in Progress', desc: 'Installing approved parts' },
                  { status: 'TESTING', label: '4. Quality Road Testing', desc: 'Safety audit & computer scan' },
                  { status: 'READY', label: '5. Detail Washed & Ready', desc: 'Ready for return carrier' }
                ].map((st) => {
                  const isCurrent = selectedBooking.status === st.status;
                  return (
                    <button
                      key={st.status}
                      onClick={() =>
                        onUpdateStatus(
                          selectedBooking.id,
                          st.status as any,
                          `Workshop progressed to ${st.label}`
                        )
                      }
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-[#FFD700] text-[#071426] border-[#FFD700] font-black shadow-gold-sm'
                          : 'bg-[#0B1B3A] border-[#263B5C] text-slate-300 hover:bg-[#102445]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{st.label}</div>
                        <div
                          className={`text-[10px] ${
                            isCurrent ? 'text-[#071426]/80' : 'text-slate-400'
                          }`}
                        >
                          {st.desc}
                        </div>
                      </div>
                      {isCurrent && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>

              {/* Customer Approval Status Indicator */}
              <div className="p-3 rounded-xl bg-[#071426] border border-[#263B5C] text-xs">
                <div className="text-slate-400">Customer Cost Approval:</div>
                <div className="font-bold mt-0.5">
                  {selectedBooking.diagnosis?.customerApproved === true && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCheck className="w-4 h-4" /> APPROVED BY CUSTOMER (Commence Repair)
                    </span>
                  )}
                  {selectedBooking.diagnosis?.customerApproved === null && (
                    <span className="text-[#FFD700] flex items-center gap-1 animate-pulse">
                      <Clock className="w-4 h-4" /> PENDING CUSTOMER APPROVAL
                    </span>
                  )}
                  {selectedBooking.diagnosis?.customerApproved === false && (
                    <span className="text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> REVISION REQUESTED BY CUSTOMER
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Diagnosis & Itemized Quotation Builder */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass-card p-6 rounded-3xl border border-[#263B5C] space-y-5">
              <div className="flex items-center justify-between border-b border-[#263B5C]/60 pb-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-[#FFD700]" />
                  <h3 className="text-base font-black text-white font-display">
                    Computerized Diagnosis & Parts Quote Builder
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#FFD700]">
                  Vehicle: {selectedBooking.vehicle?.registrationNumber}
                </span>
              </div>

              <form onSubmit={handleDiagnosisSubmit} className="space-y-4">
                {/* Technician Notes */}
                <div>
                  <label className="text-xs font-bold text-slate-300 mb-1.5 block">
                    Diagnostic Findings & Defect Description:
                  </label>
                  <textarea
                    rows={3}
                    value={techNotes}
                    onChange={(e) => setTechNotes(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] text-xs text-white focus:outline-none focus:border-[#FFD700]"
                    required
                  />
                </div>

                <div className="w-48">
                  <label className="text-xs font-bold text-slate-300 mb-1.5 block">
                    Estimated Workshop Hours:
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={estHours}
                    onChange={(e) => setEstHours(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-[#0B1B3A] border border-[#263B5C] text-xs text-white focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                {/* Itemized Parts & Labor Editor */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      Required Spare Parts, Fluids & Overhaul Labor:
                    </label>
                    <button
                      type="button"
                      onClick={addItem}
                      className="text-xs text-[#FFD700] hover:underline font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Line Item
                    </button>
                  </div>

                  <div className="space-y-2">
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs"
                      >
                        <div className="sm:col-span-5">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[idx].name = e.target.value;
                              setItems(newItems);
                            }}
                            placeholder="Part / Labor Name"
                            className="w-full p-1.5 rounded-lg bg-[#071426] border border-[#263B5C] text-xs text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <select
                            value={item.itemType}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[idx].itemType = e.target.value;
                              setItems(newItems);
                            }}
                            className="w-full p-1.5 rounded-lg bg-[#071426] border border-[#263B5C] text-xs text-white"
                          >
                            <option value="part">Part</option>
                            <option value="fluid">Fluid</option>
                            <option value="labor">Labor</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={item.partNumber}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[idx].partNumber = e.target.value;
                              setItems(newItems);
                            }}
                            placeholder="OEM #"
                            className="w-full p-1.5 rounded-lg bg-[#071426] border border-[#263B5C] text-xs text-white font-mono"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <input
                            type="number"
                            value={item.unitPricePkr}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[idx].unitPricePkr = Number(e.target.value);
                              setItems(newItems);
                            }}
                            placeholder="PKR"
                            className="w-full p-1.5 rounded-lg bg-[#071426] border border-[#263B5C] text-xs text-white font-mono font-bold"
                          />
                        </div>

                        <div className="sm:col-span-1 text-center">
                          <button
                            type="button"
                            onClick={() => removeItem(idx)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold py-3 rounded-2xl text-xs font-black shadow-gold-sm flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-4 h-4" /> Push Diagnosis & Send Approval Notification to Customer
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
