// Portfolio Website Interactive Features
// Graduate Software Engineer Portfolio

// Scroll to top on page refresh/load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Loading Screen Management - SIMPLIFIED
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.minLoadTime = 1500; // Reduced minimum load time
        this.startTime = Date.now();
        this.init();
    }
    
    init() {
        // Scroll to top immediately
        window.scrollTo(0, 0);
        
        // Hide loading screen after minimum time
        setTimeout(() => {
            this.hideLoadingScreen();
        }, this.minLoadTime);
        
        // Also hide on window load (whichever comes first)
        window.addEventListener('load', () => {
            const elapsedTime = Date.now() - this.startTime;
            const remainingTime = Math.max(0, this.minLoadTime - elapsedTime);
            
            setTimeout(() => {
                this.hideLoadingScreen();
            }, remainingTime);
        });
        
        // Force hide after maximum time
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 4000);
    }
    
    hideLoadingScreen() {
        if (this.loadingScreen && !this.loadingScreen.classList.contains('hidden')) {
            this.loadingScreen.classList.add('hidden');
            document.body.style.overflow = '';
            
            // Remove loading screen from DOM after transition
            setTimeout(() => {
                if (this.loadingScreen && this.loadingScreen.parentNode) {
                    this.loadingScreen.remove();
                }
            }, 500);
        }
    }
}

// Initialize loading screen immediately
const loadingScreen = new LoadingScreen();

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
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
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const projectsCount = document.getElementById('projects-count');
        const datasetsCount = document.getElementById('datasets-count');
        const modelsCount = document.getElementById('models-count');
        const accuracyRate = document.getElementById('accuracy-rate');
        
        if (projectsCount) animateCounter(projectsCount, 8);
        if (datasetsCount) animateCounter(datasetsCount, 10);
        if (modelsCount) animateCounter(modelsCount, 4);
        if (accuracyRate) animateCounter(accuracyRate, 100);
    }, 500);
});

// Typing animation for hero title
const titles = [
    "Graduate Software Engineer",
    "Full-Stack Developer",
    "Software Engineer",
    "Angular Specialist",
    "Data Scientist"
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeTitle() {
    const typingElement = document.getElementById('typing-text');
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
    typingTimeout = setTimeout(typeTitle, speed);
}

// Start typing animation after a delay
setTimeout(() => {
    typeTitle();
}, 1000);

// Enhanced floating particles system
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.maxParticles = 100; // Reduced for performance
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
        }, 1000);
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and sizing
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        const size = Math.random() * 4 + 1; // Smaller particles
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation properties
        particle.style.animationDuration = (Math.random() * 4 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        document.body.appendChild(particle);
        
        // Store particle reference
        this.particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
            }
        }, 8000);
    }
}

// Initialize particle system after page loads
document.addEventListener('DOMContentLoaded', () => {
    const particleSystem = new ParticleSystem();
});

// Navigation functionality
class Navigation {
    constructor() {
        this.navHeader = document.querySelector('.nav-header');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
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
        
        // Close menu when clicking on nav-logo
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
            navLogo.addEventListener('click', () => {
                this.closeMenu();
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navHeader.contains(e.target)) {
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
        if (!this.navHeader) return;
        
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const currentScrollY = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;

        if (currentScrollY >= heroHeight) {
            this.navHeader.classList.add('nav-visible');
        } else {
            this.navHeader.classList.remove('nav-visible');
        }
    }
    
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.navToggle.classList.add('active');
            this.navMenu.classList.add('active');
            this.navToggle.setAttribute('aria-expanded', 'true');
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
        document.body.style.overflow = '';
    }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
    const navigation = new Navigation();
});

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.skill-category, .project-card, .about-section, .skills-section, .qualification-section, .projects-section, .contact-section');
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
document.addEventListener('DOMContentLoaded', () => {
    const scrollAnimations = new ScrollAnimations();
});

