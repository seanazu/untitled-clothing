import { Link, useNavigate } from "react-router-dom";
import { FREE_SHIPPING_THRESHOLD, useCart } from "../context/CartContext";
import { createShopifyCheckoutUrl, getShopifyStatus } from "../lib/shopify";

export default function CartDrawer() {
  const {
    items,
    subtotal,
    freeShippingRemaining,
    hasFreeShipping,
    isDrawerOpen,
    closeDrawer,
    updateQty,
    removeAt,
  } = useCart();
  const navigate = useNavigate();
  const shopifyStatus = getShopifyStatus();

  const progressPct = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100),
  );

  const handleCheckoutClick = async () => {
    if (items.length === 0) return;
    if (shopifyStatus.connected) {
      try {
        const url = await createShopifyCheckoutUrl(items);
        if (url) {
          window.location.href = url;
          return;
        }
      } catch {
        // Fallback to /checkout
      }
    }
    closeDrawer();
    navigate("/checkout");
  };

  return (
    <>
      <div
        className={"cart-overlay" + (isDrawerOpen ? " is-open" : "")}
        onClick={closeDrawer}
      />
      <aside
        className={"cart-drawer" + (isDrawerOpen ? " is-open" : "")}
        aria-label="Shopping bag"
        aria-hidden={!isDrawerOpen}
      >
        <div className="cart-drawer__header">
          <span>Your Bag ({items.reduce((s, i) => s + i.qty, 0)})</span>
          <button
            className="cart-drawer__close"
            onClick={closeDrawer}
            aria-label="Close"
            type="button"
          >
            &times;
          </button>
        </div>

        <div className="cart-drawer__shipping">
          <p className="cart-drawer__shipping-text">
            {hasFreeShipping
              ? "Free bunker dispatch unlocked ✓"
              : `Add $${freeShippingRemaining} more for free shipping`}
          </p>
          <div className="cart-drawer__shipping-bar">
            <span style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <p>Your bag is empty. Go find something you can't define.</p>
              <Link
                to="/products"
                className="btn"
                onClick={closeDrawer}
              >
                Shop All 10 Shirts &rarr;
              </Link>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                className="cart-item"
                key={`${item.productId}-${item.color}-${item.size}`}
              >
                <Link
                  to={`/products/${item.handle}`}
                  onClick={closeDrawer}
                >
                  <img
                    className="cart-item__image"
                    src={item.image}
                    alt={item.name}
                  />
                </Link>
                <div>
                  <Link
                    to={`/products/${item.handle}`}
                    className="cart-item__name"
                    onClick={closeDrawer}
                  >
                    {item.name}
                  </Link>
                  <p className="cart-item__meta">
                    {item.color} &middot; Size {item.size} &middot; $
                    {item.price}
                  </p>
                  <div className="cart-item__controls">
                    <button
                      type="button"
                      onClick={() => updateQty(index, -1)}
                      aria-label="Decrease quantity"
                    >
                      &minus;
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(index, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item__remove"
                  onClick={() => removeAt(index)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-drawer__footer">
          <div className="cart-drawer__subtotal">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <button
            className="btn btn--primary"
            style={{ width: "100%" }}
            onClick={handleCheckoutClick}
            disabled={items.length === 0}
            type="button"
          >
            {shopifyStatus.connected
              ? "Proceed to Shopify Checkout →"
              : "Proceed to Checkout →"}
          </button>
        </div>
      </aside>
    </>
  );
}
