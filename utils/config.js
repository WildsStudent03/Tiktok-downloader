/**
 * Configuration for Multi Downloader Hub
 */

/**
 * Downloader configurations for different types
 */
const downloaderConfigs = {
    general: {
        title: 'General Downloader',
        description: 'Download any file from the internet with ease',
        placeholder: 'https://example.com/file.pdf',
        label: 'File URL',
        formats: '(All formats supported)',
        buttonText: 'Download File',
        validation: /^https?:\/\/.+/i
    },
    video: {
        title: 'Video Downloader',
        description: 'Download videos from various platforms',
        placeholder: 'https://youtube.com/watch?v=... or https://vimeo.com/...',
        label: 'Video URL',
        formats: '(MP4, AVI, MOV, etc.)',
        buttonText: 'Download Video',
        validation: /^https?:\/\/.+/i
    },
    image: {
        title: 'Image Downloader',
        description: 'Download high-quality images from any source',
        placeholder: 'https://example.com/image.jpg',
        label: 'Image URL',
        formats: '(JPG, PNG, GIF, SVG, etc.)',
        buttonText: 'Download Image',
        validation: /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg|webp|bmp)(\?.*)?$/i
    },
    document: {
        title: 'Document Downloader',
        description: 'Download documents and files for work or study',
        placeholder: 'https://example.com/document.pdf',
        label: 'Document URL',
        formats: '(PDF, DOC, DOCX, XLS, PPT, etc.)',
        buttonText: 'Download Document',
        validation: /^https?:\/\/.+\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf)(\?.*)?$/i
    },
    audio: {
        title: 'Audio Downloader',
        description: 'Download music and audio files',
        placeholder: 'https://example.com/audio.mp3',
        label: 'Audio URL',
        formats: '(MP3, WAV, FLAC, AAC, etc.)',
        buttonText: 'Download Audio',
        validation: /^https?:\/\/.+\.(mp3|wav|flac|aac|ogg|m4a|wma)(\?.*)?$/i
    }
};

/**
 * App configuration
 */
const appConfig = {
    maxHistoryItems: 5,
    historyStorageKey: 'multiDownloaderHistory',
    defaultDownloader: 'general'
};

/**
 * File type icons
 */
const fileTypeIcons = {
    video: `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
    </svg>`,
    image: `<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"></path>
    </svg>`,
    document: `<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>`,
    audio: `<svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
    </svg>`,
    general: `<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>`
};

// Export configurations
export {
    downloaderConfigs,
    appConfig,
    fileTypeIcons
};