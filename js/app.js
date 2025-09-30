/**
 * Main application entry point for Multi Downloader Hub
 */

import Downloader from './downloader.js';
import Navigation from './navigation.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create downloader instance
    const downloader = new Downloader();
    
    // Create navigation instance and pass downloader
    const navigation = new Navigation(downloader);
    
    // Make downloader available globally for history click events
    window.downloader = downloader;
    
    console.log('Multi Downloader Hub initialized successfully!');
});