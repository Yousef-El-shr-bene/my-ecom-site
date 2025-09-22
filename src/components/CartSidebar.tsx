import React, { useState } from 'react';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartSidebarProps {
  onClose: () => void;
  cartItems: CartProduct[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  cartTotal: number;
  shippingOptions: { name: string; fee: number; description: string; }[];
  onShippingChange: (fee: number) => void;
  onPlaceOrder: (formData : { fullName: string; address: string; shippingMethod: string; }) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  cartTotal,
  shippingOptions,
  onShippingChange,
  onPlaceOrder
}) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const handleCheckoutClick = () => {
    if (cartItems.length > 0) {
      setIsCheckout(true);
    }
  };

  const handleBackToCart = () => {
    setIsCheckout(false);
  };

  return (
    <div className="flex flex-col h-full bg-white p-4 md:p-6">
      {/* Button for navigating back to the cart or closing the sidebar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {isCheckout ? 'Checkout' : 'Shopping Cart'}
        </h2>
        <Button variant="ghost" size="icon" onClick={isCheckout ? handleBackToCart : onClose} className={`${!isCheckout && "hidden"}`} >
        <ArrowLeft className="h-6 w-6" /> 
        </Button>
      </div>

      {/* Main content area for cart items and checkout form */}
      <ScrollArea className="flex-1 overflow-y-auto pr-2">
        {!isCheckout ? (
          <>
            {cartItems.length === 0 ? (
              <p className="text-gray-600 text-center py-8">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                />
              ))
            )}
          </>
        ) : (
          <CheckoutForm
            onSubmit={onPlaceOrder}
            shippingOptions={shippingOptions}
            onShippingChange={onShippingChange}
            cartTotal={cartTotal}
          />
        )}
      </ScrollArea>

      {/* Checkout button at the bottom */}
      {!isCheckout && cartItems.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-lg md:text-xl font-bold text-gray-800 mb-4">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Button
            onClick={handleCheckoutClick}
            className="w-full text-lg font-semibold"
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
