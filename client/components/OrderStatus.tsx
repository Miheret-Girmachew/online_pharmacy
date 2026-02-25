"use client";
import useSWR from 'swr';
import { wait } from '@/lib/mock-data';

const mockFetcher = async () => {
  await wait(500); 
  const statuses = ['Processing', 'Packed', 'Shipped', 'Out for Delivery'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    id: "ORD-NEW-882",
    status: randomStatus,
    items: 3,
    total: 42.50
  };
};

export default function OrderStatus() {
  const { data, error } = useSWR('mock-order-status', mockFetcher, { refreshInterval: 3000 });

  if (!data) return <div className="text-accent animate-pulse">Syncing status...</div>;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Latest Order</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">#{data.id}</p>
        </div>
        <span className={`px-4 py-1 rounded-full text-sm font-bold shadow-sm
          ${data.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : ''}
          ${data.status === 'Packed' ? 'bg-blue-100 text-blue-700' : ''}
          ${data.status === 'Shipped' ? 'bg-accent/20 text-teal-700' : ''}
          ${data.status === 'Out for Delivery' ? 'bg-green-100 text-green-700' : ''}
        `}>
          {data.status}
        </span>
      </div>
      
      <div className="mt-6 w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-accent h-2.5 rounded-full transition-all duration-1000 ease-in-out" 
          style={{ width: data.status === 'Processing' ? '25%' : data.status === 'Packed' ? '50%' : data.status === 'Shipped' ? '75%' : '95%' }}
        ></div>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-right">Updated just now</p>
    </div>
  );
}