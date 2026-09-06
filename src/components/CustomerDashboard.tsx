import React, { useState } from 'react';
import {
  Wrench,
  Car,
  CalendarCheck,
  Bell,
  User,
  Plus,
  Compass,
  FileText,
  Clock,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  Trash2,
  Check,
  PhoneCall
} from 'lucide-react';
import {
  User as UserType,
  Vehicle,
  Booking,
  ServicePackage,
  NotificationItem
} from '@shared/types';
import { PakistaniCarsShowcase } from './PakistaniCarsShowcase';
import { ServicesGrid } from './ServicesGrid';
import { ProgressStepper } from './ProgressStepper';
import { LiveTrackingMap } from './LiveTrackingMap';
import { PakistaniCarModel } from '@shared/cars-catalog';

interface CustomerDashboardProps {
  currentUser: UserType;
  vehicles: Vehicle[];
  activeBooking: Booking | null;
  notifications: NotificationItem[];
  onOpenBookingWizard: (preselectedService?: ServicePackage, preselectedVehicle?: Vehicle) => void;
  onOpenAddVehicle: () => void;
  onDeleteVehicle: (vehicleId: string) => void;
  onSetDefaultVehicle: (vehicleId: string) => void;
  onOpenDiagnosisApproval: (booking: Booking) => void;
  onOpenInvoice: (booking: Booking) => void;
  onQuickAddCar: (car: PakistaniCarModel) => void;
  onUpdateStatusStep?: (status: any) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  currentUser,
  vehicles,
  activeBooking,
  notifications,
  onOpenBookingWizard,
  onOpenAddVehicle,
  onDeleteVehicle,
  onSetDefaultVehicle,
  onOpenDiagnosisApproval,
  onOpenInvoice,
  onQuickAddCar,
  onUpdateStatusStep
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'garage' | 'notifications'>('home');
  const [showLiveTracker, setShowLiveTracker] = useState<boolean>(true);

  const defaultVehicle = vehicles.find((v) => v.isDefault) || vehicles[0];
  const unreadNotifs = notifications.filter((n) => !n.read);

  return (
    <div className="w-full pb-24">
      {/* Top App Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#263B5C] bg-[#071426]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={currentUser.name}
              className="w-11 h-11 rounded-2xl object-cover border-2 border-[#FFD700]/70"
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#071426]" />
          </div>
          <div>
            <div className="text-[11px] text-[#D4AF37] font-semibold tracking-wider uppercase">
              Assalam-o-Alaikum
            </div>
            <h1 className="text-base font-black text-white font-display">
              {currentUser.name}
            </h1>
          </div>
        </div>

        {/* Quick Actions & Notification Bell */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative p-2.5 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] text-slate-300 hover:text-white transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFD700] text-[#071426] text-[10px] font-black flex items-center justify-center">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => onOpenBookingWizard()}
            className="btn-gold px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-gold-sm"
          >
            <Sparkles className="w-4 h-4" /> Book Repair
          </button>
        </div>
      </div>

      {/* Main Tab Navigation Buttons */}
      <div className="flex items-center gap-2 px-4 md:px-6 pt-4 pb-2 overflow-x-auto">
        {[
          { id: 'home', label: 'Overview', icon: Sparkles },
          { id: 'bookings', label: 'Active Repair', icon: Clock },
          { id: 'garage', label: 'My Garage', icon: Car },
          { id: 'notifications', label: 'Notifications', icon: Bell }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#FFD700] text-[#071426] shadow-gold-sm font-black'
                  : 'bg-[#0B1B3A] text-slate-400 hover:text-white border border-[#263B5C]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        {/* TAB 1: HOME OVERVIEW */}
        {activeTab === 'home' && (
          <>
            {/* Active Repair Highlight Card (If Active Booking Exists) */}
            {activeBooking && (
              <div className="glass-card rounded-3xl p-5 border-2 border-[#FFD700]/50 shadow-gold-glow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] animate-ping" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD700]">
                        Vehicle In Active Repair
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        #{activeBooking.bookingCode}
                      </span>
                    </div>
                    <h2 className="text-xl font-black text-white font-display">
                      {activeBooking.vehicle?.year} {activeBooking.vehicle?.make} {activeBooking.vehicle?.model}
                    </h2>
                    <p className="text-xs text-slate-300">
                      {activeBooking.service?.title} • Reg: {activeBooking.vehicle?.registrationNumber}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Diagnosis Pending Action */}
                    {activeBooking.status === 'DIAGNOSIS' && activeBooking.diagnosis && (
                      <button
                        onClick={() => onOpenDiagnosisApproval(activeBooking)}
                        className="btn-gold px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 animate-pulse shadow-gold-sm"
                      >
                        <AlertCircle className="w-4 h-4" /> Review Diagnosis & Cost
                      </button>
                    )}

                    {/* View Invoice */}
                    <button
                      onClick={() => onOpenInvoice(activeBooking)}
                      className="px-3 py-2 rounded-xl bg-[#102445] text-slate-300 hover:text-white border border-[#263B5C] text-xs font-bold flex items-center gap-1.5"
                    >
                      <FileText className="w-4 h-4 text-[#FFD700]" /> Digital Invoice
                    </button>

                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="px-3 py-2 rounded-xl bg-[#102445] text-slate-300 hover:text-white border border-[#263B5C] text-xs font-bold flex items-center gap-1"
                    >
                      Full Tracker <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Stepper Snapshot */}
                <div className="pt-2 border-t border-[#263B5C]/60">
                  <ProgressStepper
                    currentStatus={activeBooking.status}
                    history={activeBooking.statusHistory}
                  />
                </div>
              </div>
            )}

            {/* Active Vehicle Showcase Card */}
            {defaultVehicle && (
              <div className="glass-card rounded-3xl p-5 border border-[#263B5C] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={defaultVehicle.imageUrl || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=300'}
                    alt={defaultVehicle.model}
                    className="w-24 h-18 rounded-2xl object-cover border border-[#263B5C]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30">
                        Primary Garage Car
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        100% Parts Available
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white font-display mt-0.5">
                      {defaultVehicle.year} {defaultVehicle.make} {defaultVehicle.model}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono">
                      Plate: {defaultVehicle.registrationNumber} • {defaultVehicle.engineCc}cc {defaultVehicle.transmission}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <button
                    onClick={() => onOpenBookingWizard(undefined, defaultVehicle)}
                    className="btn-gold px-5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 shadow-gold-sm"
                  >
                    <Wrench className="w-4 h-4" /> Book Service for this Car
                  </button>
                </div>
              </div>
            )}

            {/* Torqfix Core Services Showcase */}
            <ServicesGrid
              onSelectService={(srv) => onOpenBookingWizard(srv, defaultVehicle)}
            />

            {/* Pakistani Common Cars Catalog Showcase */}
            <div className="pt-4">
              <PakistaniCarsShowcase
                onSelectCarForBooking={(car) => onOpenBookingWizard(undefined, undefined)}
                onQuickAddVehicle={onQuickAddCar}
              />
            </div>
          </>
        )}

