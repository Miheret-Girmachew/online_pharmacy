"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login); // From your Zustand store
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // SIMULATE API CALL
    setTimeout(() => {
      setIsLoading(false);

      // MOCK LOGIC: Check if it's a pharmacist or user based on email text
      // In real life, the backend tells you the role.
      if (email.includes('pharma')) {
        // Log in as Pharmacist
        login(
            { id: 'u2', name: 'Dr. John Doe', email, role: 'pharmacy' }, 
            'fake-jwt-token'
        );
        toast.success('Welcome back, Doc!');
        // For Phase 1, we might not have a pharmacy dashboard yet, 
        // but we can route them to inventory or back home for now.
        router.push('/pharmacy/orders'); 
      } else {
        // Log in as Customer
        login(
            { id: 'u1', name: 'Miheret Girmachew', email, role: 'customer' }, 
            'fake-jwt-token'
        );
        toast.success('Login Successful!');
        router.push('/customer/browse');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-surface">
      <Toaster position="top-center" />
      
      {/* Left Side - Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent to-blue-600 opacity-90"></div>
        <div className="relative z-10 p-12 text-white">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl mb-6">
            💊
          </div>
          <h2 className="text-5xl font-bold mb-6">Manage your health securely.</h2>
          <p className="text-xl text-blue-100 max-w-md">
            Whether you are ordering prescriptions or managing pharmacy inventory, PharmaClick connects you instantly.
          </p>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-12 right-12 w-32 h-32 bg-accent/30 rounded-full blur-2xl"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 mt-2">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-accent focus:ring-accent" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-accent hover:text-accentHover">Forgot password?</a>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition shadow-lg shadow-gray-200 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/register" className="font-bold text-accent hover:text-accentHover">
              Create free account
            </Link>
          </p>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100">
            <strong>Tip for Demo:</strong> <br/>
            Use <b>'user@gmail.com'</b> for Customer view.<br/>
            Use <b>'pharma@aastu.et'</b> for Pharmacist view.
          </div>
        </div>
      </div>
    </div>
  );
}