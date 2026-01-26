import { useState } from 'react';
import { carTypes, fuelTypes } from '@/data/cars';

interface CarFiltersProps {
  selectedType: string;
  selectedFuel: string;
  onTypeChange: (type: string) => void;
  onFuelChange: (fuel: string) => void;
}

export const CarFilters = ({
  selectedType,
  selectedFuel,
  onTypeChange,
  onFuelChange,
}: CarFiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Type Filters */}
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">Car Type</h4>
        <div className="flex flex-wrap gap-2">
          {carTypes.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`filter-pill ${selectedType === type ? 'active' : ''}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Fuel Filters */}
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">Fuel Type</h4>
        <div className="flex flex-wrap gap-2">
          {fuelTypes.map((fuel) => (
            <button
              key={fuel}
              onClick={() => onFuelChange(fuel)}
              className={`filter-pill ${selectedFuel === fuel ? 'active' : ''}`}
            >
              {fuel}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
