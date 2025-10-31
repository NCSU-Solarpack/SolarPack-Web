# SolarPack Web - React Version

This is the official website for NC State's SolarPack solar vehicle team, built with React and Vite.

## Development

To run the development server:

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173/SolarPack-Web/`

## Building

To build for production:

```bash
npm run build
```

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the main branch via GitHub Actions.

## Structure

- `src/components/` - Reusable React components (Header, Layout)
- `src/pages/` - Individual page components
- `src/styles/` - Global CSS styles
- `public/` - Static assets (images, fonts, etc.)

## Pages

- **Home** (`/`) - Main landing page with hero section and race carousel
- **App** (`/app`) - Mobile app information
- **Team** (`/team`) - Team member information
- **Alumni** (`/alumni`) - Alumni information
- **Sponsors** (`/sponsors`) - Sponsor information
- **Donate** (`/donate`) - Donation page
- **Contact** (`/contact`) - Contact information
- **Privacy Policy** (`/privacy-policy`) - Privacy policy

## Migration from HTML

This project was converted from static HTML files to a React single-page application. The original HTML files have been preserved with `_old` suffixes for reference.

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Styling with CSS custom properties
- **Font Awesome** - Icons
- **Ionicons** - Additional icons
- **GitHub Actions** - Automated deployment