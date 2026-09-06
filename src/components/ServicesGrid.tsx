import React from 'react';
import {
  Clock,
  Check,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Droplet,
  Wind,
  Cpu,
  Disc,
  Wrench,
  Truck
} from 'lucide-react';
import { SERVICES_CATALOG } from '@shared/services-catalog';
import { ServicePackage } from '@shared/types';

interface ServicesGridProps {
  onSelectService: (service: ServicePackage) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  return (
    <div className="w-full">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#FFD700]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Specialized Workshop Services
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight font-display">
            Precision Automotive Engineering
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Every service includes doorstep flatbed pickup & delivery, transparent PKR pricing,
            pre-repair video inspection, and a 6-month / 10,000 KM Torqfix guarantee.
          </p>
        </div>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_CATALOG.map((service) => {
          const isCarWash = service.id === 'srv-car-wash-detailing';

          return (
            <div
              key={service.id}
              className="glass-card-interactive rounded-2xl overflow-hidden flex flex-col justify-between group border border-[#263B5C]"
            >
              {/* Service Hero Photo Container */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A] via-transparent to-black/50" />

                {/* Prominent Torqfix Neon Badge (Especially highlighting user request on Detailing) */}
                {isCarWash && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071426]/90 border border-[#FFD700] text-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.5)] font-bold text-[11px] tracking-wider uppercase backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 fill-[#FFD700]" />
                    <span>TORQFIX STUDIO</span>
                  </div>
                )}

                {/* Category Pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#071426]/80 border border-[#263B5C] text-[10px] font-bold text-slate-300 uppercase tracking-wider backdrop-blur-md">
                  {service.category}
                </div>

                {/* Title and Time on image bottom */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2 text-xs text-[#FFD700] font-semibold mb-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{service.estimatedHours} Hours Workshop Time</span>
                  </div>
                  <h3 className="text-lg font-black text-white leading-snug font-display">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Included Checklist */}
                  <div className="space-y-1.5 mb-4">
                    <div className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider mb-1">
                      Package Inclusions:
                    </div>
                    {service.includedChecklist.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="pt-3 border-t border-[#263B5C] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">
                      Estimate From
                    </div>
                    <div className="text-lg font-black text-white font-mono">
                      PKR <span className="text-[#FFD700]">{service.basePricePkr.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-gold-sm"
                  >
                    Select <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
