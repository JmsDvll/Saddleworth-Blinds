// Advanced website functionality for Saddleworth Blinds
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initDropdownNavigation();
    initSmoothScrolling();
    initHeaderEffects();
    initAnimations();
    initLazyLoading();
    initFormValidation();
    initAnalytics();
    initPerformanceOptimizations();
    initAccessibility();
    initLocalStorageFeatures();
    initGoogleReviews();
    initScrollToTop();
    initParallaxHero();
    initFAQ();
});

// Mobile Menu System
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (!mobileMenuToggle || !mainNav) return;
    
    // Create mobile menu overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    body.appendChild(overlay);
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        const isOpen = mainNav.classList.contains('mobile-menu-open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking a link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('mobile-menu-open')) {
            closeMobileMenu();
        }
    });
    
    function openMobileMenu() {
        mainNav.classList.add('mobile-menu-open');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        
        // Focus management
        const firstLink = mainNav.querySelector('a');
        if (firstLink) firstLink.focus();
    }
    
    function closeMobileMenu() {
        mainNav.classList.remove('mobile-menu-open');
        overlay.classList.remove('active');
        body.style.overflow = '';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        
        // Return focus to toggle button
        mobileMenuToggle.focus();
    }
    
    // Handle dropdown menus on mobile
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth < 1024) {
                e.preventDefault();
                const dropdown = this.nextElementSibling;
                const isOpen = dropdown?.classList.contains('dropdown-open');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('dropdown-open');
                });
                
                // Toggle current dropdown
                if (dropdown && !isOpen) {
                    dropdown.classList.add('dropdown-open');
                    this.setAttribute('aria-expanded', 'true');
                } else if (dropdown) {
                    this.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}

// Dropdown Navigation System
function initDropdownNavigation() {
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        // Handle keyboard navigation
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown(this);
            } else if (e.key === 'Escape') {
                closeAllDropdowns();
                this.focus();
            }
        });
        
        // Handle click events
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleDropdown(this);
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            closeAllDropdowns();
        }
    });
    
    // Close dropdown on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });
    
    function toggleDropdown(toggle) {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        // Close all dropdowns first
        closeAllDropdowns();
        
        // Open the clicked dropdown if it wasn't already open
        if (!isExpanded) {
            toggle.setAttribute('aria-expanded', 'true');
            const menu = toggle.nextElementSibling;
            if (menu) {
                // Focus first menu item
                const firstMenuItem = menu.querySelector('a');
                if (firstMenuItem) {
                    setTimeout(() => firstMenuItem.focus(), 100);
                }
            }
        }
    }
    
    function closeAllDropdowns() {
        dropdownToggles.forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
        });
    }
    
    // Handle arrow key navigation within dropdowns
    const dropdownMenus = document.querySelectorAll('.nav-dropdown-menu');
    dropdownMenus.forEach(menu => {
        const menuItems = menu.querySelectorAll('a');
        
        menuItems.forEach((item, index) => {
            item.addEventListener('keydown', function(e) {
                let nextIndex;
                
                switch(e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        nextIndex = (index + 1) % menuItems.length;
                        menuItems[nextIndex].focus();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        nextIndex = (index - 1 + menuItems.length) % menuItems.length;
                        menuItems[nextIndex].focus();
                        break;
                    case 'Escape':
                        e.preventDefault();
                        closeAllDropdowns();
                        const toggle = menu.previousElementSibling;
                        if (toggle) toggle.focus();
                        break;
                    case 'Tab':
                        // Allow natural tab navigation
                        if (e.shiftKey && index === 0) {
                            closeAllDropdowns();
                        } else if (!e.shiftKey && index === menuItems.length - 1) {
                            closeAllDropdowns();
                        }
                        break;
                }
            });
        });
    });
}
    
// Smooth Scrolling System
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page jump
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}
    
// Header Effects
function initHeaderEffects() {
    let lastScroll = 0;
    let ticking = false;
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        // Hysteresis thresholds to prevent jitter
        const addThreshold = 120;
        const removeThreshold = 80;

        if (currentScroll > addThreshold) {
            header.classList.add('header-scrolled');
        } else if (currentScroll < removeThreshold) {
            header.classList.remove('header-scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Animation System with Intersection Observer
function initAnimations() {
    // Check if animations are preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    const animationOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation classes based on data attributes
                if (element.dataset.animation) {
                    element.classList.add(element.dataset.animation);
                } else {
                    element.classList.add('animate-fade-in-up');
                }
                
                // Add staggered delays for grid items
                if (element.parentElement?.classList.contains('trust-grid') ||
                    element.parentElement?.classList.contains('services-grid') ||
                    element.parentElement?.classList.contains('testimonials-grid') ||
                    element.parentElement?.classList.contains('trust-stats') ||
                    element.parentElement?.classList.contains('motorised-benefits')) {
                    const siblings = Array.from(element.parentElement.children);
                    const index = siblings.indexOf(element);
                    element.style.animationDelay = `${index * 0.1}s`;
                }
                
                animationObserver.unobserve(element);
            }
        });
    }, animationOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll([
        '.trust-item',
        '.service-card',
        '.benefit',
        '.testimonial',
        '.stat-item',
        '.motorised-benefits li',
        '.section-title',
        '.section-subtitle',
        '.contact-method',
        '.contact-form',
        '.booking-benefits .benefit-item',
        '.info-card',
        '.animate-on-scroll'
    ].join(','));
    
    animateElements.forEach(el => {
        animationObserver.observe(el);
    });
}

