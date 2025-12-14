"use client";

import { useState } from 'react';
import { DUMMY_MEDICINES } from '@/lib/mock-data';
import Navbar from '@/components/Navbar';
import { Save, Plus, Search, AlertCircle, X, Loader2, Info } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function InventoryPage() {
  const [inventory, setInventory] = useState(DUMMY_MEDICINES);
  const [searchTerm, setSearchTerm] = useState('');
  
  // === Modal State ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    requiresPrescription: false // <--- Added for logic
  });

  // 1. Handle Updating Existing Stock
  const handleStockChange = (id: string, newQty: string) => {
    const qty = parseInt(newQty);
    if (isNaN(qty)) return;

    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, stock: qty } : item
    ));
  };

  const handleSaveStock = (item: any) => {
    toast.success(`Updated stock for ${item.name}`);
  };

  // 2. Handle Adding NEW Medicine
  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extra validation check
    if (!newItem.name || !newItem.price || !newItem.stock) {
        toast.error("Please fill in all mandatory fields.");
        return;
    }

    setIsSaving(true);

    setTimeout(() => {
        const newMedicine = {
            id: Math.random().toString(36).substr(2, 9),
            name: newItem.name,
            price: parseFloat(newItem.price),
            stock: parseInt(newItem.stock),
            description: newItem.description || 'No description provided.',
            image: newItem.requiresPrescription ? '🧪' : '💊', // Icon logic
            requiresPrescription: newItem.requiresPrescription
        };

        setInventory([newMedicine, ...inventory]);
        setIsSaving(false);
        setIsModalOpen(false);
        setNewItem({ name: '', price: '', stock: '', description: '', requiresPrescription: false });
        toast.success("Medicine added successfully!");
    }, 1000);
  };

  const filteredItems = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Toaster position="bottom-right" />

      <main className="max-w-7xl mx-auto px-4 py-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-500">Update stock levels and manage prices.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-accentHover shadow-lg transition"
          >
            <Plus size={20} /> Add New Medicine
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by medicine name..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Inventory Table */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Product Name</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Price (ETB)</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Current Stock</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{item.image}</span>
                        <div>
                            <div className="font-bold text-gray-900 flex items-center gap-2">
                                {item.name}
                                {/* Show Badge if Rx Required */}
                                {item.requiresPrescription && (
                                    <span className="bg-yellow-100 text-yellow-700 text-[10px] px-1.5 py-0.5 rounded border border-yellow-200 uppercase font-bold">Rx</span>
                                )}
                            </div>
                            <div className="text-xs text-gray-400">{item.description.substring(0, 30)}...</div>
                        </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-gray-600">${item.price.toFixed(2)}</td>
                  <td className="p-4">
                    {item.stock < 10 ? (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
                        <AlertCircle size={12} /> Low Stock
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            value={item.stock}
                            onChange={(e) => handleStockChange(item.id, e.target.value)}
                            className="w-20 p-2 border rounded-lg text-center font-bold text-gray-800 focus:border-accent outline-none"
                        />
                        <span className="text-xs text-gray-400">units</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                        onClick={() => handleSaveStock(item)}
                        className="text-accent hover:text-accentHover p-2 hover:bg-blue-50 rounded-lg transition"
                    >
                        <Save size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredItems.length === 0 && <div className="p-10 text-center text-gray-400">No medicines found.</div>}
        </div>
      </main>

      {/* === THE MODAL === */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-fade-in p-8 relative max-h-[90vh] overflow-y-auto">
            
            <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
                <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-2">Add New Medicine</h2>
            
            <div className="bg-blue-50 text-blue-800 p-3 rounded-lg mb-6 text-sm flex items-start gap-2 border border-blue-100">
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <span>
                    Fields marked with <span className="text-red-500 font-bold">*</span> are required.
                </span>
            </div>
            
            <form onSubmit={handleAddNewItem} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Medicine Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                        required
                        type="text" 
                        placeholder="e.g. Ibuprofen 200mg"
                        className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20"
                        value={newItem.name}
                        onChange={e => setNewItem({...newItem, name: e.target.value})}
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Price (ETB) <span className="text-red-500">*</span>
                        </label>
                        <input 
                            required
                            type="number" 
                            placeholder="0.00"
                            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20"
                            value={newItem.price}
                            onChange={e => setNewItem({...newItem, price: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Initial Stock <span className="text-red-500">*</span>
                        </label>
                        <input 
                            required
                            type="number" 
                            placeholder="0"
                            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20"
                            value={newItem.stock}
                            onChange={e => setNewItem({...newItem, stock: e.target.value})}
                        />
                    </div>
                </div>

                {/* === NEW PRESCRIPTION CHECKBOX === */}
                <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl cursor-pointer hover:bg-yellow-100 transition">
                    <input 
                        type="checkbox" 
                        id="rxCheck"
                        className="w-5 h-5 text-accent rounded focus:ring-accent cursor-pointer"
                        checked={newItem.requiresPrescription}
                        onChange={e => setNewItem({...newItem, requiresPrescription: e.target.checked})}
                    />
                    <label htmlFor="rxCheck" className="cursor-pointer select-none">
                        <span className="font-bold text-gray-800 block text-sm">Requires Prescription?</span>
                        <p className="text-xs text-gray-500">Check this if the customer must upload a doctor's paper.</p>
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea 
                        placeholder="Short description..."
                        className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-accent/20"
                        rows={3}
                        value={newItem.description}
                        onChange={e => setNewItem({...newItem, description: e.target.value})}
                    />
                </div>

                <button 
                    type="submit"
                    disabled={isSaving}
                    className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-accentHover transition shadow-lg mt-4 flex items-center justify-center gap-2"
                >
                    {isSaving ? <Loader2 className="animate-spin" /> : 'Save Product'}
                </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}