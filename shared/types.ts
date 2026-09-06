// ==========================================================
// TORQFIX — Shared TypeScript Definitions
// ==========================================================

export type UserRole = 'customer' | 'driver' | 'workshop_manager' | 'admin';

export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  role: UserRole;
  city: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  registrationNumber: string;
  vin?: string;
  engineCc: number;
  transmission: 'Automatic' | 'Manual' | 'AGS' | 'CVT';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  imageUrl?: string;
  isDefault?: boolean;
  partsAvailabilityRating?: 'High' | 'Very High' | 'Ubiquitous';
  recommendedOilGrade?: string;
}

export type BookingStatus =
  | 'BOOKING_CONFIRMED'
  | 'DRIVER_ASSIGNED'
  | 'VEHICLE_PICKED_UP'
  | 'IN_WORKSHOP'
  | 'DIAGNOSIS'
  | 'REPAIRING'
  | 'TESTING'
  | 'READY'
  | 'RETURNING'
  | 'DELIVERED'
  | 'CANCELLED';

export interface BookingStatusStep {
  key: BookingStatus;
  label: string;
  description: string;
  actor: 'System' | 'Driver' | 'Workshop' | 'Customer';
  icon: string;
}

export interface Workshop {
  id: string;
  name: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  bayCapacity: number;
  activeBays: number;
  status: 'active' | 'busy' | 'maintenance' | 'offline';
  rating: number;
}

export interface Driver {
  id: string;
  userId: string;
  name: string;
  phone: string;
  licenseNumber: string;
  vehicleType: string;
  vehicleNumber: string;
  availabilityStatus: 'available' | 'assigned' | 'on_route' | 'offline';
  currentLatitude: number;
  currentLongitude: number;
  rating: number;
  completedTrips: number;
  avatarUrl?: string;
}

export interface ServicePackage {
  id: string;
  category: string;
  title: string;
  description: string;
  estimatedHours: number;
  basePricePkr: number;
  icon: string;
  imageUrl: string;
  isPopular: boolean;
  includedChecklist: string[];
}

export interface RepairItem {
  id: string;
  diagnosisId: string;
  itemType: 'part' | 'labor' | 'fluid' | 'consumable';
  name: string;
  partNumber?: string;
  quantity: number;
  unitPricePkr: number;
  totalPricePkr: number;
  approved: boolean;
}

export interface Diagnosis {
  id: string;
  bookingId: string;
  technicianName: string;
  technicianNotes: string;
  estimatedCompletionHours: number;
  customerApproved: boolean | null; // null = pending
  approvedAt?: string;
  rejectionReason?: string;
  items: RepairItem[];
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  userId: string;
  vehicleId: string;
  driverId?: string;
  workshopId?: string;
  serviceId: string;
  problemDescription?: string;
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  returnAddress: string;
  returnLatitude: number;
  returnLongitude: number;
  isAsap: boolean;
  scheduledAt?: string;
  status: BookingStatus;
  pickupFeePkr: number;
  estimatedCostPkr: number;
  approvedAdditionalPkr: number;
  finalCostPkr?: number;
  createdAt: string;
  updatedAt: string;
  // Hydrated fields
  user?: User;
  vehicle?: Vehicle;
  driver?: Driver;
  workshop?: Workshop;
  service?: ServicePackage;
  diagnosis?: Diagnosis;
  statusHistory?: BookingStatusHistory[];
}

export interface BookingStatusHistory {
  id: string;
  bookingId: string;
  status: BookingStatus;
  note: string;
  actorRole: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amountPkr: number;
  method: 'cash_on_delivery' | 'jazzcash' | 'easypaisa' | 'raast' | 'card';
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  transactionReference?: string;
  invoiceNumber: string;
  paidAt?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'driver' | 'workshop' | 'diagnosis' | 'payment' | 'system';
  referenceId?: string;
  read: boolean;
  createdAt: string;
}
