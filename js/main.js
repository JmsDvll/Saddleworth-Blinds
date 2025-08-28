// Saddleworth Blinds - Clean JavaScript
// Fixed and simplified functionality
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDropdownNavigation();
    initFAQ();
    initFormEnhancements();
    initScrollEffects();
    initScrollAnimations();
});

// Fixed Mobile Menu System
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (!mobileMenuToggle || !mainNav) return;
    
    // Create overlay
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
        
        // Animate hamburger
        const hamburger = mobileMenuToggle.querySelector('.hamburger');
        if (hamburger) {
            hamburger.classList.add('active');
        }
    }
    
    function closeMobileMenu() {
        mainNav.classList.remove('mobile-menu-open');
        overlay.classList.remove('active');
        body.style.overflow = '';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        
        // Reset hamburger
        const hamburger = mobileMenuToggle.querySelector('.hamburger');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
}

// Fixed Dropdown Navigation
function initDropdownNavigation() {
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        // Handle click events
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleDropdown(this);
        });
        
        // Handle keyboard navigation
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown(this);
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            closeAllDropdowns();
        }
    });
    
    function toggleDropdown(toggle) {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        const dropdownMenu = toggle.nextElementSibling;
        
        // For mobile, handle dropdown differently
        if (window.innerWidth <= 1023) {
            if (dropdownMenu) {
                if (isExpanded) {
                    dropdownMenu.classList.remove('dropdown-open');
                    toggle.setAttribute('aria-expanded', 'false');
                } else {
                    dropdownMenu.classList.add('dropdown-open');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            }
        } else {
            // Desktop behavior
            closeAllDropdowns();
            if (!isExpanded) {
                toggle.setAttribute('aria-expanded', 'true');
            }
        }
    }
    
    function closeAllDropdowns() {
        dropdownToggles.forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
            const dropdownMenu = toggle.nextElementSibling;
            if (dropdownMenu && window.innerWidth <= 1023) {
                dropdownMenu.classList.remove('dropdown-open');
            }
        });
    }
}

// FAQ Functionality
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

// Form Enhancements
function initFormEnhancements() {
    // Add form start time for spam protection
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const startTimeField = form.querySelector('input[name="form_start_time"]');
        if (startTimeField) {
            startTimeField.value = Math.floor(Date.now() / 1000);
        }
    });
    
    // Basic form validation
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        
        // Remove previous error styling
        field.classList.remove('error');
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            field.classList.add('error');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                return false;
            }
        }
        
        return true;
    }
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Add error styling
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .hamburger.active {
        background: transparent;
    }
    
    .hamburger.active::before {
        transform: rotate(45deg) translate(5.7px, 5.7px);
    }
    
    .hamburger.active::after {
        transform: rotate(-45deg) translate(5.7px, -5.7px);
    }
`;
document.head.appendChild(errorStyles);

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class based on data attribute
                const animationClass = entry.target.getAttribute('data-animation');
                if (animationClass) {
                    entry.target.classList.add(animationClass);
                }
                // Trigger the animation by setting opacity to 1
                entry.target.style.opacity = '1';
                
                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}
