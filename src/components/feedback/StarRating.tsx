import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating = ({ value, onChange, readonly = false, size = 'md' }: StarRatingProps) => {
  const [hoverValue, setHoverValue] = useState(0);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          className={`star ${sizeClasses[size]} ${!readonly && 'cursor-pointer'}`}
        >
          <Star
            className={`${sizeClasses[size]} transition-colors ${
              (hoverValue || value) >= star
                ? 'fill-amber-400 text-amber-400'
                : 'fill-muted text-muted-foreground/30'
            }`}
          />
        </button>
      ))}
    </div>
  );
};
