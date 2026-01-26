import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { EMICalculator } from '@/components/cars/EMICalculator';
import { BookingProgress } from '@/components/booking/BookingProgress';
import { cars } from '@/data/cars';
import { formatPrice, formatPriceInLakhs, getFuelBadgeClass, calculateEMI } from '@/utils/calculations';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Star, Users, Fuel, Settings2, Shield, ShoppingCart, Check } from 'lucide-react';
import { toast } from 'sonner';

const buyingSteps = ['Select Car', 'Calculate EMI', 'Add to Cart'];

const BuyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();

  const car = cars.find((c) => c.id === id);

  const [step, setStep] = useState(1);
  const [emiDetails, setEmiDetails] = useState({
    emi: 0,
    downPayment: 0,
    interestRate: 9,
    tenure: 36,
  });

  if (!car) {
    return (
      <Layout>
        <div className="section-container py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold">Car not found</h1>
          <Button onClick={() => navigate('/buy')}>Back to Cars</Button>
        </div>
      </Layout>
    );
  }

  const isInCart = items.some((item) => item.car.id === car.id && item.type === 'buy');

  const handleAddToCart = () => {
    const downPayment = Math.round((car.buyPrice * 20) / 100);
    const loanAmount = car.buyPrice - downPayment;
    const emi = calculateEMI(loanAmount, 9, 36);

    addToCart({
      car,
      type: 'buy',
      totalPrice: car.buyPrice,
      downPayment: emiDetails.downPayment || downPayment,
      interestRate: emiDetails.interestRate || 9,
      tenure: emiDetails.tenure || 36,
      emiAmount: emiDetails.emi || emi,
    });

    toast.success('Car added to cart!');
    setStep(2);
  };

  const handleEMIChange = (emi: number, downPayment: number, interest: number, tenure: number) => {
    setEmiDetails({ emi, downPayment, interestRate: interest, tenure });
  };

  return (
    <Layout>
      {/* Progress */}
      <section className="border-b border-border py-6">
        <div className="section-container">
          <BookingProgress currentStep={step} steps={buyingSteps} />
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
                  {car.emiAvailable && (
                    <span className="absolute right-4 top-4 rounded-full bg-success px-3 py-1 text-xs font-semibold text-success-foreground">
                      EMI Available
                    </span>
                  )}
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

                  <div className="mb-6">
                    <p className="text-3xl font-bold text-primary">{formatPrice(car.buyPrice)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPriceInLakhs(car.buyPrice)} (Ex-showroom)
                    </p>
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
                      Warranty
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <h3 className="mb-3 font-semibold">Key Features</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        Power Steering
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        Air Conditioning
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        Power Windows
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        Central Locking
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        Touchscreen Infotainment
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        Airbags
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EMI Calculator & Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <EMICalculator carPrice={car.buyPrice} onEMIChange={handleEMIChange} />

                <div className="rounded-xl border border-border bg-card p-6">
                  {isInCart ? (
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success">
                        <Check className="h-6 w-6 text-success-foreground" />
                      </div>
                      <p className="mb-4 font-medium">Added to Cart</p>
                      <Button
                        onClick={() => navigate('/cart')}
                        className="btn-accent w-full"
                        size="lg"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        View Cart
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handleAddToCart}
                      className="btn-accent w-full"
                      size="lg"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                  )}

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Contact our sales team for best deals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BuyDetails;
