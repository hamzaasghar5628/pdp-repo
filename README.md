# Product Options & Pricing System

## Overview
This custom Shopify implementation handles product options, variant selection, and dynamic pricing calculations. The system supports multiple product options including width selections and additional customization features.

## Setup Instructions

### 1. Theme Files Setup
Ensure the following files are properly installed in your theme:
├── assets/
│ ├── width-selector.js
│ ├── product-info.js
│ ├── product-options-drawer.js
│ └── custom.css
├── snippets/
│ ├── buy-buttons.liquid
│ └── product-variant-picker.liquid
├── sections/
│ └── main-product.liquid
└── templates/
└── product.json

### 2. Theme Settings Configuration
1. Navigate to your Shopify admin panel
2. Go to Online Store > Themes
3. Click "Customize" on your active theme
4. Under Theme Settings, ensure the product options settings are configured

### 3. Product Metafield Configuration
1. In Shopify admin, go to Products > [Your Product]
2. Set up a metaobject type metafield with two fields:
   - Width field: Stores available width options
   - Panel Count field: Stores corresponding panel counts

## Pricing Logic

### Base Price Structure
- Pricing is managed through Shopify's product variants system
- Two main variant options exist:
  1. Drop (visible to customers)
  2. Panel (hidden on frontend)
- Base prices are set in the Shopify admin for each variant combination

### Width and Panel Relationship
1. Width options are displayed to customers as a dropdown selector
2. Each width option has an associated panel count stored in data attributes
3. When a width is selected:
   - The system reads the corresponding panel count
   - Automatically selects the matching fabric panel variant
   - Updates the price based on the selected variant combination

### Price Calculation Flow
1. Customer selects a width option
2. System retrieves associated panel count from data attribute
3. Corresponding panel variant is automatically selected
4. Final price is calculated based on the variant combination

### Variant Selection
- Each variant combination maintains its own base price
- Option selections are validated against available variants
- Invalid combinations are automatically disabled

## Technical Details

### Event Handling
The system uses custom events to handle:
- Width selection changes
- Option updates
- Price recalculations
- Variant availability checks

### Price Updates
Price updates are triggered by:
- Initial page load
- Width selection changes
- Option selection changes
- Quantity updates

### Browser Compatibility
Supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues
1. **Prices not updating:**
   - Check browser console for errors
   - Verify product.json template structure
   - Ensure all required JS files are loaded

2. **Options not displaying:**
   - Verify theme settings configuration
   - Check snippet inclusion in main-product.liquid
   - Validate product metadata setup

### Support
For technical support or questions about implementation, please contact the development team.

## Maintenance

### Updates
Regular updates may be required for:
- Shopify API compatibility
- Browser compatibility
- Security patches
- Feature enhancements

### Testing
Before deploying updates:
1. Test all price calculations
2. Verify option combinations
3. Check mobile responsiveness
4. Validate checkout process

## License
Proprietary software. All rights reserved.