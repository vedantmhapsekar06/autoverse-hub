import React, { createContext, useContext, useState, ReactNode } from 'react';
import { cars } from '@/data/cars';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
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
  paymentType?: 'full' | 'emi';
  emiDetails?: {
    downPayment: number;
    interestRate: number;
    tenure: number;
    emiAmount: number;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  bookings: Booking[];
  wishlist: string[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithPhone: (phone: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  toggleWishlist: (carId: string) => boolean; // returns false if not authenticated
  isInWishlist: (carId: string) => boolean;
  requireAuth: (action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Get actual car images from data
const getCar = (id: string) => cars.find(c => c.id === id);

// Mock registered users database
const initialRegisteredUsers: RegisteredUser[] = [
  {
    id: '1',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    password: 'password123',
    phone: '+91 9876543210',
  },
];

// Mock bookings data using actual car images
const createMockBookings = (): Booking[] => [
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
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(initialRegisteredUsers);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Check if user exists with matching credentials
    const existingUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!existingUser) {
      // Check if email exists but password is wrong
      const emailExists = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }
      return { success: false, error: 'No account found with this email. Please sign up first.' };
    }

    setUser({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone,
    });
    setBookings(createMockBookings());
    return { success: true };
  };

  const loginWithPhone = async (phone: string): Promise<boolean> => {
    if (phone) {
      const existingUser = registeredUsers.find((u) => u.phone === phone);
      if (existingUser) {
        setUser({
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          phone: phone,
        });
        setBookings(createMockBookings());
        return true;
      }
      // Create new user with phone
      const newUser: RegisteredUser = {
        id: Date.now().toString(),
        name: 'User',
        email: `${phone.replace(/\D/g, '')}@autoverse.com`,
        password: 'phone123',
        phone: phone,
      };
      setRegisteredUsers((prev) => [...prev, newUser]);
      setUser({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: phone,
      });
      setBookings([]);
      return true;
    }
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    // Mock Google login - creates/finds user
    const googleEmail = 'rahul.kumar@gmail.com';
    const existingUser = registeredUsers.find((u) => u.email.toLowerCase() === googleEmail.toLowerCase());
    
    if (existingUser) {
      setUser({
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      });
      setBookings(createMockBookings());
    } else {
      const newUser: RegisteredUser = {
        id: Date.now().toString(),
        name: 'Rahul Kumar',
        email: googleEmail,
        password: 'google123',
      };
      setRegisteredUsers((prev) => [...prev, newUser]);
      setUser({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
      setBookings([]);
    }
    return true;
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!name || !email || !password) {
      return { success: false, error: 'Please fill in all fields.' };
    }

    // Check if email already exists
    const emailExists = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return { success: false, error: 'An account with this email already exists. Please login instead.' };
    }

    // Check if name already exists (optional - for unique username requirement)
    const nameExists = registeredUsers.find((u) => u.name.toLowerCase() === name.toLowerCase());
    if (nameExists) {
      return { success: false, error: 'This username is already taken. Please choose a different name.' };
    }

    // Create new user
    const newUser: RegisteredUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: password,
    };
    
    setRegisteredUsers((prev) => [...prev, newUser]);
    setUser({
      id: newUser.id,
      name: name,
      email: email,
    });
    setBookings([]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
    setWishlist([]);
  };

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const toggleWishlist = (carId: string): boolean => {
    if (!user) {
      return false; // Not authenticated
    }
    setWishlist((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
    return true;
  };

  const isInWishlist = (carId: string) => wishlist.includes(carId);

  const requireAuth = (action: string): boolean => {
    return !!user;
  };

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
        requireAuth,
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
