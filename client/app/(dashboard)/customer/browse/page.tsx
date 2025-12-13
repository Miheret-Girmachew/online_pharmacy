"use client";

import { DUMMY_MEDICINES } from '@/lib/mock-data';
import { useCartStore } from '@/lib/store';
import Navbar from '@/components/Navbar';
import toast, { Toaster } from 'react-hot-toast';

export default function BrowsePage() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (med: any) => {
    addItem({ ...med, quantity: 1 });
    toast.success(`Added ${med.name} to cart!`, {
      style: {
        border: '1px solid #4FD1C5',
        padding: '16px',
        color: '#1A202C',
      },
      iconTheme: {
        primary: '#4FD1C5',
        secondary: '#FFFAEE',
      },
    });
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Toaster position="bottom-right" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Find Medicines</h1>
          <p className="text-gray-500 mt-2">Order from nearby pharmacies with instant delivery.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUMMY_MEDICINES.map((med) => (
            <div key={med.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition">
                  {med.image}
                </div>
                {med.stock < 20 && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
                    Low Stock
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">{med.name}</h3>
              <p className="text-sm text-gray-500 h-10 mb-4 line-clamp-2">{med.description}</p>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <span className="text-2xl font-bold text-gray-900">${med.price.toFixed(2)}</span>
                <button 
                  onClick={() => handleAddToCart(med)}
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-accent hover:text-white transition-colors shadow-lg shadow-gray-200"
                >
                  Add +
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}