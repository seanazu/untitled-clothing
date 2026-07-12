import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast } = useCart();

  return (
    <div className={"toast" + (toast ? " is-visible" : "")} role="status">
      {toast}
    </div>
  );
}
