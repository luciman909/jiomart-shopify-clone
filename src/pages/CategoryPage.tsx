import { useParams, Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategorySidebar from '../components/CategorySidebar';
import { useProducts } from '../hooks/useShopify';
import type { Product } from '../types';

interface CategoryPageProps {
  addToCart: (product: Product) => void;
}

export default function CategoryPage({ addToCart }: CategoryPageProps) {
  const { products } = useProducts(100);
  const { categoryName } = useParams<{ categoryName: string }>();
  
  const categoryNameFormatted = categoryName 
    ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  const filteredProducts = products.filter(product => 
    product.category.toLowerCase() === categoryNameFormatted.toLowerCase() ||
    categoryNameFormatted.toLowerCase().includes(product.category.toLowerCase())
  );

  // Fallback to all products if no match
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4 overflow-x-auto">
        <Link to="/" className="hover:text-jio-green whitespace-nowrap">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium whitespace-nowrap">{categoryNameFormatted}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <CategorySidebar activeCategory={categoryNameFormatted} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{categoryNameFormatted}</h1>
              <p className="text-sm text-gray-500">{displayProducts.length} products</p>
            </div>
            <button className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg text-sm">
              <SlidersHorizontal size={16} />
              Filter
            </button>
          </div>

          {/* Mobile Category Scroll */}
          <div className="lg:hidden mb-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-2">
              {['All', 'Grocery', 'Electronics', 'Fashion', 'Home', 'Beauty'].map((cat) => (
                <Link
                  key={cat}
                  to={cat === 'All' ? '/' : `/category/${cat.toLowerCase()}`}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${
                    cat === categoryNameFormatted || (cat === 'All' && !categoryNameFormatted)
                      ? 'bg-jio-green text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Sort Bar */}
          <div className="flex items-center justify-between py-3 border-y mb-4">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="text-sm border-none bg-transparent font-medium text-gray-900 focus:outline-none">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Discount</option>
            </select>
          </div>

          {/* Products Grid */}
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category.</p>
              <Link to="/" className="text-jio-green font-medium mt-2 inline-block hover:underline">
                Browse all products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
