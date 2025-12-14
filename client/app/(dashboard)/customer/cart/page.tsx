"use client";

import { useCartStore } from '@/lib/store';
import Navbar from '@/components/Navbar';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, CheckCircle, FileText, AlertTriangle, XCircle, Paperclip } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function CartPage() {
  const { items, total, clearCart, removeItem } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  // Ref to trigger the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setIsClient(true), []);

  const needsPrescription = items.some((item: any) => item.requiresPrescription);

  const handleCheckout = () => {
    if (needsPrescription && !file) {
        toast.error("Please upload a prescription for the restricted items.", {
            icon: '🚨',
            style: { border: '2px solid #FEB2B2', background: '#FFF5F5' }
        });
        return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success("Order Placed Successfully!");
      router.push('/customer/orders'); 
    }, 2000);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  if (!isClient) return null;

  if (items.length === 0) return (
    <div className="min-h-screen bg-surface">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
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
      <Toaster position="bottom-center" />
      
      {/* HIDDEN INPUT - Triggered by buttons on the cards */}
      <input 
        type="file" 
        ref={fileInputRef}
        accept="image/*,.pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="hidden" 
      />
      
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* === LEFT COLUMN: ITEMS === */}
          <div className="lg:col-span-2 space-y-4">
            
            {items.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 transition hover:shadow-md flex flex-col gap-4">
                
                {/* Top Row: Info & Price */}
                <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                        {/* Image Placeholder */}
                        <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                           {(item as any).image || '💊'}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                            
                            <button 
                                onClick={() => removeItem(item.id)} 
                                className="text-red-400 hover:text-red-600 font-medium text-xs hover:underline mt-1"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                    <span className="font-bold text-lg text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>

                {/* === THE NOTICEABLE PRESCRIPTION BOX === */}
                {(item as any).requiresPrescription && (
                    <div className={`
                        relative overflow-hidden rounded-xl p-4 border-2 border-dashed transition-all duration-300
                        ${!file ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-300'}
                    `}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            
                            {/* Left: Message */}
                            <div className="flex items-start gap-3">
                                <div className={`mt-1 p-2 rounded-full ${!file ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {file ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                                </div>
                                <div>
                                    <h4 className={`font-bold text-sm ${!file ? 'text-red-800' : 'text-green-800'}`}>
                                        {file ? 'Prescription Attached' : 'Prescription Required'}
                                    </h4>
                                    <p className={`text-xs mt-1 ${!file ? 'text-red-600' : 'text-green-600'}`}>
                                        {file 
                                            ? `File: ${file.name}` 
                                            : 'This item is restricted. Please upload a doctor\'s note.'}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Action Button */}
                            <button 
                                onClick={triggerFileUpload}
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition whitespace-nowrap w-full sm:w-auto justify-center
                                    ${!file 
                                        ? 'bg-red-600 text-white hover:bg-red-700' 
                                        : 'bg-white text-green-700 border border-green-200 hover:bg-green-50'
                                    }
                                `}
                            >
                                {file ? (
                                    <><Paperclip size={16} /> Change File</>
                                ) : (
                                    <><UploadCloud size={16} /> Upload Now</>
                                )}
                            </button>
                        </div>
                    </div>
                )}
              </div>
            ))}
          </div>

          {/* === RIGHT COLUMN: SUMMARY === */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold mb-6 text-gray-900">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${total().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Delivery</span>
                        <span className="text-accent font-medium">Free</span>
                    </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 flex justify-between mb-6">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-accent">${total().toFixed(2)}</span>
                </div>

                <button 
                    onClick={handleCheckout}
                    disabled={isProcessing || (needsPrescription && !file)}
                    className={`
                        w-full py-4 rounded-xl font-bold text-lg transition shadow-xl flex justify-center items-center gap-2
                        ${(needsPrescription && !file) 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-gray-900 text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98]'
                        }
                    `}
                >
                    {isProcessing ? 'Processing...' : <><CheckCircle size={20}/> Checkout</>}
                </button>
                
                {needsPrescription && !file && (
                    <p className="text-red-500 text-xs text-center mt-3 font-medium animate-pulse">
                        * Upload required to proceed
                    </p>
                )}

                <p className="text-xs text-gray-400 text-center mt-4">
                    Secure checkout powered by PharmaClick
                </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}