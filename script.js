// Professional Brandformance JavaScript with Stepper

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Global variables
let isLoading = true;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupLoadingScreen();
    setupNavigation();
    setupScrollAnimations();
    setupPortfolioShowcase();
    setupFormHandling();
    setupCounterAnimations();
    setupSmoothScrolling();
    setupChartAnimation();
    setupStepper(); // Add stepper functionality
}

// Loading Screen
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.loading-progress');

    let progress = 0;

    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;

        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);

            // Complete loading
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                isLoading = false;
                startMainAnimations();
            }, 500);
        }

        progressBar.style.width = progress + '%';
    }, 150);
}

// Navigation Setup
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

// Main animations after loading
function startMainAnimations() {
    // Hero title animation
    gsap.fromTo('.hero-title .title-line',
        {
            y: 100,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2
        }
    );

    // Hero badge animation
    gsap.fromTo('.hero-badge',
        {
            scale: 0,
            opacity: 0
        },
        {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.3
        }
    );

    // Hero subtitle animation
    gsap.fromTo('.hero-subtitle',
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: 0.8
        }
    );

    // Hero stats animation
    gsap.fromTo('.stat-item',
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            delay: 1
        }
    );

    // Hero buttons animation
    gsap.fromTo('.hero-buttons .btn',
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            delay: 1.2
        }
    );

    // Chart animation
    gsap.fromTo('.chart-bar',
        {
            scaleY: 0
        },
        {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            stagger: 0.1,
            delay: 1.5
        }
    );
}

