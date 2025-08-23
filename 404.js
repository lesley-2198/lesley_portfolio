// Particle system for 404 page
        class ParticleSystem {
            constructor() {
                this.particles = [];
                this.maxParticles = 100;
                this.init();
            }
            
            init() {
                for (let i = 0; i < this.maxParticles; i++) {
                    this.createParticle();
                }
                
                setInterval(() => {
                    if (this.particles.length < this.maxParticles) {
                        this.createParticle();
                    }
                }, 1000);
            }
            
            createParticle() {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.top = Math.random() * 100 + 'vh';
                const size = Math.random() * 6 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
                particle.style.animationDelay = Math.random() * 2 + 's';
                particle.style.opacity = Math.random() * 0.4 + 0.1;
                
                document.getElementById('particles-container').appendChild(particle);
                this.particles.push(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                        this.particles = this.particles.filter(p => p !== particle);
                    }
                }, 8000);
            }
        }

        // Initialize particle system
        const particleSystem = new ParticleSystem();

        // Search functionality
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.toLowerCase().trim();
                
                // Simple search suggestions
                if (query.includes('project') || query.includes('work')) {
                    window.location.href = '/#projects';
                } else if (query.includes('about') || query.includes('bio')) {
                    window.location.href = '/#about';
                } else if (query.includes('skill') || query.includes('tech')) {
                    window.location.href = '/#skills';
                } else if (query.includes('contact') || query.includes('email')) {
                    window.location.href = '/#contact';
                } else if (query.includes('home') || query === '') {
                    window.location.href = '/';
                } else {
                    // If no match, go to home page
                    window.location.href = '/';
                }
            }
        });

        // Add some interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            // Animate elements on load
            setTimeout(() => {
                document.querySelector('.error-container').style.opacity = '1';
                document.querySelector('.error-container').style.transform = 'translateY(0)';
            }, 100);

            // Add hover effects to action buttons
            document.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                });
                
                btn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        });

        // Easter egg: Konami code for fun
        let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let konamiIndex = 0;

        document.addEventListener('keydown', function(e) {
            if (e.keyCode === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    // Easter egg activated
                    document.body.style.filter = 'hue-rotate(180deg)';
                    setTimeout(() => {
                        document.body.style.filter = 'none';
                    }, 2000);
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });