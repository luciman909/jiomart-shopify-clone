import { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';
import { useLocations } from '../hooks/useShopify';

export default function StoreSwitcher() {
  const { locations, selectedLocation, selectLocation, loading } = useLocations();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedStore = locations.find(loc => loc.id === selectedLocation);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600 animate-pulse">
        <MapPin size={16} />
        <span>Loading stores...</span>
      </div>
    );
  }

  if (locations.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
      >
        <MapPin size={16} className="text-jio-green" />
        <span className="font-medium text-gray-700 max-w-[120px] truncate">
          {selectedStore?.name || 'Select Store'}
        </span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-2">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Select Store Location
            </p>
          </div>
          
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => {
                selectLocation(location.id);
                setIsOpen(false);
                window.location.reload(); // Reload to refresh inventory data
              }}
              className={`w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 transition-colors text-left ${
                selectedLocation === location.id ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${
                  selectedLocation === location.id ? 'text-jio-green' : 'text-gray-900'
                }`}>
                  {location.name}
                </p>
                {(location.city || location.country) && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {[location.city, location.country].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
              {selectedLocation === location.id && (
                <Check size={16} className="text-jio-green flex-shrink-0 ml-2" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
