import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Smartphone,
  Monitor,
  RotateCcw,
  Truck,
  Building2,
  LayoutDashboard,
  Sparkles,
  Shield,
  User as UserIcon,
  Bell
} from 'lucide-react';
import {
  User,
  Vehicle,
  Booking,
  ServicePackage,
  NotificationItem,
  BookingStatus
} from '@shared/types';
import { SplashScreen } from './components/SplashScreen';
import { CustomerDashboard } from './components/CustomerDashboard';
import { DriverPortal } from './components/DriverPortal';
import { WorkshopPortal } from './components/WorkshopPortal';
import { AdminPanel } from './components/AdminPanel';
import { BookingWizardModal } from './components/BookingWizardModal';
import { AddVehicleModal } from './components/AddVehicleModal';
import { DiagnosisApprovalModal } from './components/DiagnosisApprovalModal';
import { DigitalInvoiceModal } from './components/DigitalInvoiceModal';
import { AuthModal } from './components/AuthModal';
import { PakistaniCarModel } from '@shared/cars-catalog';

export const App: React.FC = () => {
  // Application State
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [currentRole, setCurrentRole] = useState<'customer' | 'driver' | 'workshop' | 'admin'>('customer');
  const [viewMode, setViewMode] = useState<'mobile' | 'expanded'>('mobile');

  // User & Data State
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'usr-customer-01',
    phone: '+923001234567',
    name: 'Hamza Khan',
    email: 'hamza.khan@gmail.com',
    role: 'customer',
    city: 'Islamabad',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    createdAt: new Date().toISOString()
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Modals
  const [isBookingWizardOpen, setIsBookingWizardOpen] = useState(false);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServicePackage | null>(null);
  const [selectedVehicleForBooking, setSelectedVehicleForBooking] = useState<Vehicle | null>(null);

  // Initial Fetch from API
  const refreshData = async () => {
    try {
      // Vehicles
      const vehRes = await fetch('/api/vehicles', {
        headers: { 'x-user-id': currentUser.id }
      });
      const vehData = await vehRes.json();
      if (vehData.vehicles) setVehicles(vehData.vehicles);

      // Bookings
      const bkRes = await fetch('/api/bookings', {
        headers: {
          'x-user-id': currentUser.id,
          'x-user-role': currentRole === 'workshop' ? 'workshop_manager' : currentRole
        }
      });
      const bkData = await bkRes.json();
      if (bkData.bookings) setBookings(bkData.bookings);

      // Notifications
      const notifRes = await fetch('/api/notifications', {
        headers: { 'x-user-id': currentUser.id }
      });
      const notifData = await notifRes.json();
      if (notifData.notifications) setNotifications(notifData.notifications);
    } catch (e) {
      console.error('Failed to fetch data from Torqfix API', e);
    }
  };

  useEffect(() => {
    refreshData();
  }, [currentRole, currentUser.id]);

  // Active primary booking
  const activeBooking = bookings[0] || null;

  // Handlers
  const handleBookingSubmit = async (bookingData: any) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser.id
        },
        body: JSON.stringify(bookingData)
      });
      const data = await res.json();
      if (data.success) {
        await refreshData();
      }
    } catch (e) {
      console.error('Failed to create booking', e);
    }
  };

  const handleAddVehicle = async (vehicleData: any) => {
    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser.id
        },
        body: JSON.stringify(vehicleData)
      });
      const data = await res.json();
      if (data.success) {
        await refreshData();
      }
    } catch (e) {
      console.error('Failed to add vehicle', e);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    try {
      await fetch(`/api/vehicles/${vehicleId}`, { method: 'DELETE' });
      await refreshData();
    } catch (e) {
      console.error('Failed to delete vehicle', e);
    }
  };

  const handleSetDefaultVehicle = async (vehicleId: string) => {
    try {
      await fetch(`/api/vehicles/${vehicleId}/default`, { method: 'PATCH' });
      await refreshData();
    } catch (e) {
      console.error('Failed to set default vehicle', e);
    }
  };

  const handleQuickAddCar = async (car: PakistaniCarModel) => {
    await handleAddVehicle({
      make: car.make,
      model: car.model,
      year: 2023,
      color: 'Super White',
      registrationNumber: `ICT-LE-${Math.floor(1000 + Math.random() * 9000)}`,
      engineCc: car.engineCc,
      transmission: car.transmission,
      fuelType: car.fuelType,
      imageUrl: car.imageUrl,
      isDefault: vehicles.length === 0
    });
  };

  const handleUpdateStatus = async (bookingId: string, status: BookingStatus, note?: string) => {
    try {
      await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, note, actorRole: currentRole })
      });
      await refreshData();
    } catch (e) {
      console.error('Failed to update status', e);
    }
  };

  const handleDiagnosisSubmit = async (
    bookingId: string,
    technicianNotes: string,
    estimatedCompletionHours: number,
    items: any[]
  ) => {
    try {
      await fetch(`/api/bookings/${bookingId}/diagnosis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          technicianName: 'Master Tech Irfan Shah',
          technicianNotes,
          estimatedCompletionHours,
          items
        })
      });
      await refreshData();
      alert('Diagnosis and quote sent to customer!');
    } catch (e) {
      console.error('Failed to submit diagnosis', e);
    }
  };

  const handleApproveRepair = async (approvedItemIds: string[]) => {
    if (!activeBooking) return;
    try {
      await fetch(`/api/bookings/${activeBooking.id}/approve-repair`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true, approvedItemIds })
      });
      setIsDiagnosisOpen(false);
      await refreshData();
    } catch (e) {
      console.error('Failed to approve repair', e);
    }
  };

  const handleRejectRepair = async (reason: string) => {
    if (!activeBooking) return;
    try {
      await fetch(`/api/bookings/${activeBooking.id}/approve-repair`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: false, rejectionReason: reason })
      });
      setIsDiagnosisOpen(false);
      await refreshData();
    } catch (e) {
      console.error('Failed to reject repair', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 flex flex-col selection:bg-[#FFD700] selection:text-[#071426]">
      {/* Animated Splash Screen Overlay */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Global Top Role & Viewport Switcher Bar */}
      <header className="bg-[#0B1B3A] border-b border-[#263B5C] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 shadow-md">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFE247] to-[#D4AF37] text-[#071426] flex items-center justify-center font-black shadow-gold-sm">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold tracking-wider font-display text-sm text-white">
              TORQ<span className="text-[#FFD700]">FIX</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider px-1.5 py-0.5 rounded bg-[#071426] border border-[#263B5C]">
              Pakistan 🇵🇰
            </span>
          </div>
        </div>

        {/* 4 Role Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#071426] border border-[#263B5C]">
          {[
            { id: 'customer', label: 'Customer App', icon: Smartphone },
            { id: 'driver', label: 'Driver Carrier', icon: Truck },
            { id: 'workshop', label: 'Workshop Bays', icon: Building2 },
            { id: 'admin', label: 'Executive Admin', icon: LayoutDashboard }
          ].map((role) => {
            const Icon = role.icon;
            const isActive = currentRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => {
                  setCurrentRole(role.id as any);
                  if (role.id === 'admin') setViewMode('expanded');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-[#FFD700] text-[#071426] shadow-gold-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{role.label}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport Frame Mode Toggle & User Login */}
        <div className="flex items-center gap-2">
          {currentRole === 'customer' && (
            <div className="flex items-center p-1 rounded-xl bg-[#071426] border border-[#263B5C]">
              <button
                title="Mobile Phone Viewport"
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'mobile' ? 'bg-[#102445] text-[#FFD700]' : 'text-slate-400'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                title="Expanded Desktop Responsive View"
                onClick={() => setViewMode('expanded')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'expanded' ? 'bg-[#102445] text-[#FFD700]' : 'text-slate-400'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={() => setShowSplash(true)}
            title="Replay Splash Screen"
            className="p-2 rounded-xl bg-[#071426] border border-[#263B5C] text-slate-400 hover:text-[#FFD700] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsAuthOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#102445] hover:bg-[#1B3B6F] text-xs font-bold text-[#FFD700] border border-[#263B5C] flex items-center gap-1.5 transition-colors"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{currentUser.phone}</span>
          </button>
        </div>
      </header>

      {/* Main View Container */}
      <main className="flex-1 flex justify-center w-full">
        {currentRole === 'customer' ? (
          viewMode === 'mobile' ? (
            /* Mobile Device Simulator Frame */
            <div className="py-6 px-2 w-full flex justify-center items-start">
              <div className="w-full max-w-[420px] rounded-[44px] border-[6px] border-[#102445] bg-[#071426] shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(255,215,0,0.15)] overflow-hidden relative min-h-[840px] flex flex-col">
                {/* Simulated Phone Notch & Speaker */}
                <div className="w-full pt-3 pb-1 flex justify-center bg-[#071426] relative z-40">
                  <div className="w-24 h-4 rounded-full bg-[#102445] flex items-center justify-center">
                    <div className="w-8 h-1 rounded-full bg-slate-700" />
                  </div>
                </div>

                {/* Customer App Content inside Phone Frame */}
                <div className="flex-1 overflow-y-auto">
                  <CustomerDashboard
                    currentUser={currentUser}
                    vehicles={vehicles}
                    activeBooking={activeBooking}
                    notifications={notifications}
                    onOpenBookingWizard={(srv, veh) => {
                      setSelectedServiceForBooking(srv || null);
                      setSelectedVehicleForBooking(veh || null);
                      setIsBookingWizardOpen(true);
                    }}
                    onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
                    onDeleteVehicle={handleDeleteVehicle}
                    onSetDefaultVehicle={handleSetDefaultVehicle}
                    onOpenDiagnosisApproval={() => setIsDiagnosisOpen(true)}
                    onOpenInvoice={() => setIsInvoiceOpen(true)}
                    onQuickAddCar={handleQuickAddCar}
                    onUpdateStatusStep={(st) => {
                      if (activeBooking) handleUpdateStatus(activeBooking.id, st);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Expanded Full-Width Responsive View */
            <div className="w-full">
              <CustomerDashboard
                currentUser={currentUser}
                vehicles={vehicles}
                activeBooking={activeBooking}
                notifications={notifications}
                onOpenBookingWizard={(srv, veh) => {
                  setSelectedServiceForBooking(srv || null);
                  setSelectedVehicleForBooking(veh || null);
                  setIsBookingWizardOpen(true);
                }}
                onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
                onDeleteVehicle={handleDeleteVehicle}
                onSetDefaultVehicle={handleSetDefaultVehicle}
                onOpenDiagnosisApproval={() => setIsDiagnosisOpen(true)}
                onOpenInvoice={() => setIsInvoiceOpen(true)}
                onQuickAddCar={handleQuickAddCar}
                onUpdateStatusStep={(st) => {
                  if (activeBooking) handleUpdateStatus(activeBooking.id, st);
                }}
              />
            </div>
          )
        ) : currentRole === 'driver' ? (
          <div className="w-full">
            <DriverPortal booking={activeBooking} onUpdateStatus={handleUpdateStatus} />
          </div>
        ) : currentRole === 'workshop' ? (
          <div className="w-full">
            <WorkshopPortal
              bookings={bookings}
              onUpdateStatus={handleUpdateStatus}
              onSubmitDiagnosis={handleDiagnosisSubmit}
            />
          </div>
        ) : (
          <div className="w-full">
            <AdminPanel
              bookings={bookings}
              onAssignDriver={(bId, dId) => {
                fetch(`/api/admin/bookings/${bId}/assign-driver`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ driverId: dId })
                }).then(() => refreshData());
              }}
              onAssignWorkshop={(bId, wId) => {
                fetch(`/api/admin/bookings/${bId}/assign-workshop`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ workshopId: wId })
                }).then(() => refreshData());
              }}
              onUpdateStatus={(bId, st) => handleUpdateStatus(bId, st)}
            />
          </div>
        )}
      </main>

      {/* MODALS */}
      <BookingWizardModal
        vehicles={vehicles}
        isOpen={isBookingWizardOpen}
        onClose={() => setIsBookingWizardOpen(false)}
        onSubmitBooking={handleBookingSubmit}
        preselectedService={selectedServiceForBooking}
        preselectedVehicle={selectedVehicleForBooking}
      />

      <AddVehicleModal
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
        onAddVehicle={handleAddVehicle}
      />

      {activeBooking && (
        <DiagnosisApprovalModal
          booking={activeBooking}
          isOpen={isDiagnosisOpen}
          onClose={() => setIsDiagnosisOpen(false)}
          onApprove={handleApproveRepair}
          onReject={handleRejectRepair}
        />
      )}

      {activeBooking && (
        <DigitalInvoiceModal
          booking={activeBooking}
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
          onPaySuccess={() => refreshData()}
        />
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          refreshData();
        }}
      />
    </div>
  );
};
