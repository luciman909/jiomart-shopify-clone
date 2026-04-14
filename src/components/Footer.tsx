import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      {/* Trust Badges */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-jio-light rounded-full flex items-center justify-center">
                <Truck className="text-jio-green" size={24} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Free Delivery</p>
                <p className="text-sm text-gray-500">On orders above ₹499</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-jio-light rounded-full flex items-center justify-center">
                <CreditCard className="text-jio-green" size={24} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-500">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-jio-light rounded-full flex items-center justify-center">
                <ShieldCheck className="text-jio-green" size={24} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Genuine Products</p>
                <p className="text-sm text-gray-500">Authentic & branded</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-jio-light rounded-full flex items-center justify-center">
                <RotateCcw className="text-jio-green" size={24} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Easy Returns</p>
                <p className="text-sm text-gray-500">7 days return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-jio-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">J</span>
              </div>
              <span className="text-jio-green font-bold text-lg">JioMart</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              India's most convenient online grocery channel. Quality products at affordable prices.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} className="text-jio-green" />
                <span>cs@jiomart.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} className="text-jio-green" />
                <span>1800 890 1222</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} className="text-jio-green" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Most Popular Categories */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Most Popular</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/grocery" className="text-gray-600 hover:text-jio-green">Grocery</Link></li>
              <li><Link to="/category/electronics" className="text-gray-600 hover:text-jio-green">Electronics</Link></li>
              <li><Link to="/category/fashion" className="text-gray-600 hover:text-jio-green">Fashion</Link></li>
              <li><Link to="/category/home" className="text-gray-600 hover:text-jio-green">Home & Kitchen</Link></li>
              <li><Link to="/category/premium-fruits" className="text-gray-600 hover:text-jio-green">Premium Fruits</Link></li>
              <li><Link to="/category/beauty" className="text-gray-600 hover:text-jio-green">Beauty</Link></li>
            </ul>
          </div>

          {/* Customer Services */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Customer Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-jio-green">About Us</Link></li>
              <li><Link to="/faqs" className="text-gray-600 hover:text-jio-green">FAQs</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-jio-green">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-jio-green">Privacy Policy</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-jio-green">Return Policy</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-jio-green">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">My Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/account" className="text-gray-600 hover:text-jio-green">My Account</Link></li>
              <li><Link to="/orders" className="text-gray-600 hover:text-jio-green">My Orders</Link></li>
              <li><Link to="/wishlist" className="text-gray-600 hover:text-jio-green">Wishlist</Link></li>
              <li><Link to="/wallet" className="text-gray-600 hover:text-jio-green">JioMart Wallet</Link></li>
              <li><Link to="/offers" className="text-gray-600 hover:text-jio-green">Offer Store</Link></li>
              <li><Link to="/coupons" className="text-gray-600 hover:text-jio-green">Coupon Store</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 JioMart. All Rights Reserved. Reliance Retail Ltd.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Follow us:</span>
              <div className="flex items-center gap-3">
                <a href="#" className="text-gray-400 hover:text-jio-green transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-jio-green transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-jio-green transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-jio-green transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
