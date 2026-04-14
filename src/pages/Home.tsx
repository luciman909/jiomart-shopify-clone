import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBasket, Smartphone, Shirt, Home, Apple, Milk, Sparkles, Palette } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { banners, products, categories, deals } from '../data';
import type { Product } from '../types';

interface HomeProps {
  addToCart: (product: Product) => void;
}

const iconMap: Record<string, React.ElementType> = {
  ShoppingBasket,
  Smartphone,
  Shirt,
  Home,
  Apple,
  Milk,
  Sparkles,
  Palette
};

export default function Home({ addToCart }: HomeProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-6">
      {/* Hero Banner Carousel */}
      <div className="relative overflow-hidden rounded-xl">
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
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8">
                  <h2 className="text-white text-xl sm:text-3xl font-bold">{banner.title}</h2>
                  <p className="text-white/80 text-sm sm:text-base mt-1">Shop Now</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Shop by Category</h2>
          <Link to="/categories" className="text-jio-green text-sm font-medium flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || ShoppingBasket;
            return (
              <Link
                key={category.id}
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-full aspect-square max-w-[80px] bg-jio-light rounded-xl flex items-center justify-center group-hover:bg-jio-green/10 transition-colors">
                  <Icon className="text-jio-green" size={28} />
                </div>
                <span className="text-xs sm:text-sm text-gray-700 text-center line-clamp-2 font-medium">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

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

      {/* Top Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
          <Link to="/search" className="text-jio-green text-sm font-medium flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.slice(0, 12).map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
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
