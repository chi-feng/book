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

function getNumberFromFilename() {
    return parseInt(window.location.pathname.match(/(\d+)\.html$/)[1], 10);
}

function createNextButton() {
    const button = document.createElement('p');
    const number = getNumberFromFilename()
    button.innerHTML = '<a href="' + (number + 1) + '.html">Next</a>';
    button.innerHTML += '&nbsp;|&nbsp;<a href="index.html">Index</a>';
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

function saveLastViewedPage() {
    const currentPath = window.location.pathname;
    // Only save if the current page is not index.html
    if (!currentPath.endsWith('index.html')) {
        const currentTime = new Date().toISOString();
        localStorage.setItem('lastViewedPage', currentPath);
        localStorage.setItem('lastViewedTime', currentTime);
    }
}

// Function to highlight and scroll to the last viewed page on index
function highlightLastViewedPage() {
    if (window.location.pathname.endsWith('index.html')) {
        const lastViewedPage = localStorage.getItem('lastViewedPage');
        if (lastViewedPage) {
            const lastViewedLink = document.querySelector(`a[href="${lastViewedPage.split('/').pop()}"]`);
            if (lastViewedLink) {
                lastViewedLink.classList.add('last-viewed');
                lastViewedLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
}


// Function to display last viewed time
function displayLastViewedTime() {
    const lastViewedTime = localStorage.getItem('lastViewedTime');
    if (lastViewedTime) {
        const timeElement = document.createElement('p');
        timeElement.id = 'last-viewed-time';
        timeElement.textContent = `Last viewed: ${new Date(lastViewedTime).toLocaleString()}`;
        document.body.appendChild(timeElement);
    }
}


// Function to toggle visibility of pages before last viewed
function togglePageVisibility() {
    const lastViewedPage = localStorage.getItem('lastViewedPage');
    const toggleButton = document.getElementById('visibility-toggle');
    const links = document.querySelectorAll('.grid-item a');
    
    if (!lastViewedPage) {
        toggleButton.textContent = 'Hide Previous Chapters';
        links.forEach(link => link.style.display = 'block');
        return;
    }

    const lastViewedIndex = Array.from(links).findIndex(link => link.getAttribute('href') === lastViewedPage.split('/').pop());
    
    if (toggleButton.textContent === 'Show All Chapters') {
        links.forEach((link, index) => {
            link.style.display = 'block';
        });
        toggleButton.textContent = 'Hide Previous Chapters';
    } else {
        links.forEach((link, index) => {
            if (index < lastViewedIndex) {
                link.style.display = 'none';
            } else {
                link.style.display = 'block';
            }
        });
        toggleButton.textContent = 'Show All Chapters';
    }
}

// Function to create visibility toggle button
function createVisibilityToggleButton() {
    const button = document.createElement('button');
    button.id = 'visibility-toggle';
    button.textContent = 'Hide Previous Chapters';
    button.addEventListener('click', togglePageVisibility);
    document.body.insertBefore(button, document.querySelector('.grid-container'));
}

// Function to set initial page visibility
function setInitialPageVisibility() {
    const lastViewedPage = localStorage.getItem('lastViewedPage');
    const links = document.querySelectorAll('.grid-item a');
    
    if (!lastViewedPage) {
        return; // Show all pages by default if none have been read
    }

    const lastViewedIndex = Array.from(links).findIndex(link => link.getAttribute('href') === lastViewedPage.split('/').pop());
    
    links.forEach((link, index) => {
        if (index < lastViewedIndex) {
            link.style.display = 'none';
        }
    });

    const toggleButton = document.getElementById('visibility-toggle');
    toggleButton.textContent = 'Show All Chapters';
}


// Modify the existing init function
function init() {
    createToggleButton();
    createNextButton();
    initColorScheme();
    saveLastViewedPage();
    highlightLastViewedPage();
    displayLastViewedTime();
    
    if (window.location.pathname.endsWith('index.html')) {
        createVisibilityToggleButton();
        setInitialPageVisibility();
    }
    
    // Listen for changes in color scheme preference
    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        const newColorScheme = e.matches ? 'dark' : 'light';
        setColorScheme(newColorScheme);
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);