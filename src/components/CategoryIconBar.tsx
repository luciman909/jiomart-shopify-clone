import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { useCollections } from '../hooks/useShopify';

// JioMart-style category icons with images
const categoryIcons = [
  {
    id: '1',
    name: 'Groceries',
    image: 'https://cdn-icons-png.flaticon.com/128/2921/2921822.png',
    color: 'bg-green-100',
    link: '/category/groceries'
  },
  {
    id: '2',
    name: 'Happy Hour Coupons',
    image: 'https://cdn-icons-png.flaticon.com/128/612/612500.png',
    color: 'bg-red-100',
    link: '/offers'
  },
  {
    id: '3',
    name: 'Low Price Guarantee',
    image: 'https://cdn-icons-png.flaticon.com/128/3081/3081840.png',
    color: 'bg-yellow-100',
    link: '/offers'
  },
  {
    id: '4',
    name: 'Quick Electronics',
    image: 'https://cdn-icons-png.flaticon.com/128/3659/3659898.png',
    color: 'bg-blue-100',
    link: '/category/electronics'
  },
  {
    id: '5',
    name: 'Summer Savings',
    image: 'https://cdn-icons-png.flaticon.com/128/869/869869.png',
    color: 'bg-orange-100',
    link: '/offers'
  },
  {
    id: '6',
    name: 'Beauty & Beyond',
    image: 'https://cdn-icons-png.flaticon.com/128/3081/3081986.png',
    color: 'bg-pink-100',
    link: '/category/beauty'
  },
  {
    id: '7',
    name: 'Home & Kitchen',
    image: 'https://cdn-icons-png.flaticon.com/128/3081/3081848.png',
    color: 'bg-purple-100',
    link: '/category/home-kitchen'
  },
  {
    id: '8',
    name: 'Fashion',
    image: 'https://cdn-icons-png.flaticon.com/128/3081/3081974.png',
    color: 'bg-indigo-100',
    link: '/category/fashion'
  }
];

export default function CategoryIconBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { collections } = useCollections(20);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Use real collections if available, otherwise use default icons
  const displayCategories = collections.length > 0 
    ? collections.slice(0, 8).map((col, index) => ({
        id: col.id,
        name: col.name,
        image: categoryIcons[index]?.image || 'https://cdn-icons-png.flaticon.com/128/2921/2921822.png',
        color: categoryIcons[index]?.color || 'bg-gray-100',
        link: `/category/${col.handle || col.name.toLowerCase().replace(/\s+/g, '-')}`
      }))
    : categoryIcons;

  return (
    <div className="relative bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="hidden md:flex p-1 hover:bg-gray-100 rounded-full mr-2"
          >
            <ChevronLeft size={20} className="text-gray-400" />
          </button>

          {/* Scrollable Categories */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 py-3 px-2 -mx-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayCategories.map((category) => (
              <Link
                key={category.id}
                to={category.link}
                className="flex flex-col items-center gap-2 min-w-[72px] group flex-shrink-0"
              >
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center p-3 group-hover:scale-110 transition-transform`}>
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/128/2921/2921822.png';
                    }}
                  />
                </div>
                <span className="text-xs text-gray-700 text-center leading-tight line-clamp-2 max-w-[72px]">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="hidden md:flex p-1 hover:bg-gray-100 rounded-full ml-2"
          >
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
