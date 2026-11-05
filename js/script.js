// ========================================
// SoleStep — Main JavaScript
// Phase 1: Project Setup & Layout
// ========================================

// Product data (placeholder images via Unsplash)
const products = [
    {
        id: 1,
        name: "Air Stride Runner",
        category: "Running",
        price: 129.99,
        originalPrice: 159.99,
        discount: 20,
        rating: 4.5,
        reviewCount: 128,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Trail Blazer Hiker",
        category: "Hiking",
        price: 149.99,
        originalPrice: 149.99,
        discount: null,
        rating: 4.8,
        reviewCount: 94,
        image: "https://images.unsplash.com/photo-1526815777157-7c9779320305?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Urban Chelsea Boot",
        category: "Boots",
        price: 119.99,
        originalPrice: 149.99,
        discount: 25,
        rating: 4.7,
        reviewCount: 203,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Little Steps Sneaker",
        category: "Kids",
        price: 59.99,
        originalPrice: 79.99,
        discount: 30,
        rating: 4.3,
        reviewCount: 67,
        image: "https://images.unsplash.com/photo-1551963753-bd293e91435d?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Speed Sprint Pro",
        category: "Running",
        price: 159.99,
        originalPrice: 189.99,
        discount: 15,
        rating: 4.6,
        reviewCount: 156,
        image: "https://images.unsplash.com/photo-1515089770059-4a4484e893c5?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Mountain Ridge Boot",
        category: "Hiking",
        price: 169.99,
        originalPrice: 169.99,
        discount: null,
        rating: 4.9,
        reviewCount: 112,
        image: "https://images.unsplash.com/photo-1506053616737-b6a062e6616e?q=80&w=600&auto=format&fit=crop"
    }
];

let wishlistCount = 0;
const CART_STORAGE_KEY = 'soleStepCart';
const WISHLIST_STORAGE_KEY = 'soleStepWishlist';

