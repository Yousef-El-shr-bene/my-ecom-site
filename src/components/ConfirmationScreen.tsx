import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface ConfirmationDetails {
  orderId: string;
  fullName: string;
  totalAmount: number;
  items: { name: string; quantity: number; price: number }[];
  shippingAddress: string;
  shippingMethod: string;
}

interface ConfirmationScreenProps {
  details: ConfirmationDetails;
  onContinueShopping: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ details, onContinueShopping }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-12 text-center">
      <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Order Confirmed!</h2>
      <p className="text-gray-700 text-lg mb-6">
        Thank you, {details.fullName}! Your order has been placed.
      </p>

      <div className="text-left bg-gray-50 p-6 rounded-lg mb-6">
        <p className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
          Order ID: <span className="text-blue-600 font-mono">{details.orderId}</span>
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Total Amount:</span> ${details.totalAmount.toFixed(2)} (Cash on Delivery)
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Shipping Method:</span> {details.shippingMethod}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Shipping Address:</span> {details.shippingAddress}
        </p>
        <div className="mt-4 border-t pt-4">
          <p className="font-medium text-gray-800 mb-2">Ordered Items:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {details.items.map((item, index) => (
              <li key={index}>
                {item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button onClick={onContinueShopping} className="w-full md:w-auto text-lg mt-6">
        Continue Shopping
      </Button>
    </div>
  );
};

export default ConfirmationScreen;
