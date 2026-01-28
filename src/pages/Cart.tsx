import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice, calculateTotalPayable } from '@/utils/calculations';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Trash2, ShoppingBag, ArrowRight, Clock, CreditCard, Banknote, MapPin, Check } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, clearCart, getTotalAmount } = useCart();
  const { isAuthenticated, addBooking } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedItems, setPlacedItems] = useState<typeof items>([]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      navigate('/auth', { state: { from: '/cart' } });
      return;
    }

    // Store items before clearing
    setPlacedItems([...items]);

    // Add all items as bookings
    items.forEach((item) => {
      addBooking({
        carId: item.car.id,
        carName: `${item.car.brand} ${item.car.name}`,
        carImage: item.car.image,
        type: item.type,
        date: new Date().toISOString().split('T')[0],
        duration: item.duration,
        totalAmount: item.totalPrice,
        status: 'confirmed',
      });
    });

    clearCart();
    setOrderPlaced(true);
  };

  // Order Confirmation Screen
  if (orderPlaced) {
    return (
      <Layout>
        <section className="py-16">
          <div className="section-container max-w-2xl">
            <div className="animate-scale-in rounded-xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success">
                <Check className="h-8 w-8 text-success-foreground" />
              </div>
              <h1 className="mb-2 font-display text-2xl font-bold">Order Placed Successfully!</h1>
              
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

              <div className="mb-6 space-y-3">
                {placedItems.map((item) => (
                  <div
                    key={`${item.car.id}-${item.type}`}
                    className="rounded-lg bg-secondary p-4 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.car.image}
                        alt={item.car.name}
                        className="h-16 w-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {item.car.brand} {item.car.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.type === 'rent' ? `${item.duration} Hours Rental` : 'Purchase'}
                        </p>
                      </div>
                      <p className="font-bold text-accent">{formatPrice(item.totalPrice)}</p>
                    </div>
                  </div>
                ))}
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

  if (items.length === 0) {
    return (
      <Layout>
        <section className="py-20">
          <div className="section-container text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="mb-2 font-display text-2xl font-bold">Your Cart is Empty</h1>
            <p className="mb-8 text-muted-foreground">
              Start exploring our collection of premium cars
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button onClick={() => navigate('/rent')} variant="outline">
                Rent a Car
              </Button>
              <Button onClick={() => navigate('/buy')} className="btn-accent">
                Buy a Car
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="section-container">
          <h1 className="mb-8 font-display text-3xl font-bold">Your Cart</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.car.id}-${item.type}`}
                    className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
                  >
                    <img
                      src={item.car.image}
                      alt={item.car.name}
                      className="h-24 w-full rounded-lg object-cover sm:w-32"
                    />

                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            item.type === 'rent'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {item.type === 'rent' ? 'Rental' : 'Purchase'}
                        </span>
                      </div>
                      <h3 className="font-semibold">
                        {item.car.brand} {item.car.name}
                      </h3>

                      {item.type === 'rent' ? (
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {item.duration} Hours
                        </div>
                      ) : (
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <CreditCard className="h-4 w-4" />
                          {item.emiAmount ? (
                            <>EMI: {formatPrice(item.emiAmount)}/month x {item.tenure} months</>
                          ) : (
                            'Full Payment'
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <p className="text-lg font-bold text-accent">
                        {formatPrice(item.totalPrice)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.car.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Button variant="ghost" onClick={clearCart} className="text-destructive">
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-display text-xl font-semibold">Order Summary</h2>

                <div className="mb-6 space-y-3 text-sm">
                  {items.map((item) => (
                    <div key={`${item.car.id}-${item.type}`} className="flex justify-between">
                      <span className="text-muted-foreground">
                        {item.car.brand} {item.car.name}
                      </span>
                      <span>{formatPrice(item.totalPrice)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Amount</span>
                      <span className="text-xl font-bold text-accent">
                        {formatPrice(getTotalAmount())}
                      </span>
                    </div>
                  </div>
                </div>

                <Button onClick={handleCheckout} className="btn-accent w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Secure checkout with multiple payment options
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
