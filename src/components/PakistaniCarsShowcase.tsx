import React, { useState } from 'react';
import { ShieldCheck, Fuel, Gauge, Cog, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import { PAKISTANI_CARS_CATALOG, PakistaniCarModel } from '@shared/cars-catalog';

interface PakistaniCarsShowcaseProps {
  onSelectCarForBooking?: (car: PakistaniCarModel) => void;
  onQuickAddVehicle?: (car: PakistaniCarModel) => void;
}

export const PakistaniCarsShowcase: React.FC<PakistaniCarsShowcaseProps> = ({
  onSelectCarForBooking,
  onQuickAddVehicle
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [addedCarId, setAddedCarId] = useState<string | null>(null);

  const categories = ['All', 'Sedan', 'Hatchback', 'SUV / Crossover', '4x4 / Commercial'];

  const filteredCars =
    activeCategory === 'All'
      ? PAKISTANI_CARS_CATALOG
      : PAKISTANI_CARS_CATALOG.filter((c) => c.category === activeCategory);

  const handleAdd = (car: PakistaniCarModel) => {
    setAddedCarId(car.id);
    if (onQuickAddVehicle) {
      onQuickAddVehicle(car);
    }
    setTimeout(() => setAddedCarId(null), 2000);
  };

  return (
    <div className="w-full">
      {/* Header with Luxury Brand Accent */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#FFD700]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Pakistan Automotive Catalog
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight font-display">
            Commonly Supported & Rapid-Sourced Cars
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            100% parts availability guaranteed nationwide through verified suppliers in{' '}
            <span className="text-[#FFD700]">Bilal Gunj (Lahore)</span>,{' '}
            <span className="text-[#FFD700]">Shershah (Karachi)</span>, and{' '}
            <span className="text-[#FFD700]">Chah Sultan (Rawalpindi)</span>.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#FFD700] text-[#071426] shadow-gold-sm'
                  : 'bg-[#0B1B3A] text-slate-400 hover:text-white border border-[#263B5C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Vehicle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCars.map((car) => {
          const isJustAdded = addedCarId === car.id;

          return (
            <div
              key={car.id}
              className="glass-card-interactive rounded-2xl overflow-hidden flex flex-col justify-between group border border-[#263B5C]"
            >
              {/* Image & Badges Container */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={car.imageUrl}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A] via-transparent to-black/40" />

                {/* Top Parts Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#071426]/90 border border-[#FFD700]/50 backdrop-blur-md">
                  <ShieldCheck className="w-3 h-3 text-[#FFD700]" />
                  <span className="text-[10px] font-bold text-[#FFD700]">
                    {car.partsAvailability}
                  </span>
                </div>

                {/* Model Year Pill */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 border border-white/10 text-[10px] font-mono text-slate-300 backdrop-blur-md">
                  {car.yearRange}
                </div>

                {/* Car Make & Model Floating Bottom */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-xs font-bold text-[#FFD700] tracking-wider uppercase">
                    {car.make}
                  </div>
                  <h3 className="text-lg font-black text-white leading-tight font-display">
                    {car.model}
                  </h3>
                  <div className="text-[11px] text-slate-300 font-medium truncate">
                    {car.variant}
                  </div>
                </div>
              </div>

              {/* Specs & Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Key Specs Pills */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#071426]/70 border border-[#263B5C]">
                      <Gauge className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase">Engine</div>
                        <div className="text-[11px] font-bold text-white">{car.engineCc} cc</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#071426]/70 border border-[#263B5C]">
                      <Cog className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase">Gear</div>
                        <div className="text-[11px] font-bold text-white truncate">{car.transmission}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#071426]/70 border border-[#263B5C]">
                      <Fuel className="w-3.5 h-3.5 text-[#22C55E]" />
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase">Fuel</div>
                        <div className="text-[11px] font-bold text-white">{car.fuelType}</div>
                      </div>
                    </div>
                  </div>

                  {/* Sourcing Hubs */}
                  <div className="mb-2">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase mb-1">
                      Parts Sourced Via:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {car.partsHubs.map((hub) => (
                        <span
                          key={hub}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-[#102445] text-slate-300 border border-[#263B5C]"
                        >
                          {hub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Karachi & Pakistan Local Insight */}
                  {car.karachiReputation && (
                    <div className="text-[10px] text-[#D4AF37] mb-2.5 bg-[#0B1B3A] p-1.5 rounded-lg border border-[#263B5C]/70 italic">
                      🇵🇰 {car.karachiReputation}
                    </div>
                  )}

                  {/* Recommended Oil */}
                  <div className="text-[11px] text-slate-300 mb-3 bg-[#071426] p-2 rounded-lg border border-[#263B5C] flex items-center justify-between">
                    <span className="text-slate-400">Spec Oil Grade:</span>
                    <span className="font-mono font-bold text-[#FFD700]">{car.defaultOilGrade}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#263B5C]">
                  <button
                    onClick={() => handleAdd(car)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isJustAdded
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'btn-gold-outline hover:bg-[#FFD700] hover:text-[#071426]'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Added to Garage
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Add to Garage
                      </>
                    )}
                  </button>

                  {onSelectCarForBooking && (
                    <button
                      onClick={() => onSelectCarForBooking(car)}
                      className="py-2 px-3.5 rounded-xl btn-gold text-xs font-bold flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Book
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
