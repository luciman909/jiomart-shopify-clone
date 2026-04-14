import { useShopInfo, useProducts, useCollections, useLocations } from '../hooks/useShopify';
import { isShopifyConfigured } from '../lib/shopify';

export default function ShopifyDebug() {
  const configured = isShopifyConfigured();
  const { shopInfo, loading: shopLoading, error: shopError } = useShopInfo();
  const { products, loading: productsLoading, error: productsError } = useProducts(5);
  const { collections, loading: collectionsLoading, error: collectionsError } = useCollections(5);
  const { locations, loading: locationsLoading, error: locationsError } = useLocations();

  if (!configured) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <h3 className="font-bold text-red-800">⚠️ Shopify Not Configured</h3>
        <p className="text-sm text-red-700 mt-2">
          Environment variables are missing or invalid. Using mock data.
        </p>
        <div className="mt-2 text-xs text-red-600 font-mono bg-red-100 p-2 rounded">
          Store Domain: {import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'NOT SET'}<br/>
          Token: {import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN ? '***' + import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN.slice(-4) : 'NOT SET'}<br/>
          API Version: {import.meta.env.VITE_SHOPIFY_API_VERSION || 'NOT SET'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 m-4">
      <h3 className="font-bold text-blue-800">✅ Shopify Configured</h3>
      
      <div className="mt-4 space-y-3">
        {/* Shop Info */}
        <div className="bg-white p-3 rounded border">
          <h4 className="font-semibold text-sm">Shop Info:</h4>
          {shopLoading && <p className="text-xs text-gray-500">Loading...</p>}
          {shopError && <p className="text-xs text-red-500">Error: {shopError}</p>}
          {shopInfo && (
            <div className="text-xs mt-1">
              <p><strong>Name:</strong> {shopInfo.name}</p>
              <p><strong>Domain:</strong> {shopInfo.primaryDomain}</p>
              <p><strong>Has Logo:</strong> {shopInfo.logoUrl ? 'Yes' : 'No'}</p>
            </div>
          )}
        </div>

        {/* Products */}
        <div className="bg-white p-3 rounded border">
          <h4 className="font-semibold text-sm">Products ({products.length}):</h4>
          {productsLoading && <p className="text-xs text-gray-500">Loading...</p>}
          {productsError && (
            <p className="text-xs text-red-500 bg-red-50 p-2 rounded mt-1">Error: {productsError}</p>
          )}
          {!productsLoading && !productsError && products.length === 0 && (
            <p className="text-xs text-orange-500">⚠️ No products found</p>
          )}
          {products.length > 0 && (
            <ul className="text-xs mt-1 space-y-1">
              {products.slice(0, 3).map(p => (
                <li key={p.id}>• {p.name} (₹{p.price})</li>
              ))}
            </ul>
          )}
        </div>

        {/* Collections */}
        <div className="bg-white p-3 rounded border">
          <h4 className="font-semibold text-sm">Collections ({collections.length}):</h4>
          {collectionsLoading && <p className="text-xs text-gray-500">Loading...</p>}
          {collectionsError && <p className="text-xs text-red-500">Error: {collectionsError}</p>}
          {!collectionsLoading && collections.length === 0 && (
            <p className="text-xs text-orange-500">⚠️ No collections found</p>
          )}
          {collections.length > 0 && (
            <ul className="text-xs mt-1 space-y-1">
              {collections.slice(0, 3).map(c => (
                <li key={c.id}>• {c.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Locations */}
        <div className="bg-white p-3 rounded border">
          <h4 className="font-semibold text-sm">Locations ({locations.length}):</h4>
          {locationsLoading && <p className="text-xs text-gray-500">Loading...</p>}
          {locationsError && <p className="text-xs text-red-500">Error: {locationsError}</p>}
          {!locationsLoading && locations.length === 0 && (
            <p className="text-xs text-orange-500">⚠️ No locations found</p>
          )}
          {locations.length > 0 && (
            <ul className="text-xs mt-1 space-y-1">
              {locations.map(l => (
                <li key={l.id}>• {l.name} ({l.city})</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
