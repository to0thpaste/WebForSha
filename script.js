// Define sections and their corresponding navigation links
const sections = {
  home: document.getElementById('home'),
  gallery: document.getElementById('gallery'),
  about: document.getElementById('about'),
  // ... other sections ...
};

const navLinks = {
  home: document.getElementById('nav-home'),
  gallery: document.getElementById('nav-gallery'),
  about: document.getElementById('nav-about'),
  // ... other navigation links ...
};

// Function to toggle section visibility
function toggleSectionVisibility(sectionId) {
  Object.values(sections).forEach((section) => {
    section.classList.remove('active');
  });
  sections[sectionId].classList.add('active');
}

// Add event listeners to navigation links
Object.keys(navLinks).forEach((key) => {
  navLinks[key].addEventListener('click', () => {
    toggleSectionVisibility(key);
  });
});

// Function to check if the user has visited the site today
function hasVisitedToday() {
  const hasVisited = localStorage.getItem('has_visited_today');
  if (hasVisited) {
    return true;
  }
  return false;
}

// Function to set the has_visited_today flag
function setHasVisitedToday() {
  localStorage.setItem('has_visited_today', Date.now());
}

// Function to skip the loading screen if the user has visited the site today
function skipLoadingScreen() {
  if (hasVisitedToday()) {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
    // Start background music if allowed
    // ... existing code to start background music ...
  } else {
    // Run the full terminal logging animation, preload assets, and show the "Enter Memory Lane" button
    // ... existing code for terminal logging animation ...
    document.getElementById('enter-memory-lane-button').addEventListener('click', () => {
      setHasVisitedToday();
      document.getElementById('loading-screen').style.display = 'none';
      document.getElementById('main-container').style.display = 'block';
      // Start background music if allowed
      // ... existing code to start background music ...
    });
  }
}

// Call the skipLoadingScreen function when the page loads
document.addEventListener('DOMContentLoaded', skipLoadingScreen);