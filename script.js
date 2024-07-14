// Function to set color scheme
function setColorScheme(scheme) {
    if (scheme === 'dark') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('color-scheme', 'dark');
        document.getElementById('mode-toggle').textContent = '🌞';
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('color-scheme', 'light');
        document.getElementById('mode-toggle').textContent = '🌙';
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
    button.id = 'mode-toggle';
    button.textContent = 'Switch to Dark Mode';
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
    createToggleButton();
    initColorScheme();
    
    // Listen for changes in color scheme preference
    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        const newColorScheme = e.matches ? 'dark' : 'light';
        setColorScheme(newColorScheme);
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);