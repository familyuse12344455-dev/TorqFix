// ==========================================================
// TORQFIX — Premium Automotive Services Catalog
// Detailed Service Packages with PKR Pricing & Checklists
// ==========================================================

import { ServicePackage } from './types';

export const SERVICES_CATALOG: ServicePackage[] = [
  {
    id: 'srv-oil-service',
    category: 'Periodic Maintenance',
    title: 'Periodic Maintenance & Oil Service',
    description: 'Complete synthetic engine oil replacement (Mobil 1 / Total Quartz / Liqui Moly), OEM oil filter, air & AC cabin filter service, and comprehensive 35-point safety inspection.',
    estimatedHours: 2.0,
    basePricePkr: 8500,
    icon: 'Droplet',
    imageUrl: '/assets/service_oil_change.jpg',
    isPopular: true,
    includedChecklist: [
      'Synthetic Engine Oil 4L Drain & Fill',
      'Genuine OEM Japanese Spin-on Oil Filter',
      'Air Intake Filter Compressed Air Cleaning / Inspection',
      'AC Cabin Pollen Filter Inspection',
      'Brake, Power Steering & Windshield Washer Top-up',
      '35-Point Undercarriage & Safety Audit'
    ]
  },
  {
    id: 'srv-ac-overhaul',
    category: 'Climate Control',
    title: 'AC Repair & Cooling Overhaul',
    description: 'Computerized AC diagnostic scan, compressor pressure & magnetic clutch test, pure DuPont R134a refrigerant recharge, condenser coil foam wash, and cabin antibacterial deodorization.',
    estimatedHours: 3.5,
    basePricePkr: 14500,
    icon: 'Wind',
    imageUrl: '/assets/service_ac_repair.jpg',
    isPopular: true,
    includedChecklist: [
      'High & Low Pressure AC Manifold Gauge Diagnostics',
      'Vacuum Leak Detection & Moisture Purge',
      '100% Pure R134a Refrigerant Gas Recharge',
      'Compressor Lubricant PAG Oil Replenishment',
      'High-Pressure Condenser Chemical Foam Cleaning',
      'Digital Infrared Vent Temperature Verification'
    ]
  },
  {
    id: 'srv-engine-tuning',
    category: 'Engine & Powertrain',
    title: 'Computerized Diagnostic & Tuning',
    description: 'High-tech OBD-II live telemetry scan, fuel injector ultrasonic bath, electronic throttle body calibration, iridium spark plug inspection, and catalytic converter backpressure analysis.',
    estimatedHours: 3.0,
    basePricePkr: 11500,
    icon: 'Cpu',
    imageUrl: '/assets/service_engine_repair.jpg',
    isPopular: true,
    includedChecklist: [
      'Full ECU Fault Code Scanning & Live Data Logging',
      '4x Multi-Port Fuel Injector Ultrasonic Cleaning',
      'Electronic Throttle Body Idle Calibration',
      'Spark Plugs Gap Check & Electrode Cleaning',
      'Oxygen & MAF Sensor Testing',
      'Fuel Pump Pressure Delivery Verification'
    ]
  },
  {
    id: 'srv-car-wash-detailing',
    category: 'Detailing & Spa',
    title: 'Ceramic Wash & Premium Detailing',
    description: 'Torqfix signature pH-neutral snow foam wash, undercarriage mud blast, high-pressure steam engine bay detailing, deep interior extraction wash, and 6-month ceramic wax coating.',
    estimatedHours: 4.0,
    basePricePkr: 7500,
    icon: 'Sparkles',
    imageUrl: '/assets/service_car_wash.jpg',
    isPopular: true,
    includedChecklist: [
      'Two-Bucket pH-Neutral Snow Foam Exterior Wash',
      'Undercarriage 150-Bar Mud & Salt High-Pressure Blast',
      'Engine Bay Deep Steam Cleaning & Plastic Dressing',
      'Hot Water Extraction Interior Carpet & Seat Shampoo',
      'Leather Seat Cleansing & UV Protective Conditioning',
      'High-Gloss Hydrophobic Ceramic Wax Polish'
    ]
  },
  {
    id: 'srv-brake-system',
    category: 'Safety & Brakes',
    title: 'Complete Brake System Overhaul',
    description: 'Front and rear brake pad replacement (OEM / Brembo), precision computerized rotor disc skimming to eliminate pedal pulsation, caliper slider greasing, and DOT-4 fluid bleed.',
    estimatedHours: 2.5,
    basePricePkr: 9500,
    icon: 'Disc',
    imageUrl: '/assets/torqfix_hero_banner.jpg',
    isPopular: false,
    includedChecklist: [
      'Front & Rear Brake Pads Measurement & Renewal',
      'Brake Rotors Computer Lathe Surface Skimming',
      'Caliper Guide Pins Cleaning & High-Temp Ceramic Greasing',
      'Brake Lines Pressure & Leak Inspection',
      'Complete Hydraulic Flush with Liqui Moly DOT-4 Fluid',
      'Handbrake & Emergency Brake Lever Adjustment'
    ]
  },
  {
    id: 'srv-suspension',
    category: 'Chassis & Handling',
    title: 'Suspension & Steering Overhaul',
    description: 'Full undercarriage shake rig inspection, shock absorber damping analysis, ball joints, control arm bushes, stabilizer link replacement, and laser computerized 4-wheel alignment.',
    estimatedHours: 4.5,
    basePricePkr: 18500,
    icon: 'Tool',
    imageUrl: '/assets/torqfix_hero_banner.jpg',
    isPopular: false,
    includedChecklist: [
      'Hydraulic Undercarriage Play & Shake Test',
      'Shock Absorbers Rebound & Oil Leak Assessment',
      'Tie-Rod Ends, Ball Joints & Rubber Bushings Check',
      'Steering Rack Free-Play Adjustment',
      'Computerized 3D Laser 4-Wheel Camber/Toe Alignment',
      'Post-Alignment Road Test Verification'
    ]
  },
  {
    id: 'srv-pickup-drop',
    category: 'Logistics',
    title: 'Torqfix Enclosed / Flatbed Tow Carrier',
    description: 'Safe and insured flatbed hydraulic truck pickup and return delivery from your home or office anywhere across Islamabad, Rawalpindi, Lahore, and Karachi.',
    estimatedHours: 1.0,
    basePricePkr: 1500,
    icon: 'Truck',
    imageUrl: '/assets/pickup_flatbed_truck.jpg',
    isPopular: true,
    includedChecklist: [
      'Doorstep Arrival within 45 Mins or Scheduled Slot',
      'Pre-Pickup 360-Degree Digital Damage Inspection',
      'Hydraulic Soft-Strap Secure Loading',
      'Live GPS Satellite Vehicle Tracking to Workshop Bay',
      'Contactless Delivery & Handover Inspection on Return'
    ]
  }
];
