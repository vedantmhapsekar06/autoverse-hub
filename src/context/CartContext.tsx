import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Car } from '@/data/cars';

export interface CartItem {
  car: Car;
  type: 'rent' | 'buy';
  duration?: number; // hours for rent
  totalPrice: number;
  downPayment?: number;
  interestRate?: number;
  tenure?: number; // months
  emiAmount?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (carId: string) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.car.id === item.car.id && i.type === item.type);
      if (existing) {
        return prev.map((i) =>
          i.car.id === item.car.id && i.type === item.type ? item : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (carId: string) => {
    setItems((prev) => prev.filter((item) => item.car.id !== carId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalAmount = () => {
    return items.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, getTotalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
