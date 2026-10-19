import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { asset } from "../utils/asset";
import "./TopBar.css";

interface Props {
  onMenuOpen: () => void;
  onSearchOpen: () => void;
}

export default function TopBar({ onMenuOpen, onSearchOpen }: Props) {
  const { count, openDrawer } = useCart();

  return (
    <header className="topbar">
      <div className="topbar__left">
        <Link to="/" className="topbar__logo" aria-label="Untitled — home">
          <img src={asset("/brand/logo-light.png")} alt="UNTITLED" />
        </Link>

        <nav className="topbar__nav" aria-label="Primary">
          <NavLink to="/" end className="topbar__nav-link">
            Home
          </NavLink>
          <NavLink to="/products" className="topbar__nav-link">
            Shop All
          </NavLink>
          <NavLink to="/collections" className="topbar__nav-link">
            Collections
          </NavLink>
          <NavLink to="/about" className="topbar__nav-link">
            About
          </NavLink>
          <NavLink to="/contact" className="topbar__nav-link">
            Contact
          </NavLink>
        </nav>
      </div>

      <div className="topbar__actions">
        <button
          type="button"
          className="topbar__action topbar__action--search"
          onClick={onSearchOpen}
        >
          Search
        </button>
        <button type="button" className="topbar__action" onClick={openDrawer}>
          Bag{count > 0 && <span className="topbar__badge">{count}</span>}
        </button>
        <button
          type="button"
          className="topbar__action topbar__action--menu"
          onClick={onMenuOpen}
        >
          Menu <span aria-hidden="true">+</span>
        </button>
      </div>
    </header>
  );
}
