import { Link } from 'react-router-dom';
import { ShoppingCart, Star, AlertCircle } from 'lucide-react';
import type { Product } from '../types';
import { isShopifyConfigured } from '../lib/shopify';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const shopifyReady = isShopifyConfigured();
  const isMockProduct = !shopifyReady || product.id.length < 5; // Simple check for mock data
  
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group relative">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-50 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
          />
          {(product.discount || 0) > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              {product.discount}% OFF
            </span>
          )}
          {isMockProduct && (
            <span className="absolute top-2 right-2 bg-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
              <AlertCircle size={10} />
              DEMO
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-jio-green transition-colors min-h-[40px]">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-xs text-gray-500 mt-1">{product.quantity}</p>
        
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded">
            <span className="text-xs font-medium text-green-700">{product.rating}</span>
            <Star size={10} className="fill-green-700 text-green-700" />
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        
        <div className="flex items-end justify-between mt-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">₹{product.price}</span>
              {(product.originalPrice || 0) > product.price && (
                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">MRP incl. of all taxes</p>
          </div>
          
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-jio-green text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-jio-dark transition-colors"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
