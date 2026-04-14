import { useState, useEffect, useCallback } from 'react';
import { shopifyClient, isShopifyConfigured, GET_PRODUCTS, GET_PRODUCT_BY_HANDLE, GET_COLLECTIONS, GET_COLLECTION_BY_HANDLE, SEARCH_PRODUCTS, CREATE_CART, ADD_TO_CART, UPDATE_CART_LINE, REMOVE_FROM_CART, GET_CART } from '../lib/shopify';
import { products as mockProducts, categories as mockCategories, deals, banners } from '../data';
import type { Product, Collection, CartItem, ShopifyProduct, ShopifyCollection, CartLine } from '../types/shopify';

// Helper to convert Shopify product to our Product type
const mapShopifyProduct = (shopifyProduct: ShopifyProduct): Product => {
  const variant = shopifyProduct.variants.edges[0]?.node;
  const price = parseFloat(variant?.price.amount || shopifyProduct.priceRange.minVariantPrice.amount);
  const compareAtPrice = variant?.compareAtPrice?.amount 
    ? parseFloat(variant.compareAtPrice.amount)
    : shopifyProduct.compareAtPriceRange?.minVariantPrice?.amount
      ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
      : undefined;
  
  const discount = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return {
    id: shopifyProduct.id.split('/').pop() || shopifyProduct.id,
    title: shopifyProduct.title,
    name: shopifyProduct.title,
    description: shopifyProduct.description,
    handle: shopifyProduct.handle,
    price,
    originalPrice: compareAtPrice,
    discount,
    image: shopifyProduct.images.edges[0]?.node.url || '',
    images: shopifyProduct.images.edges.map(edge => edge.node.url),
    category: shopifyProduct.productType || 'General',
    productType: shopifyProduct.productType,
    vendor: shopifyProduct.vendor,
    tags: shopifyProduct.tags,
    rating: 4.3, // Default rating (Shopify doesn't have native ratings)
    reviews: 0,
    inStock: variant?.availableForSale ?? true,
    quantity: variant?.quantityAvailable?.toString() || '1',
    availableForSale: variant?.availableForSale ?? true,
    variantId: variant?.id,
    variants: shopifyProduct.variants.edges.map(edge => edge.node),
    options: shopifyProduct.options,
  };
};

// Helper to convert Shopify collection to our Collection type
const mapShopifyCollection = (shopifyCollection: ShopifyCollection): Collection => {
  return {
    id: shopifyCollection.id.split('/').pop() || shopifyCollection.id,
    title: shopifyCollection.title,
    name: shopifyCollection.title,
    handle: shopifyCollection.handle,
    description: shopifyCollection.description,
    image: shopifyCollection.image?.url,
    icon: 'ShoppingBasket', // Default icon
    subcategories: [],
  };
};

// Helper to convert Shopify cart line to our CartItem
const mapCartLine = (line: CartLine): CartItem => {
  const price = parseFloat(line.merchandise.price.amount);
  const compareAtPrice = line.merchandise.compareAtPrice?.amount
    ? parseFloat(line.merchandise.compareAtPrice.amount)
    : undefined;
  const discount = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return {
    id: line.merchandise.product.id.split('/').pop() || line.merchandise.product.id,
    title: line.merchandise.product.title,
    name: line.merchandise.product.title,
    description: '',
    handle: line.merchandise.product.handle,
    price,
    originalPrice: compareAtPrice,
    discount,
    image: line.merchandise.image?.url || '',
    category: '',
    productType: '',
    vendor: '',
    tags: [],
    rating: 4.3,
    reviews: 0,
    inStock: true,
    quantity: '',
    availableForSale: true,
    variantId: line.merchandise.id,
    cartQuantity: line.quantity,
    lineId: line.id,
  };
};

