import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight, Star, ShoppingCart, Heart, Share2, Truck, ShieldCheck, RotateCcw, Minus, Plus, MapPin, Package, Store } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProduct, useProducts, useProductInventory, useLocations } from '../hooks/useShopify';
import type { Product } from '../types';

interface ProductPageProps {
  addToCart: (product: Product) => void;
}

export default function ProductPage({ addToCart }: ProductPageProps) {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const { product } = useProduct(productId || '');
  const { products } = useProducts(50);
  const { inventory, loading: inventoryLoading } = useProductInventory(productId || '');
  const { selectedLocation } = useLocations();
  
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== productId)
    .slice(0, 4);
  
  // Get availability for selected location
  const selectedLocationInventory = inventory?.byLocation.find(
    loc => loc.locationId === selectedLocation
  );
  const availableInSelectedStore = selectedLocationInventory?.available || 0;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
        <p className="text-gray-500 mt-2">The product you're looking for doesn't exist.</p>
        <Link to="/" className="text-jio-green font-medium mt-4 inline-block hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const images = [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 overflow-x-auto">
        <Link to="/" className="hover:text-jio-green whitespace-nowrap">Home</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-jio-green whitespace-nowrap">
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  activeImage === idx ? 'border-jio-green' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-lg">
              <span className="font-semibold text-green-700">{product.rating}</span>
              <Star size={16} className="fill-green-700 text-green-700" />
            </div>
            <span className="text-gray-500">{product.reviews} Ratings & Reviews</span>
          </div>

          <div className="flex items-baseline gap-3 py-2">
            <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
            {(product.originalPrice || 0) > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                <span className="text-green-600 font-medium">{product.discount || 0}% OFF</span>
              </>
            )}
          </div>

          <p className="text-sm text-gray-500">MRP incl. of all taxes</p>
          
          {/* Real-time Inventory Display */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Store size={16} className="text-jio-green" />
              <span className="font-medium text-sm text-gray-900">Store Availability</span>
              {inventoryLoading && <span className="text-xs text-gray-500">(Loading...)</span>}
            </div>
            
            {/* Selected Location Availability */}
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-gray-500" />
              <span className="text-sm text-gray-700">
                Available at selected store: 
                <span className={`font-medium ${availableInSelectedStore > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {availableInSelectedStore > 0 ? `${availableInSelectedStore} units` : 'Out of Stock'}
                </span>
              </span>
            </div>
            
            {/* All Locations Inventory */}
            {inventory && inventory.byLocation.length > 0 && (
              <div className="border-t border-gray-200 pt-2">
                <p className="text-xs text-gray-500 mb-1.5">Availability by location:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {inventory.byLocation.map((loc) => (
                    <div 
                      key={loc.locationId}
                      className={`flex items-center justify-between text-xs px-2 py-1 rounded ${
                        loc.locationId === selectedLocation ? 'bg-green-100 text-green-800' : 'bg-white'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <Package size={12} />
                        {loc.locationName}
                      </span>
                      <span className={`font-medium ${loc.available > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {loc.available > 0 ? `${loc.available} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Total Inventory */}
            {inventory && (
              <div className="border-t border-gray-200 mt-2 pt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">Total across all stores:</span>
                <span className="text-sm font-medium text-gray-900">
                  {inventory.totalAvailable} units
                </span>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 py-2">
            <span className="font-medium text-gray-900">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-jio-green text-white py-3 rounded-lg font-medium hover:bg-jio-dark transition-colors"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-jio-green text-jio-green py-3 px-6 rounded-lg font-medium hover:bg-jio-light transition-colors">
              <Heart size={20} />
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              <Share2 size={20} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 py-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck size={20} className="text-jio-green" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShieldCheck size={20} className="text-jio-green" />
              <span>Authentic Product</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <RotateCcw size={20} className="text-jio-green" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
