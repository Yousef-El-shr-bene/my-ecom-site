import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col items-center p-6 text-center h-full">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-auto max-h-48 object-contain mb-4 rounded-lg"
      />
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-2 mt-auto gap-4">
        <span className="text-xl md:text-2xl font-bold text-blue-700">${product.price.toFixed(2)}</span>
        <Button onClick={() => onAddToCart(product)} className="w-full md:w-auto">
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
