/**
 * SolarPack Website Header Component
 * This file contains the reusable header/navigation bar for all pages
 */

// CSS styles for the header
const headerCSS = `
<style>
:root {
    --bg: #0e0e0e;
    --card: #181818;
    --txt: #ffffff;
    --subtxt: #cecece;
    --accent: #e53935;
    --radius: 8px;
}

body {
    margin: 0;
    font-family: "DM Sans", system-ui, sans-serif;
    background: var(--bg);
    color: var(--txt);
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem 1rem;
    background: var(--card);
}

.logo {
    height: 48px;
    width: 48px;
    background: #222;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Bebas Neue", sans-serif;
    font-size: 2rem;
    color: var(--accent);
    margin-right: 1.2rem;
}

.nav {
    display: flex;
    gap: 1.2rem;
}

.nav a {
    color: var(--txt);
    text-decoration: none;
    font-weight: 600;
    padding: 0.4rem 0.9rem;
    border-radius: var(--radius);
    transition: background 0.15s;
}

.nav a.active, .nav a:hover {
    background: var(--accent);
    color: #fff;
}

/* Mobile hamburger menu */
.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--txt);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius);
    transition: background 0.15s;
}

.mobile-menu-toggle:hover {
    background: var(--accent);
    color: #fff;
}

.mobile-menu {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    background: var(--card);
    border-top: 1px solid #333;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    padding-top: 64px; /* height of header */
}

.mobile-menu.active {
    display: block;
}

.mobile-menu .nav {
    flex-direction: column;
    gap: 0;
    padding: 1rem 0;
}

.mobile-menu .nav a {
    padding: 1rem 2rem;
    border-radius: 0;
    border-bottom: 1px solid #333;
    display: block;
    text-align: left;
}

.mobile-menu .nav a:last-child {
    border-bottom: none;
}

/* Mobile responsive navigation */
@media (max-width: 768px) {
    .header {
        position: relative;
    }
    
    .header .nav {
        display: none !important;
    }
    
    .mobile-menu-toggle {
        display: block;
    }
}
</style>
`;

// Header HTML structure
const headerHTML = `
<header class="header">
    <div class="logo" style="background:none;padding:0;margin-right:1.2rem;box-shadow:none;">
        <img src="assets/images/solarpack_logo.png" alt="SolarPack Logo" style="height:44px;width:44px;object-fit:contain;display:block;background:none;border-radius:0;" />
    </div>
    <nav class="nav">
        <a href="index.html" data-page="index">Home</a>
        <a href="app.html" data-page="app">App</a>
        <a href="team.html" data-page="team">Team</a>
        <a href="alumni.html" data-page="alumni">Alumni</a>
        <a href="sponsors.html" data-page="sponsors">Sponsors</a>
        <a href="donate.html" data-page="donate">Donate</a>
        <a href="blog.html" data-page="blog">Blog</a>
        <a href="contact.html" data-page="contact">Contact</a>
    </nav>
    <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Menu">
        <i class="fas fa-bars"></i>
    </button>
    <div class="mobile-menu" id="mobile-menu">
        <nav class="nav">
            <a href="index.html" data-page="index">Home</a>
            <a href="app.html" data-page="app">App</a>
            <a href="team.html" data-page="team">Team</a>
            <a href="alumni.html" data-page="alumni">Alumni</a>
            <a href="sponsors.html" data-page="sponsors">Sponsors</a>
            <a href="donate.html" data-page="donate">Donate</a>
            <a href="blog.html" data-page="blog">Blog</a>
            <a href="contact.html" data-page="contact">Contact</a>
        </nav>
    </div>
</header>
`;

// Function to inject header into the page
function initializeHeader() {
    // Add CSS to head
    document.head.insertAdjacentHTML('beforeend', headerCSS);
    
    // Add header HTML to body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    
    // Set active navigation item based on current page
    setActiveNavItem();
    
    // Initialize mobile menu functionality
    initializeMobileMenu();
}

// Function to set the active navigation item
function setActiveNavItem() {
    const currentPage = getCurrentPageName();
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Function to initialize mobile menu
function initializeMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            
            // Update hamburger icon
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking on a link
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
        
        // Close menu on window resize to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }
}

// Function to get current page name from URL
function getCurrentPageName() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    // Handle different page names
    if (filename === '' || filename === 'index.html') {
        return 'index';
    }
    
    // Remove .html extension and return page name
    return filename.replace('.html', '');
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeHeader);

// Export functions for manual initialization if needed
window.SolarPackHeader = {
    init: initializeHeader,
    setActive: setActiveNavItem
};
