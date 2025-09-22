import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

interface CheckoutFormProps {
  onSubmit: (formData: FormData) => void;
  shippingOptions: {
    name: string;
    fee: number;
    description: string;
  }[];
  onShippingChange: (fee: number) => void;
  cartTotal: number;
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  city: string;
  address: string;
  notes: string;
  shippingMethod: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, shippingOptions, onShippingChange, cartTotal }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    city: '',
    address: '',
    notes: '',
    shippingMethod: shippingOptions[0]?.name || '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (value: string) => {
      const selectedOption = shippingOptions.find(opt => opt.name === value);
      if (selectedOption) {
        setFormData((prev) => ({ ...prev, shippingMethod: value }));
        onShippingChange(selectedOption.fee);
      }
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName || formData.fullName.length < 3) {
      newErrors.fullName = 'Full Name is required and must be at least 3 characters.';
    }
    if (!formData.phoneNumber || !/^\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number is required and must be 10-15 digits only.';
    }
    if (!formData.city) {
      newErrors.city = 'City/Region is required.';
    }
    if (!formData.address) {
      newErrors.address = 'Address is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg">
      <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
          {errors.fullName && <p className="text-red-500 text-xs italic mt-1">{errors.fullName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="e.g., 05XXXXXXXX" />
          {errors.phoneNumber && <p className="text-red-500 text-xs italic mt-1">{errors.phoneNumber}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City/Region</Label>
          <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city" />
          {errors.city && <p className="text-red-500 text-xs italic mt-1">{errors.city}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Full Address</Label>
          <Textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Street, Building No., Neighborhood, ..." />
          {errors.address && <p className="text-red-500 text-xs italic mt-1">{errors.address}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes (optional)</Label>
          <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="e.g., Call before arrival" />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-2">Shipping Options</h3>
          <RadioGroup 
            onValueChange={handleRadioChange}
            value={formData.shippingMethod}
            className="grid grid-cols-1 gap-4"
          >
            {shippingOptions.map((option) => (
              <div key={option.name} className="flex items-center space-x-2">
                <RadioGroupItem value={option.name} id={option.name} />
                <Label htmlFor={option.name}>
                  <span className="font-medium">{option.name}</span> ${option.fee.toFixed(2)}{' '}
                  <span className="text-sm text-gray-500">({option.description})</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xl font-bold text-gray-800 mt-6 pt-4 border-t border-gray-200">
        <span>Total:</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>
      <Button type="submit" className="w-full text-lg mt-4">
        Cash on Delivery
      </Button>
    </form>
  );
};

export default CheckoutForm;
