import { Heart, Star, Users, Fuel, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Car } from '@/data/cars';
import { useAuth } from '@/context/AuthContext';
import { formatPrice, getFuelBadgeClass } from '@/utils/calculations';
import { Button } from '@/components/ui/button';

interface CarCardProps {
  car: Car;
  variant?: 'rent' | 'buy';
  showQuickActions?: boolean;
}

export const CarCard = ({ car, variant = 'rent', showQuickActions = true }: CarCardProps) => {
  const { isInWishlist, toggleWishlist } = useAuth();
  const inWishlist = isInWishlist(car.id);

  // Get the 6-hour price for rent display
  const rentDisplayPrice = car.rentPricing.hours6;

  return (
    <div className="car-card group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(car.id);
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-md transition-all hover:bg-background"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              inWishlist ? 'fill-accent text-accent' : 'text-muted-foreground'
            }`}
          />
        </button>

        {/* Fuel Badge */}
        <span className={`absolute left-3 top-3 ${getFuelBadgeClass(car.fuelType)}`}>
          {car.fuelType}
        </span>

        {/* Featured Badge */}
        {car.featured && (
          <span className="absolute bottom-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title & Rating */}
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {car.brand} {car.name}
            </h3>
            <p className="text-sm text-muted-foreground">{car.type}</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-secondary px-2 py-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{car.rating}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {car.seats} Seats
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            {car.fuelType}
          </span>
          <span className="flex items-center gap-1">
            <Settings2 className="h-4 w-4" />
            {car.transmission}
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            {variant === 'rent' ? (
              <>
                <p className="price-tag">{formatPrice(rentDisplayPrice)}</p>
                <p className="price-unit">for 6 hours</p>
              </>
            ) : (
              <>
                <p className="price-tag">{formatPrice(car.buyPrice)}</p>
                {car.emiAvailable && (
                  <p className="text-xs text-success">EMI Available</p>
                )}
              </>
            )}
          </div>

          {showQuickActions && (
            <Link to={variant === 'rent' ? `/rent/${car.id}` : `/buy/${car.id}`}>
              <Button variant="default" size="sm" className="btn-accent">
                {variant === 'rent' ? 'Book Now' : 'View Details'}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
