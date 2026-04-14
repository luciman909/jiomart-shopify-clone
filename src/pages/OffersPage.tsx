import { Link } from 'react-router-dom';
import { ChevronRight, Gift, Tag, Percent, Clock, ShoppingBasket, Smartphone, Shirt, Home } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useShopify';
import type { Product } from '../types';

interface OffersPageProps {
  addToCart: (product: Product) => void;
}

const offers = [
  {
    id: '1',
    title: 'Grocery Deals',
    subtitle: 'Up to 50% OFF on daily essentials',
    color: 'from-green-500 to-green-600',
    icon: ShoppingBasket,
    bgColor: 'bg-green-50'
  },
  {
    id: '2',
    title: 'Electronics Sale',
    subtitle: 'Save up to 40% on smartphones & gadgets',
    color: 'from-blue-500 to-blue-600',
    icon: Smartphone,
    bgColor: 'bg-blue-50'
  },
  {
    id: '3',
    title: 'Fashion Week',
    subtitle: 'Min 50% OFF on top brands',
    color: 'from-pink-500 to-pink-600',
    icon: Shirt,
    bgColor: 'bg-pink-50'
  },
  {
    id: '4',
    title: 'Home Essentials',
    subtitle: 'Up to 60% OFF on kitchen & decor',
    color: 'from-orange-500 to-orange-600',
    icon: Home,
    bgColor: 'bg-orange-50'
  }
];

const coupons = [
  { code: 'JIOFIRST', discount: '₹100 OFF', minOrder: 'Min order ₹500', desc: 'New user offer' },
  { code: 'SAVE20', discount: '20% OFF', minOrder: 'Min order ₹1000', desc: 'Sitewide offer' },
  { code: 'GROCERY50', discount: '₹50 OFF', minOrder: 'Min order ₹300', desc: 'Grocery special' },
  { code: 'FREESHIP', discount: 'FREE DELIVERY', minOrder: 'All orders', desc: 'No delivery charges' }
];

export default function OffersPage({ addToCart }: OffersPageProps) {
  const { products } = useProducts(50);
  const discountedProducts = products.filter((p: Product) => (p.discount || 0) > 15).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-jio-green">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Offers & Deals</span>
      </nav>

      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-jio-green to-jio-dark p-8 sm:p-12">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Today's Best Deals
          </h1>
          <p className="text-white/90 text-lg mb-6 max-w-xl">
            Discover amazing discounts on groceries, electronics, fashion, and more. Limited time offers!
          </p>
          <div className="flex items-center gap-2 text-white/80">
            <Clock size={20} />
            <span>Offers valid till midnight</span>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20">
          <Gift size={200} className="absolute right-8 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Deals */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Shop by Category Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                className={`${offer.bgColor} rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${offer.color} flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{offer.title}</h3>
                <p className="text-sm text-gray-600">{offer.subtitle}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Coupon Section */}
      <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="text-orange-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Available Coupons</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="bg-white rounded-lg p-4 border-2 border-dashed border-orange-300 hover:border-orange-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-orange-600">{coupon.code}</span>
                <Percent size={16} className="text-orange-400" />
              </div>
              <p className="font-semibold text-gray-900">{coupon.discount}</p>
              <p className="text-xs text-gray-500">{coupon.minOrder}</p>
              <p className="text-xs text-gray-400 mt-1">{coupon.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Discounted Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Top Discounted Products</h2>
          <Link to="/" className="text-jio-green text-sm font-medium flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {discountedProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* Terms */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500">
        <p className="font-medium text-gray-700 mb-2">Terms & Conditions:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Offers valid for limited time only</li>
          <li>Cannot be combined with other offers</li>
          <li>Discounts applied at checkout</li>
          <li>Free delivery on orders above ₹499</li>
        </ul>
      </div>
    </div>
  );
}
