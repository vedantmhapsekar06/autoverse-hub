// AutoVerse Car Data - Mock Database

// Car images imports
import marutiSwift from '@/assets/cars/maruti-swift.jpg';
import volkswagenPolo from '@/assets/cars/volkswagen-polo.jpg';
import marutiCiaz from '@/assets/cars/maruti-ciaz.jpg';
import volkswagenVirtus from '@/assets/cars/volkswagen-virtus.jpg';
import kiaSeltos from '@/assets/cars/kia-seltos.jpg';
import mahindraXuv700 from '@/assets/cars/mahindra-xuv700.jpg';
import tataNexonEv from '@/assets/cars/tata-nexon-ev.jpg';
import mahindraXuv400Ev from '@/assets/cars/mahindra-xuv400-ev.jpg';
import volkswagenTiguan from '@/assets/cars/volkswagen-tiguan.jpg';
import kiaCarnival from '@/assets/cars/kia-carnival.jpg';
import marutiBreza from '@/assets/cars/maruti-brezza.jpg';
import mahindraThar from '@/assets/cars/mahindra-thar.jpg';
import kiaSonet from '@/assets/cars/kia-sonet.jpg';
import volkswagenTaigun from '@/assets/cars/volkswagen-taigun.jpg';
import marutiBaleno from '@/assets/cars/maruti-baleno.jpg';

export interface RentPricing {
  hours6: number;
  hours12: number;
  hours24: number;
  hours48: number;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  type: 'SUV' | 'Sedan' | 'Hatchback' | 'EV' | 'Luxury' | 'MPV';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  image: string;
  rentPricing: RentPricing;
  buyPrice: number;
  emiAvailable: boolean;
  seats: number;
  transmission: 'Manual' | 'Automatic';
  rating: number;
  reviews: number;
  featured: boolean;
}

