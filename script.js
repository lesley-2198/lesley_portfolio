// Portfolio Website Interactive Features
// Data Scientist & ML Specialist Portfolio

// Scroll to top on page refresh/load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Loading Screen Management
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.profileImage = document.querySelector('.profile-img');
        this.minLoadTime = 2000; // Minimum time to show loading screen
        this.startTime = Date.now();
        this.imageLoaded = false;
        this.init();
    }
    
    init() {
        // Scroll to top immediately
        window.scrollTo(0, 0);
        
        // Preload the profile image
        if (this.profileImage) {
            const imgSrc = this.profileImage.src;
            const img = new Image();
            
            img.onload = () => {
                this.imageLoaded = true;
                this.checkLoadingComplete();
            };
            
            img.onerror = () => {
                this.imageLoaded = true;
                this.checkLoadingComplete();
            };
            
            img.src = imgSrc;
        } else {
            this.imageLoaded = true;
        }
        
        // Also wait for window load
        window.addEventListener('load', () => {
            this.checkLoadingComplete();
        });
        
        // Fallback - hide loading screen after maximum time
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 7000);
    }
    
    checkLoadingComplete() {
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minLoadTime - elapsedTime);
        
        if (this.imageLoaded) {
            setTimeout(() => {
                this.hideLoadingScreen();
            }, remainingTime);
        }
    }
    
    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            document.body.style.overflow = '';
            
            // Remove loading screen from DOM after transition
            setTimeout(() => {
                if (this.loadingScreen.parentNode) {
                    this.loadingScreen.remove();
                }
            }, 500);
        }
    }
}

// Initialize loading screen
const loadingScreen = new LoadingScreen();

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
    animateCounter(document.getElementById('projects-count'), 8);
    animateCounter(document.getElementById('datasets-count'), 10);
    animateCounter(document.getElementById('models-count'), 3);
    animateCounter(document.getElementById('accuracy-rate'), 100);
});

// Typing animation for hero title
const titles = [
    "Frontend Developer",
    "Full-Stack Developer",
    "Software Engineer",
    "Angular Specialist",
    "Data Scientist"
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
        this.maxParticles = 150;
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
        }, 800);
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and sizing
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        const size = Math.random() * 8 + 2;
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
        }, 10000);
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
        
        // Close menu when clicking on nav-logo
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
            navLogo.addEventListener('click', () => {
                this.closeMenu();
            });
        }
        
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

            // Get hero section height
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

// Combined DOMContentLoaded event listener
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
    
    // Initialize project toggle
    const projectToggle = new ProjectToggle();
    
    // Update project counter based on visible projects
    function updateProjectCounter() {
        const visibleProjects = document.querySelectorAll('.project-card:not([style*="display: none"])').length;
        const projectsCountElement = document.getElementById('projects-count');
        if (projectsCountElement) {
            animateCounter(projectsCountElement, visibleProjects);
        }
    }
    
    // Call updateProjectCounter whenever projects are toggled
    document.querySelectorAll('.project-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(updateProjectCounter, 600);
        });
    });
    
    // Initialize skill bars with staggered animation
    const skillFills = document.querySelectorAll('.skill-fill');
    
    skillFills.forEach((fill, index) => {
        setTimeout(() => {
            fill.style.width = fill.style.width || '0%';
            fill.style.animation = 'skillLoad 2s ease-in-out';
        }, index * 200);
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
    
    // Profile image parallax effect
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        const speed = scrolled * 0.1;
        profileImg.style.transform = `translateY(${speed}px)`;
    }
}, 16));

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

// Project Toggle Functionality
class ProjectToggle {
    constructor() {
        this.toggleButtons = document.querySelectorAll('.project-toggle-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.currentCategory = 'web-dev';
        this.init();
    }
    
    init() {
        // Add click listeners to toggle buttons
        this.toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.currentTarget.getAttribute('data-category');
                this.switchCategory(category);
            });
        });
        
        // Show web development projects by default
        this.showProjects('web-dev');
    }
    
    switchCategory(category) {
        if (category === this.currentCategory) return;
        
        // Update active button
        this.toggleButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
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
        const categoryCards = Array.from(this.projectCards).filter(card =>
            card.getAttribute('data-category') === category
        );
        
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
                
                // Check layout after all cards are shown
                if (index === categoryCards.length - 1 && projectsScrollInstance) {
                    setTimeout(() => {
                        projectsScrollInstance.checkAndUpdateLayout();
                    }, 550); // After animation completes
                }
            }, index * 80); // Reduced stagger for smoother feel
        });
    }
}

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

// Skills Section Horizontal Scroll with Buttons
class SkillsScroll {
    constructor() {
        this.skillsGrid = document.getElementById('skillsGrid');
        this.scrollLeftBtn = document.querySelector('.skills-scroll-left');
        this.scrollRightBtn = document.querySelector('.skills-scroll-right');
        this.scrollAmount = 0; // Will be calculated dynamically
        
        if (this.skillsGrid && this.scrollLeftBtn && this.scrollRightBtn) {
            this.calculateScrollAmount();
            this.init();
        }
    }
    
