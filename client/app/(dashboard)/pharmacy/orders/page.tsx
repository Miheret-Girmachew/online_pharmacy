"use client";
import Navbar from '@/components/Navbar'; 

export default function PharmacyDashboard() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Note: You might want a specific PharmacyNavbar later, but using Navbar for now is fine */}
      <Navbar /> 
      
      <div className="max-w-7xl mx-auto p-4 sm:p-10">
        <div className="bg-teal-700 text-white p-8 rounded-3xl shadow-xl mb-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h1 className="text-3xl sm:text-4xl font-bold relative z-10">Pharmacy Portal</h1>
            <p className="mt-2 text-teal-100 relative z-10">Manage incoming orders and update your stock.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <h3 className="text-gray-500 font-bold uppercase text-xs tracking-wider">Pending Orders</h3>
                <p className="text-4xl font-bold text-gray-800 mt-2">12</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <h3 className="text-gray-500 font-bold uppercase text-xs tracking-wider">Revenue Today</h3>
                <p className="text-4xl font-bold text-gray-800 mt-2">$450.00</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <h3 className="text-gray-500 font-bold uppercase text-xs tracking-wider">Low Stock Alerts</h3>
                <p className="text-4xl font-bold text-red-500 mt-2">3</p>
            </div>
        </div>
        
        {/* Fake Orders List */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Incoming Requests</h2>
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Order ID</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Items</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    <tr>
                        <td className="p-4 font-mono text-sm">#ORD-123</td>
                        <td className="p-4">Abebe Bikila</td>
                        <td className="p-4">Paracetamol (x2)</td>
                        <td className="p-4"><span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">Pending</span></td>
                        <td className="p-4"><button className="text-blue-600 font-bold hover:underline">Accept</button></td>
                    </tr>
                     <tr>
                        <td className="p-4 font-mono text-sm">#ORD-124</td>
                        <td className="p-4">Sara Tadesse</td>
                        <td className="p-4">Amoxicillin (x1)</td>
                        <td className="p-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Paid</span></td>
                        <td className="p-4"><button className="text-blue-600 font-bold hover:underline">Pack</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}