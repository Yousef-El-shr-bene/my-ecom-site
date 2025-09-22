import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onToggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onToggleCart }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Tech Store</h1>
        <Button onClick={onToggleCart} className="relative">
          <ShoppingBag className="w-5 h-5 mr-2" />
          Cart
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