// Combined DOMContentLoaded event listener for all interactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing interactions...');
    
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
    
    // Initialize project toggle with "All" option
    const projectToggle = new ProjectToggle();
    
    // Initialize skills scroll
    const skillsScroll = new SkillsScroll();
    
    // Initialize projects scroll
    const projectsScrollInstance = new ProjectsScroll();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('.nav-header')?.offsetHeight || 70;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Show body content
    document.body.style.opacity = '1';
    
    // Animate elements on load with staggered effect
    setTimeout(() => {
        const elements = document.querySelectorAll('.stat-card, .skill-category, .project-card');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
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

// Project Toggle Functionality (Updated for "All" option)
class ProjectToggle {
    constructor() {
        this.toggleButtons = document.querySelectorAll('.project-toggle-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.currentCategory = 'all';
        
        if (this.toggleButtons.length > 0 && this.projectCards.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Add click listeners to toggle buttons
        this.toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.currentTarget.getAttribute('data-category');
                this.switchCategory(category);
            });
        });
        
        // Show all projects by default
        this.showProjects('all');
    }
    
    switchCategory(category) {
        if (category === this.currentCategory) return;
        
        // Update active button
        this.toggleButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeButton = document.querySelector(`[data-category="${category}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Add transitioning class to grid to maintain layout
        const projectsGrid = document.getElementById('projectsGrid');
        if (projectsGrid) {
            projectsGrid.classList.add('transitioning');
        }
        
        // Hide current projects with animation
        this.hideProjects(() => {
            // Show new projects immediately after hide completes
            this.showProjects(category);
            
            // Remove transitioning class after animation completes
            setTimeout(() => {
                if (projectsGrid) {
                    projectsGrid.classList.remove('transitioning');
                }
            }, 600);
        });
        
        this.currentCategory = category;
    }
    
    hideProjects(callback) {
        const visibleCards = Array.from(this.projectCards).filter(card => 
            card.style.display !== 'none' && 
            !card.classList.contains('fade-out')
        );
        
        if (visibleCards.length === 0) {
            if (callback) callback();
            return;
        }
        
        // Add fade-out class to all cards simultaneously for smoother transition
        visibleCards.forEach((card) => {
            card.classList.add('fade-out');
            card.classList.remove('fade-in');
        });
        
        // Wait for animation to complete, then hide and call callback
        setTimeout(() => {
            visibleCards.forEach(card => {
                card.style.display = 'none';
            });
            if (callback) callback();
        }, 450); // Match CSS transition duration (400ms) + small buffer
    }
    
    showProjects(category) {
        let categoryCards;
        
        if (category === 'all') {
            categoryCards = Array.from(this.projectCards);
        } else {
            categoryCards = Array.from(this.projectCards).filter(card =>
                card.getAttribute('data-category') === category
            );
        }
        
        if (categoryCards.length === 0) return;
        
        // Set display first, then animate in with staggered effect
        categoryCards.forEach((card, index) => {
            card.style.display = 'block';
            card.classList.remove('fade-out');
            card.classList.remove('fade-in');
            
            // Force reflow
            card.offsetHeight;
            
            // Staggered fade-in animation for visual appeal
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 80); // Reduced stagger for smoother feel
        });
    }
}

// Touch device optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Skills Section Horizontal Scroll with Buttons
class SkillsScroll {
    constructor() {
        this.skillsGrid = document.getElementById('skillsGrid');
        this.scrollLeftBtn = document.querySelector('.skills-scroll-left');
        this.scrollRightBtn = document.querySelector('.skills-scroll-right');
        
        if (this.skillsGrid && this.scrollLeftBtn && this.scrollRightBtn) {
            this.init();
        }
    }
    
    init() {
        // Add click listeners to scroll buttons
        this.scrollLeftBtn.addEventListener('click', () => this.scroll('left'));
        this.scrollRightBtn.addEventListener('click', () => this.scroll('right'));
        
        // Update button states on scroll
        this.skillsGrid.addEventListener('scroll', () => this.updateButtonStates());
        
        // Initial button state update
        this.updateButtonStates();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.updateButtonStates();
        });
    }
    
    scroll(direction) {
        if (!this.skillsGrid) return;
        
        const cardWidth = this.skillsGrid.querySelector('.skill-category')?.offsetWidth || 300;
        const gap = 30;
        const scrollAmount = cardWidth + gap;
        
        const currentScroll = this.skillsGrid.scrollLeft;
        const scrollDirection = direction === 'left' ? -scrollAmount : scrollAmount;
        const targetScroll = currentScroll + scrollDirection;
        
        this.skillsGrid.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }
    
    updateButtonStates() {
        if (!this.skillsGrid || !this.scrollLeftBtn || !this.scrollRightBtn) return;
        
        const { scrollLeft, scrollWidth, clientWidth } = this.skillsGrid;
        const isAtStart = scrollLeft <= 10;
        const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10;
        
        // Update button opacity based on scroll position
        this.scrollLeftBtn.style.opacity = isAtStart ? '0.3' : '1';
        this.scrollRightBtn.style.opacity = isAtEnd ? '0.3' : '1';
    }
}

// Projects Section Horizontal Scroll with Buttons
class ProjectsScroll {
    constructor() {
        this.projectsGrid = document.getElementById('projectsGrid');
        this.scrollLeftBtn = document.querySelector('.projects-scroll-left');
        this.scrollRightBtn = document.querySelector('.projects-scroll-right');
        this.minProjectsForScroll = 3;
        
        if (this.projectsGrid && this.scrollLeftBtn && this.scrollRightBtn) {
            this.init();
        }
    }
    
    init() {
        // Check and update layout on load
        this.checkAndUpdateLayout();
        
        // Add click listeners to scroll buttons
        this.scrollLeftBtn.addEventListener('click', () => this.scroll('left'));
        this.scrollRightBtn.addEventListener('click', () => this.scroll('right'));
        
        // Update button states on scroll
        this.projectsGrid.addEventListener('scroll', () => this.updateButtonStates());
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.checkAndUpdateLayout();
            this.updateButtonStates();
        });
    }
    
    getVisibleProjects() {
        return Array.from(this.projectsGrid.querySelectorAll('.project-card')).filter(card => {
            return card.style.display !== 'none' && 
                   !card.classList.contains('hidden') &&
                   window.getComputedStyle(card).display !== 'none';
        });
    }
    
    checkAndUpdateLayout() {
        const visibleProjects = this.getVisibleProjects();
        const shouldScroll = visibleProjects.length > this.minProjectsForScroll;
        
        if (shouldScroll) {
            this.projectsGrid.classList.add('scrollable');
            // Show buttons on desktop
            if (window.innerWidth > 768) {
                this.scrollLeftBtn.classList.add('visible');
                this.scrollRightBtn.classList.add('visible');
            }
        } else {
            this.projectsGrid.classList.remove('scrollable');
            this.scrollLeftBtn.classList.remove('visible');
            this.scrollRightBtn.classList.remove('visible');
        }
    }
    
    scroll(direction) {
        if (!this.projectsGrid || !this.projectsGrid.classList.contains('scrollable')) return;
        
        const cardWidth = this.projectsGrid.querySelector('.project-card')?.offsetWidth || 400;
        const gap = 25;
        const scrollAmount = cardWidth + gap;
        
        const currentScroll = this.projectsGrid.scrollLeft;
        const scrollDirection = direction === 'left' ? -scrollAmount : scrollAmount;
        const targetScroll = currentScroll + scrollDirection;
        
        this.projectsGrid.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }
    
    updateButtonStates() {
        if (!this.projectsGrid || !this.projectsGrid.classList.contains('scrollable')) {
            return;
        }
        
        const { scrollLeft, scrollWidth, clientWidth } = this.projectsGrid;
        const isAtStart = scrollLeft <= 10;
        const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10;
        
        // Update button opacity based on scroll position
        this.scrollLeftBtn.style.opacity = isAtStart ? '0.3' : '1';
        this.scrollRightBtn.style.opacity = isAtEnd ? '0.3' : '1';
    }
}

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
});