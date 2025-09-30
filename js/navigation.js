/**
 * Navigation functionality for Multi Downloader Hub
 */

class Navigation {
    constructor(downloader) {
        this.downloader = downloader;
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
        
        this.init();
    }
    
    /**
     * Initialize navigation
     */
    init() {
        // Mobile menu toggle
        this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                this.closeMobileMenu();
            }
        });
    }
    
    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('hidden');
    }
    
    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.mobileMenu.classList.add('hidden');
    }
    
    /**
     * Close mobile menu when link is clicked
     */
    handleLinkClick() {
        this.closeMobileMenu();
    }
}

export default Navigation;