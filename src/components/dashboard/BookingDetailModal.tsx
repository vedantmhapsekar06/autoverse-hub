import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/utils/calculations';
import { Calendar, Clock, MapPin, Car, CreditCard, User } from 'lucide-react';

interface Booking {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  type: 'rent' | 'buy';
  date: string;
  duration?: number;
  totalAmount: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  paymentType?: 'full' | 'emi';
  emiDetails?: {
    downPayment: number;
    interestRate: number;
    tenure: number;
    emiAmount: number;
  };
}

interface BookingDetailModalProps {
  booking: Booking | null;
  open: boolean;
  onClose: () => void;
}

export const BookingDetailModal = ({ booking, open, onClose }: BookingDetailModalProps) => {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {booking.type === 'rent' ? 'Rental Details' : 'Purchase Details'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Car Image & Name */}
          <div className="flex gap-4">
            <img
              src={booking.carImage}
              alt={booking.carName}
              className="h-24 w-32 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{booking.carName}</h3>
              <span
                className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-700'
                    : booking.status === 'completed'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Booking Info */}
          <div className="rounded-lg bg-secondary/50 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Booking Date</p>
                <p className="font-medium">{booking.date}</p>
              </div>
            </div>

            {booking.type === 'rent' && booking.duration && (
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{booking.duration} Hours</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Car className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium">{booking.type === 'rent' ? 'Rental' : 'Purchase'}</p>
              </div>
            </div>

            {booking.paymentType && (
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">
                    {booking.paymentType === 'full' ? 'Full Payment' : 'EMI Payment'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* EMI Details */}
          {booking.emiDetails && (
            <div className="rounded-lg border border-border p-4 space-y-2">
              <h4 className="font-semibold mb-3">EMI Breakdown</h4>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Down Payment</span>
                <span className="font-medium">{formatPrice(booking.emiDetails.downPayment)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Interest Rate</span>
                <span className="font-medium">{booking.emiDetails.interestRate}% p.a.</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tenure</span>
                <span className="font-medium">{booking.emiDetails.tenure} months</span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2 mt-2">
                <span className="font-medium">Monthly EMI</span>
                <span className="font-bold text-primary">{formatPrice(booking.emiDetails.emiAmount)}</span>
              </div>
            </div>
          )}

          {/* Total Amount */}
          <div className="flex justify-between items-center py-3 border-t border-border">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-2xl font-bold text-accent">{formatPrice(booking.totalAmount)}</span>
          </div>

          {/* Instructions */}
          <div className="rounded-lg bg-accent/10 p-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
              <p className="text-sm text-foreground">
                {booking.type === 'rent' ? (
                  <>
                    <span className="font-semibold">Pickup Instructions:</span> Please visit our pickup
                    location at the scheduled time with a valid ID and driving license.
                  </>
                ) : (
                  <>
                    <span className="font-semibold">Next Steps:</span> Please visit the showroom to
                    confirm your booking, take a test drive, and finalize the payment.
                  </>
                )}
              </p>
            </div>
          </div>

          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
