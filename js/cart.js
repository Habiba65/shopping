// ========================================
// SoleStep — Shopping Cart
// Phase 7: Shopping Cart
// ========================================

const CART_STORAGE_KEY = 'soleStepCart';

let cart = [];

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
 * Save cart items to sessionStorage.
 */
function saveCart(cartItems) {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
}

/**
 * Initialize cart page.
 */
document.addEventListener('DOMContentLoaded', () => {
    cart = getCart();
    renderCart();
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
 * Render cart items and summary.
 */
function renderCart() {
    const emptyState = document.getElementById('cart-empty');
    const itemsWrapper = document.getElementById('cart-items-wrapper');
    const itemsContainer = document.getElementById('cart-items');
    const itemCountEl = document.getElementById('cart-item-count');

    if (cart.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (itemsWrapper) itemsWrapper.style.display = 'none';
        if (itemCountEl) itemCountEl.textContent = '0 items in your cart';
        updateCartBadge();
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (itemsWrapper) itemsWrapper.style.display = 'block';

    // Render cart items
    itemsContainer.innerHTML = cart.map((item, index) => `
        <article class="cart-item" data-index="${index}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <span class="cart-item-category">${item.category}</span>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="qty-btn qty-decrease" data-index="${index}" aria-label="Decrease quantity">-</button>
                <input type="number" class="qty-input" value="${item.quantity}" min="1" max="99" data-index="${index}" aria-label="Quantity">
                <button class="qty-btn qty-increase" data-index="${index}" aria-label="Increase quantity">+</button>
            </div>
            <div class="cart-item-total">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
            <button class="cart-item-remove" data-index="${index}" aria-label="Remove item">
                <i class="fas fa-trash"></i>
            </button>
        </article>
    `).join('');

    // Attach events
    attachCartEvents();

    // Update counts and totals
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (itemCountEl) itemCountEl.textContent = `${totalCount} item${totalCount !== 1 ? 's' : ''} in your cart`;
    updateCartBadge();
    updateTotals();
}

/**
 * Attach click/change events to cart controls.
 */
function attachCartEvents() {
    // Remove item
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            removeItem(index);
        });
    });

    // Decrease quantity
    document.querySelectorAll('.qty-decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            changeQuantity(index, -1);
        });
    });

    // Increase quantity
    document.querySelectorAll('.qty-increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            changeQuantity(index, 1);
        });
    });

    // Quantity input change
    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            let val = parseInt(e.currentTarget.value) || 1;
            val = Math.max(1, Math.min(99, val));
            e.currentTarget.value = val;
            setQuantity(index, val);
        });
    });
}

/**
 * Remove an item from the cart.
 */
function removeItem(index) {
    if (index < 0 || index >= cart.length) return;

    const removed = cart.splice(index, 1)[0];
    saveCart(cart);
    renderCart();
    console.log(`Removed ${removed.name} from cart`);

    // Brief confirmation could be added here
}

/**
 * Change quantity by delta (+1 or -1).
 */
function changeQuantity(index, delta) {
    if (index < 0 || index >= cart.length) return;
    const newQty = cart[index].quantity + delta;
    if (newQty < 1) {
        removeItem(index);
    } else if (newQty <= 99) {
        setQuantity(index, newQty);
    }
}

/**
 * Set quantity for an item.
 */
function setQuantity(index, qty) {
    if (index < 0 || index >= cart.length) return;
    cart[index].quantity = qty;
    saveCart(cart);
    renderCart();
}

/**
 * Update cart totals display.
 */
function updateTotals() {
    const subtotalEl = document.getElementById('summary-subtotal');
    const totalEl = document.getElementById('summary-total');

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 0; // Free shipping
    const total = subtotal + shipping;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

/**
 * Update the shopping cart badge in the header.
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
 * Update the wishlist badge in the header.
 */
function updateWishlistBadge() {
    const badge = document.querySelector('.wishlist-count');
    // Wishlist is not persisted on cart page; keep existing behavior
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
 * Checkout button handler.
 */
document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            alert('Proceeding to checkout... (demo mode)');
            // In a real app, redirect to checkout page
        });
    }
});
