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
    transition: max-height 0.3s cubic-bezier(0.4,0,0.2,1), padding-bottom 0.3s cubic-bezier(0.4,0,0.2,1);
    overflow: hidden;
    max-height: 120px;
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
    background: none !important;
    border: none;
    color: #fff;
    font-size: 1.8rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: color 0.15s;
    box-shadow: none !important;
    outline: none;
}

.mobile-menu-toggle:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}
}

.mobile-menu {
    display: none;
}

.mobile-menu.active {
    display: none;
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
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        position: relative;
        max-height: 120px;
        padding-bottom: 1rem;
        transition: max-height 0.3s cubic-bezier(0.4,0,0.2,1), padding-bottom 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    .header.expanded {
        flex-direction: column;
        align-items: stretch;
        max-height: 600px;
        padding-bottom: 0.5rem;
    }
    .header .logo {
        margin-right: 1.2rem;
    }
    .header .nav {
        display: none !important;
        flex-direction: column;
        gap: 0;
        padding: 0;
        margin: 0;
        width: 100%;
    }
    .header.expanded .nav {
        display: flex !important;
        flex-direction: column;
        gap: 0;
        padding: 0.5rem 0 0.5rem 0;
        margin: 0;
        width: 100%;
    }
    .header .nav a {
        padding: 1rem 2rem;
        border-radius: 0;
        border-bottom: 1px solid #333;
        display: block;
        text-align: left;
        width: 100%;
    }
    .header .nav a:last-child {
        border-bottom: none;
    }
    .mobile-menu-toggle {
        display: block;
        margin-left: auto;
        margin-right: 0;
        align-self: center;
        position: relative;
        z-index: 2;
    }
    .header {
        width: 100%;
    }
    .logo {
        flex-shrink: 0;
    }
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .mobile-menu { display: none !important; }
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
    const header = document.querySelector('.header');
    const nav = header ? header.querySelector('.nav') : null;
    if (menuToggle && header && nav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            header.classList.toggle('expanded');
            // Update hamburger icon
            const icon = menuToggle.querySelector('i');
            if (header.classList.contains('expanded')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!header.contains(e.target) && !menuToggle.contains(e.target)) {
                header.classList.remove('expanded');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                header.classList.remove('expanded');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
        // Close menu on window resize to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                header.classList.remove('expanded');
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
