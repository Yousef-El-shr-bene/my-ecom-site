import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0">
      <div className="flex items-center gap-4 flex-1">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 object-contain rounded-md"
        />
        <div className="flex flex-col">
          <h4 className="font-semibold text-gray-800">{item.name}</h4>
          <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="font-medium text-gray-800">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onRemoveItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
