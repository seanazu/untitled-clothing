import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  getShopifyVariantId,
  getVariantSku,
  type Product,
} from "../products-data";

export interface CartItem {
  productId: string;
  handle: string;
  sku: string;
  shopifyVariantId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
}

export const FREE_SHIPPING_THRESHOLD = 110;

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  freeShippingRemaining: number;
  hasFreeShipping: boolean;
  isDrawerOpen: boolean;
  toast: string | null;
  addToCart: (
    product: Product,
    size: string,
    color?: string,
    imageOverride?: string,
    qty?: number,
  ) => void;
  updateQty: (index: number, delta: number) => void;
  removeAt: (index: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  showToast: (message: string) => void;
}

const STORAGE_KEY = "untitled-cart-v2";

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
    toastTimeout.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const addToCart = useCallback(
    (
      product: Product,
      size: string,
      color?: string,
      imageOverride?: string,
      qty = 1,
    ) => {
      const resolvedColor = color ?? product.colors[0]?.label ?? "Black";
      const colorVariant =
        product.colors.find((c) => c.label === resolvedColor) ??
        product.colors[0];
      const resolvedImage =
        imageOverride ?? colorVariant?.backImage ?? product.image;
      const sku = getVariantSku(product, resolvedColor, size);
      const shopifyVariantId = getShopifyVariantId(
        product,
        resolvedColor,
        size,
      );

      setItems((current) => {
        const existing = current.find(
          (item) =>
            item.productId === product.id &&
            item.size === size &&
            item.color === resolvedColor,
        );
        if (existing) {
          return current.map((item) =>
            item === existing ? { ...item, qty: item.qty + qty } : item,
          );
        }
        return [
          ...current,
          {
            productId: product.id,
            handle: product.handle,
            sku,
            shopifyVariantId,
            name: product.name,
            price: product.price,
            image: resolvedImage,
            size,
            color: resolvedColor,
            qty,
          },
        ];
      });
      showToast(
        `Added ${product.name} (${resolvedColor} · ${size}) to your bag`,
      );
    },
    [showToast],
  );

  const updateQty = useCallback((index: number, delta: number) => {
    setItems((current) =>
      current
        .map((item, i) =>
          i === index ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  }, []);

  const removeAt = useCallback((index: number) => {
    setItems((current) => current.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    freeShippingRemaining,
    hasFreeShipping,
    isDrawerOpen,
    toast,
    addToCart,
    updateQty,
    removeAt,
    clearCart,
    openDrawer: useCallback(() => setDrawerOpen(true), []),
    closeDrawer: useCallback(() => setDrawerOpen(false), []),
    showToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
