import { rentDurations, RentPricing } from '@/data/cars';
import { formatPrice } from '@/utils/calculations';
import { Clock } from 'lucide-react';

interface DurationSelectorProps {
  rentPricing: RentPricing;
  selectedDuration: number;
  onDurationChange: (hours: number) => void;
}

export const DurationSelector = ({
  rentPricing,
  selectedDuration,
  onDurationChange,
}: DurationSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold">Select Rent Duration</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {rentDurations.map((duration) => {
          const price = rentPricing[duration.key];
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
            </button>
          );
        })}
      </div>
    </div>
  );
};
