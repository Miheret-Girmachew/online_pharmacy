"use client";
import { useCartStore } from '@/lib/store';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, CheckCircle } from 'lucide-react';

export default function CartPage() {
  const { items, total, clearCart, removeItem } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push('/customer/orders'); 
    }, 2000);
  };

  if (items.length === 0) return (
    <div className="min-h-screen bg-surface">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Go find some healthy goodies!</p>
            <button onClick={() => router.push('/customer/browse')} className="bg-accent text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-accentHover transition">
                Browse Medicines
            </button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 font-medium text-sm">Remove</button>
                </div>
              </div>
            ))}
            
            {/* Prescription Upload Area */}
            <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl p-6 text-center mt-6">
                <UploadCloud className="w-10 h-10 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">Upload Prescription</h3>
                <p className="text-sm text-blue-600 mb-4">Required for antibiotics and controlled drugs.</p>
                <input type="file" className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-white file:text-accent
                    hover:file:bg-blue-50 cursor-pointer" 
                />
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2 text-gray-600">
                    <span>Subtotal</span>
                    <span>${total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6 text-gray-600">
                    <span>Delivery</span>
                    <span className="text-accent font-medium">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between mb-6">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-xl font-bold text-accent">${total().toFixed(2)}</span>
                </div>
                <button 
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-xl disabled:bg-gray-400 flex justify-center items-center gap-2"
                >
                    {isProcessing ? 'Processing...' : <><CheckCircle size={20}/> Checkout</>}
                </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}