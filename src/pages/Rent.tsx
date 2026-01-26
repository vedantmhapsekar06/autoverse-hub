import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { CarCard } from '@/components/cars/CarCard';
import { CarFilters } from '@/components/cars/CarFilters';
import { CitySelect } from '@/components/common/CitySelect';
import { cars } from '@/data/cars';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Rent = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCars = cars.filter((car) => {
    const matchesType = selectedType === 'All' || car.type === selectedType;
    const matchesFuel = selectedFuel === 'All' || car.fuelType === selectedFuel;
    const matchesSearch =
      searchQuery === '' ||
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesFuel && matchesSearch;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="section-container">
          <h1 className="mb-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Rent a Car
          </h1>
          <p className="mb-6 max-w-2xl text-primary-foreground/80">
            Choose from our wide selection of premium vehicles. Flexible rental durations with
            competitive pricing.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <CitySelect value={selectedCity} onChange={setSelectedCity} />
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Cars */}
      <section className="py-12">
        <div className="section-container">
          <div className="mb-8">
            <CarFilters
              selectedType={selectedType}
              selectedFuel={selectedFuel}
              onTypeChange={setSelectedType}
              onFuelChange={setSelectedFuel}
            />
          </div>

          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCars.length}</span>{' '}
              cars in <span className="font-semibold text-foreground">{selectedCity}</span>
            </p>
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} variant="rent" />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                No cars found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedType('All');
                  setSelectedFuel('All');
                  setSearchQuery('');
                }}
                className="mt-4 text-accent underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Rent;
