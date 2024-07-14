// Function to set color scheme
function setColorScheme(scheme) {
    if (scheme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('color-scheme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('color-scheme', 'light');
    }
}

// Function to toggle color scheme
function toggleColorScheme() {
    if (document.body.classList.contains('dark-mode')) {
        setColorScheme('light');
    } else {
        setColorScheme('dark');
    }
}

// Function to create toggle button
function createToggleButton() {
    const button = document.createElement('button');
    button.textContent = 'Toggle Light/Dark Mode';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '1000';
    button.addEventListener('click', toggleColorScheme);
    document.body.appendChild(button);
}

// Set initial color scheme
function initColorScheme() {
    const savedScheme = localStorage.getItem('color-scheme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedScheme) {
        setColorScheme(savedScheme);
    } else if (prefersDarkScheme.matches) {
        setColorScheme('dark');
    } else {
        setColorScheme('light');
    }
}

// Initialize everything
function init() {
    initColorScheme();
    createToggleButton();
    
    // Listen for changes in color scheme preference
    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        const newColorScheme = e.matches ? 'dark' : 'light';
        setColorScheme(newColorScheme);
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);