import { Link } from 'react-router-dom';
import { ArrowRight, Car, Key, Shield, Clock, MapPin } from 'lucide-react';
import { cars, cities } from '@/data/cars';
import { CarCard } from '@/components/cars/CarCard';
import { QuoteBanner } from '@/components/common/QuoteBanner';
import { CitySelect } from '@/components/common/CitySelect';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useState } from 'react';
import heroImage from '@/assets/hero-car.jpg';

const featuredCars = cars.filter((car) => car.featured).slice(0, 4);

const features = [
  {
    icon: Car,
    title: 'Wide Selection',
    description: 'Choose from 100+ premium cars across all categories',
  },
  {
    icon: Key,
    title: 'Easy Booking',
    description: 'Book your car in just a few clicks with instant confirmation',
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'All rentals come with comprehensive insurance coverage',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for all your needs',
  },
];

const Home = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative flex min-h-[90vh] items-center">
          <div className="section-container py-20">
            <div className="max-w-2xl">
              <div className="mb-6 flex items-center gap-2">
                <CitySelect value={selectedCity} onChange={setSelectedCity} />
              </div>

              <h1 className="animate-fade-in-up mb-6 font-display text-4xl font-bold text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                AutoVerse – Drive Your Dream Today
              </h1>

              <p className="animate-fade-in-up mb-8 text-lg text-primary-foreground/80 animation-delay-100 sm:text-xl">
                Your trusted partner for premium car rentals and purchases. Experience the
                freedom of the road with our curated collection of vehicles.
              </p>

              <div className="animate-fade-in-up flex flex-col gap-4 animation-delay-200 sm:flex-row">
                <Link to="/rent">
                  <Button size="lg" className="btn-accent w-full text-lg sm:w-auto">
                    Rent a Car
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/buy">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-primary-foreground bg-transparent text-lg text-primary-foreground hover:bg-primary-foreground hover:text-primary sm:w-auto"
                  >
                    Buy a Car
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="animate-fade-in-up mt-12 grid grid-cols-3 gap-6 animation-delay-300">
                <div>
                  <p className="text-3xl font-bold text-primary-foreground">100+</p>
                  <p className="text-sm text-primary-foreground/70">Premium Cars</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-foreground">50K+</p>
                  <p className="text-sm text-primary-foreground/70">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-foreground">10+</p>
                  <p className="text-sm text-primary-foreground/70">Cities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
              Why Choose AutoVerse?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              We provide the best car rental and buying experience with top-notch service and
              premium vehicles.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner 1 */}
      <QuoteBanner quote="Your dream car is just one click away" />

      {/* Featured Cars Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 font-display text-3xl font-bold sm:text-4xl">
                Featured Cars
              </h2>
              <p className="text-muted-foreground">Hand-picked vehicles for the best experience</p>
            </div>
            <Link to="/rent">
              <Button variant="outline" className="hidden sm:flex">
                View All Cars
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} variant="rent" />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/rent">
              <Button variant="outline">
                View All Cars
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Banner 2 */}
      <QuoteBanner quote="Why wait? Drive today." />

      {/* Available Cities */}
      <section className="py-20">
        <div className="section-container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
              Available in Major Cities
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Find your perfect ride across India's top metropolitan cities
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((city) => (
              <div
                key={city}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 transition-all hover:border-accent hover:shadow-md"
              >
                <MapPin className="h-4 w-4 text-accent" />
                <span className="font-medium">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-20">
        <div className="section-container text-center">
          <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Whether you're looking to rent for a day or buy your dream car, we've got you
            covered. Start your journey with AutoVerse today.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/rent">
              <Button size="lg" className="btn-accent w-full sm:w-auto">
                Rent a Car
              </Button>
            </Link>
            <Link to="/buy">
              <Button size="lg" variant="outline" className="btn-outline w-full sm:w-auto">
                Buy a Car
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
