import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { DurationSelector } from '@/components/cars/DurationSelector';
import { BookingProgress } from '@/components/booking/BookingProgress';
import { CitySelect } from '@/components/common/CitySelect';
import { cars, rentDurations } from '@/data/cars';
import { getRentPrice, formatPrice, getFuelBadgeClass } from '@/utils/calculations';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Users, Fuel, Settings2, Shield, Check } from 'lucide-react';
import { toast } from 'sonner';

const bookingSteps = ['Select Car', 'Choose Duration', 'Confirm Booking'];

const RentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated, addBooking } = useAuth();

  const car = cars.find((c) => c.id === id);

  const [step, setStep] = useState(1);
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [selectedDuration, setSelectedDuration] = useState(24);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!car) {
    return (
      <Layout>
        <div className="section-container py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold">Car not found</h1>
          <Button onClick={() => navigate('/rent')}>Back to Cars</Button>
        </div>
      </Layout>
    );
  }

  const totalPrice = getRentPrice(car.rentPricing, selectedDuration);
  const basePriceDisplay = car.rentPricing.hours6;

  const handleConfirmBooking = () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      navigate('/auth');
      return;
    }

    addBooking({
      carId: car.id,
      carName: `${car.brand} ${car.name}`,
      carImage: car.image,
      type: 'rent',
      date: new Date().toISOString().split('T')[0],
      duration: selectedDuration,
      totalAmount: totalPrice,
      status: 'confirmed',
    });

    setBookingConfirmed(true);
    setStep(2);
    toast.success('Booking confirmed successfully!');
  };

  if (bookingConfirmed) {
    return (
      <Layout>
        <section className="py-16">
          <div className="section-container max-w-2xl">
            <div className="animate-scale-in rounded-xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success">
                <Check className="h-8 w-8 text-success-foreground" />
              </div>
              <h1 className="mb-2 font-display text-2xl font-bold">Booking Confirmed!</h1>
              <p className="mb-6 text-muted-foreground">
                Your rental booking has been successfully confirmed.
              </p>

              <div className="mb-6 rounded-lg bg-secondary p-4 text-left">
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-20 w-28 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {car.brand} {car.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{selectedDuration} Hours Rental</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">City</span>
                    <span className="font-medium">{selectedCity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{selectedDuration} Hours</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="font-medium">Total Amount</span>
                    <span className="font-bold text-accent">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button onClick={() => navigate('/dashboard')}>View My Bookings</Button>
                <Button variant="outline" onClick={() => navigate('/feedback')}>
                  Leave Feedback
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Progress */}
      <section className="border-b border-border py-6">
        <div className="section-container">
          <BookingProgress currentStep={step} steps={bookingSteps} />
        </div>
      </section>

      <section className="py-12">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Car Details */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="relative aspect-video">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.name}`}
                    className="h-full w-full object-cover"
                  />
                  <span
                    className={`absolute left-4 top-4 ${getFuelBadgeClass(car.fuelType)}`}
                  >
                    {car.fuelType}
                  </span>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h1 className="font-display text-2xl font-bold sm:text-3xl">
                        {car.brand} {car.name}
                      </h1>
                      <p className="text-muted-foreground">{car.type}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{car.rating}</span>
                      <span className="text-sm text-muted-foreground">({car.reviews})</span>
                    </div>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                      <Users className="h-4 w-4 text-accent" />
                      {car.seats} Seats
                    </span>
                    <span className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                      <Fuel className="h-4 w-4 text-accent" />
                      {car.fuelType}
                    </span>
                    <span className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                      <Settings2 className="h-4 w-4 text-accent" />
                      {car.transmission}
                    </span>
                    <span className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                      <Shield className="h-4 w-4 text-accent" />
                      Insured
                    </span>
                  </div>

                  {/* Duration Selector */}
                  <DurationSelector
                    rentPricing={car.rentPricing}
                    selectedDuration={selectedDuration}
                    onDurationChange={setSelectedDuration}
                  />
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-display text-xl font-semibold">Booking Summary</h2>

                <div className="mb-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  <CitySelect value={selectedCity} onChange={setSelectedCity} />
                </div>

                <div className="mb-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Starting Price</span>
                    <span>{formatPrice(basePriceDisplay)} / 6 hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{selectedDuration} Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">City</span>
                    <span>{selectedCity}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Amount</span>
                      <span className="text-xl font-bold text-accent">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button onClick={handleConfirmBooking} className="btn-accent w-full" size="lg">
                  Confirm Booking
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  By confirming, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RentDetails;
