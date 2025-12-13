import { create } from 'zustand';
import Cookies from 'js-cookie';


interface UserState {
  user: any | null;
  role: 'customer' | 'pharmacy' | null;
  login: (userData: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  role: null,
  login: (userData, token) => {
    Cookies.set('token', token);
    set({ user: userData, role: userData.role });
  },
  logout: () => {
    Cookies.remove('token');
    set({ user: null, role: null });
  },
}));


interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addItem: (newItem) => set((state) => {
    const existing = state.items.find(i => i.id === newItem.id);
    if (existing) {
      return {
        items: state.items.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i)
      };
    }
    return { items: [...state.items, newItem] };
  }),

  removeItem: (id) => set((state) => ({ 
    items: state.items.filter(i => i.id !== id) 
  })),

  clearCart: () => set({ items: [] }),

  total: () => get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
}));