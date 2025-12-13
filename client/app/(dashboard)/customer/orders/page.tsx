"use client";
import Navbar from '@/components/Navbar';
import OrderStatus from '@/components/OrderStatus';
import { DUMMY_ORDERS } from '@/lib/mock-data';

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        {/* The Live Tracker Component */}
        <div className="mb-10">
            <h2 className="text-lg font-semibold text-gray-600 mb-4">Active Order</h2>
            <OrderStatus />
        </div>

        {/* Past Orders List */}
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Order History</h2>
        <div className="space-y-4">
            {DUMMY_ORDERS.map((order) => (
                <div key={order.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center hover:shadow-md transition">
                    <div>
                        <p className="font-bold text-gray-800">{order.id}</p>
                        <p className="text-sm text-gray-400">{order.date}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase mt-1">
                            {order.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}