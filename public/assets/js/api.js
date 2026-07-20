/**
 * api.js
 * Handles communication with the iram-backend Cloudflare Worker API.
 */

// Configuration
// In development, the backend usually runs on localhost:8787
// In production, this should point to the actual Cloudflare Worker URL
const CONFIG = {
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:8787' 
        : 'https://api.your-production-url.com' // TODO: Update with real production URL later
};

/**
 * Generic fetch function with error handling
 */
async function fetchAPI(endpoint, options = {}) {
    const url = `${CONFIG.API_BASE_URL}${endpoint}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Fetch error for ${endpoint}:`, error);
        throw error;
    }
}

// Exposed API Client
window.api = {
    publications: {
        getAll: () => fetchAPI('/api/publications')
    },
    researchers: {
        getAll: () => fetchAPI('/api/researchers')
    }
};
