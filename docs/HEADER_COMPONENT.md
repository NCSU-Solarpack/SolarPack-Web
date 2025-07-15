# SolarPack Website Header Component

This document explains the new centralized header system for the SolarPack website.

## Overview

The header component has been extracted into a reusable JavaScript file (`assets/js/header.js`) that automatically injects the navigation bar and its styles into each page. This ensures consistency across all pages and makes maintenance much easier.

## Files

### Core Files
- `assets/js/header.js` - The main header component file
- `template.html` - A template for creating new pages

### Updated Files
- `index.html` - Updated to use the new header system
- `team.html` - Updated to use the new header system

## How It Works

1. **Automatic Injection**: The `header.js` script automatically injects the header HTML and CSS when the page loads
2. **Active State Management**: The script automatically detects the current page and highlights the appropriate navigation item
3. **Responsive Design**: The header includes mobile-responsive styles

## Using the Header Component

### For New Pages

1. Use `template.html` as a starting point for new pages
2. Update the page title in the `<title>` tag
3. Add your page-specific content in the `<main>` section
4. Add any page-specific CSS in the `<style>` section

### For Existing Pages

To convert an existing page to use the new header system:

1. Add the header script reference:
   ```html
   <!-- SolarPack Header Component -->
   <script src="assets/js/header.js"></script>
   ```

2. Remove the existing header HTML and CSS:
   - Remove the entire `<header class="header">` section
   - Remove header-related CSS (`.header`, `.logo`, `.nav`, etc.)
   - Keep the `:root` variables and `body` styles

3. Add a comment where the header will be injected:
   ```html
   <body>
       <!-- Header will be automatically injected here by header.js -->
       <main>
           <!-- Your page content -->
       </main>
   </body>
   ```

## Navigation Items

The header includes the following navigation items:
- Home (`index.html`)
- App (`app.html`)
- Team (`team.html`)
- Alumni (`alumni.html`)
- Donate (`donate.html`)
- Blog (`blog.html`)
- Contact (`contact.html`)

## Customization

### Adding New Navigation Items

To add a new navigation item, edit `assets/js/header.js`:

1. Add the new link to the `headerHTML` constant:
   ```html
   <a href="newpage.html" data-page="newpage">New Page</a>
   ```

2. The `data-page` attribute should match the filename without the `.html` extension

### Styling Changes

All header styles are contained in the `headerCSS` constant in `assets/js/header.js`. To modify the appearance:

1. Edit the CSS variables in the `:root` selector for global changes
2. Modify specific selectors (`.header`, `.nav`, etc.) for targeted changes
3. The responsive styles are included in the `@media` query

### Manual Control

If you need manual control over the header initialization:

```javascript
// Initialize header manually
window.SolarPackHeader.init();

// Set active navigation item manually
window.SolarPackHeader.setActive();
```

## Benefits

1. **Consistency**: All pages use the same header structure and styling
2. **Maintainability**: Changes to the navigation only need to be made in one file
3. **Automatic Active States**: The current page is automatically highlighted
4. **Mobile Responsive**: Built-in responsive design for mobile devices
5. **Easy Integration**: Simple to add to new or existing pages

## Browser Compatibility

The header component uses modern JavaScript features and is compatible with:
- Chrome/Edge 80+
- Firefox 75+
- Safari 13+

For older browser support, consider adding polyfills or using a transpiled version.

## Troubleshooting

### Header Not Appearing
- Check that the `header.js` file path is correct
- Ensure the script is loaded before the `DOMContentLoaded` event
- Check the browser console for JavaScript errors

### Wrong Active State
- Verify the `data-page` attribute matches the current page filename
- Check that the page filename follows the expected pattern

### Styling Issues
- Ensure the CSS variables are properly defined
- Check for conflicting styles in page-specific CSS
- Verify the CSS is being injected properly (check the page source)
