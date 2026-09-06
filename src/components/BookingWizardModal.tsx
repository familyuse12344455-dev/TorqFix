import React, { useState } from 'react';
import {
  X,
  Car,
  Wrench,
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  Clock,
  Truck,
  Sparkles
} from 'lucide-react';
import { Vehicle, ServicePackage, Booking } from '@shared/types';
import { SERVICES_CATALOG } from '@shared/services-catalog';
import { SwipeToConfirm } from './SwipeToConfirm';

interface BookingWizardModalProps {
  vehicles: Vehicle[];
  isOpen: boolean;
  onClose: () => void;
  onSubmitBooking: (bookingData: any) => void;
  preselectedService?: ServicePackage | null;
  preselectedVehicle?: Vehicle | null;
}

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({
  vehicles,
  isOpen,
  onClose,
  onSubmitBooking,
  preselectedService,
  preselectedVehicle
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    preselectedVehicle?.id || vehicles[0]?.id || ''
  );
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedService?.id || SERVICES_CATALOG[0].id
  );
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [city, setCity] = useState<string>('Islamabad');
  const [pickupAddress, setPickupAddress] = useState<string>(
    'House 28, Street 14, Sector F-7/2, Islamabad'
  );
  const [returnAddress, setReturnAddress] = useState<string>(
    'House 28, Street 14, Sector F-7/2, Islamabad'
  );
  const [isAsap, setIsAsap] = useState<boolean>(true);
  const [scheduledDate, setScheduledDate] = useState<string>('2026-09-07');
  const [scheduledTime, setScheduledTime] = useState<string>('10:30');

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];
  const selectedService = SERVICES_CATALOG.find((s) => s.id === selectedServiceId) || SERVICES_CATALOG[0];

  const pickupFee = 1500;
  const baseServiceCost = selectedService.basePricePkr;
  const totalEstimatedCost = pickupFee + baseServiceCost;

  const handleFinalConfirm = () => {
    onSubmitBooking({
      vehicleId: selectedVehicle?.id,
      serviceId: selectedService.id,
      problemDescription,
      pickupAddress,
      pickupLatitude: 33.7215,
      pickupLongitude: 73.0520,
      returnAddress,
      returnLatitude: 33.7215,
      returnLongitude: 73.0520,
      isAsap,
      scheduledAt: isAsap ? undefined : `${scheduledDate}T${scheduledTime}:00`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#071426] border border-[#263B5C] rounded-3xl overflow-hidden shadow-2xl my-6 flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#0B1B3A] to-[#102445] border-b border-[#263B5C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/20 border border-[#FFD700]/50 flex items-center justify-center text-[#FFD700]">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white font-display">
                Book Torqfix Repair & Pickup
              </h3>
              <p className="text-xs text-[#D4AF37] font-semibold">
                Step {step} of 7: {
                  step === 1 ? 'Select Vehicle' :
                  step === 2 ? 'Select Service Package' :
                  step === 3 ? 'Describe Issue' :
                  step === 4 ? 'Pickup & Return Location' :
                  step === 5 ? 'Choose Schedule' :
                  step === 6 ? 'Estimated Quote' : 'Confirm & Dispatch'
                }
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

        {/* Multi-Step Horizontal Indicator */}
        <div className="px-6 pt-4 pb-2 bg-[#091830] border-b border-[#263B5C]/50 flex items-center justify-between">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  s < step
                    ? 'bg-emerald-500 text-slate-950'
                    : s === step
                    ? 'bg-[#FFD700] text-[#071426] shadow-gold-sm font-extrabold ring-2 ring-[#FFD700]/30'
                    : 'bg-[#102445] text-slate-500 border border-[#263B5C]'
                }`}
              >
                {s < step ? '✓' : s}
              </div>
              {s < 7 && (
                <div
                  className={`flex-1 h-0.5 mx-1.5 transition-all ${
                    s < step ? 'bg-emerald-500' : 'bg-[#263B5C]'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
          {/* STEP 1: Select Vehicle */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Select Vehicle from your Garage</h4>
              {vehicles.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-[#0B1B3A] border border-[#263B5C]">
                  <Car className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">No vehicles added yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicles.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                        selectedVehicleId === v.id
                          ? 'bg-[#102445] border-[#FFD700] shadow-gold-sm'
                          : 'bg-[#0B1B3A] border-[#263B5C] hover:border-slate-500'
                      }`}
                    >
                      <img
                        src={v.imageUrl || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=150'}
                        alt={v.model}
                        className="w-16 h-12 rounded-xl object-cover border border-[#263B5C]"
                      />
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">
                          {v.year} {v.make} {v.model}
                        </div>
                        <div className="text-[11px] font-mono text-[#FFD700]">
                          {v.registrationNumber}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {v.engineCc}cc • {v.transmission}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Select Service */}
          {step === 2 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">Choose Automotive Service</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {SERVICES_CATALOG.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedServiceId === srv.id
                        ? 'bg-[#102445] border-[#FFD700] shadow-gold-sm'
                        : 'bg-[#0B1B3A] border-[#263B5C] hover:border-slate-500'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase font-bold text-[#D4AF37]">
                          {srv.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ~{srv.estimatedHours} hrs
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white mb-1.5">{srv.title}</h5>
                      <p className="text-[11px] text-slate-300 line-clamp-2">{srv.description}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#263B5C]/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">Base Estimate:</span>
                      <span className="text-xs font-mono font-bold text-[#FFD700]">
                        PKR {srv.basePricePkr.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Describe Problem */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Describe Vehicle Symptoms</h4>
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1 block">
                  Problem Description / Symptoms:
                </label>
                <textarea
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="E.g., Engine shaking at 60 km/h, AC blowing warm air, or squeaking noise when applying front brakes..."
                  rows={4}
                  className="w-full p-3 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              {/* Photo Upload Simulation */}
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1 block">
                  Attach Photo / Video (Optional):
                </label>
                <div
                  onClick={() => alert('Simulated camera / photo selector: 2 vehicle photos attached.')}
                  className="border-2 border-dashed border-[#263B5C] hover:border-[#FFD700] rounded-2xl p-6 text-center cursor-pointer bg-[#0B1B3A]/40 transition-colors"
                >
                  <Upload className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">Tap to upload photos of vehicle or dashboard warning lights</p>
                  <p className="text-[10px] text-slate-400 mt-1">Supports JPG, PNG up to 15MB</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Pickup & Return Location */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Doorstep Pickup & Return Addresses</h4>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1 block">Operating City:</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Islamabad', 'Lahore', 'Karachi'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCity(c)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        city === c
                          ? 'bg-[#FFD700] text-[#071426] border-[#FFD700]'
                          : 'bg-[#0B1B3A] text-slate-400 border-[#263B5C]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1 block">
                  Doorstep Pickup Address:
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#FFD700] absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0B1B3A] border border-[#263B5C] text-xs text-white focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1 block">
                  Return Drop-off Address:
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#38BDF8] absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={returnAddress}
                    onChange={(e) => setReturnAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0B1B3A] border border-[#263B5C] text-xs text-white focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Schedule */}
          {step === 5 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">When should we pickup your car?</h4>

              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setIsAsap(true)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isAsap
                      ? 'bg-[#102445] border-[#FFD700] shadow-gold-sm'
                      : 'bg-[#0B1B3A] border-[#263B5C]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-5 h-5 text-[#FFD700]" />
                    <span className="text-xs font-black text-white">Immediate (ASAP)</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Flatbed carrier dispatches to your location in 30-45 minutes.
                  </p>
                </div>

                <div
                  onClick={() => setIsAsap(false)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    !isAsap
                      ? 'bg-[#102445] border-[#FFD700] shadow-gold-sm'
                      : 'bg-[#0B1B3A] border-[#263B5C]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-5 h-5 text-[#38BDF8]" />
                    <span className="text-xs font-black text-white">Schedule Later</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Pick a convenient date and time window for carrier pickup.
                  </p>
                </div>
              </div>

              {!isAsap && (
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#0B1B3A] border border-[#263B5C]">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Date:</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full p-2 rounded-xl bg-[#071426] border border-[#263B5C] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Time Slot:</label>
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full p-2 rounded-xl bg-[#071426] border border-[#263B5C] text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: Price Estimate */}
          {step === 6 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Upfront Transparent Cost Estimate</h4>

              <div className="p-4 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] space-y-3 font-mono text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Torqfix Flatbed Pickup & Delivery:</span>
                  <span className="font-bold text-white">PKR {pickupFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>{selectedService.title}:</span>
                  <span className="font-bold text-white">
                    PKR {baseServiceCost.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#263B5C] flex justify-between text-sm font-black">
                  <span className="text-white font-sans">Total Estimated Amount:</span>
                  <span className="text-[#FFD700]">PKR {totalEstimatedCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                <strong>Transparent Guarantee:</strong> This is a baseline package estimate. If additional replacement parts or mechanical overhaul are required, the workshop technician will upload a photo-documented inspection report for your approval before any extra work is performed.
              </div>
            </div>
          )}

          {/* STEP 7: Confirm Booking */}
          {step === 7 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Review & Confirm Request</h4>

              <div className="p-4 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-[#263B5C]/50 pb-2">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="font-bold text-white">
                    {selectedVehicle?.year} {selectedVehicle?.make} {selectedVehicle?.model} ({selectedVehicle?.registrationNumber})
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#263B5C]/50 pb-2">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-bold text-[#FFD700]">{selectedService.title}</span>
                </div>

                <div className="flex justify-between border-b border-[#263B5C]/50 pb-2">
                  <span className="text-slate-400">Pickup Location:</span>
                  <span className="font-bold text-white truncate max-w-xs text-right">
                    {pickupAddress}
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#263B5C]/50 pb-2">
                  <span className="text-slate-400">Timing:</span>
                  <span className="font-bold text-white">
                    {isAsap ? 'Immediate Flatbed Dispatch (~35 mins)' : `${scheduledDate} at ${scheduledTime}`}
                  </span>
                </div>

                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span className="text-slate-300">Estimated Total:</span>
                  <span className="text-[#FFD700] font-mono">
                    PKR {totalEstimatedCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Swipe To Confirm Booking */}
              <div className="pt-2">
                <SwipeToConfirm
                  label="Swipe to Confirm Repair Request"
                  onConfirm={handleFinalConfirm}
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Navigation Buttons */}
        <div className="p-5 bg-[#091830] border-t border-[#263B5C] flex items-center justify-between">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="px-4 py-2 rounded-xl bg-[#102445] text-slate-300 hover:text-white border border-[#263B5C] text-xs font-bold disabled:opacity-40 flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {step < 7 && (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(7, s + 1))}
              className="btn-gold px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
