import type { CartItem } from "../context/CartContext";

/**
 * Shopify Storefront API integration layer.
 *
 * How to connect to your live Shopify store:
 * 1. In Shopify Admin -> Settings -> Apps and sales channels -> Develop apps
 *    create a Storefront API app with `unauthenticated_read_product_listings`
 *    and `unauthenticated_write_checkouts` / `unauthenticated_read_checkouts`.
 * 2. Set `VITE_SHOPIFY_STORE_DOMAIN` (e.g. `untitled-clothing.myshopify.com`)
 *    and `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` in `.env.local`.
 * 3. When configured, `createShopifyCheckoutUrl` creates a live Shopify Cart
 *    via the Storefront GraphQL API and returns `checkoutUrl`.
 * 4. Without credentials, the app falls back to the built-in interactive
 *    `/checkout` flow so the storefront works end-to-end out of the box.
 */

const STORE_DOMAIN = (
  import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string | undefined
)?.trim();
const STOREFRONT_TOKEN = (
  import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string | undefined
)?.trim();
const API_VERSION =
  (import.meta.env.VITE_SHOPIFY_API_VERSION as string | undefined)?.trim() ||
  "2025-01";

export interface ShopifyStatus {
  connected: boolean;
  mode: "storefront-api" | "permalink" | "ready-local";
  domain: string | null;
}

export function getShopifyStatus(): ShopifyStatus {
  if (STORE_DOMAIN && STOREFRONT_TOKEN) {
    return {
      connected: true,
      mode: "storefront-api",
      domain: STORE_DOMAIN,
    };
  }
  if (STORE_DOMAIN) {
    return {
      connected: true,
      mode: "permalink",
      domain: STORE_DOMAIN,
    };
  }
  return {
    connected: false,
    mode: "ready-local",
    domain: null,
  };
}

export async function shopifyStorefrontFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  if (!STORE_DOMAIN || !STOREFRONT_TOKEN) {
    throw new Error("Shopify Storefront credentials are not configured.");
  }
  const cleanDomain = STORE_DOMAIN.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const endpoint = `https://${cleanDomain}/api/${API_VERSION}/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify Storefront API error: ${response.status}`);
  }

  const json = (await response.json()) as {
    data?: T;
    errors?: { message: string }[];
  };
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Empty response from Shopify Storefront API.");
  }
  return json.data;
}

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

interface CartCreateResponse {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    } | null;
    userErrors: { field: string[]; message: string }[];
  };
}

/**
 * Attempts to create a live Shopify Checkout URL if Storefront credentials
 * are configured. Returns `null` when running in local/demo mode so the caller
 * can route to the built-in `/checkout` page.
 */
export async function createShopifyCheckoutUrl(
  items: CartItem[],
): Promise<string | null> {
  const status = getShopifyStatus();
  if (!status.connected || items.length === 0) {
    return null;
  }

  if (status.mode === "storefront-api") {
    const lines = items.map((item) => ({
      merchandiseId: item.shopifyVariantId,
      quantity: item.qty,
      attributes: [
        { key: "Color", value: item.color || "Black" },
        { key: "Size", value: item.size },
        { key: "SKU", value: item.sku },
      ],
    }));

    const data = await shopifyStorefrontFetch<CartCreateResponse>(
      CART_CREATE_MUTATION,
      {
        input: { lines },
      },
    );

    if (data.cartCreate.cart?.checkoutUrl) {
      return data.cartCreate.cart.checkoutUrl;
    }
  }

  if (status.domain) {
    const cleanDomain = status.domain
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");
    const query = items
      .map(
        (i) =>
          `${encodeURIComponent(i.sku)}:${i.qty}`,
      )
      .join(",");
    return `https://${cleanDomain}/cart/${query}`;
  }

  return null;
}
