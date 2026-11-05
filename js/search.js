// ========================================
// SoleStep — Search Page
// Phase 9: Extra Features
// ========================================

const CART_STORAGE_KEY = 'soleStepCart';
const WISHLIST_STORAGE_KEY = 'soleStepWishlist';
const PRODUCTS_STORAGE_KEY = 'soleStepProducts';

let products = [];
let searchQuery = '';

/**
 * Default product data (matches index.html products).
 */
const defaultProducts = [
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
    return getWishlist().length;
}

/**
 * Update badges in header.
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
 * Get search query from URL.
 */
function getSearchQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
}

/**
 * Render star rating HTML.
 */
function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i < rating) {
            html += '<i class="fas fa-star full"></i>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            html += '<i class="fas fa-star-half-alt half"></i>';
        } else {
            html += '<i class="far fa-star empty"></i>';
        }
    }
    return html;
}

/**
 * Render search results.
 */
function renderResults() {
    const grid = document.getElementById('search-product-grid');
    const titleEl = document.getElementById('search-title');
    const subtitleEl = document.getElementById('search-subtitle');
    const noResults = document.getElementById('no-results');
    const breadcrumb = document.getElementById('breadcrumb-search');

    if (!grid) return;

    // Filter products by search query
    const results = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update header info
    if (titleEl) titleEl.textContent = searchQuery ? `Search Results for "${searchQuery}"` : 'All Products';
    if (subtitleEl) subtitleEl.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} found`;
    if (breadcrumb) breadcrumb.textContent = searchQuery ? `"${searchQuery}"` : 'Search';

    // Show/hide no results
    if (results.length === 0) {
        if (noResults) noResults.style.display = 'block';
        grid.style.display = 'none';
        grid.innerHTML = '';
    } else {
        if (noResults) noResults.style.display = 'none';
        grid.style.display = 'grid';

        grid.innerHTML = results.map(product => {
            const isWishlisted = getWishlist().includes(product.id);
            const discountBadge = product.discount
                ? `<span class="discount-badge">-${product.discount}%</span>`
                : '';

            return `
            <article class="product-card" data-id="${product.id}">
                <div class="product-image">
                    ${discountBadge}
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        ${renderStars(product.rating)}
                        <span class="review-count">(${product.reviewCount})</span>
                    </div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <a href="product-detail.html?id=${product.id}" class="btn-add-cart detail-link">View Details</a>
                        <button class="btn-wishlist wishlist-btn" data-id="${product.id}" aria-label="Wishlist">
                            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>
                </div>
            </article>
            `;
        }).join('');

        attachWishlistEvents();
    }

    updateBadges();
}

/**
 * Attach wishlist click events.
 */
function attachWishlistEvents() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleWishlist(id);
        });
    });
}

/**
 * Toggle product in wishlist.
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
    renderResults();
    updateBadges();
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
    products = defaultProducts;
    searchQuery = getSearchQuery();
    renderResults();
    initMobileMenu();
    setFooterYear();
    updateBadges();
});
