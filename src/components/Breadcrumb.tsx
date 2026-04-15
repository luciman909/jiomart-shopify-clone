import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 py-3 px-4 max-w-7xl mx-auto">
      <Link to="/" className="flex items-center gap-1 hover:text-[#0078AD] transition-colors">
        <Home size={16} />
        <span className="font-medium">Home</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={16} className="text-gray-400" />
          {item.link ? (
            <Link 
              to={item.link} 
              className="hover:text-[#0078AD] transition-colors font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#0078AD] font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
