// ==========================================================
// TORQFIX — Pakistan & Karachi Common & Easily Repairable Car Catalog
// Sourced from Plaza Market (M.A. Jinnah Rd Karachi), Shershah, Bilal Gunj & Dealerships
// ==========================================================

export interface PakistaniCarModel {
  id: string;
  make: string;
  model: string;
  variant: string;
  yearRange: string;
  engineCc: number;
  transmission: 'Automatic' | 'Manual' | 'AGS' | 'CVT';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  category: 'Sedan' | 'Hatchback' | 'SUV / Crossover' | '4x4 / Commercial';
  partsAvailability: 'Ubiquitous (Every Corner in Karachi & PK)' | 'Very High' | 'High';
  partsHubs: string[];
  imageUrl: string;
  popularServices: string[];
  description: string;
  defaultOilGrade: string;
  karachiReputation: string;
}

export const PAKISTANI_CARS_CATALOG: PakistaniCarModel[] = [
  {
    id: 'pk-toyota-corolla',
    make: 'Toyota',
    model: 'Corolla',
    variant: 'Altis Grande 1.8 / GLi / 1.6 / XLi',
    yearRange: '2002 - 2024',
    engineCc: 1800,
    transmission: 'CVT',
    fuelType: 'Petrol',
    category: 'Sedan',
    partsAvailability: 'Ubiquitous (Every Corner in Karachi & PK)',
    partsHubs: ['Plaza Market (M.A. Jinnah Rd, Karachi)', 'Shershah (Karachi)', 'Bilal Gunj (Lahore)', 'Chah Sultan (Rawalpindi)'],
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80',
    popularServices: ['Synthetic Oil Service', 'AC Condenser Cleaning', 'Brake Pad Skimming', 'Suspension Bushing Check'],
    description: 'Pakistan & Karachi’s undisputed king of the road. Manufactured right here in Port Qasim, Karachi by Indus Motor Company. 100% parts availability on every street.',
    defaultOilGrade: '5W-30 Synthetic',
    karachiReputation: 'Karachi ki har gali aur highway ki pehchan. Resale gold and zero parts issue.'
  },
  {
    id: 'pk-suzuki-alto',
    make: 'Suzuki',
    model: 'Alto',
    variant: '660cc VXR / VXL AGS / VX',
    yearRange: '2019 - 2024',
    engineCc: 660,
    transmission: 'AGS',
    fuelType: 'Petrol',
    category: 'Hatchback',
    partsAvailability: 'Ubiquitous (Every Corner in Karachi & PK)',
    partsHubs: ['Plaza Market (Karachi)', 'Tariq Road', 'Saddar Auto Market', 'Every corner parts shop'],
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=80',
    popularServices: ['0W-20 Eco Oil Change', 'AGS Actuator Calibration', 'AC Gas Top-up', 'Brake Shoe Replacement'],
    description: 'The #1 selling car in Karachi. Perfect for Shahrah-e-Faisal traffic and tight streets. Super economical R06A engine with parts available everywhere.',
    defaultOilGrade: '0W-20 Eco Synthetic',
    karachiReputation: 'Karachi traffic ki queen. 18-22 KM/L fuel average and cheapest maintenance.'
  },
  {
    id: 'pk-suzuki-mehran',
    make: 'Suzuki',
    model: 'Mehran',
    variant: 'VXR Euro II / VX (The Pakistani Boss)',
    yearRange: '1989 - 2019',
    engineCc: 800,
    transmission: 'Manual',
    fuelType: 'Petrol',
    category: 'Hatchback',
    partsAvailability: 'Ubiquitous (Every Corner in Karachi & PK)',
    partsHubs: ['Literally any mechanic or general store across Karachi & Pakistan'],
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80',
    popularServices: ['Carburetor / EFI Tuning', 'Points & Distributor Service', 'Radiator Flush', 'Brake Master Cylinder'],
    description: 'The legendary "Boss" car of Pakistan. Any mechanic in Karachi can rebuild the whole car in 2 hours with pocket change. Zero scarcity.',
    defaultOilGrade: '20W-50 / 10W-40 Mineral',
    karachiReputation: 'Saddar se Gulshan aur Lyari tak har ustaad mechanic ka favourite.'
  },
  {
    id: 'pk-suzuki-cultus',
    make: 'Suzuki',
    model: 'Cultus',
    variant: 'New Shape VXL AGS / Old Shape EFI',
    yearRange: '2000 - 2024',
    engineCc: 1000,
    transmission: 'AGS',
    fuelType: 'Petrol',
    category: 'Hatchback',
    partsAvailability: 'Ubiquitous (Every Corner in Karachi & PK)',
    partsHubs: ['Plaza Market (Karachi)', 'Korangi Market', 'Montgomery Rd (LHR)', 'Bilal Gunj'],
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
    popularServices: ['10W-40 Synthetic Oil', 'Throttle Body Cleaning', 'Clutch Actuator Service', 'Front Axle Greasing'],
    description: 'Phenomenally popular family hatchback in Karachi. K10B engine with immediate parts access in Shershah, Plaza, and 3S dealerships.',
    defaultOilGrade: '5W-30 / 10W-40',
    karachiReputation: 'Family car of choice with smooth AC and easy parking.'
  },
  {
    id: 'pk-suzuki-wagon-r',
    make: 'Suzuki',
    model: 'Wagon R',
    variant: 'VXL / VXR (K-Series)',
    yearRange: '2014 - 2024',
    engineCc: 1000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    category: 'Hatchback',
    partsAvailability: 'Ubiquitous (Every Corner in Karachi & PK)',
    partsHubs: ['Plaza Auto Market (Karachi)', 'Water Pump (Karachi)', 'Bilal Gunj (LHR)'],
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
    popularServices: ['Suspension Arm Replacement', 'AC Blower Servicing', 'Oil & Filter Package', 'Coolant Flush'],
    description: 'Karachi’s staple for ride-hailing and family commutes. High headroom, excellent AC cooling, and instant parts availability across all 7 districts of Karachi.',
    defaultOilGrade: '10W-40 / 5W-30',
    karachiReputation: 'Karachi roads ka daily workhorse. Heavy duty suspension and reliable motor.'
  },
  {
    id: 'pk-honda-city',
    make: 'Honda',
    model: 'City',
    variant: '1.3 / 1.5 i-VTEC / Aspire / i-DSI',
    yearRange: '2005 - 2024',
    engineCc: 1500,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    category: 'Sedan',
    partsAvailability: 'Ubiquitous (Every Corner in Karachi & PK)',
    partsHubs: ['Plaza Market (Karachi)', 'Tariq Road', 'Bilal Gunj (Lahore)', 'Rawalpindi Cantt'],
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop&q=80',
    popularServices: ['Automatic Transmission Fluid (ATF-Z1)', 'Spark Plug Tuning', 'Brake Master Cylinder Check', 'AC Gas Top-up'],
    description: 'Extremely popular executive sedan in Karachi. Legendary L15A engine known to cross 300,000 km without trouble. Parts available at every shop.',
    defaultOilGrade: '5W-30 Synthetic',
    karachiReputation: 'Comfortable, sleek, and perfect for office commuters and highway trips.'
  },
  {
    id: 'pk-honda-civic',
    make: 'Honda',
    model: 'Civic',
    variant: 'Reborn / Rebirth / Civic X / RS Turbo 1.5',
    yearRange: '2006 - 2024',
    engineCc: 1500,
    transmission: 'CVT',
    fuelType: 'Petrol',
    category: 'Sedan',
    partsAvailability: 'Very High',
    partsHubs: ['Plaza Market (M.A. Jinnah Rd, Karachi)', 'Shershah', 'Tariq Road (Karachi)', 'Bilal Gunj'],
    imageUrl: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&auto=format&fit=crop&q=80',
    popularServices: ['Turbocharged Synth Engine Oil', 'Steering Rack Bush Overhaul', 'Brembo Brake Service', 'OBD-II Telemetry Scan'],
    description: 'Karachi’s car-culture superstar. Massive aftermarket modifications, genuine Honda parts in Plaza and Shershah, and unmatched road presence.',
    defaultOilGrade: '0W-20 / 5W-30 Full Synthetic',
    karachiReputation: 'Karachi youth & car enthusiasts ki jaan. Reborn se lekar Civic X tak har model hit hai.'
  },
  {
    id: 'pk-suzuki-bolan',
    make: 'Suzuki',
    model: 'Bolan',
    variant: 'VX Euro II (The "Dabba" Carry)',
    yearRange: '1990 - 2024',
    engineCc: 800,
    transmission: 'Manual',
    fuelType: 'Petrol',
    category: '4x4 / Commercial',
    partsAvailability: 'Ubiquitous (Every Corner in Karachi & PK)',
    partsHubs: ['Every spare parts vendor and scrap yard in Karachi & Pakistan'],
    imageUrl: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&auto=format&fit=crop&q=80',
    popularServices: ['Leaf Spring Overhaul', 'Engine Tuning', 'Brake Shoes Renewal', 'Clutch Plate & Pressure Plate'],
    description: 'The commercial lifeline of Karachi. Transports passengers and goods across Jodia Bazaar, Bolton Market, and Saddar. Parts cost almost nothing.',
    defaultOilGrade: '20W-50 Heavy Duty Mineral',
    karachiReputation: 'Karachi ki har wholesale market aur school pick & drop ka mustaqil saathi.'
  },
  {
    id: 'pk-toyota-yaris',
    make: 'Toyota',
    model: 'Yaris',
    variant: 'ATIV X 1.5 CVT / GLi 1.3',
    yearRange: '2020 - 2024',
    engineCc: 1500,
    transmission: 'CVT',
    fuelType: 'Petrol',
    category: 'Sedan',
    partsAvailability: 'Very High',
    partsHubs: ['Toyota Indus Motor Dealers', 'Plaza Market (Karachi)', 'Shershah (Karachi)'],
    imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80',
    popularServices: ['CVT Fluid Replacement', 'Periodic Engine Service', 'Brake Caliper Servicing', 'Ceramic Shield Detailing'],
    description: 'Modern family sedan with fuel efficiency and 7-speed sport sequential CVT. Assembled in Karachi with abundant parts supply.',
    defaultOilGrade: '0W-20 / 5W-30 Full Synthetic',
    karachiReputation: 'Modern replacement for old sedans. Smooth suspension over Karachi speed breakers.'
  },
  {
    id: 'pk-toyota-hilux-revo',
    make: 'Toyota',
    model: 'Hilux Revo / Vigo Champ',
    variant: '2.8L 1GD-FTV Turbo Diesel 4x4 / 3.0L 1KD',
    yearRange: '2010 - 2024',
    engineCc: 2800,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    category: '4x4 / Commercial',
    partsAvailability: 'Very High',
    partsHubs: ['Toyota Indus Motors 3S', 'Shershah (Karachi)', 'Plaza Market', 'Peshawar Road'],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
    popularServices: ['Diesel Filter Replacement', '15W-40 CI-4 Heavy Duty Diesel Oil', '4WD Transfer Case Oil', 'Brake Rotor Resurfacing'],
    description: 'Karachi DHA, Clifton, and farm convoy favorite. Heavy-duty 500Nm torque engine built for endurance with widespread 4x4 parts availability.',
    defaultOilGrade: '15W-40 / 5W-30 Diesel CI-4/CK-4',
    karachiReputation: 'DHA / Clifton aur Balochistan / Sindh highway runs ka ultimate 4x4.'
  },
  {
    id: 'pk-daihatsu-mira',
    make: 'Daihatsu',
    model: 'Mira / Move / Hijet',
    variant: 'ES 660cc Eco Idle / Custom (JDM Import)',
    yearRange: '2012 - 2024',
    engineCc: 660,
    transmission: 'CVT',
    fuelType: 'Petrol',
    category: 'Hatchback',
    partsAvailability: 'Very High',
    partsHubs: ['Shershah JDM scrap market (Karachi)', 'Plaza Market (Karachi)', 'Bilal Gunj'],
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=80',
    popularServices: ['Eco Idle Battery Replacement', 'CVT Fluid Flush', 'AC Blower Servicing', 'Suspension Bushings'],
    description: 'Extremely common Japanese 660cc import in Karachi. Sourced heavily through Shershah scrap containers with abundant spare engines and body panels.',
    defaultOilGrade: '0W-20 Full Synthetic',
    karachiReputation: '22-25 KM/L fuel average and push-start convenience in Karachi city.'
  },
  {
    id: 'pk-kia-sportage',
    make: 'Kia',
    model: 'Sportage',
    variant: 'Alpha / FWD / AWD (2.0L Nu MPI)',
    yearRange: '2019 - 2024',
    engineCc: 2000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    category: 'SUV / Crossover',
    partsAvailability: 'High',
    partsHubs: ['Lucky Motor Corp Network (Bin Qasim Karachi)', 'Plaza Market', 'Bilal Gunj (LHR)'],
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
    popularServices: ['Engine Oil & K-Filter Pack', 'AC Dual-Zone Compressor Check', 'AWD Differential Fluid', 'Suspension Struts'],
    description: 'Pakistan’s pioneer compact crossover SUV, assembled by Lucky Motor Corporation right here in Bin Qasim, Karachi. Huge local parts supply.',
    defaultOilGrade: '5W-30 Full Synthetic',
    karachiReputation: 'Karachi ki har road par nazar aane wali modern crossover SUV.'
  },
  {
    id: 'pk-changan-alsvin',
    make: 'Changan',
    model: 'Alsvin',
    variant: '1.5L DCT Lumiere / 1.3L Comfort',
    yearRange: '2021 - 2024',
    engineCc: 1500,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    category: 'Sedan',
    partsAvailability: 'High',
    partsHubs: ['Master Changan Motors Network', 'Plaza Market (Karachi)', 'Bilal Gunj'],
    imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80',
    popularServices: ['Dual-Clutch Transmission Fluid Check', 'Synthetic Oil Service', 'AC Chemical Cleaning', 'Brake Pad Skim'],
    description: 'Assembled in Karachi by Master Changan. Sunroof, cruise control, and modern tech make it a popular budget sedan with growing parts availability.',
    defaultOilGrade: '5W-30 Full Synthetic',
    karachiReputation: 'Feature-packed budget sedan popular in Karachi families.'
  },
  {
    id: 'pk-suzuki-swift',
    make: 'Suzuki',
    model: 'Swift',
    variant: 'New GLX CVT 1.2 / Old DLX 1.3 VVT',
    yearRange: '2010 - 2024',
    engineCc: 1200,
    transmission: 'CVT',
    fuelType: 'Petrol',
    category: 'Hatchback',
    partsAvailability: 'Very High',
    partsHubs: ['Pak Suzuki Network', 'Plaza Market (Karachi)', 'Tariq Road (Karachi)'],
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
    popularServices: ['CVT Transmission Calibration', 'Synthetic Engine Oil', 'Brake Pad Replacement', 'AC Servicing'],
    description: 'Hot hatchback of Pakistan. K12M DUALJET engine with sporty handling and widespread parts availability all over Karachi.',
    defaultOilGrade: '0W-20 / 5W-30',
    karachiReputation: 'Zippy sporty hatchback loved by Karachi youth.'
  }
];
