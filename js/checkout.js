// ========================================
// SoleStep — Checkout Page
// Phase 8: Checkout
// ========================================

const CART_STORAGE_KEY = 'soleStepCart';

let cart = [];
let currentStep = 0;
const steps = ['step-customer', 'step-address', 'step-payment'];

/**
 * Get cart items from sessionStorage.
 */
function getCart() {
    try {
        const raw = sessionStorage.getItem(CART_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

/**
 * Initialize checkout page.
 */
document.addEventListener('DOMContentLoaded', () => {
    cart = getCart();

    if (cart.length === 0) {
        // Redirect to cart if empty
        window.location.href = 'cart.html';
        return;
    }

    renderOrderSummary();
    initFormNavigation();
    initPaymentToggle();
    initValidation();
    updateCartBadge();
    updateWishlistBadge();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
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

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/**
 * Render order summary items and totals.
 */
function renderOrderSummary() {
    const itemsContainer = document.getElementById('summary-items');
    const subtotalEl = document.getElementById('summary-subtotal');
    const totalEl = document.getElementById('summary-total');

    if (!itemsContainer) return;

    itemsContainer.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div class="summary-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="summary-item-info">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 0; // Free shipping
    const total = subtotal + shipping;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

/**
 * Multi-step form navigation.
 */
function initFormNavigation() {
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const btnPlaceOrder = document.getElementById('btn-place-order');
    const form = document.getElementById('checkout-form');

    if (!btnNext || !btnPrev || !btnPlaceOrder || !form) return;

    // Next button
    btnNext.addEventListener('click', () => {
        const currentStepEl = document.getElementById(steps[currentStep]);
        if (!validateStep(currentStep)) return;

        if (currentStep < steps.length - 1) {
            // Hide current step, show next
            currentStepEl.classList.remove('active');
            currentStep++;
            document.getElementById(steps[currentStep]).classList.add('active');

            // Update button visibility
            btnPrev.style.display = currentStep > 0 ? 'inline-flex' : 'none';
            btnNext.style.display = currentStep === steps.length - 1 ? 'none' : 'inline-flex';
            btnPlaceOrder.style.display = currentStep === steps.length - 1 ? 'inline-flex' : 'none';
        }
    });

    // Previous button
    btnPrev.addEventListener('click', () => {
        const currentStepEl = document.getElementById(steps[currentStep]);
        currentStepEl.classList.remove('active');
        currentStep--;
        document.getElementById(steps[currentStep]).classList.add('active');

        btnPrev.style.display = currentStep > 0 ? 'inline-flex' : 'none';
        btnNext.style.display = currentStep === steps.length - 1 ? 'none' : 'inline-flex';
        btnPlaceOrder.style.display = currentStep === steps.length - 1 ? 'inline-flex' : 'none';
    });

    // Initialize button states
    btnPrev.style.display = 'none';
    btnPlaceOrder.style.display = 'none';
}

/**
 * Payment method toggle — show/hide card fields.
 */
function initPaymentToggle() {
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const cardFields = document.getElementById('card-fields');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'credit') {
                cardFields.style.display = 'block';
            } else {
                cardFields.style.display = 'none';
            }
        });
    });
}

/**
 * Form field validation.
 */
function initValidation() {
    const form = document.getElementById('checkout-form');
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
 * Validate a single field.
 */
function validateField(field) {
    const errorId = `error-${field.id}`;
    const errorEl = document.getElementById(errorId);
    let isValid = true;
    let message = '';

    const value = field.value.trim();

    // Required check
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required.';
    }

    // Email check
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address.';
        }
    }

    // Phone check
    if (field.id === 'phone' && value) {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            isValid = false;
            message = 'Please enter a valid phone number.';
        }
    }

    // Card number check
    if (field.id === 'card-number' && value) {
        const cardRegex = /^[\d\s]{13,19}$/;
        if (!cardRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            message = 'Please enter a valid card number.';
        }
    }

    // Expiry check
    if (field.id === 'card-expiry' && value) {
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid expiry date (MM/YY).';
        }
    }

    // CVV check
    if (field.id === 'card-cvv' && value) {
        const cvvRegex = /^\d{3,4}$/;
        if (!cvvRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid CVV.';
        }
    }

    // Apply visual state
    if (errorEl) {
        errorEl.textContent = message;
    }
    field.classList.toggle('invalid', !isValid && message);
    field.classList.toggle('valid', isValid && value && field.hasAttribute('required'));

    return isValid;
}

/**
 * Validate all fields in the current step.
 */
function validateStep(stepIndex) {
    const stepEl = document.getElementById(steps[stepIndex]);
    const fields = stepEl.querySelectorAll('input[required], select[required]');
    let allValid = true;

    fields.forEach(field => {
        // Skip card fields if credit card not selected
        if (field.id.startsWith('card-')) {
            const creditSelected = document.querySelector('input[name="paymentMethod"]:checked')?.value === 'credit';
            if (!creditSelected) return;
        }
        if (!validateField(field)) {
            allValid = false;
        }
    });

    return allValid;
}

/**
 * Update cart badge.
 */
function updateCartBadge() {
    const badge = document.querySelector('.cart-count');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

/**
 * Update wishlist badge.
 */
function updateWishlistBadge() {
    const badge = document.querySelector('.wishlist-count');
    if (badge) {
        try {
            const raw = sessionStorage.getItem('soleStepWishlist');
            const count = raw ? parseInt(raw, 10) : 0;
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        } catch (e) {
            badge.style.display = 'none';
        }
    }
}

/**
 * Place order handler.
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all steps
        let allValid = true;
        steps.forEach((_, index) => {
            if (!validateStep(index)) allValid = false;
        });

        if (!allValid) {
            // Go to first invalid step
            steps.forEach((stepId, index) => {
                const stepEl = document.getElementById(stepId);
                const invalidField = stepEl.querySelector('.invalid');
                if (invalidField) {
                    currentStep = index;
                    document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
                    stepEl.classList.add('active');
                    invalidField.focus();

                    const btnNext = document.getElementById('btn-next');
                    const btnPrev = document.getElementById('btn-prev');
                    const btnPlaceOrder = document.getElementById('btn-place-order');
                    btnPrev.style.display = currentStep > 0 ? 'inline-flex' : 'none';
                    btnNext.style.display = currentStep === steps.length - 1 ? 'none' : 'inline-flex';
                    btnPlaceOrder.style.display = currentStep === steps.length - 1 ? 'inline-flex' : 'none';
                    return;
                }
            });
            return;
        }

        // Simulate order placement
        const orderData = {
            id: 'SO-' + Math.floor(10000 + Math.random() * 90000),
            date: new Date().toISOString(),
            items: [...cart],
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };

        // Store order in sessionStorage (demo)
        sessionStorage.setItem('soleStepLastOrder', JSON.stringify(orderData));

        // Clear cart
        sessionStorage.removeItem(CART_STORAGE_KEY);
        cart = [];
        updateCartBadge();

        // Redirect to confirmation
        window.location.href = 'order-confirmation.html';
    });
});
