import React from 'react';
import {
  CheckCircle2,
  CalendarCheck,
  Truck,
  ArrowUpCircle,
  Building2,
  Stethoscope,
  Wrench,
  CheckCheck,
  Sparkles,
  ArrowDownCircle,
  PackageCheck,
  Clock
} from 'lucide-react';
import { BookingStatus, BookingStatusHistory } from '@shared/types';

interface ProgressStepperProps {
  currentStatus: BookingStatus;
  history?: BookingStatusHistory[];
  onStepClick?: (status: BookingStatus) => void;
  interactive?: boolean;
}

interface StepMeta {
  key: BookingStatus;
  label: string;
  description: string;
  icon: React.ElementType;
}

const STEPS: StepMeta[] = [
  { key: 'BOOKING_CONFIRMED', label: 'Booking Confirmed', description: 'Request received & scheduled', icon: CalendarCheck },
  { key: 'DRIVER_ASSIGNED', label: 'Driver Assigned', description: 'Flatbed carrier dispatched', icon: Truck },
  { key: 'VEHICLE_PICKED_UP', label: 'Vehicle Picked Up', description: 'Loaded after 360° inspection', icon: ArrowUpCircle },
  { key: 'IN_WORKSHOP', label: 'In Workshop', description: 'Arrived at service bay', icon: Building2 },
  { key: 'DIAGNOSIS', label: 'Diagnosis & Estimate', description: 'Inspection & quote approval', icon: Stethoscope },
  { key: 'REPAIRING', label: 'Repairing & Parts', description: 'Master tech servicing engine/parts', icon: Wrench },
  { key: 'TESTING', label: 'Quality Road Testing', description: 'Safety & computer scan verification', icon: CheckCheck },
  { key: 'READY', label: 'Ready for Return', description: 'Detail wash & delivery prep', icon: Sparkles },
  { key: 'RETURNING', label: 'Returning to You', description: 'Carrier en route to your doorstep', icon: ArrowDownCircle },
  { key: 'DELIVERED', label: 'Delivered & Completed', description: 'Vehicle safely handed over', icon: PackageCheck }
];

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  currentStatus,
  history = [],
  onStepClick,
  interactive = false
}) => {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStatus);

  // Helper to find timestamp from history
  const getStepTimestamp = (key: BookingStatus) => {
    const item = history.find((h) => h.status === key);
    if (!item) return null;
    const d = new Date(item.createdAt);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full">
      {/* Visual Compact Progress Bar */}
      <div className="mb-6 bg-[#0B1B3A] p-4 rounded-2xl border border-[#263B5C]">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Live Stage Progress
            </span>
          </div>
          <span className="text-xs font-bold text-[#FFD700]">
            Step {Math.max(1, currentIndex + 1)} of {STEPS.length}
          </span>
        </div>

        <div className="w-full bg-[#102445] h-2.5 rounded-full overflow-hidden flex border border-[#263B5C]">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#FFE247] transition-all duration-500 rounded-full"
            style={{ width: `${((Math.max(0, currentIndex) + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Stepper Timeline List */}
      <div className="relative pl-3 space-y-4">
        {/* Continuous Connecting Line */}
        <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-[#263B5C]" />

        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isPending = idx > currentIndex;
          const timestamp = getStepTimestamp(step.key);
          const Icon = step.icon;

          return (
            <div
              key={step.key}
              onClick={() => interactive && onStepClick && onStepClick(step.key)}
              className={`relative flex items-start gap-3.5 group transition-all duration-200 ${
                interactive ? 'cursor-pointer hover:bg-[#102445]/40 p-2 rounded-xl -ml-2' : ''
              }`}
            >
              {/* Node Icon Circle */}
              <div
                className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                    : isCurrent
                    ? 'bg-[#FFD700] text-[#071426] border-2 border-white shadow-gold-glow scale-110 font-bold'
                    : 'bg-[#0B1B3A] text-slate-500 border border-[#263B5C]'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>

              {/* Step Info Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-sm font-bold tracking-tight transition-colors ${
                      isCurrent
                        ? 'text-[#FFD700]'
                        : isCompleted
                        ? 'text-slate-200'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.label}
                  </h4>

                  {/* Status / Timestamp Pill */}
                  {timestamp && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-[#0B1B3A] px-2 py-0.5 rounded-full border border-[#263B5C]">
                      <Clock className="w-2.5 h-2.5 text-[#D4AF37]" />
                      {timestamp}
                    </span>
                  )}
                  {isCurrent && !timestamp && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#071426] bg-[#FFD700] px-2 py-0.5 rounded-full animate-pulse">
                      In Progress
                    </span>
                  )}
                </div>

                <p
                  className={`text-xs mt-0.5 line-clamp-1 ${
                    isCurrent ? 'text-slate-300 font-medium' : 'text-slate-500'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
