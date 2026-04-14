# JioMart Shopify Clone

A modern, responsive e-commerce web application built with React, TypeScript, and Tailwind CSS. Designed to visually and functionally mimic JioMart while being fully integrated with Shopify as a headless storefront.

![JioMart Clone Screenshot](https://via.placeholder.com/800x400?text=JioMart+Shopify+Clone)

## Features

- **JioMart-inspired UI**: Green/white color scheme, familiar layout
- **Shopify Integration**: Works with Shopify Storefront API
- **Responsive Design**: Mobile-first, works on all devices
- **Product Catalog**: Browse products by category
- **Search**: Real-time product search
- **Shopping Cart**: Add/remove/update quantities
- **Checkout**: Seamless Shopify checkout integration
- **Demo Mode**: Works without Shopify (mock data)

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **API**: Shopify Storefront API (GraphQL)
- **Build Tool**: Vite

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/jiomart-shopify-clone.git
cd jiomart-shopify-clone

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Shopify Integration

### Demo Mode (No Shopify Required)

The app works out-of-the-box with mock data. You'll see a yellow "Demo Mode" banner - this means the app is using local mock data instead of connecting to Shopify.

### Connect to Your Shopify Store

1. **Create a Shopify Custom App**:
   - Go to Shopify Admin → Settings → Apps and sales channels → Develop apps
   - Create an app called "JioMart Storefront"
   - Enable Storefront API access with these scopes:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_write_checkouts`
     - `unauthenticated_read_checkouts`

2. **Configure Environment Variables**:
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your credentials:
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_API_TOKEN=your_token_here
   ```

3. **Restart the Server**:
   ```bash
   npm run dev
   ```

For detailed setup instructions, see [SHOPIFY_SETUP.md](./SHOPIFY_SETUP.md).

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── CategorySidebar.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── CategoryPage.tsx
│   ├── ProductPage.tsx
│   ├── CartPage.tsx
│   ├── SearchPage.tsx
│   └── OffersPage.tsx
├── hooks/              # Custom React hooks
│   └── useShopify.ts   # Shopify data & cart hooks
├── lib/                # Utilities
│   └── shopify.ts      # Shopify client & GraphQL queries
├── types/              # TypeScript types
│   └── shopify.ts      # Shopify schema types
├── data.ts             # Mock data (fallback)
├── App.tsx
└── main.tsx
```

## Key Features

### Product Display
- Product grid with discount badges
- Product detail pages with image galleries
- Variant selection (size, color, etc.)
- Stock availability

### Shopping Cart
- Add to cart functionality
- Quantity adjustment
- Remove items
- Cart persistence (Shopify or localStorage)
- Real-time price updates

### Navigation
- Category-based navigation
- Breadcrumb navigation
- Search functionality
- Mobile-responsive menu

### Checkout
- Shopify checkout integration
- Secure payment processing
- Order confirmation

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SHOPIFY_STORE_DOMAIN` | Your Shopify store domain (e.g., `store.myshopify.com`) | For Shopify mode |
| `VITE_SHOPIFY_STOREFRONT_API_TOKEN` | Storefront API access token | For Shopify mode |
| `VITE_SHOPIFY_API_VERSION` | API version (default: `2024-01`) | No |

### Tailwind Configuration

The app uses JioMart's brand colors:

```javascript
// tailwind.config.js
colors: {
  'jio-green': '#008539',
  'jio-dark': '#006D2E',
  'jio-light': '#E6F4EA',
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Environment Variables on Hosting

Set these in your hosting platform dashboard:

```
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_API_TOKEN=your_token
```

## Customization

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'jio-green': '#008539',  // Change to your brand color
  'jio-dark': '#006D2E',
  'jio-light': '#E6F4EA',
}
```

### Adding New Categories

Edit `src/data.ts`:

```typescript
export const categories = [
  {
    id: '9',
    name: 'New Category',
    icon: 'IconName',
    subcategories: ['Sub 1', 'Sub 2']
  }
];
```

### Customizing Products (Demo Mode)

Edit the products array in `src/data.ts`:

```typescript
export const products = [
  {
    id: '13',
    name: 'Your Product',
    price: 999,
    // ... other fields
  }
];
```

## API Reference

### Shopify Storefront API

This app uses the following Shopify Storefront API operations:

**Queries:**
- `products` - Fetch product list
- `product` - Fetch single product
- `collections` - Fetch categories
- `collection` - Fetch category with products
- `cart` - Fetch cart details

**Mutations:**
- `cartCreate` - Create new cart
- `cartLinesAdd` - Add items to cart
- `cartLinesUpdate` - Update cart items
- `cartLinesRemove` - Remove cart items

See `src/lib/shopify.ts` for complete GraphQL queries.

## Troubleshooting

### Common Issues

**"Demo Mode" banner won't disappear**
- Check `.env` file exists and credentials are correct
- Restart the dev server

**Products not loading from Shopify**
- Verify Storefront API token
- Check API scopes in Shopify admin
- Check browser console for errors

**Cart not persisting**
- With Shopify: Uses Shopify cart (persistent)
- Demo mode: Uses localStorage (browser storage)

### Getting Help

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [GitHub Issues](../../issues)
- [Shopify Community](https://community.shopify.com/)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Design inspired by [JioMart](https://jiomart.com)
- Built with [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- Icons by [Lucide](https://lucide.dev)

## Support

For support, email support@yourdomain.com or join our Slack channel.

---

**Note**: This is not an official JioMart or Shopify product. It's an open-source demo project.
