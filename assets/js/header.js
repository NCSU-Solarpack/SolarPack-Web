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

/* Mobile responsive navigation */
@media (max-width: 768px) {
    .header {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }
    
    .nav {
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.8rem;
    }
    
    .nav a {
        padding: 0.3rem 0.7rem;
        font-size: 0.9rem;
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
