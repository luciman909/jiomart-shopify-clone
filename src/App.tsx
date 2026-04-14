import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SearchPage from './pages/SearchPage';
import OffersPage from './pages/OffersPage';
import { useShopifyCart, useProducts } from './hooks/useShopify';
import { isShopifyConfigured } from './lib/shopify';

function App() {
  // Use Shopify cart hook (handles both Shopify and local cart)
  const {
    cart,
    itemCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    proceedToCheckout,
    checkoutUrl,
    useShopify,
  } = useShopifyCart();

  const [searchQuery, setSearchQuery] = useState('');
  
  // Get products (from Shopify if configured, otherwise mock data)
  const { products } = useProducts(50);
  
  // Note: products is available here if needed for global state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  void products;

  // Shopify configuration status
  const shopifyReady = isShopifyConfigured();

  return (
    <div className="min-h-screen bg-gray-50">
      {!shopifyReady && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
          <div className="max-w-7xl mx-auto text-sm text-yellow-800 flex items-center justify-between">
            <span>
              <strong>Demo Mode:</strong> Using mock data. Configure Shopify credentials in .env file to connect to your store.
            </span>
            <a 
              href="https://github.com/your-repo/jiomart-shopify-clone#shopify-setup" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-yellow-900"
            >
              Setup Guide
            </a>
          </div>
        </div>
      )}
      
      <Header 
        cartCount={itemCount} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="pt-16">
        <Routes>
          <Route 
            path="/" 
            element={<Home addToCart={addToCart} />} 
          />
          <Route 
            path="/category/:categoryName" 
            element={<CategoryPage addToCart={addToCart} />} 
          />
          <Route 
            path="/product/:productId" 
            element={<ProductPage addToCart={addToCart} />} 
          />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cart={cart} 
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                cartTotal={cartTotal}
                checkoutUrl={checkoutUrl}
                proceedToCheckout={proceedToCheckout}
                useShopify={useShopify}
              />
            } 
          />
          <Route 
            path="/search" 
            element={<SearchPage addToCart={addToCart} searchQuery={searchQuery} />} 
          />
          <Route 
            path="/offers" 
            element={<OffersPage addToCart={addToCart} />} 
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
