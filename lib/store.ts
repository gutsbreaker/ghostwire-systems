import { create } from 'zustand';

// --- Cart Store ---
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existingItem = get().items.find(i => i.id === item.id);
    if (existingItem) {
      set({ items: get().items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] });
    }
  },
  removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) { get().removeItem(id); return; }
    set({ items: get().items.map(i => (i.id === id ? { ...i, quantity } : i)) });
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
}));

// --- Robot Navigation & Chat Store ---
interface RobotStore {
  targetSection: string | null;
  targetPosition: { x: number; y: number } | null;
  isFlying: boolean;
  onArrival: (() => void) | null;
  
  isChatting: boolean;
  chatMessage: string;

  flyTo: (section: string, position: { x: number; y: number }, callback: () => void) => void;
  arrive: () => void;
  reset: () => void;
  
  setChatting: (status: boolean) => void;
  setChatMessage: (msg: string) => void;
}

export const useRobotStore = create<RobotStore>((set, get) => ({
  targetSection: null,
  targetPosition: null,
  isFlying: false,
  onArrival: null,
  
  isChatting: false,
  chatMessage: '',

  flyTo: (section, position, callback) => set({ targetSection: section, targetPosition: position, isFlying: true, onArrival: callback }),
  arrive: () => {
    const { onArrival } = get();
    if (onArrival) onArrival();
    set({ isFlying: false, onArrival: null });
  },
  reset: () => set({ targetSection: null, targetPosition: null, isFlying: false, onArrival: null }),
  
  setChatting: (status) => set({ isChatting: status, chatMessage: status ? 'How can I assist you today?' : '' }),
  setChatMessage: (msg) => set({ chatMessage: msg }),
}));

// --- Auth & User Portal Store ---
interface AuthStore {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  licenses: { key: string; type: string; date: string }[];
  login: (name: string, email: string) => void;
  logout: () => void;
  addLicense: (type: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  licenses: [],
  login: (name, email) => set({ isAuthenticated: true, user: { name, email } }),
  logout: () => set({ isAuthenticated: false, user: null, licenses: [] }),
  addLicense: (type) => set((state) => ({
    licenses: [{ 
      key: `GW-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`, 
      type, 
      date: new Date().toLocaleDateString() 
    }, ...state.licenses]
  }))
}));