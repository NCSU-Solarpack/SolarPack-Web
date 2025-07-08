# SolarPack-Web

Welcome to the **SolarPack-Web** repository! This project is the official website for the SolarPack initiative, providing information, resources, and engagement opportunities for alumni, sponsors, team members, and the broader community. This README is a comprehensive guide to the structure, features, and contribution process for the SolarPack-Web project.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Pages and Features](#pages-and-features)
  - [Alumni](#alumni)
  - [App](#app)
  - [Blog](#blog)
  - [Contact](#contact)
  - [Donate](#donate)
  - [Index (Home)](#index-home)
  - [Privacy Policy](#privacy-policy)
  - [Sponsors](#sponsors)
  - [Team](#team)
- [Assets](#assets)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [License](#license)
- [Contact](#contact-1)

---

## Project Overview

**SolarPack-Web** is a static website built to showcase the SolarPack project, its team, alumni, sponsors, and to provide a platform for blog posts, donations, and contact. The site is designed for clarity, accessibility, and ease of maintenance.

---

## Directory Structure

```
SolarPack-Web/
├── alumni.html
├── app.html
├── blog.html
├── contact.html
├── donate.html
├── index.html
├── privacy-policy.html
├── sponsors.html
├── team.html
├── assets/
│   ├── blogs/
│   ├── fonts/
│   ├── images/
│   │   ├── app_hero.png
│   │   ├── app_store.png
│   │   ├── ...
│   │   └── headshots/
│   └── ...
├── blogs/
│   ├── blog1.html
│   ├── ...
│   └── index.json
├── docs/
│   └── README.md
└── ...
```

- **HTML Files**: Each major section of the site is a standalone HTML file.
- **assets/**: Contains images, fonts, and other static resources.
- **blogs/**: Contains individual blog posts as HTML files and an `index.json` for blog metadata.
- **docs/**: Documentation for developers and contributors.

---

## Getting Started

### Prerequisites
- A web browser (Chrome, Firefox, Edge, Safari, etc.)
- (Optional) A local web server for development (e.g., [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code)

### Cloning the Repository

```sh
git clone https://github.com/your-org/SolarPack-Web.git
cd SolarPack-Web
```

### Running Locally

You can open `index.html` directly in your browser, or use a local server for better routing and asset loading:

- **Using VS Code Live Server**:
  1. Install the Live Server extension.
  2. Right-click `index.html` and select **Open with Live Server**.

- **Using Python (for quick server):**
  ```sh
  python -m http.server 8000
  # Then visit http://localhost:8000 in your browser
  ```

---

## Pages and Features

### Alumni (`alumni.html`)
- **Purpose**: Showcases past members of the SolarPack team.
- **Features**:
  - List of alumni with names, roles, and headshots (from `assets/images/headshots/`).
  - Optionally, links to alumni LinkedIn or personal websites.
- **How to Update**:
  - Add new alumni entries in the HTML.
  - Place new headshots in `assets/images/headshots/`.

### App (`app.html`)
- **Purpose**: Highlights the SolarPack mobile app.
- **Features**:
  - Screenshots of the app (from `assets/images/iphone-app/`).
  - Download links (App Store, Google Play, etc.).
  - Description of app features and benefits.
- **How to Update**:
  - Add new screenshots to `assets/images/iphone-app/`.
  - Update download links as needed.

### Blog (`blog.html` & `blogs/`)
- **Purpose**: Shares news, updates, and stories.
- **Features**:
  - Blog index page (`blog.html`) lists all blog posts.
  - Individual blog posts in `blogs/blogX.html`.
  - Blog metadata managed in `blogs/index.json`.
- **How to Add a Blog Post**:
  1. Create a new HTML file in `blogs/` (e.g., `blog7.html`).
  2. Add metadata to `blogs/index.json` (title, date, author, summary, filename).
  3. Add images or videos to `assets/blogs/` as needed.

### Contact (`contact.html`)
- **Purpose**: Allows visitors to reach out to the SolarPack team.
- **Features**:
  - Contact form (name, email, message).
  - Team contact information.
  - Social media links.
- **How to Update**:
  - Edit contact details in the HTML.
  - Update form handling as needed (static or via a service like Formspree).

### Donate (`donate.html`)
- **Purpose**: Provides a way for supporters to contribute financially.
- **Features**:
  - Donation options (PayPal, credit card, etc.).
  - Information on how donations are used.
  - Sponsor recognition.
- **How to Update**:
  - Update payment links or embed codes.
  - Add new sponsor information as needed.

### Index (Home) (`index.html`)
- **Purpose**: The main landing page for the SolarPack project.
- **Features**:
  - Hero section with project overview and call-to-action.
  - Quick links to app, blog, donate, team, etc.
  - Featured images and testimonials.
- **How to Update**:
  - Edit content and images in `index.html`.
  - Update hero images in `assets/images/`.

### Privacy Policy (`privacy-policy.html`)
- **Purpose**: Outlines how user data is handled.
- **Features**:
  - Clear privacy practices and data usage.
  - Contact information for privacy concerns.
- **How to Update**:
  - Edit the HTML to reflect current privacy practices.

### Sponsors (`sponsors.html`)
- **Purpose**: Recognizes organizations and individuals who support SolarPack.
- **Features**:
  - Sponsor logos and descriptions.
  - Links to sponsor websites.
- **How to Update**:
  - Add new sponsor logos to `assets/images/`.
  - Update sponsor list in the HTML.

### Team (`team.html`)
- **Purpose**: Introduces the current SolarPack team.
- **Features**:
  - Team member bios, roles, and headshots.
  - Group photos.
- **How to Update**:
  - Add new team members in the HTML.
  - Place new headshots in `assets/images/headshots/`.

---

## Assets

- **Images**: All images are stored in `assets/images/` and its subfolders.
- **Fonts**: Custom fonts are in `assets/fonts/`.
- **Blog Media**: Blog-specific images and videos are in `assets/blogs/`.

---

## Contributing

1. **Fork the repository** and clone your fork.
2. **Create a new branch** for your feature or fix:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** (add pages, update content, etc.).
4. **Commit and push**:
   ```sh
   git add .
   git commit -m "Describe your changes"
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** on GitHub and describe your changes.

### Guidelines
- Keep HTML and assets organized.
- Use descriptive commit messages.
- Test your changes locally before submitting.

---

## Deployment

This is a static website and can be deployed on any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

### Deploying to GitHub Pages
1. Push your changes to the `main` branch.
2. In your repository settings, enable GitHub Pages and set the source to the root or `/docs` folder.
3. The site will be available at `https://your-username.github.io/SolarPack-Web/`.

### Deploying to Netlify or Vercel
- Connect your repository and follow the platform instructions for static sites.

---

## License

Specify your license here (e.g., MIT, Apache 2.0, etc.).

---

Thank you for supporting SolarPack!
