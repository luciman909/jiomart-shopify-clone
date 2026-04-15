import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { categories } from '../data';

interface CategorySidebarProps {
  activeCategory?: string;
}

export default function CategorySidebar({ activeCategory }: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(activeCategory ? [activeCategory] : [])
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Category</h2>
      </div>

      {/* Category List */}
      <div className="p-2">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.name);
          const isActive = activeCategory === category.name;

          return (
            <div key={category.id} className="mb-1">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-[#0078AD] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Link
                  to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex-1 text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  {category.name}
                </Link>
                {category.subcategories.length > 0 && (
                  <span className="ml-2">
                    {isExpanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </span>
                )}
              </button>

              {/* Subcategories */}
              {isExpanded && category.subcategories.length > 0 && (
                <div className="ml-4 mt-1 space-y-0.5">
                  {category.subcategories.map((sub, idx) => (
                    <Link
                      key={idx}
                      to={`/category/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#0078AD] hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
