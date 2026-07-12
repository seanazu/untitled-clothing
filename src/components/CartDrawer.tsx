import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const { items, subtotal, isDrawerOpen, closeDrawer, removeAt, checkout } =
    useCart();

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
          <span>Your Bag</span>
          <button
            className="cart-drawer__close"
            onClick={closeDrawer}
            aria-label="Close"
            type="button"
          >
            &times;
          </button>
        </div>
        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <p className="cart-drawer__empty">
              Your bag is empty. Go find something you can't define.
            </p>
          ) : (
            items.map((item, index) => (
              <div className="cart-item" key={`${item.productId}-${item.size}`}>
                <img
                  className="cart-item__image"
                  src={item.image}
                  alt={item.name}
                />
                <div>
                  <p className="cart-item__name">{item.name}</p>
                  <p className="cart-item__meta">
                    Size {item.size} &middot; Qty {item.qty} &middot; $
                    {item.price}
                  </p>
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
            onClick={checkout}
            type="button"
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
