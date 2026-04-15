import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSection {
  title: string;
  options: { label: string; count?: number }[];
  type: 'checkbox' | 'slider';
}

const filterSections: FilterSection[] = [
  {
    title: 'Availability',
    type: 'checkbox',
    options: [{ label: 'Include Out of Stock' }]
  },
  {
    title: 'Categories',
    type: 'checkbox',
    options: [
      { label: 'Cloth Drying Stands' },
      { label: 'Iron Board' },
      { label: 'Laundry Bag & Basket' }
    ]
  },
  {
    title: 'Brands',
    type: 'checkbox',
    options: [
      { label: 'ADA' },
      { label: 'Adore' },
      { label: 'Aiflatu' },
      { label: 'AgrohA' },
      { label: 'BB BACKBENCHERS' },
      { label: '+53 More', count: 53 }
    ]
  }
];

export default function FilterSidebar() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['Availability', 'Categories', 'Brands', 'Price', 'Discount'])
  );
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());
  const [priceRange, setPriceRange] = useState<[number, number]>([117, 9999]);
  const [discountRange, setDiscountRange] = useState<[number, number]>([0, 100]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const toggleFilter = (label: string) => {
    setSelectedFilters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>

      {/* Availability */}
      <div className="border-b border-gray-100 pb-4 mb-4">
        <button
          onClick={() => toggleSection('Availability')}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="font-semibold text-gray-900">Availability</h3>
          {expandedSections.has('Availability') ? (
            <ChevronUp size={16} className="text-gray-400" />
          ) : (
            <ChevronDown size={16} className="text-gray-400" />
          )}
        </button>
        {expandedSections.has('Availability') && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFilters.has('Include Out of Stock')}
              onChange={() => toggleFilter('Include Out of Stock')}
              className="w-4 h-4 rounded border-gray-300 text-[#0078AD] focus:ring-[#0078AD]"
            />
            <span className="text-sm text-gray-700">Include Out of Stock</span>
          </label>
        )}
      </div>

      {/* Categories */}
      <div className="border-b border-gray-100 pb-4 mb-4">
        <button
          onClick={() => toggleSection('Categories')}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="font-semibold text-gray-900">Categories</h3>
          {expandedSections.has('Categories') ? (
            <ChevronUp size={16} className="text-gray-400" />
          ) : (
            <ChevronDown size={16} className="text-gray-400" />
          )}
        </button>
        {expandedSections.has('Categories') && (
          <div className="space-y-2">
            {['Cloth Drying Stands', 'Iron Board', 'Laundry Bag & Basket'].map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.has(category)}
                  onChange={() => toggleFilter(category)}
                  className="w-4 h-4 rounded border-gray-300 text-[#0078AD] focus:ring-[#0078AD]"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-b border-gray-100 pb-4 mb-4">
        <button
          onClick={() => toggleSection('Brands')}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="font-semibold text-gray-900">Brands</h3>
          {expandedSections.has('Brands') ? (
            <ChevronUp size={16} className="text-gray-400" />
          ) : (
            <ChevronDown size={16} className="text-gray-400" />
          )}
        </button>
        {expandedSections.has('Brands') && (
          <div className="space-y-2">
            {['ADA', 'Adore', 'Aiflatu', 'AgrohA', 'BB BACKBENCHERS'].map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.has(brand)}
                  onChange={() => toggleFilter(brand)}
                  className="w-4 h-4 rounded border-gray-300 text-[#0078AD] focus:ring-[#0078AD]"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
            <button className="text-sm text-[#0078AD] font-medium hover:underline">
              +53 More
            </button>
          </div>
        )}
      </div>

      {/* Price Slider */}
      <div className="border-b border-gray-100 pb-4 mb-4">
        <button
          onClick={() => toggleSection('Price')}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="font-semibold text-gray-900">Price</h3>
          {expandedSections.has('Price') ? (
            <ChevronUp size={16} className="text-gray-400" />
          ) : (
            <ChevronDown size={16} className="text-gray-400" />
          )}
        </button>
        {expandedSections.has('Price') && (
          <div className="px-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs bg-[#0078AD] text-white px-2 py-1 rounded">{priceRange[0]}</span>
              <span className="text-xs bg-[#0078AD] text-white px-2 py-1 rounded">{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="117"
              max="9999"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0078AD]"
            />
          </div>
        )}
      </div>

      {/* Discount Slider */}
      <div className="pb-2">
        <button
          onClick={() => toggleSection('Discount')}
          className="flex items-center justify-between w-full mb-2"
        >
          <h3 className="font-semibold text-gray-900">Discount</h3>
          {expandedSections.has('Discount') ? (
            <ChevronUp size={16} className="text-gray-400" />
          ) : (
            <ChevronDown size={16} className="text-gray-400" />
          )}
        </button>
        {expandedSections.has('Discount') && (
          <div className="px-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs bg-[#0078AD] text-white px-2 py-1 rounded">{discountRange[0]}%</span>
              <span className="text-xs bg-[#0078AD] text-white px-2 py-1 rounded">{discountRange[1]}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={discountRange[1]}
              onChange={(e) => setDiscountRange([discountRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0078AD]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