// Scroll Animations
function setupScrollAnimations() {
    // Service cards animation
    gsap.fromTo('.service-card',
        {
            y: 80,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Portfolio section animation
    gsap.fromTo('.portfolio .section-header',
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.portfolio',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Stepper section animation
    gsap.fromTo('.stepper-section .section-header',
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.stepper-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Stepper container animation
    gsap.fromTo('.step-circle-container',
        {
            y: 100,
            opacity: 0,
            scale: 0.9
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.stepper-container',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Contact section animation
    gsap.fromTo('.contact-content > *',
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Enhanced Chart Animation
function setupChartAnimation() {
    const chartBars = document.querySelectorAll('.chart-bar');

    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate bars with stagger
                chartBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.classList.add('animate');

                        // Add pulsing effect
                        setTimeout(() => {
                            bar.style.animation = 'chartPulse 3s ease-in-out infinite';
                        }, 500);
                    }, index * 200);
                });

                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const chartContainer = document.querySelector('.growth-chart');
    if (chartContainer) {
        chartObserver.observe(chartContainer);
    }
}

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
@keyframes chartPulse {
    0%, 100% { box-shadow: 0 0 15px rgba(0, 102, 255, 0.4); }
    50% { box-shadow: 0 0 25px rgba(0, 102, 255, 0.8); }
}
`;
document.head.appendChild(pulseStyle);

// Portfolio Showcase
function setupPortfolioShowcase() {
    const dots = document.querySelectorAll('.nav-dot');
    const slides = document.querySelectorAll('.case-study');
    let currentSlide = 0;
    let autoSlideInterval;

    function switchSlide(slideIndex) {
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current
        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');

        currentSlide = slideIndex;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        switchSlide(next);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Manual slide switching
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            switchSlide(index);
            stopAutoSlide();
            setTimeout(startAutoSlide, 2000); // Restart auto-slide after manual interaction
        });
    });

    // Start auto-slide
    startAutoSlide();

    // Pause auto-slide when section is not visible
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoSlide();
            } else {
                stopAutoSlide();
            }
        });
    });

    const portfolioSection = document.querySelector('.portfolio');
    if (portfolioSection) {
        portfolioObserver.observe(portfolioSection);
    }
}

// ============================
// STEPPER FUNCTIONALITY
// ============================

function setupStepper() {
    let currentStep = 1;
    const totalSteps = 4;

    const nextBtn = document.getElementById('stepperNext');
    const backBtn = document.getElementById('stepperBack');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const stepConnectors = document.querySelectorAll('.step-connector-inner');
    const stepContents = document.querySelectorAll('.step-content');

    function updateStepIndicators() {
        stepIndicators.forEach((indicator, index) => {
            const stepNum = index + 1;
            const inner = indicator.querySelector('.step-indicator-inner');
            const activeSpot = inner.querySelector('.active-dot');
            const stepNumber = inner.querySelector('.step-number');
            const checkIcon = inner.querySelector('.check-icon');

            // Reset classes
            indicator.classList.remove('active', 'complete');

            if (stepNum < currentStep) {
                // Completed step
                indicator.classList.add('complete');
                activeSpot.style.display = 'none';
                stepNumber.style.display = 'none';
                checkIcon.style.display = 'block';
                inner.style.backgroundColor = 'var(--stepper-blue)';
                inner.style.color = '#3b82f6';
            } else if (stepNum === currentStep) {
                // Active step
                indicator.classList.add('active');
                activeSpot.style.display = 'block';
                stepNumber.style.display = 'none';
                checkIcon.style.display = 'none';
                inner.style.backgroundColor = 'var(--stepper-blue)';
                inner.style.color = 'var(--stepper-blue)';
            } else {
                // Inactive step
                activeSpot.style.display = 'none';
                stepNumber.style.display = 'block';
                checkIcon.style.display = 'none';
                inner.style.backgroundColor = 'var(--border-gray)';
                inner.style.color = 'var(--text-light-gray)';
            }
        });
    }

    function updateConnectors() {
        stepConnectors.forEach((connector, index) => {
            if (index < currentStep - 1) {
                // Completed connector
                connector.style.width = '100%';
                connector.style.backgroundColor = 'var(--stepper-blue)';
            } else {
                // Incomplete connector
                connector.style.width = '0%';
                connector.style.backgroundColor = 'transparent';
            }
        });
    }

    function updateStepContent() {
        stepContents.forEach((content, index) => {
            const stepNum = index + 1;
            if (stepNum === currentStep) {
                content.classList.add('active');
                content.style.display = 'block';
            } else {
                content.classList.remove('active');
                content.style.display = 'none';
            }
        });
    }

    function updateButtons() {
        // Back button
        if (currentStep > 1) {
            backBtn.style.display = 'block';
            document.querySelector('.footer-nav').classList.remove('end');
            document.querySelector('.footer-nav').classList.add('spread');
        } else {
            backBtn.style.display = 'none';
            document.querySelector('.footer-nav').classList.remove('spread');
            document.querySelector('.footer-nav').classList.add('end');
        }

        // Next button text
        if (currentStep === totalSteps) {
            nextBtn.textContent = 'Complete';
        } else {
            nextBtn.textContent = 'Next Step';
        }
    }

    function updateStepper() {
        updateStepIndicators();
        updateConnectors();
        updateStepContent();
        updateButtons();

        // Add animation to step content
        const activeContent = document.querySelector('.step-content.active');
        if (activeContent) {
            gsap.fromTo(activeContent,
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }
            );
        }
    }

    // Navigation handlers
    nextBtn.addEventListener('click', () => {
        if (currentStep === totalSteps) {
            // Complete - scroll to contact
            document.getElementById('contact').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Show success message
            showStepperNotification('🎉 Ready to start your journey! Fill out the form below.');
        } else if (currentStep < totalSteps) {
            currentStep++;
            updateStepper();
        }
    });

    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepper();
        }
    });

    // Allow clicking on step indicators to navigate
    stepIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            const targetStep = index + 1;
            if (targetStep !== currentStep) {
                currentStep = targetStep;
                updateStepper();
            }
        });
    });

    // CTA button in step 4
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('demo-cta-btn')) {
            document.getElementById('contact').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    // Initialize stepper
    updateStepper();

    // Auto-advance demo (optional - remove if not wanted)
    let autoAdvanceTimer;
    
    function startAutoAdvance() {
        autoAdvanceTimer = setTimeout(() => {
            if (currentStep < totalSteps) {
                currentStep++;
                updateStepper();
                startAutoAdvance();
            }
        }, 8000); // 8 seconds per step
    }

    function stopAutoAdvance() {
        clearTimeout(autoAdvanceTimer);
    }

    // Start auto-advance when stepper comes into view
    const stepperObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // startAutoAdvance(); // Uncomment to enable auto-advance
            } else {
                stopAutoAdvance();
            }
        });
    }, { threshold: 0.3 });

    const stepperSection = document.querySelector('.stepper-section');
    if (stepperSection) {
        stepperObserver.observe(stepperSection);
    }

    // Stop auto-advance on user interaction
    nextBtn.addEventListener('click', stopAutoAdvance);
    backBtn.addEventListener('click', stopAutoAdvance);
    stepIndicators.forEach(indicator => {
        indicator.addEventListener('click', stopAutoAdvance);
    });
}

function showStepperNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, var(--accent-blue), var(--stepper-blue));
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0, 102, 255, 0.3);
        transform: translateX(100%);
        opacity: 0;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    gsap.to(notification, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
            setTimeout(() => {
                gsap.to(notification, {
                    x: '100%',
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                        document.body.removeChild(notification);
                    }
                });
            }, 4000);
        }
    });
}

// Counter Animations
function setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Form Handling
function setupFormHandling() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Validate form
            if (validateForm(data)) {
                // Simulate form submission
                submitForm(data);
            }
        });
    }

    function validateForm(data) {
        const required = ['name', 'email', 'message'];
        for (let field of required) {
            if (!data[field] || data[field].trim() === '') {
                showError(`Please fill in the ${field} field.`);
                return false;
            }
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError('Please enter a valid email address.');
            return false;
        }

        return true;
    }

    function submitForm(data) {
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('.btn-text').textContent;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';

        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').textContent = originalText;

            // Reset form
            form.reset();

            // Show success message
            showSuccess('Thank you! Your message has been sent successfully.');

            console.log('Form submitted:', data);
        }, 2000);
    }

    function showSuccess(message) {
        if (successMessage) {
            successMessage.querySelector('.success-text').textContent = message;
            successMessage.classList.add('show');

            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }
    }

    function showError(message) {
        // You can implement a custom error message display here
        alert(message);
    }
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for navbar height

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Button Interactions
document.addEventListener('DOMContentLoaded', function () {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', function () {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        button.addEventListener('mousedown', function () {
            gsap.to(this, {
                scale: 0.98,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseup', function () {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.1,
                ease: "power2.out"
            });
        });
    });

    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(this.querySelector('.service-icon'), {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', function () {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(this.querySelector('.service-icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Stepper button interactions
    const stepperButtons = document.querySelectorAll('.next-button, .back-button');
    
    stepperButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', function () {
            gsap.to(this, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });

    // Step indicator hover effects
    const stepIndicators = document.querySelectorAll('.step-indicator');
    
    stepIndicators.forEach(indicator => {
        indicator.addEventListener('mouseenter', function () {
            if (!this.classList.contains('active')) {
                gsap.to(this.querySelector('.step-indicator-inner'), {
                    scale: 1.1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });

        indicator.addEventListener('mouseleave', function () {
            gsap.to(this.querySelector('.step-indicator-inner'), {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });
});

// Performance optimizations
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;

    function updateScrollEffects() {
        // Add any scroll-based effects here
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations for users who prefer reduced motion
        gsap.set('*', { animation: 'none' });
    }
}

// Initialize performance optimizations
optimizePerformance();

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Handle viewport changes
window.addEventListener('resize', debounce(() => {
    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh();
}, 250));

// Handle visibility change (tab switching)
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        // Pause animations when tab is not visible
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when tab becomes visible
        gsap.globalTimeline.resume();
    }
});

// Error handling
window.addEventListener('error', function (e) {
    console.error('JavaScript error:', e.error);
    // You can implement error reporting here
});

// Stepper keyboard navigation
document.addEventListener('keydown', function(e) {
    const stepperSection = document.querySelector('.stepper-section');
    const stepperRect = stepperSection.getBoundingClientRect();
    const isStepperVisible = stepperRect.top < window.innerHeight && stepperRect.bottom > 0;
    
    if (isStepperVisible) {
        const nextBtn = document.getElementById('stepperNext');
        const backBtn = document.getElementById('stepperBack');
        
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            e.preventDefault();
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (backBtn.style.display !== 'none') {
                backBtn.click();
            }
        }
    }
});

// Advanced stepper analytics (optional)
function trackStepperProgress() {
    const stepperEvents = {
        stepViewed: (step) => {
            console.log(`Step ${step} viewed`);
            // You can send analytics data here
        },
        stepCompleted: (step) => {
            console.log(`Step ${step} completed`);
            // You can send analytics data here
        },
        stepperCompleted: () => {
            console.log('Stepper completed');
            // You can send analytics data here
        }
    };

    // Add event listeners to track stepper usage
    document.getElementById('stepperNext').addEventListener('click', () => {
        const currentStep = getCurrentStep();
        stepperEvents.stepCompleted(currentStep);
        
        if (currentStep === 4) {
            stepperEvents.stepperCompleted();
        } else {
            stepperEvents.stepViewed(currentStep + 1);
        }
    });

    function getCurrentStep() {
        const activeStep = document.querySelector('.step-indicator.active');
        return activeStep ? parseInt(activeStep.getAttribute('data-step')) : 1;
    }
}

// Initialize stepper analytics
trackStepperProgress();

// Console message
console.log(`
%c
╔══════════════════════════════════════════╗
║                                          ║
║       🚀 SKYLINE DIGITAL WEBSITE 🚀      ║
║                                          ║
║     Professional Digital Marketing       ║
║     with Interactive Stepper             ║
║                                          ║
║     Built with:                          ║
║     • Vanilla JavaScript                 ║
║     • GSAP Animations                    ║
║     • Modern CSS                         ║
║     • Responsive Design                  ║
║     • Interactive Stepper                ║
║                                          ║
║     Status: ONLINE ✅                    ║
║                                          ║
╚══════════════════════════════════════════╝
`, 'color: #0066ff; font-family: monospace; font-size: 12px;');

// Expose some functions for debugging
window.BrandformanceDebug = {
    refreshAnimations: () => ScrollTrigger.refresh(),
    getScrollTriggers: () => ScrollTrigger.getAll(),
    pauseAnimations: () => gsap.globalTimeline.pause(),
    resumeAnimations: () => gsap.globalTimeline.resume(),
    getCurrentStep: () => {
        const activeStep = document.querySelector('.step-indicator.active');
        return activeStep ? parseInt(activeStep.getAttribute('data-step')) : 1;
    },
    goToStep: (step) => {
        const stepIndicator = document.querySelector(`[data-step="${step}"]`);
        if (stepIndicator) {
            stepIndicator.click();
        }
    },
    stepperState: () => {
        const currentStep = document.querySelector('.step-indicator.active');
        const completedSteps = document.querySelectorAll('.step-indicator.complete');
        return {
            currentStep: currentStep ? parseInt(currentStep.getAttribute('data-step')) : 1,
            completedSteps: Array.from(completedSteps).map(step => parseInt(step.getAttribute('data-step'))),
            totalSteps: document.querySelectorAll('.step-indicator').length
        };
    }
};

// Additional stepper enhancements
function enhanceStepperExperience() {
    // Add progress bar to stepper
    const progressBar = document.createElement('div');
    progressBar.className = 'stepper-progress-bar';
    progressBar.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--stepper-blue);
        transition: width 0.4s ease;
        border-radius: 0 0 2px 2px;
        width: 25%;
    `;
    
    const stepperContainer = document.querySelector('.step-circle-container');
    if (stepperContainer) {
        stepperContainer.style.position = 'relative';
        stepperContainer.appendChild(progressBar);
        
        // Update progress bar on step change
        const originalUpdateStepper = window.updateStepper;
        if (typeof originalUpdateStepper === 'function') {
            window.updateStepper = function() {
                originalUpdateStepper();
                const currentStep = getCurrentStep();
                const progress = (currentStep / 4) * 100;
                progressBar.style.width = progress + '%';
            };
        }
    }

    // Add step completion sound (optional)
    function playStepSound() {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // Add sound to next button (uncomment if you want sound)
    // document.getElementById('stepperNext').addEventListener('click', playStepSound);

    function getCurrentStep() {
        const activeStep = document.querySelector('.step-indicator.active');
        return activeStep ? parseInt(activeStep.getAttribute('data-step')) : 1;
    }
}

// Initialize stepper enhancements
enhanceStepperExperience();

// Stepper accessibility improvements
function improveStepperAccessibility() {
    // Add ARIA labels and roles
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const stepContents = document.querySelectorAll('.step-content');
    
    stepIndicators.forEach((indicator, index) => {
        indicator.setAttribute('role', 'tab');
        indicator.setAttribute('aria-label', `Step ${index + 1}`);
        indicator.setAttribute('tabindex', '0');
    });
    
    stepContents.forEach((content, index) => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-labelledby', `step-${index + 1}`);
    });
    
    // Add keyboard navigation instructions
    const keyboardHint = document.createElement('div');
    keyboardHint.className = 'stepper-keyboard-hint';
    keyboardHint.style.cssText = `
        text-align: center;
        font-size: 0.8rem;
        color: var(--text-light-gray);
        margin-top: 1rem;
        opacity: 0.7;
    `;
    keyboardHint.textContent = 'Use arrow keys or space to navigate steps';
    
    const stepperContainer = document.querySelector('.stepper-container');
    if (stepperContainer) {
        stepperContainer.appendChild(keyboardHint);
    }
}

// Initialize accessibility improvements
improveStepperAccessibility();
