"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Building2, Loader2, CheckCircle2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Role Selection State ('customer' or 'pharmacy')
  const [role, setRole] = useState<'customer' | 'pharmacy'>('customer');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    pharmacyName: '' // Only for pharmacy role
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    // SIMULATE API CALL
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      // Redirect to login after registration
      setTimeout(() => router.push('/auth/login'), 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-500">Join Medivo today</p>
        </div>

        {/* ROLE TOGGLE SWITCH */}
        <div className="bg-gray-100 p-1 rounded-xl flex relative">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
              role === 'customer' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User size={18} /> Customer
          </button>
          <button
            onClick={() => setRole('pharmacy')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
              role === 'pharmacy' 
                ? 'bg-white text-accent shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building2 size={18} /> Pharmacy
          </button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
          
          {/* Conditional Input: Pharmacy Name */}
          {role === 'pharmacy' && (
            <div className="animate-fade-in">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pharmacy Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  name="pharmacyName"
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  placeholder="e.g. AASTU Clinic Pharmacy"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div>
             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{role === 'pharmacy' ? 'Owner Full Name' : 'Full Name'}</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                name="name"
                type="text"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                placeholder="you@example.com"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  placeholder="••••••"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Confirm</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  placeholder="••••••"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center gap-2
              ${role === 'pharmacy' ? 'bg-accent hover:bg-accentHover' : 'bg-gray-900 hover:bg-black'}
            `}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <>Create Account <CheckCircle2 size={20} /></>}
          </button>
        </form>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-bold text-accent hover:text-accentHover">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}