import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="Untitled — home">
            <img src="/brand/logo-red-outline.png" alt="" />
          </Link>
          <span className="footer__scrawl">no meaning, just energy.</span>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <Link to="/products">Shop</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/about">About</Link>
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
        <span>&copy; 2026 UNTITLED</span>
        <span className="footer__mono">made nowhere &middot; defined never</span>
      </div>
    </footer>
  );
}
