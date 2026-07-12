import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { useRouteScrollReset, useSmoothScroll } from "./hooks/useSmoothScroll";
import TopBar from "./components/TopBar";
import MenuOverlay from "./components/MenuOverlay";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import SearchOverlay from "./components/SearchOverlay";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Collections from "./pages/Collections";
import About from "./pages/About";

export default function App() {
  useSmoothScroll();
  useRouteScrollReset();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <CartProvider>
      <TopBar onMenuOpen={() => setMenuOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </CartProvider>
  );
}
