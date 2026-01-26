// AutoVerse - Pricing & EMI Calculations

import { rentDurations } from '@/data/cars';

/**
 * Calculate rental price based on hourly rate and duration
 */
export const calculateRentPrice = (pricePerHour: number, hours: number): number => {
  const duration = rentDurations.find((d) => d.hours === hours);
  const discount = duration?.discount || 0;
  const basePrice = pricePerHour * hours;
  const discountAmount = (basePrice * discount) / 100;
  return Math.round(basePrice - discountAmount);
};

/**
 * Calculate EMI amount
 * Formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
 * P = Principal (Loan Amount)
 * R = Monthly Interest Rate (Annual Rate / 12 / 100)
 * N = Number of Months (Tenure)
 */
export const calculateEMI = (
  principal: number,
  annualInterestRate: number,
  tenureMonths: number
): number => {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  
  if (monthlyInterestRate === 0) {
    return Math.round(principal / tenureMonths);
  }
  
  const emi =
    (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) /
    (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
  
  return Math.round(emi);
};

/**
 * Calculate total payable amount with EMI
 */
export const calculateTotalPayable = (emi: number, tenureMonths: number): number => {
  return emi * tenureMonths;
};

/**
 * Calculate interest amount
 */
export const calculateInterestAmount = (
  principal: number,
  emi: number,
  tenureMonths: number
): number => {
  const totalPayable = emi * tenureMonths;
  return totalPayable - principal;
};

/**
 * Format price to Indian currency format
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Format price in lakhs for display
 */
export const formatPriceInLakhs = (price: number): string => {
  const lakhs = price / 100000;
  if (lakhs >= 100) {
    return `₹${(lakhs / 100).toFixed(2)} Cr`;
  }
  return `₹${lakhs.toFixed(2)} Lakh`;
};

/**
 * Get fuel badge class based on fuel type
 */
export const getFuelBadgeClass = (fuelType: string): string => {
  switch (fuelType.toLowerCase()) {
    case 'petrol':
      return 'badge-fuel badge-fuel-petrol';
    case 'diesel':
      return 'badge-fuel badge-fuel-diesel';
    case 'electric':
      return 'badge-fuel badge-fuel-electric';
    case 'hybrid':
      return 'badge-fuel badge-fuel-hybrid';
    default:
      return 'badge-fuel';
  }
};
