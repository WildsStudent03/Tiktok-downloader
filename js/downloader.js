/**
 * Main Downloader class for Multi Downloader Hub
 */

// Import utilities
import { extractFilename, isValidUrl, loadFromStorage, saveToStorage } from '../utils/helpers.js';
import { downloaderConfigs, appConfig, fileTypeIcons } from '../utils/config.js';

class Downloader {
    constructor() {
        // DOM elements
        this.urlInput = document.getElementById('urlInput');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.downloadBtnText = document.getElementById('downloadBtnText');
        this.errorMessage = document.getElementById('errorMessage');
        this.errorText = document.getElementById('errorText');
        this.historyContainer = document.getElementById('historyContainer');
        this.historyList = document.getElementById('historyList');
        this.emptyHistory = document.getElementById('emptyHistory');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.downloaderTitle = document.getElementById('downloaderTitle');
        this.downloaderDescription = document.getElementById('downloaderDescription');
        this.inputLabel = document.getElementById('inputLabel');
        this.supportedFormats = document.getElementById('supportedFormats');
        
        // App state
        this.currentDownloader = appConfig.defaultDownloader;
        this.downloadHistory = loadFromStorage(appConfig.historyStorageKey, []);
        
        // Initialize the app
        this.init();
    }
    
    /**
     * Initialize the app
     */
    init() {
        // Event listeners
        this.downloadBtn.addEventListener('click', () => this.handleDownload());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleDownload();
            }
        });
        this.urlInput.addEventListener('input', () => this.hideError());
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        
        // Load and display history
        this.displayHistory();
        
        console.log('Downloader initialized successfully!');
    }
    
    /**
     * Switch downloader type
     * @param {string} type - The downloader type
     */
    switchDownloader(type) {
        this.currentDownloader = type;
        const config = downloaderConfigs[type];
        
        // Update UI
        this.downloaderTitle.textContent = config.title;
        this.downloaderDescription.textContent = config.description;
        this.urlInput.placeholder = config.placeholder;
        this.inputLabel.textContent = config.label;
        this.supportedFormats.textContent = config.formats;
        this.downloadBtnText.textContent = config.buttonText;
        
        // Clear input and hide errors
        this.urlInput.value = '';
        this.hideError();
        
        // Add transition effect
        this.downloaderTitle.classList.add('fade-in');
        setTimeout(() => {
            this.downloaderTitle.classList.remove('fade-in');
        }, 400);
    }
    
    /**
     * Show error message
     * @param {string} message - The error message
     */
    showError(message) {
        this.errorText.textContent = message;
        this.errorMessage.classList.remove('hidden');
        this.errorMessage.classList.add('fade-in');
        this.urlInput.classList.add('error-shake');
        
        // Remove shake animation after it completes
        setTimeout(() => {
            this.urlInput.classList.remove('error-shake');
        }, 600);
    }
    
    /**
     * Hide error message
     */
    hideError() {
        this.errorMessage.classList.add('hidden');
        this.errorMessage.classList.remove('fade-in');
    }
    
    /**
     * Handle download button click
     */
    async handleDownload() {
        const url = this.urlInput.value.trim();
        
        // Validate empty URL
        if (!url) {
            this.showError('Please enter a URL to download');
            return;
        }
        
        // Validate URL format based on current downloader
        if (!isValidUrl(url, downloaderConfigs[this.currentDownloader])) {
            const config = downloaderConfigs[this.currentDownloader];
            let errorMsg = 'Please enter a valid URL starting with http:// or https://';
            
            if (this.currentDownloader !== 'general') {
                errorMsg = `Please enter a valid ${this.currentDownloader} URL with supported format`;
            }
            
            this.showError(errorMsg);
            return;
        }
        
        // Hide any existing errors
        this.hideError();
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Attempt to download the file
            await this.downloadFile(url);
            
            // Add to history
            this.addToHistory(url);
            
            // Show success feedback
            this.showSuccess();
            
            // Clear input
            this.urlInput.value = '';
            
        } catch (error) {
            console.error('Download error:', error);
            this.showError('Failed to download file. Please check the URL and try again.');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    /**
     * Download file function
     * @param {string} url - The URL to download
     * @returns {Promise} - A promise that resolves when download is complete
     */
    async downloadFile(url) {
        return new Promise((resolve, reject) => {
            try {
                // Extract filename from URL
                const filename = extractFilename(url, this.currentDownloader);
                
                // Create a temporary anchor element for download
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                link.target = '_blank';
                
                // Append to body, click, and remove
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Resolve after a short delay to simulate processing
                setTimeout(() => resolve(), 800);
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Set loading state
     * @param {boolean} isLoading - Whether the app is in loading state
     */
    setLoadingState(isLoading) {
        if (isLoading) {
            this.downloadBtn.disabled = true;
            this.downloadBtn.classList.add('loading');
            this.downloadBtnText.textContent = 'Downloading...';
            this.downloadBtn.innerHTML = `
                <div class="flex items-center justify-center">
                    <svg class="animate-spin h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Downloading...
                </div>
            `;
        } else {
            this.downloadBtn.disabled = false;
            this.downloadBtn.classList.remove('loading');
            const config = downloaderConfigs[this.currentDownloader];
            this.downloadBtn.innerHTML = `
                <div class="flex items-center justify-center">
                    <svg class="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    ${config.buttonText}
                </div>
            `;
        }
    }
    
    /**
     * Show success feedback
     */
    showSuccess() {
        this.downloadBtn.classList.add('success-animation', 'glow');
        const originalClasses = this.downloadBtn.className;
        
        // Temporarily change button to success state
        this.downloadBtn.className = this.downloadBtn.className.replace('from-blue-600 to-purple-600', 'from-green-600 to-emerald-600');
        this.downloadBtn.innerHTML = `
            <div class="flex items-center justify-center">
                <svg class="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Downloaded Successfully!
            </div>
        `;
        
        // Reset after animation
        setTimeout(() => {
            this.downloadBtn.classList.remove('success-animation', 'glow');
            this.downloadBtn.className = originalClasses;
            this.setLoadingState(false);
        }, 2000);
    }
    
    /**
     * Add URL to download history
     * @param {string} url - The URL to add to history
     */
    addToHistory(url) {
        const historyItem = {
            url: url,
            filename: extractFilename(url, this.currentDownloader),
            timestamp: new Date().toISOString(),
            displayTime: new Date().toLocaleString(),
            type: this.currentDownloader
        };
        
        // Remove if already exists
        this.downloadHistory = this.downloadHistory.filter(item => item.url !== url);
        
        // Add to beginning
        this.downloadHistory.unshift(historyItem);
        
        // Keep only max items
        this.downloadHistory = this.downloadHistory.slice(0, appConfig.maxHistoryItems);
        
        // Save to localStorage
        saveToStorage(appConfig.historyStorageKey, this.downloadHistory);
        
        // Update display
        this.displayHistory();
    }
    
    /**
     * Display download history
     */
    displayHistory() {
        if (this.downloadHistory.length === 0) {
            this.emptyHistory.classList.remove('hidden');
            this.historyList.innerHTML = '';
            this.clearHistoryBtn.classList.add('hidden');
            return;
        }
        
        this.emptyHistory.classList.add('hidden');
        this.clearHistoryBtn.classList.remove('hidden');
        
        this.historyList.innerHTML = this.downloadHistory.map((item, index) => `
            <div class="history-item flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 cursor-pointer slide-in file-type-${item.type}" 
                 onclick="window.downloader.downloadFromHistory('${item.url}', '${item.type}')" 
                 style="animation-delay: ${index * 0.1}s">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center mb-2">
                        ${fileTypeIcons[item.type]}
                        <span class="font-semibold text-white ml-3 truncate">${item.filename}</span>
                        <span class="ml-2 px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 uppercase">${item.type}</span>
                    </div>
                    <p class="text-sm text-gray-300 truncate mb-1">${item.url}</p>
                    <p class="text-xs text-gray-400">${item.displayTime}</p>
                </div>
                <div class="ml-4 flex-shrink-0">
                    <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3"></path>
                    </svg>
                </div>
            </div>
        `).join('');
    }
    
    /**
     * Download from history
     * @param {string} url - The URL to download
     * @param {string} type - The downloader type
     */
    async downloadFromHistory(url, type) {
        // Switch to the appropriate downloader if different
        if (type !== this.currentDownloader) {
            this.switchDownloader(type);
        }
        
        this.urlInput.value = url;
        await this.handleDownload();
    }
    
    /**
     * Clear download history
     */
    clearHistory() {
        if (confirm('Are you sure you want to clear the download history?')) {
            this.downloadHistory = [];
            saveToStorage(appConfig.historyStorageKey, this.downloadHistory);
            this.displayHistory();
        }
    }
}

export default Downloader;