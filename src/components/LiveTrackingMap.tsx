import React, { useState, useEffect } from 'react';
import {
  Truck,
  MapPin,
  Building2,
  Navigation,
  Phone,
  ShieldCheck,
  Compass,
  Gauge,
  Clock,
  Radio
} from 'lucide-react';
import { Booking } from '@shared/types';

interface LiveTrackingMapProps {
  booking: Booking;
}

export const LiveTrackingMap: React.FC<LiveTrackingMapProps> = ({ booking }) => {
  const [telemetry, setTelemetry] = useState<{
    speed: number;
    etaMinutes: number;
    distanceKm: number;
    carrierPos: { x: number; y: number }; // percentage on SVG canvas
  }>({
    speed: 38,
    etaMinutes: 14,
    distanceKm: 4.8,
    carrierPos: { x: 45, y: 55 }
  });

  // Cyclic telemetry animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const progress = ((now % 45000) / 45000); // 45s loop
      // Route interpolation along curved path: (x1, y1) -> (x2, y2)
      const startX = 20;
      const startY = 80;
      const endX = 80;
      const endY = 25;

      // Cubic bezier curve path simulation
      const t = progress;
      const cpX = 55;
      const cpY = 70;
      const curX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * cpX + t * t * endX;
      const curY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * cpY + t * t * endY;

      const dynamicSpeed = Math.round(36 + Math.sin(now / 2000) * 8);
      const remainingDistance = Math.max(0.3, Number((6.8 * (1 - progress)).toFixed(1)));
      const remainingEta = Math.max(2, Math.round((remainingDistance / 35) * 60));

      setTelemetry({
        speed: dynamicSpeed,
        etaMinutes: remainingEta,
        distanceKm: remainingDistance,
        carrierPos: { x: curX, y: curY }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-2xl overflow-hidden glass-card border border-[#263B5C] relative">
      {/* Dev Mode Simulated Badge */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#071426]/90 border border-[#FFD700]/50 text-[11px] font-mono text-[#FFD700] shadow-md backdrop-blur-md">
        <Radio className="w-3 h-3 text-[#FFD700] animate-pulse" />
        <span>SIMULATED GPS TELEMETRY ACTIVE</span>
      </div>

      {/* Speed & ETA Floating HUD */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-xl bg-[#0B1B3A]/90 border border-[#263B5C] backdrop-blur-md flex items-center gap-2 shadow-lg">
          <Clock className="w-3.5 h-3.5 text-[#FFD700]" />
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">ETA</div>
            <div className="text-xs font-bold text-white">{telemetry.etaMinutes} Mins</div>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-[#0B1B3A]/90 border border-[#263B5C] backdrop-blur-md flex items-center gap-2 shadow-lg">
          <Gauge className="w-3.5 h-3.5 text-[#38BDF8]" />
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Speed</div>
            <div className="text-xs font-bold text-white">{telemetry.speed} km/h</div>
          </div>
        </div>
      </div>

      {/* Interactive Dark Mode Map Canvas */}
      <div className="relative w-full h-80 bg-[#06101E] overflow-hidden">
        {/* Subtle Map Grid Lines */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#263B5C_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Major Arterial Roads Vector Lines (Islamabad / City Grid aesthetic) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Background Secondary Streets */}
          <path d="M 0 30 L 100 30" stroke="#102445" strokeWidth="1.2" />
          <path d="M 0 65 L 100 65" stroke="#102445" strokeWidth="1.2" />
          <path d="M 35 0 L 35 100" stroke="#102445" strokeWidth="1.2" />
          <path d="M 70 0 L 70 100" stroke="#102445" strokeWidth="1.2" />

          {/* Primary Route Highway (F-7 to I-9 Sector) */}
          <path
            d="M 20 80 Q 55 70, 80 25"
            fill="none"
            stroke="#1B3B6F"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Golden Active Route Dash Line */}
          <path
            d="M 20 80 Q 55 70, 80 25"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2.5"
            strokeDasharray="3 3"
            strokeLinecap="round"
            className="opacity-90"
          />
        </svg>

        {/* Customer Location Pin (Origin) */}
        <div
          className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ left: '20%', top: '80%' }}
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-[#071426]/90 border border-emerald-500/40 text-emerald-300 whitespace-nowrap shadow">
            Customer Villa (F-7)
          </span>
        </div>

        {/* Workshop Destination Pin */}
        <div
          className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ left: '80%', top: '25%' }}
        >
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-[#FFD700] flex items-center justify-center text-[#FFD700] shadow-[0_0_18px_rgba(255,215,0,0.6)]">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-[#071426]/90 border border-[#FFD700]/40 text-[#FFD700] whitespace-nowrap shadow">
            Torqfix Central Bay (I-9)
          </span>
        </div>

        {/* Animated Moving Driver Tow Carrier Truck Marker */}
        <div
          className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear flex flex-col items-center pointer-events-none"
          style={{ left: `${telemetry.carrierPos.x}%`, top: `${telemetry.carrierPos.y}%` }}
        >
          {/* Radar ripple rings */}
          <div className="absolute w-12 h-12 rounded-full border border-[#FFD700]/40 animate-ping" />
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFE247] to-[#D4AF37] border-2 border-white shadow-[0_0_20px_rgba(255,215,0,0.8)] flex items-center justify-center text-[#071426]">
            <Truck className="w-5 h-5 fill-current" />
          </div>
          <span className="mt-1 text-[9px] font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-[#FFD700] text-[#071426] shadow">
            TOW-01
          </span>
        </div>
      </div>

      {/* Driver Telemetry & Direct Contact Bar */}
      <div className="p-4 bg-[#0B1B3A] border-t border-[#263B5C] flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Driver Profile */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <img
              src={booking.driver?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
              alt="Driver"
              className="w-12 h-12 rounded-xl object-cover border-2 border-[#FFD700]/70"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0B1B3A] flex items-center justify-center">
              <ShieldCheck className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white text-sm">
                {booking.driver?.name || 'Tariq Mehmood'}
              </h4>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30">
                ★ {booking.driver?.rating || '4.95'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Flatbed Carrier #{booking.driver?.vehicleNumber || 'ICT-TOW-01'}
            </p>
          </div>
        </div>

        {/* Direct Call / Contact CTA */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <a
            href="tel:+923335551234"
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center gap-2 text-xs font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> Call Driver
          </a>
          <button
            type="button"
            onClick={() => alert('Simulated GPS coordinates re-centered on driver flatbed position.')}
            className="px-3 py-2 rounded-xl bg-[#102445] text-slate-300 hover:text-white border border-[#263B5C] text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#FFD700]" /> Center
          </button>
        </div>
      </div>
    </div>
  );
};
