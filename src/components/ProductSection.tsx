import { useState } from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import type { Product } from '../types';

interface ProductSectionProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  viewAllLink?: string;
  showSponsored?: boolean;
}

export default function ProductSection({ 
  title, 
  products, 
  onAddToCart, 
  viewAllLink = '/search',
  showSponsored = true 
}: ProductSectionProps) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="bg-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <a 
            href={viewAllLink}
            className="text-[#0078AD] text-sm font-medium flex items-center gap-1 hover:underline"
          >
            View All <ChevronRight size={16} />
          </a>
        </div>

        {/* Product Grid - 6 columns like JioMart */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product, index) => (
            <div key={product.id} className="group relative">
              {/* Product Card */}
              <div className="border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
                {/* Image Container */}
                <div className="relative aspect-square mb-3">
                  {/* Sponsored Badge */}
                  {showSponsored && index % 3 === 0 && (
                    <span className="absolute top-0 left-0 bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded z-10">
                      Sponsored
                    </span>
                  )}
                  
                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-0 right-0 z-10 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Heart 
                      size={18} 
                      className={wishlist.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                    />
                  </button>

                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=Product';
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  {/* Product Name */}
                  <h3 className="text-sm text-gray-900 line-clamp-2 leading-tight min-h-[2.5rem]">
                    {product.name}
                  </h3>

                  {/* Prices */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <>
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full mt-2 py-2 border-2 border-[#0078AD] text-[#0078AD] font-semibold rounded-full hover:bg-[#0078AD] hover:text-white transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
