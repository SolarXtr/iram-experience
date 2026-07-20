/**
 * auth.js
 * Mock Authentication and Role Management for iRAM Experience.
 * (Will be replaced by Google Apps Script / Firebase Auth in Phase 4)
 */

class AuthManager {
    constructor() {
        this.init();
    }

    init() {
        // Expose to window for easy access
        window.iRAMAuth = this;
        this.checkAuthOnLoad();
    }

    login(role, username) {
        const sessionData = {
            isLoggedIn: true,
            role: role,
            username: username,
            loginTime: new Date().toISOString()
        };
        sessionStorage.setItem('iram_session', JSON.stringify(sessionData));
        window.location.href = 'dashboard.html';
    }

    logout() {
        sessionStorage.removeItem('iram_session');
        window.location.href = 'login.html';
    }

    getSession() {
        const sessionStr = sessionStorage.getItem('iram_session');
        if (!sessionStr) return null;
        try {
            return JSON.parse(sessionStr);
        } catch (e) {
            return null;
        }
    }

    checkAuthOnLoad() {
        const session = this.getSession();
        const isLoginPage = window.location.pathname.includes('login.html');
        
        // If not logged in and not on login page, redirect to login
        if (!session && !isLoginPage && window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'login.html';
        }
        
        // If logged in and on login page, redirect to dashboard
        if (session && isLoginPage) {
            window.location.href = 'dashboard.html';
        }

        // If on dashboard, enforce UI rules based on role
        if (session && window.location.pathname.includes('dashboard.html')) {
            this.enforceRoleUI(session);
        }
    }

    enforceRoleUI(session) {
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
            // Update User Profile UI
            const userNameEl = document.querySelector('.user-name');
            if (userNameEl) {
                userNameEl.innerHTML = `${session.username} <br><small style="font-weight:normal; opacity:0.8;">(${session.role})</small>`;
            }

            // Role-based elements
            // Roles: 'Administrator', 'Researcher', 'Reviewer'
            
            // Example: Hide System Settings from non-admins
            if (session.role !== 'Administrator') {
                const settingsLink = document.querySelector('a[href="#settings"]');
                if (settingsLink) {
                    const li = settingsLink.closest('li');
                    if (li) li.style.display = 'none';
                }
            }

            // Bind logout button if exists
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });
            }
        });
    }
}

// Initialize Auth
new AuthManager();