    calculateScrollAmount() {
        // Calculate scroll amount based on first card width + gap
        const firstCard = this.skillsGrid.querySelector('.skill-category');
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const gap = 30; // Match CSS gap
            this.scrollAmount = cardWidth + gap;
        } else {
            this.scrollAmount = 350; // Fallback
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
        
        // Show/hide buttons based on scroll position and screen size
        window.addEventListener('resize', () => {
            this.calculateScrollAmount();
            this.updateButtonStates();
        });
    }
    
    scroll(direction) {
        if (!this.skillsGrid) return;
        
        const currentScroll = this.skillsGrid.scrollLeft;
        const scrollDirection = direction === 'left' ? -this.scrollAmount : this.scrollAmount;
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
        
        // Update left button
        this.scrollLeftBtn.disabled = isAtStart;
        if (isAtStart) {
            this.scrollLeftBtn.style.opacity = '0.3';
        } else {
            this.scrollLeftBtn.style.opacity = '1';
        }
        
        // Update right button
        this.scrollRightBtn.disabled = isAtEnd;
        if (isAtEnd) {
            this.scrollRightBtn.style.opacity = '0.3';
        } else {
            this.scrollRightBtn.style.opacity = '1';
        }
        
        // Show/hide buttons on mobile (show only if content overflows)
        if (window.innerWidth <= 768) {
            const hasOverflow = scrollWidth > clientWidth;
            this.scrollLeftBtn.style.display = hasOverflow ? 'none' : 'none';
            this.scrollRightBtn.style.display = hasOverflow ? 'none' : 'none';
        } else {
            this.scrollLeftBtn.style.display = 'flex';
            this.scrollRightBtn.style.display = 'flex';
        }
    }
}

// Initialize skills scroll when DOM is ready
let projectsScrollInstance = null;

document.addEventListener('DOMContentLoaded', function() {
    const skillsScroll = new SkillsScroll();
    projectsScrollInstance = new ProjectsScroll();
});

// Projects Section Horizontal Scroll with Buttons (only when more than 3 projects)
class ProjectsScroll {
    constructor() {
        this.projectsGrid = document.getElementById('projectsGrid');
        this.scrollLeftBtn = document.querySelector('.projects-scroll-left');
        this.scrollRightBtn = document.querySelector('.projects-scroll-right');
        this.scrollAmount = 0;
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
        
        // Watch for project category changes
        this.observeProjectChanges();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.checkAndUpdateLayout();
            this.calculateScrollAmount();
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
            // Enable horizontal scrolling
            this.projectsGrid.classList.add('scrollable');
            this.calculateScrollAmount();
            this.updateButtonStates();
            
            // Show buttons on desktop
            if (window.innerWidth > 768) {
                this.scrollLeftBtn.classList.add('visible');
                this.scrollRightBtn.classList.add('visible');
            }
        } else {
            // Use grid layout
            this.projectsGrid.classList.remove('scrollable');
            this.scrollLeftBtn.classList.remove('visible');
            this.scrollRightBtn.classList.remove('visible');
        }
    }
    
    calculateScrollAmount() {
        if (!this.projectsGrid.classList.contains('scrollable')) return;
        
        const firstCard = this.projectsGrid.querySelector('.project-card:not([style*="display: none"])');
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const gap = 25; // Match CSS gap
            this.scrollAmount = cardWidth + gap;
        } else {
            this.scrollAmount = 400; // Fallback
        }
    }
    
    scroll(direction) {
        if (!this.projectsGrid || !this.projectsGrid.classList.contains('scrollable')) return;
        
        const currentScroll = this.projectsGrid.scrollLeft;
        const scrollDirection = direction === 'left' ? -this.scrollAmount : this.scrollAmount;
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
        
        // Update left button
        this.scrollLeftBtn.disabled = isAtStart;
        if (isAtStart) {
            this.scrollLeftBtn.style.opacity = '0.3';
        } else {
            this.scrollLeftBtn.style.opacity = '1';
        }
        
        // Update right button
        this.scrollRightBtn.disabled = isAtEnd;
        if (isAtEnd) {
            this.scrollRightBtn.style.opacity = '0.3';
        } else {
            this.scrollRightBtn.style.opacity = '1';
        }
        
        // Hide buttons on mobile
        if (window.innerWidth <= 768) {
            this.scrollLeftBtn.classList.remove('visible');
            this.scrollRightBtn.classList.remove('visible');
        }
    }
    
    observeProjectChanges() {
        // Watch for changes when project toggle happens
        const observer = new MutationObserver(() => {
            setTimeout(() => {
                this.checkAndUpdateLayout();
            }, 100); // Small delay to ensure display changes are applied
        });
        
        if (this.projectsGrid) {
            observer.observe(this.projectsGrid, {
                childList: true,
                attributes: true,
                attributeFilter: ['style', 'class'],
                subtree: true
            });
        }
    }
}


