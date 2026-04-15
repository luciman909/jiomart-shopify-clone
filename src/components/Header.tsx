import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  ChevronDown,
  Menu,
  X,
  Phone,
  Store,
  List,
  Gift,
  Ticket,
  HelpCircle
} from 'lucide-react';
import { categories } from '../data';
import { useShopInfo, useCollections } from '../hooks/useShopify';
import StoreSwitcher from './StoreSwitcher';
import DeliveryModeToggle from './DeliveryModeToggle';

interface HeaderProps {
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ cartCount, searchQuery, setSearchQuery }: HeaderProps) {
  const { shopInfo } = useShopInfo();
  const { collections } = useCollections(20);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();
  
  // Use real collections from Shopify, fallback to mock categories
  const displayCategories = collections.length > 0 ? collections : categories;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top Bar - Green */}
      <div className="bg-jio-green text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="font-semibold">Welcome to {shopInfo?.name || 'Bhavnagar Mall'}</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <Phone size={12} /> 1800 890 1222
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden md:flex items-center gap-1">
              <Store size={12} /> {shopInfo?.slogan || 'Bharat ka Apna Store'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/offers" className="hover:underline">Offer Store</Link>
            <Link to="/coupons" className="hover:underline hidden sm:inline">Coupon Store</Link>
            <Link to="/gift" className="hover:underline hidden sm:inline">Gift Store</Link>
          </div>
        </div>
      </div>

      {/* Delivery Mode Toggle - Blue Bar */}
      <DeliveryModeToggle storeName={shopInfo?.name} />

      {/* Main Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                {shopInfo?.logoUrl ? (
                  <img 
                    src={shopInfo.logoUrl} 
                    alt={shopInfo.name || 'Store'} 
                    className="w-10 h-10 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-10 h-10 bg-jio-green rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {(shopInfo?.name || 'J').charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-jio-green font-bold text-xl hidden sm:block">
                  {shopInfo?.name || 'JioMart'}
                </span>
              </div>
            </Link>

            {/* Store Switcher */}
            <div className="hidden md:block">
              <StoreSwitcher />
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-jio-green focus:ring-1 focus:ring-jio-green text-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-jio-green"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/wishlist" className="hidden sm:flex flex-col items-center gap-0.5 text-gray-600 hover:text-jio-green transition-colors">
                <Heart size={22} />
                <span className="text-xs">Wishlist</span>
              </Link>
              <Link to="/cart" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-jio-green transition-colors relative">
                <div className="relative">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-jio-green text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs">Cart</span>
              </Link>
              <button className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-jio-green transition-colors">
                <User size={22} />
                <span className="text-xs hidden sm:inline">Sign In</span>
              </button>
              <button 
                className="sm:hidden p-2 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:block bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="relative">
              <button 
                className="flex items-center gap-2 py-3 font-medium text-gray-700 hover:text-jio-green"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <Menu size={18} />
                Shop By Category
                <ChevronDown size={14} />
              </button>
              
              {/* Category Dropdown */}
              {isCategoryOpen && (
                <div 
                  className="absolute top-full left-0 w-64 bg-white shadow-lg border rounded-lg py-2 z-50"
                  onMouseEnter={() => setIsCategoryOpen(true)}
                  onMouseLeave={() => setIsCategoryOpen(false)}
                >
                  {displayCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      <span>{category.name}</span>
                      <ChevronDown size={14} className="-rotate-90" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {displayCategories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="py-3 text-gray-600 hover:text-jio-green whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 py-2 border-b">
              <MapPin size={16} className="text-jio-green" />
              <span>Select Delivery Location</span>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-400 uppercase px-2 py-1">Categories</p>
              {displayCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t space-y-1">
              <p className="text-xs font-medium text-gray-400 uppercase px-2 py-1">Account</p>
              <Link to="/orders" className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <List size={18} />
                <span>My Orders</span>
              </Link>
              <Link to="/wishlist" className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Heart size={18} />
                <span>Wishlist</span>
              </Link>
              <Link to="/offers" className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Gift size={18} />
                <span>Offer Store</span>
              </Link>
              <Link to="/coupons" className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Ticket size={18} />
                <span>Coupon Store</span>
              </Link>
              <Link to="/help" className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <HelpCircle size={18} />
                <span>Need Help</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
