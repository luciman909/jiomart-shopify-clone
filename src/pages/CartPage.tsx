import { Link } from 'react-router-dom';
import { ChevronRight, Trash2, Minus, Plus, ShoppingBag, Truck } from 'lucide-react';
import type { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  cartTotal: number;
}

export default function CartPage({ cart, updateQuantity, removeFromCart, cartTotal }: CartPageProps) {
  const deliveryCharge = cartTotal >= 499 ? 0 : 40;
  const total = cartTotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-jio-green text-white px-6 py-3 rounded-lg font-medium hover:bg-jio-dark transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-jio-green">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Shopping Cart</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({cart.length} items)</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border p-4 flex gap-4">
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </Link>
              
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-jio-green transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1">{item.quantity}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-gray-900">₹{item.price}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-medium text-sm">{item.cartQuantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="hidden sm:block text-right">
                <p className="font-bold text-gray-900">₹{item.price * item.cartQuantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-lg border p-4 sticky top-20">
            <h2 className="font-semibold text-gray-900">Order Summary</h2>
            
            <div className="space-y-3 py-4 border-b">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{cartTotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Delivery Charges</span>
                <span className={deliveryCharge === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
              {deliveryCharge === 0 && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <Truck size={12} />
                  Free delivery on orders above ₹499
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-between py-4">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">₹{total}</span>
            </div>
            
            <button className="w-full bg-jio-green text-white py-3 rounded-lg font-medium hover:bg-jio-dark transition-colors">
              Proceed to Checkout
            </button>
            
            <Link
              to="/"
              className="block text-center text-jio-green font-medium mt-4 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
