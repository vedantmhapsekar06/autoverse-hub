import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { cars } from '@/data/cars';
import { formatPrice } from '@/utils/calculations';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingDetailModal } from '@/components/dashboard/BookingDetailModal';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Car,
  Heart,
  Clock,
  ShoppingBag,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, bookings, wishlist, logout, isInWishlist, toggleWishlist } = useAuth();
  const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null);

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="py-20">
          <div className="section-container text-center">
            <h1 className="mb-4 font-display text-2xl font-bold">Please Login</h1>
            <p className="mb-6 text-muted-foreground">
              You need to be logged in to view your dashboard
            </p>
            <Button onClick={() => navigate('/auth')} className="btn-accent">
              Login / Sign Up
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const wishlistCars = cars.filter((car) => wishlist.includes(car.id));
  const rentBookings = bookings.filter((b) => b.type === 'rent');
  const purchaseBookings = bookings.filter((b) => b.type === 'buy');

  return (
    <Layout>
      <section className="py-12">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar - Profile */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                    <User className="h-10 w-10 text-accent" />
                  </div>
                  <h2 className="font-display text-xl font-semibold">{user?.name}</h2>
                  <p className="text-sm text-muted-foreground">Premium Member</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user?.email}</span>
                  </div>
                  {user?.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="mt-6 w-full text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <h1 className="mb-6 font-display text-2xl font-bold">My Dashboard</h1>

              {/* Stats Cards */}
              <div className="mb-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{rentBookings.length}</p>
                      <p className="text-sm text-muted-foreground">Rentals</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <ShoppingBag className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{purchaseBookings.length}</p>
                      <p className="text-sm text-muted-foreground">Purchases</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100">
                      <Heart className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{wishlist.length}</p>
                      <p className="text-sm text-muted-foreground">Wishlist</p>
                    </div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="bookings" className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-3">
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="purchases">Purchases</TabsTrigger>
                  <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                </TabsList>

                {/* Bookings Tab */}
                <TabsContent value="bookings">
                  {rentBookings.length === 0 ? (
                    <div className="rounded-xl border border-border bg-card py-12 text-center">
                      <Car className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="mb-4 text-muted-foreground">No rental bookings yet</p>
                      <Button onClick={() => navigate('/rent')} className="btn-accent">
                        Rent a Car
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {rentBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex cursor-pointer flex-col gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/50 sm:flex-row sm:items-center"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <img
                            src={booking.carImage}
                            alt={booking.carName}
                            className="h-20 w-full rounded-lg object-cover sm:w-28"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{booking.carName}</h3>
                            <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {booking.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {booking.duration} Hours
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-700'
                                  : booking.status === 'completed'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {booking.status}
                            </span>
                            <p className="font-bold text-accent">
                              {formatPrice(booking.totalAmount)}
                            </p>
                          </div>
                          <ChevronRight className="hidden h-5 w-5 text-muted-foreground sm:block" />
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Purchases Tab */}
                <TabsContent value="purchases">
                  {purchaseBookings.length === 0 ? (
                    <div className="rounded-xl border border-border bg-card py-12 text-center">
                      <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="mb-4 text-muted-foreground">No purchases yet</p>
                      <Button onClick={() => navigate('/buy')} className="btn-accent">
                        Buy a Car
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {purchaseBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex cursor-pointer flex-col gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/50 sm:flex-row sm:items-center"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <img
                            src={booking.carImage}
                            alt={booking.carName}
                            className="h-20 w-full rounded-lg object-cover sm:w-28"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{booking.carName}</h3>
                            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {booking.date}
                            </div>
                            {booking.paymentType && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                {booking.paymentType === 'full' ? 'Full Payment' : 'EMI Payment'}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {booking.status}
                            </span>
                            <p className="font-bold text-accent">
                              {formatPrice(booking.totalAmount)}
                            </p>
                          </div>
                          <ChevronRight className="hidden h-5 w-5 text-muted-foreground sm:block" />
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Wishlist Tab */}
                <TabsContent value="wishlist">
                  {wishlistCars.length === 0 ? (
                    <div className="rounded-xl border border-border bg-card py-12 text-center">
                      <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="mb-4 text-muted-foreground">Your wishlist is empty</p>
                      <Button onClick={() => navigate('/rent')} className="btn-accent">
                        Explore Cars
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {wishlistCars.map((car) => (
                        <div
                          key={car.id}
                          className="flex gap-4 rounded-xl border border-border bg-card p-4"
                        >
                          <img
                            src={car.image}
                            alt={car.name}
                            className="h-20 w-28 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {car.brand} {car.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{car.type}</p>
                            <p className="mt-1 font-bold text-accent">
                              {formatPrice(car.rentPricing.hours6)} / 6 hrs
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleWishlist(car.id)}
                          >
                            <Heart className="h-5 w-5 fill-accent text-accent" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Detail Modal */}
      <BookingDetailModal
        booking={selectedBooking}
        open={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </Layout>
  );
};

export default Dashboard;
