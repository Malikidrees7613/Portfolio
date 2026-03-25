// Main JavaScript for Portfolio Website
class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypewriter();
        this.setupParticleBackground();
        this.setupSkillsRadar();
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }

    // Typewriter Effect for Hero Section
    setupTypewriter() {
        if (!document.querySelector('#typed-text')) return;
        const typed = new Typed('#typed-text', {
            strings: [
                'AI/ML Developer',
                'Data Scientist',
                'Mobile App Developer',
                'Cloud & DevOps Engineer',
                'Problem Solver'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Particle Background using p5.js
    setupParticleBackground() {
        let particles = [];
        let canvas;

        window.setup = () => {
            const parent = document.getElementById('particle-bg');
            if (!parent) {
                let tempCanvas = createCanvas(0, 0);
                tempCanvas.style('display', 'none');
                return;
            }
            canvas = createCanvas(windowWidth, windowHeight);
            canvas.parent('particle-bg');
            canvas.style('position', 'absolute');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '-1');

            // Create particles
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: random(width),
                    y: random(height),
                    vx: random(-0.5, 0.5),
                    vy: random(-0.5, 0.5),
                    size: random(2, 4),
                    opacity: random(0.3, 0.8)
                });
            }
        };

        window.draw = () => {
            if (!document.getElementById('particle-bg')) return;
            clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = width;
                if (particle.x > width) particle.x = 0;
                if (particle.y < 0) particle.y = height;
                if (particle.y > height) particle.y = 0;

                // Draw particle
                fill(0, 212, 255, particle.opacity * 255);
                noStroke();
                ellipse(particle.x, particle.y, particle.size);

                // Draw connections
                particles.forEach(other => {
                    let distance = dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 100) {
                        stroke(99, 102, 241, (1 - distance / 100) * 50);
                        strokeWeight(0.5);
                        line(particle.x, particle.y, other.x, other.y);
                    }
                });
            });
        };

        window.windowResized = () => {
            resizeCanvas(windowWidth, windowHeight);
        };
    }

    // Skills Radar Chart
    setupSkillsRadar() {
        const chartDom = document.getElementById('skills-radar');
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);
        
        const option = {
            backgroundColor: 'transparent',
            radar: {
                indicator: [
                    { name: 'Python', max: 100 },
                    { name: 'Machine Learning', max: 100 },
                    { name: 'Java/Android', max: 100 },
                    { name: 'Data Science', max: 100 },
                    { name: 'Cloud/DevOps', max: 100 },
                    { name: 'SQL/Databases', max: 100 },
                    { name: 'Web Development', max: 100 }
                ],
                shape: 'polygon',
                splitNumber: 5,
                axisName: {
                    color: '#ffffff',
                    fontSize: 12,
                    fontFamily: 'Inter'
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            },
            series: [{
                name: 'Skills',
                type: 'radar',
                data: [{
                    value: [90, 85, 80, 88, 75, 85, 70],
                    name: 'Technical Skills',
                    areaStyle: {
                        color: 'rgba(0, 212, 255, 0.2)'
                    },
                    lineStyle: {
                        color: '#00d4ff',
                        width: 2
                    },
                    itemStyle: {
                        color: '#00d4ff',
                        borderColor: '#ffffff',
                        borderWidth: 2
                    }
                }],
                animationDuration: 2000,
                animationEasing: 'cubicOut'
            }]
        };

        myChart.setOption(option);

        // Responsive chart
        window.addEventListener('resize', () => {
            myChart.resize();
        });
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe all reveal elements
        document.querySelectorAll('.reveal-element').forEach(el => {
            observer.observe(el);
        });
    }

    // Animated skill bars
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        bar.style.transform = `scaleX(${width / 100})`;
                    }, Math.random() * 500);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const nav = document.querySelector('nav');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                // Create mobile menu if it doesn't exist
                let mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu) {
                    mobileMenu = document.createElement('div');
                    mobileMenu.id = 'mobile-menu';
                    mobileMenu.className = 'md:hidden bg-navy/95 backdrop-blur-md border-t border-white/10';
                    mobileMenu.innerHTML = `
                        <div class="px-6 py-4 space-y-4">
                            <a href="#home" class="block text-white hover:text-cyan transition-colors">Home</a>
                            <a href="about.html" class="block text-white hover:text-cyan transition-colors">About</a>
                            <a href="projects.html" class="block text-white hover:text-cyan transition-colors">Projects</a>
                            <a href="index.html#contact" class="block text-white hover:text-cyan transition-colors">Contact</a>
                        </div>
                    `;
                    nav.appendChild(mobileMenu);
                }
                
                // Toggle menu
                mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
            });
        }
    }

    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Enhanced hover effects for interactive elements
class HoverEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupTechCards();
        this.setupButtons();
        this.setupCodeSnippets();
    }

    setupTechCards() {
        const cards = document.querySelectorAll('.tech-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.05,
                    rotateX: 5,
                    translateY: -10,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    rotateX: 0,
                    translateY: 0,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });
    }

    setupButtons() {
        const buttons = document.querySelectorAll('a[class*="bg-gradient"], a[class*="border-2"]');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                anime({
                    targets: button,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });

            button.addEventListener('mouseleave', () => {
                anime({
                    targets: button,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
        });
    }

    setupCodeSnippets() {
        const snippets = document.querySelectorAll('.code-snippet');
        
        snippets.forEach(snippet => {
            snippet.addEventListener('mouseenter', () => {
                anime({
                    targets: snippet,
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            snippet.addEventListener('mouseleave', () => {
                anime({
                    targets: snippet,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });
    }
}

// Loading animations
class LoadingAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupPageLoad();
        this.setupStaggeredAnimations();
    }

    setupPageLoad() {
        // Hide loading overlay when page is loaded
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            if (loader) {
                anime({
                    targets: loader,
                    opacity: 0,
                    duration: 500,
                    complete: () => {
                        loader.style.display = 'none';
                    }
                });
            }

            // Animate hero elements
            anime.timeline()
                .add({
                    targets: '.gradient-text',
                    opacity: [0, 1],
                    translateY: [50, 0],
                    duration: 1000,
                    easing: 'easeOutCubic'
                })
                .add({
                    targets: '.floating-icon',
                    opacity: [0, 0.6],
                    translateY: [30, 0],
                    duration: 800,
                    delay: anime.stagger(100),
                    easing: 'easeOutCubic'
                }, '-=500');
        });
    }

    setupStaggeredAnimations() {
        // Animate tech cards on scroll
        const techCards = document.querySelectorAll('.tech-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 600,
                        delay: Math.random() * 200,
                        easing: 'easeOutCubic'
                    });
                }
            });
        }, { threshold: 0.1 });

        techCards.forEach(card => {
            observer.observe(card);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
    new HoverEffects();
    new LoadingAnimations();
    
    // Add some interactive Easter eggs
    setupEasterEggs();
});

// Fun Easter eggs
function setupEasterEggs() {
    let clickCount = 0;
    const heroTitle = document.querySelector('.gradient-text');
    
    if (heroTitle) {
        heroTitle.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
                // Matrix rain effect
                createMatrixRain();
                clickCount = 0;
            }
        });
    }
}

function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.style.opacity = '0.8';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(26, 26, 46, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const interval = setInterval(draw, 50);
    
    setTimeout(() => {
        clearInterval(interval);
        document.body.removeChild(canvas);
    }, 3000);
}

// Performance optimization
function optimizePerformance() {
    // Reduce particle count on mobile devices
    if (window.innerWidth < 768) {
        // Adjust particle system for mobile
        const style = document.createElement('style');
        style.textContent = `
            .floating-icon { animation-duration: 8s; }
            .particle-container { display: none; }
        `;
        document.head.appendChild(style);
    }
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
optimizePerformance();