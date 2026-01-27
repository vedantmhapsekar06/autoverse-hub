import React, { createContext, useContext, useState, ReactNode } from 'react';
import { cars } from '@/data/cars';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

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
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  bookings: Booking[];
  wishlist: string[];
  login: (email: string, password: string) => Promise<boolean>;
  loginWithPhone: (phone: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  toggleWishlist: (carId: string) => void;
  isInWishlist: (carId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Get actual car images from data
const getCar = (id: string) => cars.find(c => c.id === id);

// Mock bookings data using actual car images
const mockBookings: Booking[] = [
  {
    id: '1',
    carId: '3',
    carName: `${getCar('3')?.brand} ${getCar('3')?.name}`,
    carImage: getCar('3')?.image || '',
    type: 'rent',
    date: '2024-01-15',
    duration: 24,
    totalAmount: getCar('3')?.rentPricing.hours24 || 3800,
    status: 'completed',
  },
  {
    id: '2',
    carId: '10',
    carName: `${getCar('10')?.brand} ${getCar('10')?.name}`,
    carImage: getCar('10')?.image || '',
    type: 'buy',
    date: '2024-02-01',
    totalAmount: getCar('10')?.buyPrice || 3500000,
    status: 'confirmed',
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['2', '5', '10']);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app would call API
    if (email && password) {
      setUser({
        id: '1',
        name: 'Rahul Kumar',
        email: email,
        phone: '+91 9876543210',
      });
      setBookings(mockBookings);
      return true;
    }
    return false;
  };

  const loginWithPhone = async (phone: string): Promise<boolean> => {
    if (phone) {
      setUser({
        id: '1',
        name: 'Rahul Kumar',
        email: 'rahul@example.com',
        phone: phone,
      });
      setBookings(mockBookings);
      return true;
    }
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    // Mock Google login
    setUser({
      id: '1',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@gmail.com',
    });
    setBookings(mockBookings);
    return true;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    if (name && email && password) {
      setUser({
        id: '1',
        name: name,
        email: email,
      });
      setBookings([]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
  };

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const toggleWishlist = (carId: string) => {
    setWishlist((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const isInWishlist = (carId: string) => wishlist.includes(carId);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        bookings,
        wishlist,
        login,
        loginWithPhone,
        loginWithGoogle,
        signup,
        logout,
        addBooking,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
