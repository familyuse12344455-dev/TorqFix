import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Navigation,
  Phone,
  Camera,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Booking, BookingStatus } from '@shared/types';
import { SwipeToConfirm } from './SwipeToConfirm';

interface DriverPortalProps {
  booking: Booking | null;
  onUpdateStatus: (bookingId: string, status: BookingStatus, note?: string) => void;
}

export const DriverPortal: React.FC<DriverPortalProps> = ({ booking, onUpdateStatus }) => {
  const [photoChecks, setPhotoChecks] = useState<{
    front: boolean;
    rear: boolean;
    left: boolean;
    right: boolean;
    odometer: boolean;
  }>({
    front: true,
    rear: true,
    left: false,
    right: false,
    odometer: true
  });

  const togglePhoto = (key: keyof typeof photoChecks) => {
    setPhotoChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allPhotosChecked = Object.values(photoChecks).every(Boolean);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6 pb-20">
      {/* Driver Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-3xl bg-[#0B1B3A] border border-[#263B5C]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFE247] to-[#D4AF37] text-[#071426] flex items-center justify-center font-black shadow-gold-sm">
            <Truck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                On Duty • Flatbed Carrier
              </span>
              <span className="text-xs font-mono text-[#FFD700]">★ 4.95 Rating</span>
            </div>
            <h2 className="text-xl font-black text-white font-display mt-0.5">
              Captain Tariq Mehmood
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Vehicle: Mercedes Actros Carrier #ICT-TOW-01 • Islamabad Division
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-mono text-xs">
            <div className="text-slate-400">Completed Deliveries</div>
            <div className="text-base font-black text-white">348 Trips</div>
          </div>
        </div>
      </div>

      {booking ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Job Card */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass-card p-6 rounded-3xl border border-[#263B5C] space-y-5">
              <div className="flex items-center justify-between border-b border-[#263B5C]/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700]">
                    Active Assignment #{booking.bookingCode}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-300 bg-[#071426] px-2.5 py-1 rounded-xl border border-[#263B5C]">
                  Status: {booking.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Customer & Vehicle Information */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0B1B3A] border border-[#263B5C]">
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold">Customer:</div>
                  <div className="text-base font-bold text-white">{booking.user?.name || 'Hamza Khan'}</div>
                  <div className="text-xs text-[#FFD700] font-mono mt-0.5">
                    {booking.vehicle?.year} {booking.vehicle?.make} {booking.vehicle?.model}
                  </div>
                  <div className="text-xs font-mono text-slate-300 font-bold">
                    Reg Plate: {booking.vehicle?.registrationNumber}
                  </div>
                </div>

                <a
                  href="tel:+923001234567"
                  className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 self-start sm:self-center shadow-gold-sm"
                >
                  <Phone className="w-4 h-4" /> Call Customer
                </a>
              </div>

              {/* Navigation Addresses */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-emerald-400">
                      Pickup Address (Customer Home):
                    </div>
                    <p className="text-xs text-white font-medium mt-0.5">{booking.pickupAddress}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#FFD700]">
                      Workshop Destination:
                    </div>
                    <p className="text-xs text-white font-medium mt-0.5">
                      {booking.workshop?.name || 'Torqfix Central Hub'} • {booking.workshop?.address || 'Plot 44, I-9 Industrial Area'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Driver Action Controls Based on Current Status */}
              <div className="pt-2 border-t border-[#263B5C] space-y-3">
                {booking.status === 'DRIVER_ASSIGNED' && (
                  <SwipeToConfirm
                    label="Swipe to Confirm Vehicle Pickup"
                    onConfirm={() =>
                      onUpdateStatus(booking.id, 'VEHICLE_PICKED_UP', 'Vehicle loaded securely onto flatbed after 360° photo inspection.')
                    }
                  />
                )}

                {booking.status === 'VEHICLE_PICKED_UP' && (
                  <SwipeToConfirm
                    label="Swipe to Confirm Arrival at Workshop"
                    onConfirm={() =>
                      onUpdateStatus(booking.id, 'IN_WORKSHOP', 'Vehicle handed over to Workshop Bay 4 technician.')
                    }
                  />
                )}

                {booking.status === 'READY' && (
                  <SwipeToConfirm
                    label="Swipe to Begin Return Dispatch"
                    onConfirm={() =>
                      onUpdateStatus(booking.id, 'RETURNING', 'Vehicle dispatched on carrier for return delivery.')
                    }
                  />
                )}

                {booking.status === 'RETURNING' && (
                  <SwipeToConfirm
                    label="Swipe to Confirm Vehicle Handover (Delivered)"
                    onConfirm={() =>
                      onUpdateStatus(booking.id, 'DELIVERED', 'Vehicle delivered safely to customer. Handover signed.')
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* 360° Digital Vehicle Pre-Pickup Inspection Checklist */}
          <div className="space-y-4">
            <div className="glass-card p-5 rounded-3xl border border-[#263B5C] space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                <Camera className="w-4 h-4 text-[#FFD700]" /> 360° Inspection Photos
              </div>
              <p className="text-[11px] text-slate-400">
                Required before loading vehicle to document pre-existing scratches and odometer.
              </p>

              <div className="space-y-2">
                {[
                  { key: 'front', label: 'Front Bumper & Grille' },
                  { key: 'rear', label: 'Rear Bumper & Boot' },
                  { key: 'left', label: 'Left Side & Doors' },
                  { key: 'right', label: 'Right Side & Fenders' },
                  { key: 'odometer', label: 'Dashboard Odometer & Fuel' }
                ].map((item) => {
                  const isDone = photoChecks[item.key as keyof typeof photoChecks];
                  return (
                    <div
                      key={item.key}
                      onClick={() => togglePhoto(item.key as any)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isDone
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                          : 'bg-[#0B1B3A] border-[#263B5C] text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-medium">{item.label}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                          isDone ? 'bg-emerald-500 text-slate-950' : 'bg-[#102445] border border-[#263B5C]'
                        }`}
                      >
                        {isDone ? '✓' : '+'}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-[10px] text-center text-slate-400 font-mono">
                {allPhotosChecked
                  ? 'All 5 inspection angles verified and logged'
                  : 'Tap to simulate capturing remaining photo angles'}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card p-12 text-center rounded-3xl border border-[#263B5C]">
          <Clock className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Active Pickup Job</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You are currently on standby for dispatch in Islamabad Sector I-9 & F-7.
          </p>
        </div>
      )}
    </div>
  );
};
