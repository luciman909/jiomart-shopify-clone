import { useState, useEffect } from 'react';
import { isShopifyConfigured, shopifyClient } from '../lib/shopify';

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  position?: 'hero' | 'grid' | 'sidebar';
}

// Default banners that match JioMart style
const defaultBanners: Banner[] = [
  {
    id: '1',
    title: 'Fresh Grocery Deals',
    subtitle: 'Up to 50% OFF',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop',
    link: '/category/grocery',
    position: 'hero'
  },
  {
    id: '2',
    title: 'Electronics Sale',
    subtitle: 'Latest gadgets at best prices',
    image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=600&h=300&fit=crop',
    link: '/category/electronics',
    position: 'grid'
  },
  {
    id: '3',
    title: 'Fashion Week',
    subtitle: 'Min 50% OFF',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop',
    link: '/category/fashion',
    position: 'grid'
  }
];

// Parse custom banners from environment variable
const getCustomBanners = (): Banner[] | null => {
  const envBanners = import.meta.env.VITE_CUSTOM_BANNERS;
  if (!envBanners) return null;
  
  try {
    const parsed = JSON.parse(envBanners);
    if (Array.isArray(parsed)) {
      return parsed.map((b: any, index: number) => ({
        id: b.id || String(index + 1),
        title: b.title || 'Special Offer',
        subtitle: b.subtitle || '',
        image: b.image || 'https://via.placeholder.com/600x300',
        link: b.link || '/',
        position: b.position || 'hero'
      }));
    }
  } catch (e) {
    console.error('Failed to parse VITE_CUSTOM_BANNERS:', e);
  }
  return null;
};

export const useBanners = (position?: 'hero' | 'grid' | 'sidebar') => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      
      // 1. Try custom banners from env first
      const customBanners = getCustomBanners();
      if (customBanners) {
        const filtered = position 
          ? customBanners.filter(b => b.position === position)
          : customBanners;
        setBanners(filtered);
        setLoading(false);
        return;
      }
      
      // 2. If Shopify configured, try fetching from metaobjects
      if (isShopifyConfigured()) {
        try {
          // For now, use default banners with store branding
          // In future, fetch from Shopify metaobjects
          const storeName = import.meta.env.VITE_STORE_NAME || 'Your Store';
          const brandedBanners = defaultBanners.map(b => ({
            ...b,
            title: b.title.replace('JioMart', storeName)
          }));
          
          const filtered = position
            ? brandedBanners.filter(b => b.position === position)
            : brandedBanners;
          
          setBanners(filtered);
        } catch (err) {
          console.error('Error fetching banners:', err);
          setError('Failed to load banners');
          setBanners(defaultBanners);
        }
      } else {
        // 3. Use default banners
        const filtered = position
          ? defaultBanners.filter(b => b.position === position)
          : defaultBanners;
        setBanners(filtered);
      }
      
      setLoading(false);
    };

    fetchBanners();
  }, [position]);

  return { banners, loading, error };
};

export default useBanners;
