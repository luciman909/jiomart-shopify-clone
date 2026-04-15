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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Image Gallery - Vertical Thumbnails */}
        <div className="lg:col-span-5 flex gap-4">
          {/* Thumbnails - Left Side */}
          <div className="flex flex-col gap-2 w-20">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                  activeImage === idx ? 'border-[#0078AD]' : 'border-gray-200'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="flex-1 aspect-square bg-gray-50 rounded-xl overflow-hidden">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-7 space-y-4">
          {/* Brand */}
          <p className="text-[#0078AD] font-semibold uppercase tracking-wide">{product.brand || 'Brand Name'}</p>
          
          {/* Product Title */}
          <h1 className="text-xl font-bold text-gray-900 leading-tight">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
              <Star size={16} className="fill-gray-200 text-gray-200" />
            </div>
            <span className="text-gray-600">{product.reviews || 1828} Ratings</span>
          </div>

          {/* Price Section */}
          <div className="border-t border-b border-gray-100 py-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
              {(product.originalPrice || 0) > product.price && (
                <>
                  <span className="text-green-600 font-semibold text-sm">{product.discount || 84}% Off</span>
                </>
              )}
            </div>
            {(product.originalPrice || 0) > product.price && (
              <p className="text-sm text-gray-500 mt-1">
                M.R.P: <span className="line-through">₹{product.originalPrice}</span> (Incl. of all taxes)
              </p>
            )}
          </div>

          {/* Offers Section */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-bold text-gray-900 mb-2">Offers (12)</h3>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-xs font-bold">BANK</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">BANK OFFERS</p>
                  <p className="text-sm text-gray-600">Get Flat Rs.50 Cashback on using BHIM App.</p>
                  <p className="text-xs text-gray-500 mt-1">12 Offer/s Available</p>
                </div>
              </div>
            </div>
            <button className="text-[#0078AD] text-sm font-medium mt-2 hover:underline">
              View All
            </button>
          </div>
          
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

          {/* Deliver to Section */}
          <div className="border-t border-b border-gray-100 py-4">
            <h3 className="font-bold text-gray-900 mb-2">Deliver to</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">364001</span>
                <span className="text-gray-600">Bhavnagar</span>
              </div>
              <button className="text-[#0078AD]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-600 font-semibold text-sm">In Stock</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 text-sm">Delivery by 23rd Apr</span>
            </div>
          </div>

          {/* Sold by Section */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-bold text-gray-900 mb-1">Sold by</h3>
            <p className="text-[#0078AD] font-medium">Reliance Retail</p>
          </div>

          {/* Features & Details */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-bold text-gray-900 mb-3">Features & Details</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Massive 42 feet of drying space</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>3-way folding technology for compact storage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Total 20 drying rails for maximum capacity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Premium silver finish for durability</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0078AD] text-white py-3.5 rounded-full font-bold hover:bg-[#006694] transition-colors text-lg"
            >
              Add to Cart
            </button>
            <button className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              <Heart size={20} className="text-gray-600" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              <Share2 size={20} className="text-gray-600" />
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