        {/* TAB 2: ACTIVE BOOKING & LIVE TRACKING */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {activeBooking ? (
              <div className="space-y-6">
                {/* Live GPS Telemetry Map */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-black text-white font-display flex items-center gap-2">
                      <Compass className="w-5 h-5 text-[#FFD700]" /> Live Vehicle & Carrier Telemetry
                    </h3>
                    <span className="text-xs font-mono text-[#FFD700] bg-[#0B1B3A] px-2.5 py-1 rounded-xl border border-[#263B5C]">
                      Carrier: {activeBooking.driver?.vehicleNumber || 'ICT-TOW-01'}
                    </span>
                  </div>

                  <LiveTrackingMap booking={activeBooking} />
                </div>

                {/* Stepper with Interactive Step Testing (Simulation Control) */}
                <div className="glass-card p-6 rounded-3xl border border-[#263B5C]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-black text-white font-display">
                        10-Stage Vehicle Journey
                      </h3>
                      <p className="text-xs text-slate-400">
                        Follow your vehicle from doorstep flatbed pickup to workshop and return handover.
                      </p>
                    </div>

                    {/* Quick Simulation Progress Advance Button */}
                    {onUpdateStatusStep && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Dev Test:</span>
                        <select
                          value={activeBooking.status}
                          onChange={(e) => onUpdateStatusStep(e.target.value)}
                          className="bg-[#0B1B3A] text-xs font-mono text-[#FFD700] border border-[#263B5C] rounded-xl px-2 py-1 focus:outline-none"
                        >
                          {[
                            'BOOKING_CONFIRMED',
                            'DRIVER_ASSIGNED',
                            'VEHICLE_PICKED_UP',
                            'IN_WORKSHOP',
                            'DIAGNOSIS',
                            'REPAIRING',
                            'TESTING',
                            'READY',
                            'RETURNING',
                            'DELIVERED'
                          ].map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <ProgressStepper
                    currentStatus={activeBooking.status}
                    history={activeBooking.statusHistory}
                  />

                  {/* Actions for current state */}
                  <div className="mt-6 pt-4 border-t border-[#263B5C] flex flex-wrap gap-3">
                    {activeBooking.status === 'DIAGNOSIS' && activeBooking.diagnosis && (
                      <button
                        onClick={() => onOpenDiagnosisApproval(activeBooking)}
                        className="btn-gold px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-gold-sm"
                      >
                        <AlertCircle className="w-4 h-4" /> Open Diagnosis & Approve Cost
                      </button>
                    )}

                    <button
                      onClick={() => onOpenInvoice(activeBooking)}
                      className="px-4 py-2.5 rounded-xl bg-[#102445] text-slate-200 hover:text-white border border-[#263B5C] text-xs font-bold flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-[#FFD700]" /> View Work Order & Invoice
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center glass-card rounded-3xl border border-[#263B5C]">
                <Clock className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No Active Repair Booking</h3>
                <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                  Book a flatbed pickup and professional repair for your vehicle in Islamabad, Lahore, or Karachi.
                </p>
                <button
                  onClick={() => onOpenBookingWizard()}
                  className="btn-gold px-6 py-2.5 rounded-2xl text-xs font-black shadow-gold-sm"
                >
                  Book a Repair Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MY GARAGE */}
        {activeTab === 'garage' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white font-display">
                  Torqfix Vehicle Garage
                </h2>
                <p className="text-xs text-slate-400">
                  Manage your personal or fleet vehicles registered for priority servicing.
                </p>
              </div>
              <button
                onClick={onOpenAddVehicle}
                className="btn-gold px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-gold-sm"
              >
                <Plus className="w-4 h-4" /> Add Vehicle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {vehicles.map((veh) => (
                <div
                  key={veh.id}
                  className="glass-card-interactive rounded-3xl overflow-hidden border border-[#263B5C] flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-slate-900">
                      <img
                        src={veh.imageUrl || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600'}
                        alt={veh.model}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A] via-transparent to-transparent" />

                      {veh.isDefault && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FFD700] text-[#071426] text-[10px] font-black uppercase tracking-wider shadow">
                          Primary Vehicle
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <div className="text-xs font-bold text-[#FFD700] uppercase font-mono">
                          {veh.make}
                        </div>
                        <h3 className="text-lg font-black text-white font-display">
                          {veh.model}
                        </h3>
                        <div className="text-xs font-mono text-slate-300 font-bold mt-0.5">
                          Plate: {veh.registrationNumber} ({veh.year})
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 bg-[#071426] p-2.5 rounded-xl border border-[#263B5C]">
                        <div>Engine: <span className="text-white font-bold">{veh.engineCc} cc</span></div>
                        <div>Gear: <span className="text-white font-bold">{veh.transmission}</span></div>
                        <div>Oil: <span className="text-[#FFD700] font-bold">{veh.recommendedOilGrade || '5W-30'}</span></div>
                        <div>Parts: <span className="text-emerald-400 font-bold">{veh.partsAvailabilityRating || 'Ubiquitous'}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-[#263B5C]/60">
                    {!veh.isDefault && (
                      <button
                        onClick={() => onSetDefaultVehicle(veh.id)}
                        className="text-[11px] text-slate-400 hover:text-[#FFD700] font-semibold"
                      >
                        Set as Default
                      </button>
                    )}

                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        onClick={() => onOpenBookingWizard(undefined, veh)}
                        className="btn-gold px-3 py-1.5 rounded-xl text-xs font-black shadow-sm"
                      >
                        Book Repair
                      </button>
                      <button
                        onClick={() => onDeleteVehicle(veh.id)}
                        className="p-1.5 rounded-xl bg-red-950/40 text-red-400 hover:text-red-300 border border-red-500/30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-black text-white font-display">
              In-App Alerts & Vehicle Updates
            </h2>

            {notifications.length === 0 ? (
              <div className="p-8 text-center glass-card rounded-3xl border border-[#263B5C]">
                <Bell className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-400">No notifications yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                      !notif.read
                        ? 'bg-[#102445] border-[#FFD700]/50 shadow-sm'
                        : 'bg-[#0B1B3A] border-[#263B5C]'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bell className="w-4 h-4" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-xs font-bold text-white">{notif.title}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Sticky Mobile Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#071426]/95 border-t border-[#263B5C] px-6 py-2.5 backdrop-blur-xl flex items-center justify-around max-w-lg mx-auto md:rounded-t-3xl shadow-2xl">
        {[
          { id: 'home', label: 'Home', icon: Sparkles },
          { id: 'bookings', label: 'Tracking', icon: Clock },
          { id: 'garage', label: 'Garage', icon: Car },
          { id: 'notifications', label: 'Alerts', icon: Bell }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-[#FFD700]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.id === 'notifications' && unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FFD700]" />
                )}
              </div>
              <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
