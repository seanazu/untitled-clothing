import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getLenis } from "../hooks/useSmoothScroll";
import { asset } from "../utils/asset";
import "./MenuOverlay.css";

interface Props {
  open: boolean;
  onClose: () => void;
  onSearchOpen: () => void;
}

const LINKS = [
  { num: "01", label: "Home", to: "/", sub: "The main page · Start over" },
  {
    num: "02",
    label: "Shop All",
    to: "/products",
    sub: "All 10 shirts · 5 dual-color + 5 one-color",
  },
  {
    num: "03",
    label: "Collections",
    to: "/collections",
    sub: "Everyday Static · Void Drop 003",
  },
  {
    num: "04",
    label: "About",
    to: "/about",
    sub: "The non-story · 340GSM specs · FAQ",
  },
  {
    num: "05",
    label: "Contact",
    to: "/contact",
    sub: "Orders · Wholesale & press · Returns",
  },
];

export default function MenuOverlay({ open, onClose, onSearchOpen }: Props) {
  const { count, openDrawer } = useCart();
  const { pathname } = useLocation();

  // Close on route change.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Esc closes; page scroll locks while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    getLenis()?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
    };
  }, [open, onClose]);

  return (
    <div
      className={"menu-overlay" + (open ? " is-open" : "")}
      aria-hidden={!open}
    >
      <div className="menu-overlay__head">
        <img
          className="menu-overlay__logo"
          src={asset("/brand/logo-light.png")}
          alt=""
          aria-hidden="true"
        />
        <button
          type="button"
          className="menu-overlay__close"
          onClick={onClose}
          aria-label="Close menu"
        >
          Close <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <nav className="menu-overlay__nav" aria-label="Main">
        {LINKS.map((link, i) => (
          <Link
            key={link.num}
            to={link.to}
            className="menu-overlay__link"
            style={{ transitionDelay: open ? `${0.06 + i * 0.05}s` : "0s" }}
          >
            <span className="menu-overlay__num">{link.num}</span>
            <span className="menu-overlay__label">{link.label}</span>
            <span className="menu-overlay__sub">{link.sub}</span>
          </Link>
        ))}
      </nav>

      <div className="menu-overlay__foot">
        <button
          type="button"
          className="menu-overlay__foot-action"
          onClick={() => {
            onClose();
            onSearchOpen();
          }}
        >
          Search
        </button>
        <button
          type="button"
          className="menu-overlay__foot-action"
          onClick={() => {
            onClose();
            openDrawer();
          }}
        >
          Bag{count > 0 ? ` (${count})` : ""}
        </button>
        <Link
          to="/checkout"
          className="menu-overlay__foot-action"
          onClick={onClose}
        >
          Checkout
        </Link>
        <span className="menu-overlay__scrawl">no meaning, just energy.</span>
      </div>
    </div>
  );
}
