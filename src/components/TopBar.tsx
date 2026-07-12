import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./TopBar.css";

interface Props {
  onMenuOpen: () => void;
}

export default function TopBar({ onMenuOpen }: Props) {
  const { count, openDrawer } = useCart();

  return (
    <header className="topbar">
      <Link to="/" className="topbar__logo" aria-label="Untitled — home">
        <img src="/brand/logo-red-outline.png" alt="" />
      </Link>
      <div className="topbar__actions">
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
