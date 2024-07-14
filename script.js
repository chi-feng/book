function setColorScheme() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    
    if (prefersDarkScheme.matches) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// Set the initial color scheme
setColorScheme();

// Listen for changes in color scheme preference
window.matchMedia("(prefers-color-scheme: dark)").addListener(setColorScheme);
