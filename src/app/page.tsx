"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import CartSidebar from "@/components/CartSidebar";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

interface CartProduct extends Product {
  quantity: number;
}

interface ConfirmationDetails {
  orderId: string;
  fullName: string;
  totalAmount: number;
  items: { name: string; quantity: number; price: number }[];
  shippingAddress: string;
  shippingMethod: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Smartwatch",
    description: "An advanced smartwatch with an OLED screen and fitness tracking features.",
    price: 199.99,
    imageUrl: "https://placehold.co/400x400/222831/FFFFFF/png?text=Smartwatch",
    stock: 5,
  },
  {
    id: "2",
    name: "Wireless Headphones",
    description: "High-quality sound with active noise cancellation and long battery life.",
    price: 99.99,
    imageUrl: "https://placehold.co/400x400/222831/FFFFFF/png?text=Headphones",
    stock: 5,
  },
  {
    id: "3",
    name: "Smartphone",
    description: "The latest smartphone with a high-resolution camera and a super-fast processor.",
    price: 699.99,
    imageUrl: "https://placehold.co/400x400/222831/FFFFFF/png?text=Smartphone",
    stock: 5,
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    description: "A comfortable and high-performance mechanical keyboard for gamers and developers.",
    price: 79.99,
    imageUrl: "https://placehold.co/400x400/222831/FFFFFF/png?text=Keyboard",
    stock: 5,
  },
];

const SHIPPING_OPTIONS = [
  { name: "Standard", fee: 5.0, description: "3-7 business days" },
  { name: "Express", fee: 15.0, description: "1-2 business days" },
];


const HomePage = () => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(SHIPPING_OPTIONS[0].fee);
  const [confirmationDetails, setConfirmationDetails] =
    useState<ConfirmationDetails | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    const newTotal = cartItems.reduce(
      (sum, item) => sum + (item.price * 100) * item.quantity,
      0
    ) / 100;
    setCartTotal(newTotal + shippingFee);
  }, [cartItems, shippingFee]);

  const handleAddToCart = (product: Product) => {
    console.log("AddToCart event logged.");
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handlePlaceOrder = (formData: any) => {
    console.log("Purchase event logged.");
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setConfirmationDetails({
      orderId,
      fullName: formData.fullName,
      totalAmount: cartTotal,
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: formData.address,
      shippingMethod: formData.shippingMethod,
    });
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleContinueShopping = () => {
    setConfirmationDetails(null);
  };

  if (confirmationDetails) {
    return <ConfirmationScreen details={confirmationDetails} onContinueShopping={handleContinueShopping} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Header cartItemCount={cartItems.length} onToggleCart={() => setIsCartOpen(true)} />

      <main className="container mx-auto p-4 md:p-8 flex-1">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 md:p-12 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">Wireless Headphones</h2>
              <p className="text-lg md:text-xl mt-2 max-w-lg mx-auto md:mx-0">
                Enjoy a unique audio experience with noise cancellation and incredible battery life.
              </p>
              <div className="mt-6 flex justify-center md:justify-start items-center space-x-4 space-x-reverse">
                <span className="text-3xl font-bold">$99.99</span>
                <Button onClick={() => handleAddToCart(PRODUCTS[1])} className="bg-white text-blue-600 hover:bg-gray-100 transition-colors duration-200 shadow-md">
                  <ShoppingBag className="w-5 h-5 ml-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
            <img src="https://placehold.co/400x400/FFFFFF/222831/png?text=Hero+Image" alt="Hero Product" className="w-48 h-48 md:w-64 md:h-64 object-contain" />
          </div>
        </section>

        <section>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Latest Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>
      </main>

      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-[90vw] max-w-md h-[85vh] rounded-lg p-0"
        >
          <DialogHeader className="pt-4 pl-6">
            <DialogTitle>Review your items and proceed to checkout.</DialogTitle>
          </DialogHeader>
          <CartSidebar
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            cartTotal={cartTotal}
            shippingOptions={SHIPPING_OPTIONS}
            onShippingChange={setShippingFee}
            onPlaceOrder={handlePlaceOrder}
          />
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default HomePage;