// Advanced Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };
    
        const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, imageOptions);
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}
    
// Advanced Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const fields = form.querySelectorAll('input, textarea, select');
        
        // Real-time validation
        fields.forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(field);
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            fields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Focus on first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                showNotification('Please correct the errors below.', 'error');
            } else {
                // Track successful form submission
                trackEvent('form_submit', {
                    form_name: form.getAttribute('name') || 'contact_form',
                    page_url: window.location.href
                });
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        let isValid = true;
        let errorMessage = '';
        
        // Remove previous errors
        field.classList.remove('error');
        removeErrorMessage(field);
        
        // Required validation
        if (required && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
        }
        
        // Postcode validation (UK)
        if (field.name === 'postcode' && value) {
            const postcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i;
            if (!postcodeRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid UK postcode.';
            }
        }
        
        if (!isValid) {
            field.classList.add('error');
            showErrorMessage(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showErrorMessage(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    function removeErrorMessage(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Analytics and Tracking
function initAnalytics() {
    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('phone_click', {
                phone_number: this.href.replace('tel:', ''),
                element_text: this.textContent,
                page_url: window.location.href
            });
        });
    });
    
    // Email click tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('email_click', {
                email: this.href.replace('mailto:', ''),
                page_url: window.location.href
            });
        });
    });
    
    // Button click tracking
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', {
                button_text: this.textContent.trim(),
                button_href: this.href || '',
                page_url: window.location.href
            });
        });
    });
    
    // Scroll depth tracking
    let maxScroll = 0;
    const scrollMilestones = [25, 50, 75, 100];
    let trackedMilestones = [];
    
    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            scrollMilestones.forEach(milestone => {
                if (scrollPercent >= milestone && !trackedMilestones.includes(milestone)) {
                    trackedMilestones.push(milestone);
                    trackEvent('scroll_depth', {
                        percentage: milestone,
                        page_url: window.location.href
                    });
                }
            });
        }
    }, 1000));
    
    // Time on page tracking
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', {
            seconds: timeOnPage,
            page_url: window.location.href
        });
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Preload critical resources
    preloadCriticalResources();
    
    // Initialize service worker for caching
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed, but continue
        });
    }
    
    // Optimize images
    optimizeImages();
    
    // Reduce layout shifts
    preventLayoutShifts();
}

function preloadCriticalResources() {
    // Preload critical CSS
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.as = 'style';
    criticalCSS.href = '/css/styles.css';
    document.head.appendChild(criticalCSS);
    
    // Preload fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.type = 'font/woff2';
    fontPreload.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
    fontPreload.crossOrigin = 'anonymous';
    document.head.appendChild(fontPreload);
}

function optimizeImages() {
    // Add WebP support detection
    const webpSupported = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    if (webpSupported) {
        document.documentElement.classList.add('webp-supported');
    }
    
    // Responsive images for high DPI displays
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (window.devicePixelRatio > 1 && img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
        }
    });
}

function preventLayoutShifts() {
    // Set aspect ratios for images to prevent layout shifts
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Skip layout-shift wrapper for critical UI icons like the site logo
        if (img.closest('.logo')) {
            return; // maintain original inline sizing so logo is never hidden
        }

        if (img.width && img.height) {
            const aspectRatio = (img.height / img.width) * 100;
            const wrapper = document.createElement('div');
            wrapper.style.paddingBottom = `${aspectRatio}%`;
            wrapper.style.position = 'relative';
            wrapper.style.height = '0';
            
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
        }
    });
}

