/**
 * ==========================================
 * PHASE 2: Dynamic Colors & Theme Engine
 * ==========================================
 * 
 * Time-reactive palette system with user preference persistence.
 */
const THEME_KEY = 'shalaniThemePreference';

function getSavedThemePreference() {
    try {
        return localStorage.getItem(THEME_KEY);
    } catch (error) {
        console.warn('Theme preference unavailable:', error);
        return null;
    }
}

function setSavedThemePreference(value) {
    try {
        localStorage.setItem(THEME_KEY, value);
    } catch (error) {
        console.warn('Unable to save theme preference:', error);
    }
}

function getTimeBasedTheme() {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18 ? 'day' : 'night';
}

function updateThemeToggleButton(theme) {
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    button.textContent = theme === 'day' ? '🌙' : '☀️';
}

function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'day') {
        root.style.setProperty('--primary-color', '#ff758f');
        root.style.setProperty('--primary-light', '#ffb3c1');
        root.style.setProperty('--bg-liquid', 'linear-gradient(135deg, #ffe6e6 0%, #ffffff 100%)');
        root.style.setProperty('--text-main', '#2d3748');
        root.style.setProperty('--text-light', '#718096');
        root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.7)');
        root.style.setProperty('--accent-glow', '#ffc0cb');
        document.body.classList.remove('theme-night');
        document.body.classList.add('theme-day');
    } else {
        root.style.setProperty('--primary-color', '#ff0055');
        root.style.setProperty('--primary-light', '#ff3377');
        root.style.setProperty('--bg-liquid', 'linear-gradient(135deg, #1a001a 0%, #0a000a 100%)');
        root.style.setProperty('--text-main', '#f7fafc');
        root.style.setProperty('--text-light', '#cbd5e0');
        root.style.setProperty('--card-bg', 'rgba(26, 0, 26, 0.6)');
        root.style.setProperty('--accent-glow', '#ff0066');
        document.body.classList.remove('theme-day');
        document.body.classList.add('theme-night');
    }
    updateThemeToggleButton(theme);
}

function initializeThemeEngine() {
    const savedTheme = getSavedThemePreference();
    const activeTheme = savedTheme || getTimeBasedTheme();
    applyTheme(activeTheme);
}

function handleThemeToggle() {
    const savedTheme = getSavedThemePreference();
    const nextTheme = savedTheme === 'day' ? 'night' : savedTheme === 'night' ? 'day' : getTimeBasedTheme() === 'day' ? 'night' : 'day';
    applyTheme(nextTheme);
    setSavedThemePreference(nextTheme);
}

window.addEventListener('DOMContentLoaded', () => {
    initializeThemeEngine();
    const button = document.getElementById('theme-toggle');
    if (button) {
        button.addEventListener('click', handleThemeToggle);
    }
});

setInterval(() => {
    if (!getSavedThemePreference()) {
        applyTheme(getTimeBasedTheme());
    }
}, 3600000);