export const cars: Car[] = [
  {
    id: '1',
    name: 'Swift',
    brand: 'Maruti Suzuki',
    type: 'Hatchback',
    fuelType: 'Petrol',
    image: marutiSwift,
    rentPricing: {
      hours6: 800,
      hours12: 1500,
      hours24: 2800,
      hours48: 5000,
    },
    buyPrice: 750000,
    emiAvailable: true,
    seats: 5,
    transmission: 'Manual',
    rating: 4.5,
    reviews: 128,
    featured: true,
  },
  {
    id: '2',
    name: 'Polo',
    brand: 'Volkswagen',
    type: 'Hatchback',
    fuelType: 'Petrol',
    image: volkswagenPolo,
    rentPricing: {
      hours6: 900,
      hours12: 1700,
      hours24: 3200,
      hours48: 5800,
    },
    buyPrice: 950000,
    emiAvailable: true,
    seats: 5,
    transmission: 'Automatic',
    rating: 4.4,
    reviews: 98,
    featured: false,
  },
  {
    id: '3',
    name: 'Ciaz',
    brand: 'Maruti Suzuki',
    type: 'Sedan',
    fuelType: 'Petrol',
    image: marutiCiaz,
    rentPricing: {
      hours6: 1100,
      hours12: 2000,
      hours24: 3800,
      hours48: 7000,
    },
    buyPrice: 1300000,
    emiAvailable: true,
    seats: 5,
    transmission: 'Automatic',
    rating: 4.5,
    reviews: 167,
    featured: false,
  },
  {
    id: '4',
    name: 'Virtus',
    brand: 'Volkswagen',
    type: 'Sedan',
    fuelType: 'Petrol',
    image: volkswagenVirtus,
    rentPricing: {
      hours6: 1200,
      hours12: 2200,
      hours24: 4000,
      hours48: 7200,
    },
    buyPrice: 1400000,
    emiAvailable: true,
    seats: 5,
    transmission: 'Automatic',
    rating: 4.6,
    reviews: 215,
    featured: true,
  },
  {
    id: '5',
    name: 'Seltos',
    brand: 'Kia',
    type: 'SUV',
    fuelType: 'Petrol',
    image: kiaSeltos,
    rentPricing: {
      hours6: 1500,
      hours12: 2800,
      hours24: 5000,
      hours48: 9000,
    },
    buyPrice: 1700000,
    emiAvailable: true,
    seats: 5,
    transmission: 'Automatic',
    rating: 4.7,
    reviews: 342,
    featured: true,
  },
  {
    id: '6',
    name: 'XUV700',
    brand: 'Mahindra',
    type: 'SUV',
    fuelType: 'Diesel',
    image: mahindraXuv700,
    rentPricing: {
      hours6: 2000,
      hours12: 3800,
      hours24: 6500,
      hours48: 12000,
    },
    buyPrice: 2200000,
    emiAvailable: true,
    seats: 7,
    transmission: 'Automatic',
    rating: 4.8,
    reviews: 312,
    featured: true,
  },
  {
    id: '7',
    name: 'Nexon EV',
    brand: 'Tata',
    type: 'EV',
    fuelType: 'Electric',
    image: tataNexonEv,
    rentPricing: {
      hours6: 1800,
      hours12: 3300,
      hours24: 5800,
      hours48: 10500,
    },
    buyPrice: 1600000,
    emiAvailable: true,
    seats: 5,
    transmission: 'Automatic',
    rating: 4.8,
    reviews: 189,
    featured: true,
  },
  {
    id: '8',
    name: 'XUV400 EV',
    brand: 'Mahindra',
    type: 'EV',
    fuelType: 'Electric',
    image: mahindraXuv400Ev,
    rentPricing: {
      hours6: 1900,
      hours12: 3500,
      hours24: 6000,
      hours48: 11000,
    },
    buyPrice: 1650000,
    emiAvailable: true,
    seats: 5,
    transmission: 'Automatic',
    rating: 4.6,
    reviews: 145,
    featured: false,
  },
  {
    id: '9',
    name: 'Tiguan',
    brand: 'Volkswagen',
    type: 'Luxury',
    fuelType: 'Petrol',
    image: volkswagenTiguan,
    rentPricing: {
      hours6: 2500,
      hours12: 4800,
      hours24: 8000,
      hours48: 15000,
    },
    buyPrice: 2800000,
    emiAvailable: true,
    seats: 5,
    transmission: 'Automatic',
    rating: 4.7,
    reviews: 167,
    featured: false,
  },
  {
    id: '10',
    name: 'Carnival',
    brand: 'Kia',
    type: 'MPV',
    fuelType: 'Diesel',
    image: kiaCarnival,
    rentPricing: {
      hours6: 3000,
      hours12: 5500,
      hours24: 9000,
      hours48: 17000,
    },
    buyPrice: 3500000,
    emiAvailable: true,
    seats: 8,
    transmission: 'Automatic',
    rating: 4.9,
    reviews: 256,
    featured: true,
  },
  {
    id: '11',
    name: 'Brezza',
    brand: 'Maruti Suzuki',
    type: 'SUV',
    fuelType: 'Petrol',
    image: marutiBreza,
    rentPricing: {
      hours6: 900,
      hours12: 1700,
      hours24: 3200,
      hours48: 5800,
    },
    buyPrice: 900000,
    emiAvailable: true,
    seats: 5,
    transmission: 'Manual',
    rating: 4.5,
    reviews: 198,
    featured: false,
  },
  {
    id: '12',
    name: 'Thar',
    brand: 'Mahindra',
    type: 'SUV',
    fuelType: 'Diesel',
    image: mahindraThar,
    rentPricing: {
      hours6: 1700,
      hours12: 3000,
      hours24: 5200,
      hours48: 9500,
    },
    buyPrice: 1550000,
    emiAvailable: true,
    seats: 4,
    transmission: 'Manual',
    rating: 4.7,
    reviews: 278,
    featured: true,
  },
  {
    id: '13',
    name: 'Sonet',
    brand: 'Kia',
    type: 'SUV',
    fuelType: 'Petrol',
    image: kiaSonet,
    rentPricing: {
      hours6: 1000,
      hours12: 1900,
      hours24: 3600,
      hours48: 6400,
    },
    buyPrice: 1050000,
    emiAvailable: true,
    seats: 5,
    transmission: 'Automatic',
    rating: 4.5,
    reviews: 156,
    featured: false,
  },
  {
    id: '14',
    name: 'Taigun',
    brand: 'Volkswagen',
    type: 'SUV',
    fuelType: 'Petrol',
    image: volkswagenTaigun,
    rentPricing: {
      hours6: 1700,
      hours12: 3100,
      hours24: 5400,
      hours48: 10000,
    },
    buyPrice: 1900000,
    emiAvailable: true,
    seats: 5,
    transmission: 'Automatic',
    rating: 4.6,
    reviews: 187,
    featured: false,
  },
  {
    id: '15',
    name: 'Baleno',
    brand: 'Maruti Suzuki',
    type: 'Hatchback',
    fuelType: 'Petrol',
    image: marutiBaleno,
    rentPricing: {
      hours6: 800,
      hours12: 1500,
      hours24: 2800,
      hours48: 5000,
    },
    buyPrice: 850000,
    emiAvailable: true,
    seats: 5,
    transmission: 'Manual',
    rating: 4.4,
    reviews: 142,
    featured: false,
  },
];

export const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
];

export const rentDurations = [
  { hours: 6, label: '6 Hours', key: 'hours6' as const },
  { hours: 12, label: '12 Hours', key: 'hours12' as const },
  { hours: 24, label: '24 Hours', key: 'hours24' as const },
  { hours: 48, label: '48 Hours', key: 'hours48' as const },
];

export const carTypes = ['All', 'SUV', 'Sedan', 'Hatchback', 'EV', 'Luxury', 'MPV'] as const;
export const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid'] as const;
