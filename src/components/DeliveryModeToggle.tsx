import { useState } from 'react';
import { Zap, Calendar, MapPin, ChevronDown, X, Crosshair, Store, Check, Package } from 'lucide-react';
import { useLocations } from '../hooks/useShopify';
import { useDeliveryMode } from '../contexts/DeliveryModeContext';

interface DeliveryModeToggleProps {
  storeName?: string;
}

export default function DeliveryModeToggle({ storeName = 'Bhavnagar Mall' }: DeliveryModeToggleProps) {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState('Crescent, Panwadl, Bhavnagar');
  
  // Get global delivery mode state
  const { mode, setMode, selectedStoreId, setSelectedStoreId, isQuickMode, isScheduledMode } = useDeliveryMode();
  
  // Get store locations from Shopify
  const { locations } = useLocations();
  
  const selectedStore = locations.find(loc => loc.id === selectedStoreId);
  const storeDisplayName = selectedStore?.name || 'Select Store';

  return (
    <>
      {/* Delivery Mode Bar */}
      <div className="bg-[#0078AD] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 py-2">
            {/* Quick/Scheduled Toggle */}
            <div className="flex items-center bg-white/20 rounded-full p-1">
              <button
                onClick={() => setMode('quick')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isQuickMode
                    ? 'bg-white text-[#0078AD]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Zap size={14} className={isQuickMode ? 'fill-current' : ''} />
                Quick
              </button>
              <button
                onClick={() => setMode('scheduled')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isScheduledMode
                    ? 'bg-white text-[#0078AD]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Calendar size={14} />
                Scheduled
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search In ${mode === 'quick' ? 'Quick' : 'JioMart'}`}
                  className="w-full pl-4 pr-10 py-2 bg-white rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu Button */}
            <button className="p-2 hover:bg-white/10 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Location Bar */}
      <div className="bg-[#0078AD] text-white border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 py-2">
            {/* Delivery Mode Badge */}
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-2 text-sm hover:bg-white/10 px-2 py-1 rounded-lg transition-colors"
            >
              <span className="bg-white text-[#0078AD] px-2 py-0.5 rounded text-xs font-bold">
                {mode === 'quick' ? 'Quick Delivery' : 'Scheduled'}
              </span>
              <Zap size={14} className="hidden sm:block" />
              <span className="font-semibold hidden sm:block">
                {mode === 'quick' ? 'Quick' : 'Scheduled'} delivery to:
              </span>
              <MapPin size={14} />
              <span className="underline decoration-dotted">{deliveryLocation}</span>
              <ChevronDown size={14} />
            </button>

            {/* Store Selector - Quick Mode: Select Store, Scheduled Mode: All Stores */}
            {locations.length > 0 && (
              <div className="flex items-center gap-2 ml-auto">
                {isQuickMode ? (
                  // Quick Mode: Select specific store
                  <>
                    <span className="text-white/70 text-sm hidden sm:block">Pick up from:</span>
                    <button
                      onClick={() => setShowStoreModal(true)}
                      className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Store size={14} />
                      <span className="max-w-[120px] truncate">{storeDisplayName}</span>
                      <ChevronDown size={12} />
                    </button>
                  </>
                ) : (
                  // Scheduled Mode: All stores combined
                  <div className="flex items-center gap-1.5 bg-green-500/30 px-3 py-1.5 rounded-lg text-sm font-medium">
                    <Package size={14} />
                    <span className="hidden sm:block">All Stores Inventory</span>
                    <span className="sm:hidden">All Stores</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLocationModal(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>

            {/* Header */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Select Delivery Location
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Sign in or set delivery location to see product availability, offers and discounts.
            </p>

            {/* Sign In Button */}
            <button className="w-full bg-[#0078AD] text-white py-3 rounded-full font-semibold hover:bg-[#006694] transition-colors mb-6">
              Sign In to select address
            </button>

            {/* Options */}
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 transition-colors text-left">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-[#0078AD]" />
                </div>
                <span className="font-medium text-gray-900">Enter a pincode</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 transition-colors text-left">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Crosshair size={20} className="text-[#0078AD]" />
                </div>
                <span className="font-medium text-gray-900">Detect My Location</span>
              </button>
            </div>

            {/* Current Location */}
            {deliveryLocation && (
              <div className="mt-6 pt-4 border-t">
                <p className="text-xs text-gray-500 mb-2">Current Location:</p>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin size={16} className="text-[#0078AD]" />
                  {deliveryLocation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Store Selection Modal */}
      {showStoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowStoreModal(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setShowStoreModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>

            {/* Header */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Select Store Location
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Choose your preferred store for pickup or delivery. Product availability may vary by location.
            </p>

            {/* Store Options */}
            <div className="space-y-3">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    setSelectedStoreId(location.id);
                    setShowStoreModal(false);
                    // No reload needed - context update triggers re-render
                  }}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all text-left ${
                    selectedStoreId === location.id
                      ? 'border-[#0078AD] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedStoreId === location.id ? 'bg-[#0078AD] text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Store size={24} />
                    </div>
                    <div>
                      <p className={`font-semibold ${
                        selectedStoreId === location.id ? 'text-[#0078AD]' : 'text-gray-900'
                      }`}>
                        {location.name}
                      </p>
                      {(location.city || location.country) && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          {[location.city, location.country].filter(Boolean).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {selectedStoreId === location.id && (
                    <div className="w-6 h-6 bg-[#0078AD] rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Info Text */}
            <p className="mt-4 text-xs text-gray-500 text-center">
              Selecting a store will show you products available at that location
            </p>
          </div>
        </div>
      )}
    </>
  );
}