export const useProducts = (limit: number = 50) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const useShopify = isShopifyConfigured();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!useShopify) {
        // Use mock data
        setProducts(mockProducts);
        setLoading(false);
        return;
      }

      try {
        const { data } = await shopifyClient.request(GET_PRODUCTS, {
          variables: { first: limit },
        });
        
        const mappedProducts = data?.products?.edges?.map((edge: { node: ShopifyProduct }) => 
          mapShopifyProduct(edge.node)
        ) || [];
        
        setProducts(mappedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Using mock data.');
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, useShopify]);

  return { products, loading, error, useShopify };
};

export const useProduct = (handle: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const useShopify = isShopifyConfigured();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!useShopify) {
        // Use mock data
        const found = mockProducts.find(p => p.id === handle || p.handle === handle);
        setProduct(found || null);
        setLoading(false);
        return;
      }

      try {
        const { data } = await shopifyClient.request(GET_PRODUCT_BY_HANDLE, {
          variables: { handle },
        });
        
        if (data?.product) {
          setProduct(mapShopifyProduct(data.product));
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product');
        // Fallback to mock
        const found = mockProducts.find(p => p.id === handle || p.handle === handle);
        setProduct(found || null);
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      fetchProduct();
    }
  }, [handle, useShopify]);

  return { product, loading, error };
};

