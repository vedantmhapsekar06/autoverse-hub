import { rentDurations } from '@/data/cars';
import { calculateRentPrice, formatPrice } from '@/utils/calculations';
import { Clock } from 'lucide-react';

interface DurationSelectorProps {
  pricePerHour: number;
  selectedDuration: number;
  onDurationChange: (hours: number) => void;
}

export const DurationSelector = ({
  pricePerHour,
  selectedDuration,
  onDurationChange,
}: DurationSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold">Select Rent Duration</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {rentDurations.map((duration) => {
          const price = calculateRentPrice(pricePerHour, duration.hours);
          const isSelected = selectedDuration === duration.hours;

          return (
            <button
              key={duration.hours}
              onClick={() => onDurationChange(duration.hours)}
              className={`duration-option ${isSelected ? 'selected' : ''}`}
            >
              <Clock className={`mb-1 h-5 w-5 ${isSelected ? 'text-accent' : 'text-muted-foreground'}`} />
              <span className="text-sm font-semibold">{duration.label}</span>
              <span className={`text-lg font-bold ${isSelected ? 'text-accent' : 'text-foreground'}`}>
                {formatPrice(price)}
              </span>
              {duration.discount > 0 && (
                <span className="text-xs text-success">Save {duration.discount}%</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
