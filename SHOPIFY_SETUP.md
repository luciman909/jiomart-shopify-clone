# JioMart Shopify Clone - Shopify Integration Guide

This React application is designed to work with Shopify as a headless storefront. It can run in **Demo Mode** with mock data or connect to your actual Shopify store via the Storefront API.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Shopify Store Setup](#shopify-store-setup)
3. [Configuration](#configuration)
4. [Features](#features)
5. [Architecture](#architecture)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

## Quick Start

### Option 1: Demo Mode (No Shopify Required)

The app works out-of-the-box with mock data. Simply run:

```bash
npm install
npm run dev
```

You'll see a yellow banner indicating "Demo Mode" - the app is using local mock data.

### Option 2: Connect to Your Shopify Store

1. Follow the [Shopify Store Setup](#shopify-store-setup) instructions
2. Add your credentials to the `.env` file
3. Restart the dev server

## Shopify Store Setup

### Step 1: Create a Shopify Store

If you don't have a Shopify store:
1. Go to [shopify.com](https://shopify.com)
2. Sign up for a free trial or log in to your existing store
3. Complete the store setup

### Step 2: Create a Private App (Storefront Access)

You need to create a custom app to get Storefront API access:

1. From your Shopify admin, go to **Settings** > **Apps and sales channels**
2. Click **Develop apps** (or **App and sales channel settings** > **Develop apps**)
3. Click **Create an app**
4. Enter app name: "JioMart Storefront" 
5. Click **Create app**

### Step 3: Configure Storefront API Access

1. In your new app, click **Configuration**
2. Click **Configure** next to **Storefront API integration**
3. Select the following scopes:
   - `unauthenticated_read_product_listings` - Read products
   - `unauthenticated_read_product_inventory` - Read inventory
   - `unauthenticated_read_product_pickup_locations` - Read locations
   - `unauthenticated_read_product_tags` - Read product tags
   - `unauthenticated_read_selling_plans` - Read subscriptions
   - `unauthenticated_write_checkouts` - Create carts/checkouts
   - `unauthenticated_read_checkouts` - Read carts
   - `unauthenticated_read_content` - Read pages/blogs
   - `unauthenticated_read_customer_tags` - Customer tags
   - `unauthenticated_read_metaobjects` - Metaobjects
4. Click **Save**
5. Click **Install app**
6. Click **Install** to confirm

### Step 4: Get Your Credentials

After installing the app:

1. Click **API credentials** tab
2. Copy the **Storefront access token**
3. Note your store domain (e.g., `your-store.myshopify.com`)

## Configuration

### Step 1: Update Environment Variables

Edit the `.env` file in the project root:

```bash
# .env

# Your Shopify store domain (without https://)
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# Your Storefront API access token
VITE_SHOPIFY_STOREFRONT_API_TOKEN=your_storefront_access_token_here

# API version (default: 2024-01)
VITE_SHOPIFY_API_VERSION=2024-01
```

**Important:** Never commit your `.env` file to version control. It's already in `.gitignore`.

### Step 2: Restart the Server

After updating `.env`:

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

The demo banner should disappear, and your app will now show real products from your Shopify store!

### Step 3: Verify Connection

Open your browser at `http://localhost:3000` and:

1. Check that products from your Shopify store appear
2. Try adding items to cart
3. Proceed to checkout (you'll be redirected to Shopify checkout)

## Features

### Shopify Features Implemented

| Feature | Status | Notes |
|---------|--------|-------|
| Product Listing | ✅ | Fetches products via Storefront API |
| Product Details | ✅ | Full product info, images, variants |
| Collections | ✅ | Shopify collections as categories |
| Search | ✅ | Uses Shopify product search |
| Cart | ✅ | Shopify Cart API |
| Checkout | ✅ | Redirects to Shopify checkout |
| Inventory | ✅ | Shows real-time availability |
| Variant Selection | ⚠️ | Basic variant support |

### Fallback Behavior

When Shopify is not configured or API fails:
- App automatically falls back to mock data
- Demo banner is shown at the top
- Cart works locally (localStorage)
- Checkout button is disabled

## Architecture

### Data Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   React UI  │────▶│  useShopify  │────▶│ Shopify API │
│  Components │◀────│    Hooks     │◀────│  (GraphQL)  │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Mock Data   │
                    │  (Fallback)  │
                    └──────────────┘
```

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/shopify.ts` | Shopify client setup & GraphQL queries |
| `src/hooks/useShopify.ts` | React hooks for data fetching |
| `src/types/shopify.ts` | TypeScript types for Shopify schema |
| `.env` | API credentials |

### GraphQL Queries

The app uses these Shopify Storefront API queries:

- `GET_PRODUCTS` - Fetch all products
- `GET_PRODUCT_BY_HANDLE` - Single product details
- `GET_COLLECTIONS` - Fetch collections
- `GET_COLLECTION_BY_HANDLE` - Collection with products
- `SEARCH_PRODUCTS` - Product search
- `CREATE_CART` / `ADD_TO_CART` / `UPDATE_CART_LINE` / `REMOVE_FROM_CART` - Cart operations
- `GET_CART` - Fetch existing cart

## Deployment

### Building for Production

```bash
npm run build
```

### Environment Variables for Production

Set these in your hosting platform (Vercel, Netlify, etc.):

```
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_API_TOKEN=your_token
VITE_SHOPIFY_API_VERSION=2024-01
```

### Recommended Platforms

- **Vercel**: Best for Next.js/React apps, easy env vars
- **Netlify**: Great for static sites, form handling
- **Shopify Oxygen**: Shopify's native hosting (recommended for production)

## Troubleshooting

### Common Issues

#### "Demo Mode" banner won't go away

**Problem:** App still shows mock data after configuring `.env`

**Solution:**
1. Check `.env` file exists in project root
2. Verify no typos in variable names
3. Ensure token doesn't have extra spaces
4. Restart dev server: `Ctrl+C`, then `npm run dev`

#### "Failed to fetch products" error

**Problem:** API calls failing

**Solution:**
1. Check store domain format: `your-store.myshopify.com` (no https://)
2. Verify Storefront API token is correct
3. Check if app is properly installed in Shopify admin
4. Verify Storefront API scopes are configured

#### Cart not persisting

**Problem:** Cart items disappear on refresh

**Solution:**
- With Shopify: Cart is stored by Shopify (via cart ID)
- Demo mode: Cart is in localStorage (browser storage)

#### CORS errors

**Problem:** Browser blocks API requests

**Solution:**
- Storefront API doesn't have CORS issues
- If using Admin API (not recommended), you'd need a proxy

### Rate Limits

Shopify Storefront API has rate limits:
- **Unauthenticated**: 1 request per second per IP
- **Authenticated**: Higher limits with token

If you hit rate limits:
1. Add request caching
2. Implement request debouncing
3. Consider upgrading to higher plan

### Getting Help

1. Check browser console for errors
2. Verify Shopify API credentials in app
3. Test GraphQL queries in Shopify GraphiQL explorer
4. Review Shopify Storefront API documentation

## Next Steps

## Banner Configuration

### Option 1: Custom Banners via Environment Variables

Add your own banner images via `VITE_CUSTOM_BANNERS`:

```bash
VITE_CUSTOM_BANNERS=[{"id":"1","title":"Summer Sale","subtitle":"Up to 50% OFF","image":"https://your-cdn.com/banner1.jpg","link":"/category/sale","position":"hero"},{"id":"2","title":"Electronics","subtitle":"Latest Gadgets","image":"https://your-cdn.com/banner2.jpg","link":"/category/electronics","position":"grid"}]
```

**Banner positions:**
- `hero` - Main carousel (full width)
- `grid` - Grid layout (side by side)
- `sidebar` - Sidebar placement

### Option 2: Default Banners

If no custom banners configured, the app uses default banners with your store branding.

### Image Requirements

- **Hero banners**: 1200x400px (3:1 aspect ratio)
- **Grid banners**: 600x300px (2:1 aspect ratio)
- Supported formats: JPG, PNG, WebP
- Use CDN or Shopify Files for hosting

## Enhanced Features to Add

1. **Customer Authentication**: Login via Shopify Customer API
2. **Metafields**: Show additional product info
3. **Predictive Search**: Better search with suggestions
4. **Product Recommendations**: Related products
5. **Multi-currency**: Support multiple currencies
6. **Subscriptions**: Shopify Subscription API
7. **Wishlist**: Customer wishlist integration

### Production Checklist

- [ ] Configure real Shopify credentials
- [ ] Remove demo banner or make it admin-only
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Add error tracking (Sentry, etc.)
- [ ] Configure SEO meta tags
- [ ] Set up proper hosting
- [ ] Enable SSL/HTTPS
- [ ] Test checkout flow end-to-end
- [ ] Add terms & privacy policy
- [ ] Set up customer support

---

**Need Help?** 
- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Shopify Community Forums](https://community.shopify.com/)
- [GitHub Issues](https://github.com/your-repo/jiomart-shopify-clone/issues)
