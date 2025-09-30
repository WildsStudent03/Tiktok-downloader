/**
 * Helper functions for Multi Downloader Hub
 */

/**
 * Extract filename from URL
 * @param {string} url - The URL to extract filename from
 * @param {string} type - The downloader type
 * @returns {string} - The extracted filename
 */
function extractFilename(url, type) {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const filename = pathname.split('/').pop();
        
        // If no filename found, create a generic one based on downloader type
        if (!filename || !filename.includes('.')) {
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            const extension = getDefaultExtension(type);
            return `${type}_${timestamp}${extension}`;
        }
        
        return filename;
    } catch (error) {
        // Fallback filename
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const extension = getDefaultExtension(type);
        return `${type}_${timestamp}${extension}`;
    }
}

/**
 * Get default file extension based on downloader type
 * @param {string} type - The downloader type
 * @returns {string} - The default extension
 */
function getDefaultExtension(type) {
    const extensions = {
        general: '',
        video: '.mp4',
        image: '.jpg',
        document: '.pdf',
        audio: '.mp3'
    };
    return extensions[type] || '';
}

/**
 * Validate URL based on type
 * @param {string} url - The URL to validate
 * @param {object} config - The downloader configuration
 * @returns {boolean} - Whether the URL is valid
 */
function isValidUrl(url, config) {
    return config.validation.test(url);
}

/**
 * Load data from localStorage
 * @param {string} key - The localStorage key
 * @param {*} defaultValue - The default value if key doesn't exist
 * @returns {*} - The parsed data or default value
 */
function loadFromStorage(key, defaultValue = []) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return defaultValue;
    }
}

/**
 * Save data to localStorage
 * @param {string} key - The localStorage key
 * @param {*} data - The data to save
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date string
 */
function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
}

// Export all helper functions
export {
    extractFilename,
    getDefaultExtension,
    isValidUrl,
    loadFromStorage,
    saveToStorage,
    formatDate
};