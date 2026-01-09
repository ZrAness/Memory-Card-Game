
        function toggleTheme() {
    document.body.classList.toggle('theme-alt');
}
// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('theme-alt');
    }
});

// Toggle theme and save preference
function toggleTheme() {
    document.body.classList.toggle('theme-alt');
    
    // Save theme preference
    if (document.body.classList.contains('theme-alt')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
}