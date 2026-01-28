import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { EMICalculator } from '@/components/cars/EMICalculator';
import { BookingProgress } from '@/components/booking/BookingProgress';
import { cars } from '@/data/cars';
import { formatPrice, formatPriceInLakhs, getFuelBadgeClass, calculateEMI, calculateTotalPayable } from '@/utils/calculations';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Star, Users, Fuel, Settings2, Shield, Check, CreditCard, Banknote, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const buyingSteps = ['Select Car', 'Choose Payment', 'Confirm Order'];

const BuyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, addBooking } = useAuth();

  const car = cars.find((c) => c.id === id);

  const [step, setStep] = useState(1);
  const [paymentType, setPaymentType] = useState<'full' | 'emi'>('full');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
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

  // Calculate EMI defaults
  const defaultDownPayment = Math.round((car.buyPrice * 20) / 100);
  const defaultLoanAmount = car.buyPrice - defaultDownPayment;
  const defaultEmi = calculateEMI(defaultLoanAmount, 9, 36);

  const handleEMIChange = (emi: number, downPayment: number, interest: number, tenure: number) => {
    setEmiDetails({ emi, downPayment, interestRate: interest, tenure });
  };

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      toast.error('Please login to place order');
      navigate('/auth', { state: { from: `/buy/${car.id}` } });
      return;
    }

    const bookingData = {
      carId: car.id,
      carName: `${car.brand} ${car.name}`,
      carImage: car.image,
      type: 'buy' as const,
      date: new Date().toISOString().split('T')[0],
      totalAmount: paymentType === 'full' ? car.buyPrice : car.buyPrice,
      status: 'confirmed' as const,
      paymentType,
      ...(paymentType === 'emi' && {
        emiDetails: {
          downPayment: emiDetails.downPayment || defaultDownPayment,
          interestRate: emiDetails.interestRate,
          tenure: emiDetails.tenure,
          emiAmount: emiDetails.emi || defaultEmi,
        },
      }),
    };

    addBooking(bookingData);
    setOrderConfirmed(true);
    setStep(2);
  };

  // Order Confirmation Screen
  if (orderConfirmed) {
    const totalPayable = paymentType === 'emi' 
      ? calculateTotalPayable(emiDetails.emi || defaultEmi, emiDetails.tenure)
      : car.buyPrice;

    return (
      <Layout>
        <section className="py-16">
          <div className="section-container max-w-2xl">
            <div className="animate-scale-in rounded-xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success">
                <Check className="h-8 w-8 text-success-foreground" />
              </div>
              <h1 className="mb-2 font-display text-2xl font-bold">Booking Request Received!</h1>
              
              {/* Important Message */}
              <div className="mx-auto mb-6 max-w-lg rounded-lg bg-accent/10 p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                  <p className="text-left text-sm text-foreground">
                    <span className="font-semibold">Your booking request has been received.</span>{' '}
                    Please visit the showroom to confirm your booking, take a test drive, and finalize the payment.
                  </p>
                </div>
              </div>

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
                    <p className="text-sm text-muted-foreground">
                      {paymentType === 'full' ? 'Full Payment' : 'EMI Payment'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  {paymentType === 'full' ? (
                    <div className="flex justify-between border-t border-border pt-2">
                      <span className="font-medium">Total Amount</span>
                      <span className="font-bold text-accent">{formatPrice(car.buyPrice)}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Down Payment</span>
                        <span className="font-medium">
                          {formatPrice(emiDetails.downPayment || defaultDownPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interest Rate</span>
                        <span className="font-medium">{emiDetails.interestRate}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tenure</span>
                        <span className="font-medium">{emiDetails.tenure} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly EMI</span>
                        <span className="font-bold text-primary">
                          {formatPrice(emiDetails.emi || defaultEmi)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2">
                        <span className="font-medium">Total Payable</span>
                        <span className="font-bold text-accent">{formatPrice(totalPayable)}</span>
                      </div>
                    </>
                  )}
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

            {/* Payment Options & Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Payment Type Selection */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 font-display text-lg font-semibold">Payment Option</h2>
                  
                  <RadioGroup
                    value={paymentType}
                    onValueChange={(value) => setPaymentType(value as 'full' | 'emi')}
                    className="space-y-3"
                  >
                    <div
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                        paymentType === 'full'
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                      onClick={() => setPaymentType('full')}
                    >
                      <RadioGroupItem value="full" id="full" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="full" className="flex cursor-pointer items-center gap-2">
                          <Banknote className="h-5 w-5 text-accent" />
                          <span className="font-medium">Full Payment</span>
                        </Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Pay the complete amount at once
                        </p>
                        <p className="mt-2 text-lg font-bold text-primary">
                          {formatPrice(car.buyPrice)}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                        paymentType === 'emi'
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                      onClick={() => setPaymentType('emi')}
                    >
                      <RadioGroupItem value="emi" id="emi" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="emi" className="flex cursor-pointer items-center gap-2">
                          <CreditCard className="h-5 w-5 text-accent" />
                          <span className="font-medium">EMI Payment</span>
                        </Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Pay in easy monthly installments
                        </p>
                        <p className="mt-2 text-lg font-bold text-primary">
                          {formatPrice(emiDetails.emi || defaultEmi)}/month
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* EMI Calculator - Only show when EMI is selected */}
                {paymentType === 'emi' && (
                  <EMICalculator carPrice={car.buyPrice} onEMIChange={handleEMIChange} />
                )}

                {/* Order Summary */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 font-display text-lg font-semibold">Order Summary</h2>
                  
                  <div className="mb-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Car Price</span>
                      <span>{formatPrice(car.buyPrice)}</span>
                    </div>
                    
                    {paymentType === 'emi' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Down Payment</span>
                          <span>{formatPrice(emiDetails.downPayment || defaultDownPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Interest Rate</span>
                          <span>{emiDetails.interestRate}% p.a.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tenure</span>
                          <span>{emiDetails.tenure} months</span>
                        </div>
                        <div className="flex justify-between text-primary">
                          <span className="font-medium">Monthly EMI</span>
                          <span className="font-bold">
                            {formatPrice(emiDetails.emi || defaultEmi)}
                          </span>
                        </div>
                      </>
                    )}
                    
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">
                          {paymentType === 'full' ? 'Total Amount' : 'Total Payable'}
                        </span>
                        <span className="text-xl font-bold text-accent">
                          {paymentType === 'full'
                            ? formatPrice(car.buyPrice)
                            : formatPrice(
                                calculateTotalPayable(emiDetails.emi || defaultEmi, emiDetails.tenure)
                              )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handlePlaceOrder} className="btn-accent w-full" size="lg">
                    Place Order
                  </Button>

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
