/**
 * layout.js
 * Dynamically loads standard layout components (Sidebar, Navbar) into placeholders.
 * Highlights the active sidebar link based on current path.
 */

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load Sidebar
        const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
        if (sidebarPlaceholder) {
            const sidebarResponse = await fetch('components/sidebar.html');
            if (sidebarResponse.ok) {
                const sidebarHtml = await sidebarResponse.text();
                sidebarPlaceholder.outerHTML = sidebarHtml;
            }
        }

        // Load Navbar
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            const navbarResponse = await fetch('components/navbar.html');
            if (navbarResponse.ok) {
                const navbarHtml = await navbarResponse.text();
                navbarPlaceholder.outerHTML = navbarHtml;
            }
        }

        // Highlight Active Menu Item
        const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
        document.querySelectorAll('.sidebar-nav a').forEach(a => {
            const href = a.getAttribute('href');
            if (href === currentPath) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });

    } catch (error) {
        console.error('Error loading layout components:', error);
    }
});
