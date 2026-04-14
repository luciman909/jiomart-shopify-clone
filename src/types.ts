// Re-export all types from shopify.ts for backward compatibility
export type {
  Category,
  Collection,
  Product,
  CartItem,
  Banner,
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
  CartLine,
  ShopifyMoney,
  ShopifyImage,
  ShopifyProductVariant,
  CartUserError,
} from './types/shopify';

// For backward compatibility with mock data
declare module './types/shopify' {
  export interface Category {
    id: string;
    name: string;
    icon: string;
    subcategories: string[];
    title?: string;
    handle?: string;
    description?: string;
    image?: string;
  }
}
