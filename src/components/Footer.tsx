import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
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

      {/* Main Footer - JioMart Style */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* All Categories */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm">All Categories</h3>
              <ul className="space-y-2 text-xs">
                <li><Link to="/category/grocery" className="text-gray-600 hover:text-jio-green">Grocery</Link></li>
                <li><Link to="/category/electronics" className="text-gray-600 hover:text-jio-green">Electronics</Link></li>
                <li><Link to="/category/fashion" className="text-gray-600 hover:text-jio-green">Fashion</Link></li>
                <li><Link to="/category/home-lifestyle" className="text-gray-600 hover:text-jio-green">Home & Lifestyle</Link></li>
                <li><Link to="/category/premium-fruits" className="text-gray-600 hover:text-jio-green">Premium Fruits</Link></li>
                <li><Link to="/category/books" className="text-gray-600 hover:text-jio-green">Books</Link></li>
                <li><Link to="/category/furniture" className="text-gray-600 hover:text-jio-green">Furniture</Link></li>
              </ul>
            </div>

            {/* Popular Categories */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Popular Categories</h3>
              <ul className="space-y-2 text-xs">
                <li><Link to="/category/biscuits" className="text-gray-600 hover:text-jio-green">Biscuits, Drinks & Packaged Foods</Link></li>
                <li><Link to="/category/fruits" className="text-gray-600 hover:text-jio-green">Fruits & Vegetables</Link></li>
                <li><Link to="/category/cooking" className="text-gray-600 hover:text-jio-green">Cooking Essentials</Link></li>
                <li><Link to="/category/dairy" className="text-gray-600 hover:text-jio-green">Dairy & Bakery</Link></li>
                <li><Link to="/category/personal-care" className="text-gray-600 hover:text-jio-green">Personal Care</Link></li>
                <li><Link to="/category/beauty" className="text-gray-600 hover:text-jio-green">Beauty</Link></li>
                <li><Link to="/category/home" className="text-gray-600 hover:text-jio-green">Home</Link></li>
                <li><Link to="/category/mom-baby" className="text-gray-600 hover:text-jio-green">Mom & Baby Care</Link></li>
                <li><Link to="/category/stationery" className="text-gray-600 hover:text-jio-green">School, Office & Stationery</Link></li>
              </ul>
            </div>

            {/* Customer Account */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Customer Account</h3>
              <ul className="space-y-2 text-xs">
                <li><Link to="/account" className="text-gray-600 hover:text-jio-green">My Account</Link></li>
                <li><Link to="/orders" className="text-gray-600 hover:text-jio-green">My Orders</Link></li>
                <li><Link to="/wishlist" className="text-gray-600 hover:text-jio-green">Wishlist</Link></li>
                <li><Link to="/addresses" className="text-gray-600 hover:text-jio-green">Delivery Addresses</Link></li>
                <li><Link to="/wallet" className="text-gray-600 hover:text-jio-green">JioMart Wallet</Link></li>
              </ul>
            </div>

            {/* Help & Support */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Help & Support</h3>
              <ul className="space-y-2 text-xs">
                <li><Link to="/about" className="text-gray-600 hover:text-jio-green">About Us</Link></li>
                <li><Link to="/faq" className="text-gray-600 hover:text-jio-green">FAQ</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-jio-green">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-jio-green">Privacy Policy</Link></li>
                <li><Link to="/ewaste" className="text-gray-600 hover:text-jio-green">E-waste Policy</Link></li>
                <li><Link to="/cancellation" className="text-gray-600 hover:text-jio-green">Cancellation & Return Policy</Link></li>
                <li><Link to="/shipping" className="text-gray-600 hover:text-jio-green">Shipping & Delivery Policy</Link></li>
                <li><Link to="/ac-installation" className="text-gray-600 hover:text-jio-green">AC Installation by resQ</Link></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm">Contact Us</h3>
              <ul className="space-y-2 text-xs">
                <li className="text-gray-600">
                  <span className="font-medium">WhatsApp us:</span>{' '}
                  <a href="https://wa.me/917000370003" className="text-jio-green font-bold hover:underline">
                    70003 70003
                  </a>
                </li>
                <li className="text-gray-600">
                  <span className="font-medium">Call us:</span>{' '}
                  <a href="tel:18008901222" className="text-jio-green font-bold hover:underline">
                    1800 890 1222
                  </a>
                </li>
                <li className="text-gray-600">8:00 AM to 8:00 PM, 365 days</li>
              </ul>
              
              <p className="mt-4 text-xs text-gray-600 leading-relaxed">
                Should you encounter any bugs, glitches, lack of functionality, delayed deliveries, billing errors or other problems on the website.
              </p>

              {/* Download App */}
              <div className="mt-4">
                <p className="font-bold text-gray-900 mb-2 text-sm">Download the app</p>
                <div className="flex gap-2">
                  <a href="#" className="bg-black text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-800">
                    Google Play
                  </a>
                  <a href="#" className="bg-black text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-800">
                    App Store
                  </a>
                </div>
              </div>
            </div>
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
