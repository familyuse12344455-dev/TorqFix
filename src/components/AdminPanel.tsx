import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Truck,
  Car,
  Building2,
  Wrench,
  CreditCard,
  FileText,
  Search,
  Filter,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { Booking, BookingStatus } from '@shared/types';

interface AdminPanelProps {
  bookings: Booking[];
  onAssignDriver: (bookingId: string, driverId: string) => void;
  onAssignWorkshop: (bookingId: string, workshopId: string) => void;
  onUpdateStatus: (bookingId: string, status: BookingStatus) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  bookings,
  onAssignDriver,
  onAssignWorkshop,
  onUpdateStatus
}) => {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, [bookings]);

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.vehicle &&
        `${b.vehicle.make} ${b.vehicle.model} ${b.vehicle.registrationNumber}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const dailyData = stats?.charts?.dailyBookingsSeries || [
    { day: 'Mon', bookings: 12, revenue: 142000 },
    { day: 'Tue', bookings: 19, revenue: 218000 },
    { day: 'Wed', bookings: 15, revenue: 184000 },
    { day: 'Thu', bookings: 22, revenue: 295000 },
    { day: 'Fri', bookings: 28, revenue: 380000 },
    { day: 'Sat', bookings: 34, revenue: 450000 },
    { day: 'Sun', bookings: 26, revenue: 310000 }
  ];

  const serviceData = stats?.charts?.serviceDistribution || [
    { name: 'Periodic Oil Change', count: 42, color: '#FFD700' },
    { name: 'AC Servicing', count: 35, color: '#38BDF8' },
    { name: 'Engine Tuning', count: 28, color: '#F59E0B' },
    { name: 'Brake System', count: 22, color: '#EC4899' },
    { name: 'Detailing & Spa', count: 31, color: '#10B981' }
  ];

  const kpis = stats?.kpis || {
    totalBookings: 194,
    activeRepairs: 4,
    vehiclesInWorkshop: 4,
    pendingApprovals: 1,
    completedRepairs: 182,
    totalRevenuePkr: 2480000,
    pendingPaymentsPkr: 85000,
    fleetAvailableCount: 6,
    fleetTotalCount: 8
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#071426] text-white">
      {/* Admin Sidebar */}
      <div className="w-full lg:w-64 bg-[#0B1B3A] border-b lg:border-b-0 lg:border-r border-[#263B5C] p-5 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFE247] to-[#D4AF37] text-[#071426] flex items-center justify-center font-black shadow-gold-sm">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-black tracking-wider font-display">
                TORQ<span className="text-[#FFD700]">FIX</span>
              </div>
              <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">
                Admin Console
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'bookings', label: 'All Bookings', icon: Calendar },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'drivers', label: 'Drivers & Fleet', icon: Truck },
              { id: 'workshops', label: 'Workshops & Bays', icon: Building2 },
              { id: 'reports', label: 'Financial Reports', icon: TrendingUp }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#FFD700] text-[#071426] shadow-gold-sm font-black'
                      : 'text-slate-300 hover:bg-[#102445] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#263B5C] text-xs font-mono text-slate-400">
          <div className="text-[10px] uppercase text-[#D4AF37] font-bold">Territory</div>
          <div>Pakistan (ISB • LHR • KHI)</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 space-y-6 overflow-x-hidden">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white font-display">
              Operations & Telemetry Command Center
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Live oversight of Pakistani customer bookings, flatbed tow dispatches, and workshop bay turnaround.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live Operations 100%
            </span>
          </div>
        </div>

        {/* Executive KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-2xl border border-[#263B5C]">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Total Bookings</div>
            <div className="text-2xl font-black text-white font-display mt-1">
              {kpis.totalBookings}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">↑ 18% this week</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-[#FFD700]/50 shadow-gold-sm">
            <div className="text-[10px] text-[#FFD700] font-semibold uppercase">Active Repairs in Bay</div>
            <div className="text-2xl font-black text-[#FFD700] font-display mt-1">
              {kpis.activeRepairs} Bays
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Occupancy: 42%</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-[#263B5C]">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Pending Approvals</div>
            <div className="text-2xl font-black text-amber-400 font-display mt-1">
              {kpis.pendingApprovals}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Awaiting Customer</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-[#263B5C]">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Gross Revenue (PKR)</div>
            <div className="text-xl font-black text-white font-mono mt-1">
              PKR {(kpis.totalRevenuePkr / 1000).toFixed(0)}k
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">98.4% Collection Rate</div>
          </div>
        </div>

        {/* Analytics Charts Section (Recharts) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Bookings & Revenue Trend */}
          <div className="lg:col-span-2 glass-card p-5 rounded-3xl border border-[#263B5C] space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#FFD700]" /> Daily Bookings & Revenue (PKR)
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Past 7 Days</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD700" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B1B3A',
                      borderColor: '#263B5C',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '11px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#FFD700"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#goldGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Service Distribution Pie Chart */}
          <div className="glass-card p-5 rounded-3xl border border-[#263B5C] space-y-3">
            <h3 className="text-sm font-bold text-white">Repair Category Breakdown</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {serviceData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B1B3A',
                      borderColor: '#263B5C',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '11px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              {serviceData.slice(0, 4).map((s: any) => (
                <div key={s.name} className="flex items-center gap-1.5 text-slate-300 truncate">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="truncate">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings Management Table */}
        <div className="glass-card p-6 rounded-3xl border border-[#263B5C] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-black text-white font-display">
              Live Dispatch & Repair Work Orders
            </h3>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search code, plate, address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-[#0B1B3A] border border-[#263B5C] text-xs text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-[#0B1B3A] border border-[#263B5C] text-xs text-white focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="BOOKING_CONFIRMED">Confirmed</option>
                <option value="DRIVER_ASSIGNED">Driver Assigned</option>
                <option value="IN_WORKSHOP">In Workshop</option>
                <option value="DIAGNOSIS">Diagnosis</option>
                <option value="REPAIRING">Repairing</option>
                <option value="TESTING">Testing</option>
                <option value="READY">Ready</option>
                <option value="DELIVERED">Delivered</option>
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-[#263B5C] overflow-x-auto bg-[#0B1B3A]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#102445] text-slate-300 font-bold border-b border-[#263B5C]">
                <tr>
                  <th className="p-3">Booking Code</th>
                  <th className="p-3">Vehicle</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Driver / Workshop</th>
                  <th className="p-3">Estimate (PKR)</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#263B5C]/60 text-slate-300">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#102445]/50 transition-colors">
                    <td className="p-3 font-mono font-bold text-[#FFD700]">
                      #{b.bookingCode}
                    </td>

                    <td className="p-3">
                      <div className="font-bold text-white">
                        {b.vehicle?.year} {b.vehicle?.make} {b.vehicle?.model}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {b.vehicle?.registrationNumber}
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="font-medium text-slate-200">{b.service?.title}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-xs">
                        {b.pickupAddress}
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 font-mono">
                        {b.status.replace(/_/g, ' ')}
                      </span>
                    </td>

                    <td className="p-3 text-[11px]">
                      <div className="text-white font-semibold">
                        {b.driver?.name || 'Unassigned Driver'}
                      </div>
                      <div className="text-slate-400">
                        {b.workshop?.name || 'Islamabad Bay 4'}
                      </div>
                    </td>

                    <td className="p-3 font-mono font-bold text-white">
                      PKR {(b.finalCostPkr || b.estimatedCostPkr).toLocaleString()}
                    </td>

                    <td className="p-3 text-right">
                      <select
                        value={b.status}
                        onChange={(e) => onUpdateStatus(b.id, e.target.value as any)}
                        className="bg-[#071426] text-slate-300 hover:text-white border border-[#263B5C] rounded-lg px-2 py-1 text-[11px] focus:outline-none"
                      >
                        <option value="BOOKING_CONFIRMED">Confirmed</option>
                        <option value="DRIVER_ASSIGNED">Driver Assigned</option>
                        <option value="VEHICLE_PICKED_UP">Picked Up</option>
                        <option value="IN_WORKSHOP">In Workshop</option>
                        <option value="DIAGNOSIS">Diagnosis</option>
                        <option value="REPAIRING">Repairing</option>
                        <option value="TESTING">Testing</option>
                        <option value="READY">Ready</option>
                        <option value="RETURNING">Returning</option>
                        <option value="DELIVERED">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
