import React, { useState } from 'react';
import { X, Car, Plus, Sparkles, Check } from 'lucide-react';
import { PAKISTANI_CARS_CATALOG } from '@shared/cars-catalog';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (vehicleData: any) => void;
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({
  isOpen,
  onClose,
  onAddVehicle
}) => {
  if (!isOpen) return null;

  const [selectedCatalogCar, setSelectedCatalogCar] = useState<string>(
    PAKISTANI_CARS_CATALOG[0].id
  );
  const [registrationNumber, setRegistrationNumber] = useState<string>('KHI-');
  const [year, setYear] = useState<number>(2022);
  const [color, setColor] = useState<string>('Super White');
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const catalogCar =
    PAKISTANI_CARS_CATALOG.find((c) => c.id === selectedCatalogCar) || PAKISTANI_CARS_CATALOG[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationNumber.trim()) {
      alert('Please enter vehicle registration number (e.g. ICT-LE-4821)');
      return;
    }

    onAddVehicle({
      make: catalogCar.make,
      model: catalogCar.model,
      year,
      color,
      registrationNumber: registrationNumber.toUpperCase().trim(),
      engineCc: catalogCar.engineCc,
      transmission: catalogCar.transmission,
      fuelType: catalogCar.fuelType,
      imageUrl: catalogCar.imageUrl,
      isDefault
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#071426] border border-[#263B5C] rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#0B1B3A] to-[#102445] border-b border-[#263B5C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/20 border border-[#FFD700]/50 flex items-center justify-center text-[#FFD700]">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white font-display">
                Add Vehicle to Garage
              </h3>
              <p className="text-xs text-[#D4AF37]">Pakistani Automotive Catalog</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#102445] text-slate-400 hover:text-white flex items-center justify-center border border-[#263B5C]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Select from common cars */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block">
              Select Vehicle Model:
            </label>
            <select
              value={selectedCatalogCar}
              onChange={(e) => setSelectedCatalogCar(e.target.value)}
              className="w-full p-3 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] text-xs text-white focus:outline-none focus:border-[#FFD700]"
            >
              {PAKISTANI_CARS_CATALOG.map((car) => (
                <option key={car.id} value={car.id} className="bg-[#0B1B3A]">
                  {car.make} {car.model} — {car.variant} ({car.engineCc}cc)
                </option>
              ))}
            </select>
          </div>

          {/* Registration Number */}
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1.5 block">
              Registration Number (Plate):
            </label>
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="e.g. ICT-LE-4821 or LEA-21-9901"
              className="w-full p-3 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] text-xs text-white font-mono uppercase focus:outline-none focus:border-[#FFD700]"
              required
            />
          </div>

          {/* Year & Color */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">Model Year:</label>
              <input
                type="number"
                min="1990"
                max="2026"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full p-3 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] text-xs text-white focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">Color:</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Super White"
                className="w-full p-3 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] text-xs text-white focus:outline-none focus:border-[#FFD700]"
              />
            </div>
          </div>

          {/* Set as Default Checkbox */}
          <div
            onClick={() => setIsDefault(!isDefault)}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#0B1B3A] border border-[#263B5C] cursor-pointer"
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                isDefault
                  ? 'bg-[#FFD700] text-[#071426] border-[#FFD700]'
                  : 'border-[#263B5C] bg-[#071426]'
              }`}
            >
              {isDefault && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <span className="text-xs text-slate-200 font-medium">Set as primary active vehicle</span>
          </div>

          {/* Preview Card */}
          <div className="p-3 rounded-2xl bg-[#091830] border border-[#263B5C]/50 flex items-center gap-3">
            <img
              src={catalogCar.imageUrl}
              alt={catalogCar.model}
              className="w-16 h-12 rounded-xl object-cover border border-[#263B5C]"
            />
            <div className="text-xs">
              <div className="font-bold text-white">
                {catalogCar.make} {catalogCar.model}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold">
                Parts: {catalogCar.partsAvailability}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full btn-gold py-3 rounded-2xl text-xs font-bold shadow-gold-sm flex items-center justify-center gap-2 mt-2"
          >
            <Plus className="w-4 h-4" /> Save Vehicle to Torqfix Garage
          </button>
        </form>
      </div>
    </div>
  );
};