let currentFilter = 'all';
let currentSearch = '';

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
function saveCart(cart) {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Get wishlist from sessionStorage.
 */
function getWishlist() {
    try {
        const raw = sessionStorage.getItem(WISHLIST_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

/**
 * Save wishlist to sessionStorage.
 */
function saveWishlist(wishlist) {
    sessionStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
}

/**
 * Get total cart item count.
 */
function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Get wishlist count.
 */
function getWishlistCount() {
    return getWishlist().length;
}

/**
 * Render product cards into the product grid.
 */
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    const wishlist = getWishlist();
    const searchInfo = document.getElementById('search-results-info');
    const searchCount = document.getElementById('search-results-count');

    // Filter by category
    let filtered = products;
    if (currentFilter !== 'all') {
        filtered = products.filter(p => p.category === currentFilter);
    }

    // Filter by search
    if (currentSearch) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
            p.category.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }

    // Update search info
    if (searchInfo && searchCount) {
        if (currentSearch) {
            searchInfo.style.display = 'block';
            searchCount.textContent = `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${currentSearch}"`;
        } else {
            searchInfo.style.display = 'none';
        }
    }

    productGrid.innerHTML = filtered.map(product => {
        const stars = Array(5).fill(0).map((_, i) => {
            const isFilled = i < Math.floor(product.rating);
            const isHalf = product.rating % 1 >= 0.5 && i === Math.floor(product.rating);
            const cls = isFilled ? 'fas fa-star full' : (isHalf ? 'fas fa-star-half-alt half' : 'far fa-star empty');
            return `<i class="${cls}" data-val="${i + 1}"></i>`;
        }).join('');

        const discountBadge = product.discount
            ? `<span class="discount-badge">-${product.discount}%</span>`
            : '';

        const originalPriceHtml = product.originalPrice && product.originalPrice > product.price
            ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`
            : '';

        const isWishlisted = wishlist.includes(product.id);
        const heartCls = isWishlisted ? 'fas fa-heart' : 'far fa-heart';
        const heartColor = isWishlisted ? 'color: #e17055;' : '';

        return `
        <article class="product-card" data-id="${product.id}" data-category="${product.category}">
            <div class="product-image">
                ${discountBadge}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-overlay">
                    <button class="quick-view" aria-label="Quick view">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="wishlist" aria-label="Add to wishlist">
                        <i class="${heartCls}"></i>
                    </button>
                    <button class="add-to-cart" aria-label="Add to cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${stars}
                    <span class="review-count">(${product.reviewCount})</span>
                </div>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${originalPriceHtml}
                </div>
                <div class="product-actions">
                    <a href="product-detail.html?id=${product.id}" class="btn-add-cart detail-link">View Details</a>
                    <button class="btn-add-cart add-cart-btn" data-id="${product.id}">Add to Cart</button>
                    <button class="btn-wishlist wishlist-btn" data-id="${product.id}" aria-label="Wishlist">
                        <i class="${heartCls}" style="${heartColor}"></i>
                    </button>
                </div>
            </div>
        </article>
        `;
    }).join('');

    attachProductEvents();
}

/**
 * Attach click events to product action buttons.
 */
function attachProductEvents() {
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = parseInt(e.currentTarget.dataset.id);
            addToCart(id);
        });
    });

    document.querySelectorAll('.btn-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleWishlist(id);
        });
    });

    // Category filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProducts();
        });
    });

    // Clear search button
    const clearSearchBtn = document.getElementById('btn-clear-search');
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            currentSearch = '';
            const searchInput = document.querySelector('.search-input');
            if (searchInput) searchInput.value = '';
            document.getElementById('search-results-info').style.display = 'none';
            renderProducts();
        });
    }
}

/**
 * Toggle product in wishlist with sessionStorage persistence.
 */
function toggleWishlist(id) {
    let wishlist = getWishlist();
    const index = wishlist.indexOf(id);

    if (index === -1) {
        wishlist.push(id);
    } else {
        wishlist.splice(index, 1);
    }

    saveWishlist(wishlist);
    renderProducts();
    updateWishlistBadge();
}

/**
 * Add a product to the cart and update the cart badge.
 */
function addToCart(id, qty = 1) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    let cart = getCart();
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: qty
        });
    }

    saveCart(cart);
    updateCartBadge();

    // Optional visual feedback
    console.log(`Added to cart: ${product.name}`);
}

/**
 * Update the shopping cart badge in the header.
 */
function updateCartBadge() {
    const badge = document.querySelector('.cart-count');
    const count = getCartCount();
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
    if (badge) {
        const count = getWishlistCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

/**
 * Toggle the desktop/mobile search form.
 */
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchForms = document.querySelectorAll('.search-form');
    const searchInputs = document.querySelectorAll('.search-input');

    if (!searchToggle) return;

    searchToggle.addEventListener('click', () => {
        const isExpanded = searchToggle.getAttribute('aria-expanded') === 'true';
        searchToggle.setAttribute('aria-expanded', !isExpanded);

        searchForms.forEach(form => {
            form.classList.toggle('active', !isExpanded);
        });

        // Focus input when opened
        if (!isExpanded) {
            searchInputs.forEach(input => input.focus());
        }
    });

    // Handle search form submission — redirect to search page or filter on index
    searchForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('.search-input');
            const query = input.value.trim();

            if (query) {
                currentSearch = query;
                renderProducts();

                // Close mobile search
                searchForms.forEach(f => f.classList.remove('active'));
                searchToggle.setAttribute('aria-expanded', 'false');
                input.value = '';

                // Scroll to products section
                const shopSection = document.getElementById('shop');
                if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Real-time search filtering on keyup (desktop search bar)
    const desktopSearch = document.querySelector('.nav-search .search-input');
    if (desktopSearch) {
        desktopSearch.addEventListener('input', (e) => {
            currentSearch = e.target.value.trim();
            renderProducts();
        });
    }
}

/**
 * Newsletter subscription.
 */
function initNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const email = input.value.trim();

            if (!email) return;

            // Simulate subscription
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Subscribing...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Subscribed!';
                btn.style.backgroundColor = '#06d6a0';
                btn.style.borderColor = '#06d6a0';
                input.value = '';

                showToast('Thanks for subscribing! You\'ll receive 10% off your first order.');

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                }, 2000);
            }, 1000);
        });
    });
}

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
 * Header scroll effect — add shadow when scrolled.
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile navigation toggle.
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

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * Set current year in footer.
 */
function setFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize everything when DOM is ready.
 */
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initMobileMenu();
    initSearch();
    initHeaderScroll();
    initNewsletter();
    updateCartBadge();
    updateWishlistBadge();
    setFooterYear();
});
