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
        <div className="bg-red-600 text-white px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-white text-red-600 px-2 py-1 rounded text-xs font-bold">DEMO</span>
              <span className="font-medium">
                Showing FAKE/MOCK products. Not connected to your Shopify store.
              </span>
            </div>
            <a 
              href="https://github.com/luciman909/jiomart-shopify-clone#shopify-setup" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-red-200 text-sm"
            >
              How to Connect →
            </a>
          </div>
        </div>
      )}
      
      <Header 
        cartCount={itemCount} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="pt-36">
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
