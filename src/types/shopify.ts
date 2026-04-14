// Shopify Storefront API Types

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  availableForSale: boolean;
  quantityAvailable: number;
  image?: ShopifyImage;
  selectedOptions?: {
    name: string;
    value: string;
  }[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  handle: string;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyMoney | null;
  };
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants: {
    edges: { node: ShopifyProductVariant }[];
  };
  productType: string;
  vendor: string;
  tags: string[];
  options?: {
    name: string;
    values: string[];
  }[];
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: ShopifyImage;
  products: {
    edges: { node: ShopifyProduct }[];
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ShopifyProductVariant & {
    product: {
      id: string;
      title: string;
      handle: string;
    };
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: { node: CartLine }[];
  };
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount?: ShopifyMoney;
  };
}

export interface CartUserError {
  field: string[];
  message: string;
}

// Mapped types for UI compatibility
export interface Product {
  id: string;
  title: string;
  name: string; // Alias for title (compatibility)
  description: string;
  handle: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  category: string;
  productType: string;
  vendor: string;
  tags: string[];
  rating?: number;
  reviews?: number;
  inStock: boolean;
  quantity?: string;
  availableForSale: boolean;
  variantId?: string;
  variants?: ShopifyProductVariant[];
  options?: {
    name: string;
    values: string[];
  }[];
}

export interface CartItem extends Product {
  cartQuantity: number;
  lineId?: string;
}

export interface Collection {
  id: string;
  name: string; // Alias for title
  title: string;
  handle: string;
  description?: string;
  image?: string;
  icon?: string;
  subcategories?: string[];
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  link: string;
}
