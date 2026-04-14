import { Link, useSearchParams } from 'react-router-dom';
import { Search, ChevronRight, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useSearch } from '../hooks/useShopify';
import type { Product } from '../types';

interface SearchPageProps {
  addToCart: (product: Product) => void;
  searchQuery: string;
}

export default function SearchPage({ addToCart, searchQuery }: SearchPageProps) {
  const [searchParams] = useSearchParams();
  const query = searchQuery || searchParams.get('q') || '';
  
  const { products: filteredProducts } = useSearch(query);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-jio-green">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Search Results</span>
      </nav>

      {/* Search Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <Search size={20} />
          <span className="text-sm">Showing results for</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">"{query || 'All Products'}"</h1>
        <p className="text-gray-500 mt-1">{filteredProducts.length} products found</p>
      </div>

      {filteredProducts.length > 0 ? (
        <>
          {/* Sort Bar */}
          <div className="flex items-center justify-between py-3 border-y mb-4">
            <span className="text-sm text-gray-500">Sort by:</span>
            <div className="flex items-center gap-4">
              <select className="text-sm border-none bg-transparent font-medium text-gray-900 focus:outline-none">
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Discount</option>
              </select>
              <button className="flex items-center gap-2 text-sm text-gray-600 lg:hidden">
                <SlidersHorizontal size={16} />
                Filter
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={48} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No products found</h2>
          <p className="text-gray-500 mb-6">Try adjusting your search or browse our categories.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-jio-green text-white px-6 py-3 rounded-lg font-medium hover:bg-jio-dark transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
