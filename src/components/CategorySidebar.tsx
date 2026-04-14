import { Link } from 'react-router-dom';
import { categories } from '../data';

interface CategorySidebarProps {
  activeCategory?: string;
}

export default function CategorySidebar({ activeCategory }: CategorySidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-1">
        {categories.map((category) => (
          <div key={category.id}>
            <Link
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                activeCategory === category.name
                  ? 'bg-jio-light text-jio-green font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{category.name}</span>
            </Link>
            {activeCategory === category.name && category.subcategories.length > 0 && (
              <div className="ml-4 mt-1 space-y-1">
                {category.subcategories.map((sub, idx) => (
                  <button
                    key={idx}
                    className="block w-full text-left px-3 py-1.5 text-xs text-gray-500 hover:text-jio-green transition-colors"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
