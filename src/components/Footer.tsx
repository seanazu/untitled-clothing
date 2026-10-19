import { Link } from "react-router-dom";
import { asset } from "../utils/asset";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="Untitled — home">
            <img src={asset("/brand/logo-light.png")} alt="UNTITLED" />
          </Link>
          <span className="footer__scrawl">no meaning, just energy.</span>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <Link to="/products">Shop All (10)</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/checkout">Checkout</Link>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Instagram
          </a>
        </nav>
      </div>
      <div className="footer__bottom">
        <span>&copy; 2026 UNTITLED &middot; 340GSM BUNKER ARCHIVE</span>
        <span className="footer__mono">
          shopify storefront ready &middot; made nowhere &middot; defined never
        </span>
      </div>
    </footer>
  );
}
