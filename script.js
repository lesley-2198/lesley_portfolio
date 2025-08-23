// Portfolio Website Interactive Features
// Data Scientist & ML Specialist Portfolio

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.id === 'accuracy-rate') {
            element.textContent = Math.floor(current) + '%';
        } else if (element.id === 'datasets-count') {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters when page loads
window.addEventListener('load', () => {
    animateCounter(document.getElementById('projects-count'), 5);
    animateCounter(document.getElementById('datasets-count'), 10);
    animateCounter(document.getElementById('models-count'), 15);
    animateCounter(document.getElementById('accuracy-rate'), 94);
});

// Typing animation for hero title
const titles = [
    "Data Scientist ",
    "ML Specialist ", 
    "Problem Solver ",
    "Data Storyteller "
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeTitle() {
    if (!typingElement) return;
    
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    // Handle typing completion
    if (!isDeleting && charIndex === currentTitle.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
    }
    
    // Set typing speed
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeTitle, speed);
}

// Start typing animation after a delay
setTimeout(typeTitle, 1000);

// Enhanced floating particles system
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.maxParticles = 150; // Increased for more particles throughout the site
        this.init();
    }
    
    init() {
        // Create initial particles
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
        
        // Continuously create new particles
        setInterval(() => {
            if (this.particles.length < this.maxParticles) {
                this.createParticle();
            }
        }, 800); // Faster creation for more particles
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and sizing
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        const size = Math.random() * 8 + 2; // Varied sizes
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation properties
        particle.style.animationDuration = (Math.random() * 5 + 3) + 's';
        particle.style.animationDelay = Math.random() * 3 + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        document.body.appendChild(particle);
        
        // Store particle reference
        this.particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
            }
        }, 10000); // Longer lifespan for particles
    }
}

// Initialize particle system
const particleSystem = new ParticleSystem();

// Navigation functionality
class Navigation {
    constructor() {
        this.navHeader = document.querySelector('.nav-header');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.heroSection = document.querySelector('.hero');
        this.lastScrollY = 0;
        this.isScrolling = false;
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        // Show navigation on scroll
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', this.toggleMenu.bind(this));
        }
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navHeader.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }
    
  handleScroll() {
    this.heroSection = document.querySelector('.hero');
    this.navHeader = document.querySelector('.nav-header');

    if (this.isScrolling) return;

    this.isScrolling = true;
    requestAnimationFrame(() => {
        const currentScrollY = window.pageYOffset;

        // Get hero section height (or offset)
        const heroHeight = this.heroSection.offsetHeight;

        if (currentScrollY >= heroHeight) {
            // Past hero section → show nav
            this.navHeader.classList.add('nav-visible');
        } else {
            // Back in hero section → hide nav
            this.navHeader.classList.remove('nav-visible');
        }

        this.isScrolling = false;
    });
}

    
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.navToggle.classList.add('active');
            this.navMenu.classList.add('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            this.closeMenu();
        }
    }
    
    closeMenu() {
        this.isMenuOpen = false;
        this.navToggle.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navMenu.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Initialize navigation
const navigation = new Navigation();

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.skill-category, .project-card, .about-section, .skills-section, .projects-section, .contact-section');
        this.init();
    }
    
    init() {
        // Create intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements for animation
        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize scroll animations
const scrollAnimations = new ScrollAnimations();

// Intersection Observer for skill bars animation
const skillBars = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'skillLoad 2s ease-in-out';
        }
    });
});

skillBars.forEach(bar => skillObserver.observe(bar));

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to contact links
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to tech items
    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(100, 255, 218, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(100, 255, 218, 0.1)';
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.nav-header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll-based parallax effects
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.neural-bg');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    // Profile image parallax effect
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        const speed = scrolled * 0.1;
        profileImg.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    
    // Animate elements on load
    setTimeout(() => {
        document.querySelectorAll('.stat-card, .skill-category, .project-card').forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
});

// Initialize skill bars with staggered animation
document.addEventListener('DOMContentLoaded', function() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    skillFills.forEach((fill, index) => {
        setTimeout(() => {
            fill.style.width = fill.style.width || '0%';
            fill.style.animation = 'skillLoad 2s ease-in-out';
        }, index * 200);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.neural-bg');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
}, 16));

// Touch device optimizations
if ('ontouchstart' in window) {
    // Add touch-specific styles
    document.body.classList.add('touch-device');
    
    // Optimize hover effects for touch devices
    document.querySelectorAll('.stat-card, .project-card, .contact-link').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}