export const useCollections = (limit: number = 20) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const useShopify = isShopifyConfigured();

  useEffect(() => {
    const fetchCollections = async () => {
      if (!useShopify) {
        // Use mock data
        setCollections(mockCategories.map(cat => ({
          ...cat,
          title: cat.name,
          handle: cat.name.toLowerCase().replace(/\s+/g, '-'),
        })));
        setLoading(false);
        return;
      }

      try {
        const { data } = await shopifyClient.request(GET_COLLECTIONS, {
          variables: { first: limit },
        });
        
        const mappedCollections = data?.collections?.edges?.map((edge: { node: ShopifyCollection }) => 
          mapShopifyCollection(edge.node)
        ) || [];
        
        // Add icons based on product type or title
        const withIcons = mappedCollections.map((col: Collection) => ({
          ...col,
          icon: getCategoryIcon(col.title),
          subcategories: [],
        }));
        
        setCollections(withIcons.length > 0 ? withIcons : mockCategories.map(cat => ({
          ...cat,
          title: cat.name,
          handle: cat.name.toLowerCase().replace(/\s+/g, '-'),
        })));
      } catch (err) {
        console.error('Error fetching collections:', err);
        setError('Failed to fetch collections');
        setCollections(mockCategories.map(cat => ({
          ...cat,
          title: cat.name,
          handle: cat.name.toLowerCase().replace(/\s+/g, '-'),
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [limit, useShopify]);

  return { collections, loading, error };
};

export const useCollection = (handle: string, productLimit: number = 50) => {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const useShopify = isShopifyConfigured();

  useEffect(() => {
    const fetchCollection = async () => {
      if (!useShopify) {
        // Use mock data
        const cat = mockCategories.find(c => 
          c.name.toLowerCase().replace(/\s+/g, '-') === handle
        );
        if (cat) {
          setCollection({
            ...cat,
            title: cat.name,
            handle,
          });
          setProducts(mockProducts.filter(p => 
            p.category.toLowerCase() === cat.name.toLowerCase()
          ));
        }
        setLoading(false);
        return;
      }

      try {
        const { data } = await shopifyClient.request(GET_COLLECTION_BY_HANDLE, {
          variables: { handle, first: productLimit },
        });
        
        if (data?.collection) {
          setCollection(mapShopifyCollection(data.collection));
          const mappedProducts = data.collection.products?.edges?.map((edge: { node: ShopifyProduct }) => 
            mapShopifyProduct(edge.node)
          ) || [];
          setProducts(mappedProducts);
        } else {
          // Fallback to mock
          const cat = mockCategories.find(c => 
            c.name.toLowerCase().replace(/\s+/g, '-') === handle
          );
          if (cat) {
            setCollection({
              ...cat,
              title: cat.name,
              handle,
            });
            setProducts(mockProducts.filter(p => 
              p.category.toLowerCase() === cat.name.toLowerCase()
            ));
          }
        }
      } catch (err) {
        console.error('Error fetching collection:', err);
        setError('Failed to fetch collection');
        // Fallback to mock
        const cat = mockCategories.find(c => 
          c.name.toLowerCase().replace(/\s+/g, '-') === handle
        );
        if (cat) {
          setCollection({
            ...cat,
            title: cat.name,
            handle,
          });
          setProducts(mockProducts.filter(p => 
            p.category.toLowerCase() === cat.name.toLowerCase()
          ));
        }
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      fetchCollection();
    }
  }, [handle, productLimit, useShopify]);

  return { collection, products, loading, error };
};

export const useSearch = (query: string, limit: number = 50) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const useShopify = isShopifyConfigured();

  useEffect(() => {
    const searchProducts = async () => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }

      setLoading(true);

      if (!useShopify) {
        // Use mock data
        const filtered = mockProducts.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered);
        setLoading(false);
        return;
      }

      try {
        const { data } = await shopifyClient.request(SEARCH_PRODUCTS, {
          variables: { query, first: limit },
        });
        
        const mappedProducts = data?.products?.edges?.map((edge: { node: ShopifyProduct }) => 
          mapShopifyProduct(edge.node)
        ) || [];
        
        setProducts(mappedProducts);
      } catch (err) {
        console.error('Error searching products:', err);
        setError('Search failed');
        // Fallback to mock
        const filtered = mockProducts.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchProducts, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [query, limit, useShopify]);

  return { products, loading, error };
};

// Cart Hook
export const useShopifyCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const useShopify = isShopifyConfigured();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem('shopifyCartId');
    const savedCart = localStorage.getItem('cart');
    
    if (savedCartId && useShopify) {
      setCartId(savedCartId);
      // Fetch cart from Shopify
      fetchCart(savedCartId);
    } else if (savedCart) {
      // Use local cart
      const parsed = JSON.parse(savedCart);
      setCart(parsed);
      updateCartTotal(parsed);
    }
  }, [useShopify]);

  const fetchCart = async (id: string) => {
    try {
      const { data } = await shopifyClient.request(GET_CART, {
        variables: { id },
      });
      
      if (data?.cart) {
        const lines = data.cart.lines?.edges?.map((edge: { node: CartLine }) => 
          mapCartLine(edge.node)
        ) || [];
        setCart(lines);
        setCheckoutUrl(data.cart.checkoutUrl);
        updateCartTotal(lines);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const updateCartTotal = (cartItems: CartItem[]) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
    setCartTotal(total);
  };

  const addToCart = useCallback(async (product: Product) => {
    if (!useShopify) {
      // Local cart logic
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        let updated;
        if (existing) {
          updated = prev.map(item =>
            item.id === product.id
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          );
        } else {
          updated = [...prev, { ...product, cartQuantity: 1 }];
        }
        localStorage.setItem('cart', JSON.stringify(updated));
        updateCartTotal(updated);
        return updated;
      });
      return;
    }

    setLoading(true);
    try {
      if (!cartId) {
        // Create new cart
        const { data } = await shopifyClient.request(CREATE_CART, {
          variables: {
            input: {
              lines: [{
                merchandiseId: product.variantId || product.id,
                quantity: 1,
              }],
            },
          },
        });
        
        if (data?.cartCreate?.cart) {
          const newCartId = data.cartCreate.cart.id;
          setCartId(newCartId);
          localStorage.setItem('shopifyCartId', newCartId);
          setCheckoutUrl(data.cartCreate.cart.checkoutUrl);
          
          const lines = data.cartCreate.cart.lines?.edges?.map((edge: { node: CartLine }) => 
            mapCartLine(edge.node)
          ) || [];
          setCart(lines);
          updateCartTotal(lines);
        }
      } else {
        // Add to existing cart
        const { data } = await shopifyClient.request(ADD_TO_CART, {
          variables: {
            cartId,
            lines: [{
              merchandiseId: product.variantId || product.id,
              quantity: 1,
            }],
          },
        });
        
        if (data?.cartLinesAdd?.cart) {
          const lines = data.cartLinesAdd.cart.lines?.edges?.map((edge: { node: CartLine }) => 
            mapCartLine(edge.node)
          ) || [];
          setCart(lines);
          setCheckoutUrl(data.cartLinesAdd.cart.checkoutUrl);
          updateCartTotal(lines);
        }
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    } finally {
      setLoading(false);
    }
  }, [cartId, useShopify]);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!useShopify) {
      if (quantity <= 0) {
        setCart(prev => {
          const updated = prev.filter(item => item.id !== lineId && item.lineId !== lineId);
          localStorage.setItem('cart', JSON.stringify(updated));
          updateCartTotal(updated);
          return updated;
        });
        return;
      }
      
      setCart(prev => {
        const updated = prev.map(item =>
          (item.id === lineId || item.lineId === lineId) && item.cartQuantity !== quantity
            ? { ...item, cartQuantity: quantity }
            : item
        );
        localStorage.setItem('cart', JSON.stringify(updated));
        updateCartTotal(updated);
        return updated;
      });
      return;
    }

    if (!cartId) return;

    setLoading(true);
    try {
      if (quantity <= 0) {
        // Remove line
        const { data } = await shopifyClient.request(REMOVE_FROM_CART, {
          variables: {
            cartId,
            lineIds: [lineId],
          },
        });
        
        if (data?.cartLinesRemove?.cart) {
          const lines = data.cartLinesRemove.cart.lines?.edges?.map((edge: { node: CartLine }) => 
            mapCartLine(edge.node)
          ) || [];
          setCart(lines);
          setCheckoutUrl(data.cartLinesRemove.cart.checkoutUrl);
          updateCartTotal(lines);
        }
      } else {
        // Update quantity
        const { data } = await shopifyClient.request(UPDATE_CART_LINE, {
          variables: {
            cartId,
            lines: [{
              id: lineId,
              quantity,
            }],
          },
        });
        
        if (data?.cartLinesUpdate?.cart) {
          const lines = data.cartLinesUpdate.cart.lines?.edges?.map((edge: { node: CartLine }) => 
            mapCartLine(edge.node)
          ) || [];
          setCart(lines);
          setCheckoutUrl(data.cartLinesUpdate.cart.checkoutUrl);
          updateCartTotal(lines);
        }
      }
    } catch (err) {
      console.error('Error updating cart:', err);
    } finally {
      setLoading(false);
    }
  }, [cartId, useShopify]);

  const removeFromCart = useCallback(async (lineId: string) => {
    await updateQuantity(lineId, 0);
  }, [updateQuantity]);

  const proceedToCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return {
    cart,
    cartId,
    cartTotal,
    checkoutUrl,
    loading,
    itemCount: cart.reduce((sum, item) => sum + item.cartQuantity, 0),
    addToCart,
    updateQuantity,
    removeFromCart,
    proceedToCheckout,
    useShopify,
  };
};

// Helper function to get icon based on category name
function getCategoryIcon(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('grocery') || lower.includes('food')) return 'ShoppingBasket';
  if (lower.includes('electronic') || lower.includes('tech')) return 'Smartphone';
  if (lower.includes('fashion') || lower.includes('cloth')) return 'Shirt';
  if (lower.includes('home') || lower.includes('kitchen')) return 'Home';
  if (lower.includes('fruit')) return 'Apple';
  if (lower.includes('dairy') || lower.includes('milk')) return 'Milk';
  if (lower.includes('personal') || lower.includes('care')) return 'Sparkles';
  if (lower.includes('beauty') || lower.includes('makeup')) return 'Palette';
  return 'ShoppingBasket';
}

export { mockProducts, mockCategories, deals, banners };
