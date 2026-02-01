/**
 * 1. INFINITE CAROUSEL LOGIC
 * Automatically clones the car cards to create a seamless loop
 */
const setupCarousel = () => {
    const tracks = document.querySelectorAll('.car-track');
    
    tracks.forEach(track => {
        const cards = Array.from(track.children);
        
        // Clone each card and append it to the track
        // This ensures the translateX(-50%) logic in CSS always has content to show
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true'); // Hide clones from screen readers
            track.appendChild(clone);
        });
    });
};

/**
 * 2. PERFORMANCE-OPTIMIZED NAVBAR SHADOW
 * Uses a boolean flag to prevent redundant DOM updates every pixel
 */
const header = document.querySelector('#main-header');
let isScrolled = false;

const handleNavbarScroll = () => {
    const currentScroll = window.scrollY > 50;
    
    if (currentScroll !== isScrolled) {
        isScrolled = currentScroll;
        if (isScrolled) {
            header.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
            header.style.background = "#020617"; // Darken slightly when scrolling
        } else {
            header.style.boxShadow = "none";
            header.style.background = "#0f172a"; // Original color
        }
    }
};

/**
 * 3. SMOOTH SCROLL FOR NAVIGATION
 */
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        
        // Only trigger smooth scroll for internal links
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});

/**
 * 4. INTERSECTION OBSERVER
 * Handles the "Fade-In" effect when elements enter the viewport
 */
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px" // Triggers slightly before element is fully visible
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            // Once it's shown, we can stop observing to save resources
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/**
 * INITIALIZE ALL FUNCTIONS
 */
window.addEventListener('DOMContentLoaded', () => {
    setupCarousel();
    
    // Elements to observe for fade-in
    const animElements = document.querySelectorAll('.hero-content, .category h3, .car-card');
    animElements.forEach(el => observer.observe(el));
});

window.addEventListener('scroll', handleNavbarScroll);