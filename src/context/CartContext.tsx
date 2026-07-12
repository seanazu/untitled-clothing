import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../products-data";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isDrawerOpen: boolean;
  toast: string | null;
  addToCart: (product: Product, size: string) => void;
  removeAt: (index: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  checkout: () => void;
}

const STORAGE_KEY = "untitled-cart";

const CartContext = createContext<CartContextValue | null>(null);

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => () => clearTimeout(toastTimeout.current), []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const addToCart = useCallback(
    (product: Product, size: string) => {
      setItems((current) => {
        const existing = current.find(
          (item) => item.productId === product.id && item.size === size,
        );
        if (existing) {
          return current.map((item) =>
            item === existing ? { ...item, qty: item.qty + 1 } : item,
          );
        }
        return [
          ...current,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            qty: 1,
          },
        ];
      });
      showToast(`Added ${product.name} (${size}) to your bag`);
    },
    [showToast],
  );

  const removeAt = useCallback((index: number) => {
    setItems((current) => current.filter((_, i) => i !== index));
  }, []);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkout = useCallback(() => {
    if (count === 0) {
      showToast("Your bag is empty");
      return;
    }
    showToast("Demo store — connect Shopify checkout here");
  }, [count, showToast]);

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    isDrawerOpen,
    toast,
    addToCart,
    removeAt,
    openDrawer: useCallback(() => setDrawerOpen(true), []),
    closeDrawer: useCallback(() => setDrawerOpen(false), []),
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
