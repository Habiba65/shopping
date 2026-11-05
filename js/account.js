// ========================================
// SoleStep — Account Page (Login/Signup)
// Phase 9: Extra Features
// ========================================

const CART_STORAGE_KEY = 'soleStepCart';
const WISHLIST_STORAGE_KEY = 'soleStepWishlist';
const USER_STORAGE_KEY = 'soleStepUser';

/**
 * Get cart count.
 */
function getCartCount() {
    try {
        const raw = sessionStorage.getItem(CART_STORAGE_KEY);
        const cart = raw ? JSON.parse(raw) : [];
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    } catch (e) {
        return 0;
    }
}

/**
 * Get wishlist count.
 */
function getWishlistCount() {
    try {
        const raw = sessionStorage.getItem(WISHLIST_STORAGE_KEY);
        const wishlist = raw ? JSON.parse(raw) : [];
        return wishlist.length;
    } catch (e) {
        return 0;
    }
}

/**
 * Update badges.
 */
function updateBadges() {
    const cartBadge = document.querySelector('.cart-count');
    const wishBadge = document.querySelector('.wishlist-count');

    const cartCount = getCartCount();
    const wishCount = getWishlistCount();

    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
    }
    if (wishBadge) {
        wishBadge.textContent = wishCount;
        wishBadge.style.display = wishCount > 0 ? 'flex' : 'none';
    }
}

/**
 * Tab switching for login/signup.
 */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update buttons
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            // Update panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `panel-${targetTab}`) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/**
 * Validate a single field and show error.
 */
function validateField(field) {
    const errorId = `error-${field.id}`;
    const errorEl = document.getElementById(errorId);
    let isValid = true;
    let message = '';

    const value = field.value.trim();

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required.';
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address.';
        }
    }

    if (field.id === 'signup-password' && value && value.length < 6) {
        isValid = false;
        message = 'Password must be at least 6 characters.';
    }

    if (field.id === 'signup-confirm-password') {
        const password = document.getElementById('signup-password').value;
        if (value !== password) {
            isValid = false;
            message = 'Passwords do not match.';
        }
    }

    if (field.id === 'signup-terms' && !field.checked) {
        isValid = false;
        message = 'You must agree to the terms.';
    }

    if (errorEl) {
        errorEl.textContent = message;
    }
    field.classList.toggle('invalid', !isValid && message);
    field.classList.toggle('valid', isValid && value);

    return isValid;
}

/**
 * Initialize form validation.
 */
function initValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });
}

/**
 * Initialize mobile menu.
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * Footer year.
 */
function setFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/**
 * Initialize page.
 */
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initValidation('login-form');
    initValidation('signup-form');
    initMobileMenu();
    setFooterYear();
    updateBadges();

    // Login form submit
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;
            loginForm.querySelectorAll('input[required]').forEach(f => {
                if (!validateField(f)) valid = false;
            });
            if (valid) {
                const email = document.getElementById('login-email').value.trim();
                const user = { email, name: email.split('@')[0], loggedIn: true };
                sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
                showToast('Signed in successfully!');
                loginForm.reset();
                clearErrors(loginForm);
            }
        });
    }

    // Signup form submit
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;
            signupForm.querySelectorAll('input[required]').forEach(f => {
                if (!validateField(f)) valid = false;
            });
            if (valid) {
                const firstName = document.getElementById('signup-first-name').value.trim();
                const email = document.getElementById('signup-email').value.trim();
                const user = { email, name: firstName, loggedIn: true };
                sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
                showToast('Account created successfully!');
                signupForm.reset();
                clearErrors(signupForm);
            }
        });
    }

    // Check if already logged in
    try {
        const raw = sessionStorage.getItem(USER_STORAGE_KEY);
        const user = raw ? JSON.parse(raw) : null;
        if (user && user.loggedIn) {
            const accountHeader = document.querySelector('.account-header p');
            if (accountHeader) {
                accountHeader.textContent = `Welcome back, ${user.name}!`;
            }
        }
    } catch (e) {
        console.error(e);
    }
});

/**
 * Show a toast notification.
 */
function showToast(message) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary-color);
        color: var(--white);
        padding: 12px 24px;
        border-radius: 50px;
        font-size: 0.95rem;
        font-weight: 600;
        z-index: 2000;
        box-shadow: var(--shadow-hover);
        animation: toastSlide 0.3s ease forwards;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Clear error messages and states.
 */
function clearErrors(form) {
    form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    form.querySelectorAll('.invalid, .valid').forEach(el => {
        el.classList.remove('invalid', 'valid');
    });
}