// Accessibility Enhancements
function initAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Keyboard navigation for dropdowns
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Focus management for modals and overlays
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            handleTabNavigation(e);
        }
    });
    
    function handleTabNavigation(e) {
        const modal = document.querySelector('.mobile-menu-open');
        if (modal) {
            const focusableElements = modal.querySelectorAll('a, button, input, textarea, select');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    
    // Announce page changes for screen readers
    announcePageChanges();
}

function announcePageChanges() {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    // Announce when new content loads
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const addedContent = Array.from(mutation.addedNodes)
                    .filter(node => node.nodeType === 1)
                    .map(node => node.textContent)
                    .join(' ')
                    .trim();
                
                if (addedContent) {
                    announcer.textContent = 'Content updated';
                    setTimeout(() => announcer.textContent = '', 1000);
                }
            }
    });
});

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Local Storage Features
function initLocalStorageFeatures() {
    // Remember user preferences
    const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    
    // Save form data for recovery
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const formId = form.id || 'default-form';
        
        // Load saved data
        const savedData = localStorage.getItem(`form-${formId}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field && field.type !== 'password') {
                    field.value = data[key];
                }
            });
        }
        
        // Save data on input
        form.addEventListener('input', throttle(() => {
            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                if (key !== 'password') {
                    data[key] = value;
                }
            }
            localStorage.setItem(`form-${formId}`, JSON.stringify(data));
        }, 1000));
        
        // Clear saved data on successful submission
        form.addEventListener('submit', () => {
            localStorage.removeItem(`form-${formId}`);
        });
    });
}

// Google Reviews integration (requires Google Places API key)
function initGoogleReviews() {
    // Try to fetch real Google reviews (fallback to static if it fails)
    // This is a placeholder for Google My Business API integration
    
    // For now, keep the fallback reviews
    const reviewsGrid = document.getElementById('reviews-grid');
    if (!reviewsGrid) return;
    
    // Static fallback reviews are already in HTML
    console.log('Google Reviews API integration ready');
}

// Utility Functions
function trackEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
    }
    
    // Console log for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Event tracked:', eventName, parameters);
    }
}

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
    };
}

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

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-info {
        background-color: #3b82f6;
    }
    
    .notification-success {
        background-color: #10b981;
    }
    
    .notification-error {
        background-color: #ef4444;
    }
    
    .notification-warning {
        background-color: #f59e0b;
    }
    
    .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(notificationStyles);

// Enhanced Mobile Menu CSS
const enhancedMobileMenuStyles = document.createElement('style');
enhancedMobileMenuStyles.textContent = `
    .mobile-menu-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 998;
        backdrop-filter: blur(4px);
    }
    
    .mobile-menu-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    
    @media (max-width: 1023px) {
        .main-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 85%;
            max-width: 400px;
            height: 100vh;
            background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
            box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
            transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 999;
            overflow-y: auto;
            padding: 2rem 1.5rem;
            display: block !important;
        }
        
        .main-nav.mobile-menu-open {
            right: 0;
        }
        
        .nav-list {
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
            margin-top: 2rem;
        }
        
        .nav-list li {
            width: 100%;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .nav-list li:last-child {
            border-bottom: none;
        }
        
        .nav-list a {
            display: block;
            padding: 1.25rem 0;
            font-size: 1.125rem;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .nav-list a:hover {
            color: var(--primary-color);
            padding-left: 1rem;
        }
        
        .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            display: none;
            padding: 0;
            margin-left: 1rem;
            border: none;
            background: transparent;
        }
        
        .dropdown-menu.dropdown-open {
            display: block;
            animation: slideDown 0.3s ease;
        }
        
        .dropdown-menu a {
            padding: 0.75rem 0;
            font-size: 1rem;
            color: var(--text-light);
            border-bottom: 1px solid #f3f4f6;
        }
        
        .has-dropdown > a::after {
            content: '+';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.5rem;
            line-height: 1;
            transition: transform 0.3s ease;
        }
        
        .has-dropdown > a[aria-expanded="true"]::after {
            content: '−';
            transform: translateY(-50%) rotate(180deg);
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                max-height: 0;
            }
            to {
                opacity: 1;
                max-height: 200px;
            }
        }
    }
    
    /* Header scroll effects */
    .header {
        transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    .header-scrolled {
        background-color: rgba(255, 255, 255, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* Image loading effects */
    img {
        transition: opacity 0.3s ease;
    }
    
    img.loaded {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    /* Form field error states */
    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    /* Loading states */
    .loading {
        position: relative;
        pointer-events: none;
        overflow: hidden;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
        );
        animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }
`;
document.head.appendChild(enhancedMobileMenuStyles);

// Scroll-to-Top button
function initScrollToTop(){
    const btn=document.createElement('button');
    btn.className='scroll-top-btn';
    btn.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(btn);
    btn.addEventListener('click',()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    });
    window.addEventListener('scroll',()=>{
        if(window.pageYOffset>350){btn.classList.add('show');}else{btn.classList.remove('show');}
    });
}

// Simple parallax effect for elements with .parallax
function initParallaxHero(){
    const elements=document.querySelectorAll('.parallax');
    if(!elements.length) return;
    window.addEventListener('scroll',()=>{
        const scrollY=window.pageYOffset;
        elements.forEach(el=>{
            el.style.backgroundPositionY= `${scrollY* -0.3}px`;
        });
    });
}

// FAQ Accordion Functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                
                // Track FAQ interaction
                trackEvent('faq_opened', {
                    question: this.querySelector('h3').textContent,
                    page_url: window.location.href
                });
            } else {
                this.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
} 