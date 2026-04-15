import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBasket, Smartphone, Shirt, Home as HomeIcon, Apple, Milk, Sparkles, Palette, AlertCircle, ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { categories as mockCategories, deals } from '../data';
import { useProducts, useCollections } from '../hooks/useShopify';
import { useBanners } from '../hooks/useBanners';
import { isShopifyConfigured } from '../lib/shopify';
import type { Product } from '../types';
import ShopifyDebug from '../components/ShopifyDebug';
import CategoryIconBar from '../components/CategoryIconBar';
import SubcategorySection from '../components/SubcategorySection';
import ProductSection from '../components/ProductSection';

interface HomeProps {
  addToCart: (product: Product) => void;
}

const iconMap: Record<string, React.ElementType> = {
  ShoppingBasket,
  Smartphone,
  Shirt,
  Home: HomeIcon,
  Apple,
  Milk,
  Sparkles,
  Palette
};

// Hero Banners Sub-component
function HeroBanners() {
  const { banners, loading } = useBanners('hero');
  const shopifyReady = isShopifyConfigured();
  
  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-gray-100 animate-pulse h-48 sm:h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-400">Loading banners...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative overflow-hidden rounded-xl">
      {!shopifyReady && (
        <div className="absolute top-2 right-2 z-10 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
          <AlertCircle size={10} />
          DEMO BANNERS
        </div>
      )}
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 gap-4">
        {banners.map((banner) => (
          <div 
            key={banner.id} 
            className="flex-none w-full sm:w-[calc(100%-1rem)] snap-center"
          >
            <Link to={banner.link} className="block relative aspect-[3/1] sm:aspect-[4/1] rounded-xl overflow-hidden">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x400?text=Banner';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8">
                <h2 className="text-white text-xl sm:text-3xl font-bold">{banner.title}</h2>
                {banner.subtitle && (
                  <p className="text-white/80 text-sm sm:text-base mt-1">{banner.subtitle}</p>
                )}
                <p className="text-white/80 text-sm sm:text-base mt-1">Shop Now</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home({ addToCart }: HomeProps) {
  // Get real products from Shopify
  const { products, loading: productsLoading, error: productsError } = useProducts(50);
  const { collections } = useCollections(20);
  
  // Use real collections if available, otherwise mock categories
  const displayCategories = collections.length > 0 ? collections : mockCategories;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-6">
      {/* Debug Panel - Remove after fixing */}
      <ShopifyDebug />
      
      {/* Show loading or error */}
      {productsLoading && (
        <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded">
          <p className="text-blue-800">Loading products from your Shopify store...</p>
        </div>
      )}
      {productsError && (
        <div className="bg-yellow-50 border border-yellow-200 px-4 py-3 rounded">
          <p className="text-yellow-800">⚠️ {productsError}</p>
        </div>
      )}
      {/* Hero Banner Carousel */}
      <HeroBanners />

      {/* Category Icon Bar - Horizontal Scroll with Images */}
      <CategoryIconBar />

      {/* Fruits & Vegetables Section */}
      <SubcategorySection 
        title="Fruits & Vegetables"
        subcategories={[
          { id: '1', name: 'Fresh Fruits', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081840.png', link: '/category/fresh-fruits' },
          { id: '2', name: 'Basic Vegetables', image: 'https://cdn-icons-png.flaticon.com/128/2909/2909787.png', link: '/category/vegetables' },
          { id: '3', name: 'Roots, Herbs &...', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081857.png', link: '/category/herbs' },
          { id: '4', name: 'Premium Fruits &...', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081845.png', link: '/category/premium-fruits' },
        ]}
      />

      {/* Dairy & Bakery Section */}
      <SubcategorySection 
        title="Dairy & Bakery"
        subcategories={[
          { id: '5', name: 'Milk & Milk Products', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081968.png', link: '/category/milk' },
          { id: '6', name: 'Cheese, Paneer &...', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081861.png', link: '/category/cheese' },
          { id: '7', name: 'Toast & Khari', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081878.png', link: '/category/toast' },
          { id: '8', name: 'Cakes & Muffins', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081874.png', link: '/category/cakes' },
          { id: '9', name: 'Breads & Chapatis', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081876.png', link: '/category/breads' },
          { id: '10', name: 'Bakery & Snacks', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081882.png', link: '/category/bakery' },
          { id: '11', name: 'Ice Cream', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081884.png', link: '/category/ice-cream' },
        ]}
      />

      {/* Biscuits, Drinks & Packaged Foods */}
      <SubcategorySection 
        title="Biscuits, Drinks & Packaged Foods"
        subcategories={[
          { id: '12', name: 'Chips & Namkeens', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081886.png', link: '/category/chips' },
          { id: '13', name: 'Ice Cream & Frozen', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081888.png', link: '/category/frozen' },
          { id: '14', name: 'Biscuits & Cookies', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081890.png', link: '/category/biscuits' },
          { id: '15', name: 'Chocolates & Candies', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081892.png', link: '/category/chocolates' },
          { id: '16', name: 'Indian Sweets', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081894.png', link: '/category/sweets' },
          { id: '17', name: 'Drinks & Juices', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081896.png', link: '/category/drinks' },
          { id: '18', name: 'Breakfast Cereals', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081898.png', link: '/category/cereals' },
          { id: '19', name: 'Noodles, Pasta &...', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081900.png', link: '/category/noodles' },
        ]}
      />

      {/* Cooking Essentials */}
      <SubcategorySection 
        title="Cooking Essentials"
        subcategories={[
          { id: '20', name: 'Atta, Flours & Sooji', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081902.png', link: '/category/flours' },
          { id: '21', name: 'Dals & Pulses', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081904.png', link: '/category/dals' },
          { id: '22', name: 'Rice', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081906.png', link: '/category/rice' },
          { id: '23', name: 'Sabudana, Poha &...', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081908.png', link: '/category/poha' },
          { id: '24', name: 'Edible Oils', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081910.png', link: '/category/oils' },
          { id: '25', name: 'Masala, Spices &...', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081912.png', link: '/category/spices' },
          { id: '26', name: 'Salt, Sugar & Jaggery', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081914.png', link: '/category/sugar' },
          { id: '27', name: 'Wheat & Soya', image: 'https://cdn-icons-png.flaticon.com/128/3081/3081916.png', link: '/category/wheat' },
        ]}
      />

      {/* My List & Offers - JioMart Style */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-red-600">My List & Offers</h2>
            <Link to="/offers" className="text-[#0078AD] text-sm font-medium flex items-center gap-1 hover:underline">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {products.slice(0, 6).map((product: Product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Flavour Savers / Top Products Section - JioMart Style */}
      <ProductSection
        title="Flavour Savers"
        products={products.slice(0, 6)}
        onAddToCart={addToCart}
        viewAllLink="/search"
      />

      {/* Promo Banner - Electronics Zone */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">
              Electronics Zone | <span className="text-green-600">Up To 10% Off</span> | <span className="text-blue-600">Code Tech100</span>
            </h2>
            <Link to="/category/electronics" className="text-[#0078AD] text-sm font-medium flex items-center hover:underline">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {products.slice(6, 12).map((product: Product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Fashion Bestsellers */}
      <ProductSection
        title="Fashion Bestsellers"
        products={products.slice(12, 18)}
        onAddToCart={addToCart}
        viewAllLink="/category/fashion"
      />

      {/* Deals Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Today's Deals</h2>
          <Link to="/offers" className="text-jio-green text-sm font-medium flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {deals.map((deal) => {
            const Icon = iconMap[deal.icon] || ShoppingBasket;
            return (
              <Link
                key={deal.id}
                to="/offers"
                className={`${deal.color} rounded-xl p-4 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{deal.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{deal.subtitle}</p>
                  </div>
                  <Icon className="text-gray-700" size={32} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Banner Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative rounded-xl overflow-hidden aspect-[2/1]">
          <img
            src="https://images.unsplash.com/photo-1607082348824-92a7ab8d0d74?w=600&h=300&fit=crop"
            alt="Electronics"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold">Electronics Sale</h3>
            <p className="text-sm">Up to 40% OFF</p>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden aspect-[2/1]">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop"
            alt="Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold">Fashion Week</h3>
            <p className="text-sm">Min 50% OFF</p>
          </div>
        </div>
      </section>
    </div>
  );
}
