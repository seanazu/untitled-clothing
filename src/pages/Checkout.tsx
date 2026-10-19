import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import FadeContent from "../components/reactbits/FadeContent";
import { useCart } from "../context/CartContext";
import { createShopifyCheckoutUrl, getShopifyStatus } from "../lib/shopify";
import "../styles/checkout.css";

export default function Checkout() {
  const {
    items,
    subtotal,
    hasFreeShipping,
    updateQty,
    removeAt,
    clearCart,
    showToast,
  } = useCart();

  const shopifyStatus = getShopifyStatus();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard",
  );
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isRedirectingShopify, setIsRedirectingShopify] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    total: number;
    email: string;
    itemCount: number;
  } | null>(null);

  const discount = appliedPromo === "VOID10" ? Math.round(subtotal * 0.1) : 0;
  const shippingCost =
    shippingMethod === "express" ? 15 : hasFreeShipping ? 0 : 8;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === "VOID10" || code === "UNTITLED10") {
      setAppliedPromo("VOID10");
      showToast("Promo code VOID10 applied (10% off)");
    } else {
      showToast("Try code VOID10 for 10% off your drop order");
    }
  };

  const handleShopifyHandoff = async () => {
    setIsRedirectingShopify(true);
    try {
      const url = await createShopifyCheckoutUrl(items);
      if (url) {
        window.location.href = url;
        return;
      }
      showToast(
        "Set VITE_SHOPIFY_STORE_DOMAIN in .env.local to redirect to live Shopify Checkout",
      );
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Could not reach Shopify API",
      );
    } finally {
      setIsRedirectingShopify(false);
    }
  };

  const handleCompleteOrder = async (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (shopifyStatus.connected) {
      await handleShopifyHandoff();
      return;
    }

    const orderNumber = `UNT-${Math.floor(100000 + Math.random() * 900000)}`;
    const count = items.reduce((s, i) => s + i.qty, 0);
    setCompletedOrder({
      orderNumber,
      total,
      email,
      itemCount: count,
    });
    clearCart();
  };

  if (completedOrder) {
    return (
      <FadeContent duration={450}>
        <section className="checkout-complete">
          <p className="checkout-complete__badge">
            ORDER CONFIRMED &middot; #{completedOrder.orderNumber}
          </p>
          <h1 className="checkout-complete__title">
            Nothing is on its way to you.
          </h1>
          <p className="checkout-complete__sub">
            Confirmation sent to <strong>{completedOrder.email}</strong> &middot;{" "}
            {completedOrder.itemCount} item(s) &middot; Total $
            {completedOrder.total}. Packed in custom-stamped UNTITLED kraft
            packaging.
          </p>
          <div className="checkout-complete__actions">
            <Link to="/products" className="btn btn--primary">
              Continue Shopping &rarr;
            </Link>
            <Link to="/collections" className="btn">
              Explore Collections
            </Link>
          </div>
        </section>
      </FadeContent>
    );
  }

  return (
    <FadeContent duration={450}>
      <div className="checkout-page">
        <div className="checkout-page__head">
          <div>
            <p className="checkout-page__eyebrow">
              SHOPIFY STOREFRONT READY &middot; ENCRYPTED DISPATCH
            </p>
            <h1 className="checkout-page__title">Checkout</h1>
          </div>
          <Link to="/products" className="checkout-page__back">
            &larr; Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="checkout-empty">
            <p>Your bag is empty. Add one of the 10 shirts first.</p>
            <Link to="/products" className="btn btn--primary">
              Browse All 10 Shirts &rarr;
            </Link>
          </div>
        ) : (
          <div className="checkout-grid">
            {/* Left: Customer & Shipping Form */}
            <form className="checkout-form" onSubmit={handleCompleteOrder}>
              <div className="checkout-shopify-banner">
                <div>
                  <span className="checkout-shopify-banner__tag">
                    {shopifyStatus.connected
                      ? `CONNECTED: ${shopifyStatus.domain}`
                      : "SHOPIFY STOREFRONT READY"}
                  </span>
                  <p className="checkout-shopify-banner__text">
                    {shopifyStatus.connected
                      ? "Your bag is synced with Shopify Storefront API."
                      : "All SKUs & variant GIDs are pre-mapped for Shopify Storefront API. Complete your order below or connect VITE_SHOPIFY_STORE_DOMAIN in .env.local."}
                  </p>
                </div>
                {shopifyStatus.connected && (
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={handleShopifyHandoff}
                    disabled={isRedirectingShopify}
                  >
                    {isRedirectingShopify
                      ? "Opening Shopify..."
                      : "Express Shopify Checkout ↗"}
                  </button>
                )}
              </div>

              <div className="checkout-section">
                <h2 className="checkout-section__title">01 &middot; Contact</h2>
                <div className="checkout-field">
                  <label htmlFor="co-email">Email for Order &amp; Tracking *</label>
                  <input
                    id="co-email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="checkout-section">
                <h2 className="checkout-section__title">
                  02 &middot; Delivery Address
                </h2>
                <div className="checkout-row">
                  <div className="checkout-field">
                    <label htmlFor="co-fn">First Name *</label>
                    <input
                      id="co-fn"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="co-ln">Last Name *</label>
                    <input
                      id="co-ln"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="checkout-field">
                  <label htmlFor="co-addr">Street Address &amp; Apt *</label>
                  <input
                    id="co-addr"
                    type="text"
                    required
                    placeholder="Herzl 14, Apt 4"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="checkout-row">
                  <div className="checkout-field">
                    <label htmlFor="co-city">City *</label>
                    <input
                      id="co-city"
                      type="text"
                      required
                      placeholder="Tel Aviv"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="co-zip">Postal Code</label>
                    <input
                      id="co-zip"
                      type="text"
                      placeholder="66881"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="checkout-field">
                  <label htmlFor="co-phone">Phone (For Courier SMS) *</label>
                  <input
                    id="co-phone"
                    type="tel"
                    required
                    placeholder="+972 50-000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="checkout-section">
                <h2 className="checkout-section__title">
                  03 &middot; Dispatch Method
                </h2>
                <div className="checkout-methods">
                  <label
                    className={
                      "checkout-method" +
                      (shippingMethod === "standard" ? " is-active" : "")
                    }
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                    />
                    <div>
                      <strong>Standard Bunker Dispatch (2–4 Business Days)</strong>
                      <small>Stamped UNTITLED kraft bag</small>
                    </div>
                    <span>{hasFreeShipping ? "FREE" : "$8"}</span>
                  </label>

                  <label
                    className={
                      "checkout-method" +
                      (shippingMethod === "express" ? " is-active" : "")
                    }
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                    />
                    <div>
                      <strong>Same/Next-Day Express Courier</strong>
                      <small>Direct door-to-door priority</small>
                    </div>
                    <span>$15</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--primary checkout-submit"
              >
                {shopifyStatus.connected
                  ? `Proceed to Shopify Checkout — $${total}`
                  : `Complete Order — $${total}`}
              </button>
            </form>

            {/* Right: Order Summary */}
            <aside className="checkout-summary">
              <h2 className="checkout-summary__title">
                Order Summary ({items.reduce((s, i) => s + i.qty, 0)})
              </h2>

              <div className="checkout-items">
                {items.map((item, idx) => (
                  <div
                    key={`${item.sku}-${idx}`}
                    className="checkout-item"
                  >
                    <img src={item.image} alt={item.name} />
                    <div className="checkout-item__info">
                      <Link
                        to={`/products/${item.handle}`}
                        className="checkout-item__name"
                      >
                        {item.name}
                      </Link>
                      <span className="checkout-item__meta">
                        {item.color} &middot; Size {item.size}
                      </span>
                      <span className="checkout-item__sku">SKU: {item.sku}</span>
                      <div className="checkout-item__qty">
                        <button
                          type="button"
                          onClick={() => updateQty(idx, -1)}
                          aria-label="Decrease quantity"
                        >
                          &minus;
                        </button>
                        <span>{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(idx, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="checkout-item__remove"
                          onClick={() => removeAt(idx)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <span className="checkout-item__price">
                      ${item.price * item.qty}
                    </span>
                  </div>
                ))}
              </div>

              <div className="checkout-promo">
                <input
                  type="text"
                  placeholder="Promo code (try VOID10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
                <button type="button" className="btn" onClick={handleApplyPromo}>
                  Apply
                </button>
              </div>

              <div className="checkout-totals">
                <div className="checkout-totals__row">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="checkout-totals__row checkout-totals__row--discount">
                    <span>Discount ({appliedPromo})</span>
                    <span>&minus;${discount}</span>
                  </div>
                )}
                <div className="checkout-totals__row">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "FREE" : `$${shippingCost}`}</span>
                </div>
                <div className="checkout-totals__row checkout-totals__row--grand">
                  <span>Total (USD)</span>
                  <span>${total}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </FadeContent>
  );
}
