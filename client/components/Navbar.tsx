"use client";
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingBag, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const cartCount = useCartStore(state => state.items.length);
  const pathname = usePathname();
  const isPharmacy = pathname.includes('/pharmacy');

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-lg">M</div>
            <Link href="/" className="text-xl font-bold text-gray-800 tracking-tight">
              <span className="text-accent">Medivo</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            
            {isPharmacy ? (
              <>
                 <Link href="/pharmacy/orders" className={`text-sm font-bold transition ${pathname.includes('orders') ? 'text-accent' : 'text-gray-500 hover:text-gray-900'}`}>
                  Orders
                </Link>
                <Link href="/pharmacy/inventory" className={`text-sm font-bold transition ${pathname.includes('inventory') ? 'text-accent' : 'text-gray-500 hover:text-gray-900'}`}>
                  Inventory
                </Link>
              </>
            ) : (
              <>
                <Link href="/customer/orders" className="text-gray-500 hover:text-accent font-medium transition">
                  My Orders
                </Link>
                <Link href="/customer/cart" className="relative group">
                  <div className="p-2 bg-gray-50 rounded-full group-hover:bg-accent/10 transition">
                    <ShoppingBag className="w-6 h-6 text-gray-600 group-hover:text-accent" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>
              </>
            )}

            <Link href="/auth/login" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary">
              <LogOut size={18} /> Sign Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}