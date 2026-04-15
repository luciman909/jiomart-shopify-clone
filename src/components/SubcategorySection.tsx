import { Link } from 'react-router-dom';

interface Subcategory {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface SubcategorySectionProps {
  title: string;
  subcategories: Subcategory[];
}

export default function SubcategorySection({ title, subcategories }: SubcategorySectionProps) {
  return (
    <section className="bg-white py-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
          {subcategories.map((sub) => (
            <Link
              key={sub.id}
              to={sub.link}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2 group-hover:bg-gray-100 transition-colors">
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Product';
                  }}
                />
              </div>
              <span className="text-xs text-gray-700 text-center leading-tight line-clamp-2 max-w-[80px]">
                {sub.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
