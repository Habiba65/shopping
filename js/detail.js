// ========================================
// SoleStep — Product Details Page
// Phase 6: Product Details
// ========================================

// Product database (matches index.html products)
const allProducts = [
    {
        id: 1,
        name: "Air Stride Runner",
        category: "Running",
        price: 129.99,
        originalPrice: 159.99,
        discount: 20,
        rating: 4.5,
        reviewCount: 128,
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Experience ultimate comfort with the Air Stride Runner. Featuring a breathable mesh upper, responsive cushioning, and a durable rubber outsole, these running shoes are built for both casual jogs and serious miles. The lightweight design keeps you moving effortlessly from morning to night.",
        sizes: ["6", "7", "8", "9", "10", "11", "12"],
        colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "White", hex: "#ffffff" },
            { name: "Navy", hex: "#1e3a8a" },
            { name: "Red", hex: "#dc2626" }
        ]
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
        images: [
            "https://images.unsplash.com/photo-1526815777157-7c9779320305?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526815777157-7c9779320305?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526815777157-7c9779320305?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526815777157-7c9779320305?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Conquer any terrain with the Trail Blazer Hiker. Waterproof leather construction, aggressive tread pattern, and ankle support make these boots perfect for rugged outdoor adventures. The insulated lining keeps your feet warm in cold conditions while remaining breathable.",
        sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
        colors: [
            { name: "Brown", hex: "#8b4513" },
            { name: "Black", hex: "#1a1a1a" },
            { name: "Olive", hex: "#556b2f" }
        ]
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
        images: [
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Step up your style with the Urban Chelsea Boot. Sleek leather upper, elastic side panels for easy slip-on wear, and a sturdy block heel. Perfect for pairing with jeans or dressing up for a night out. Timeless design meets modern comfort.",
        sizes: ["5", "6", "7", "8", "9", "10", "11"],
        colors: [
            { name: "Tan", hex: "#d2b48c" },
            { name: "Black", hex: "#1a1a1a" },
            { name: "Brown", hex: "#8b4513" },
            { name: "Burgundy", hex: "#800020" }
        ]
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
        images: [
            "https://images.unsplash.com/photo-1551963753-bd293e91435d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551963753-bd293e91435d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551963753-bd293e91435d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551963753-bd293e91435d?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Comfortable and durable sneakers for little feet. The Little Steps Sneaker features a flexible sole, easy velcro straps for independent dressing, and a fun design kids love. Built to withstand playground adventures while keeping growing feet supported.",
        sizes: ["11C", "12C", "13C", "1Y", "2Y", "3Y", "4Y", "5Y"],
        colors: [
            { name: "Pink", hex: "#ff69b4" },
            { name: "Blue", hex: "#4169e1" },
            { name: "White", hex: "#ffffff" },
            { name: "Yellow", hex: "#ffd700" }
        ]
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
        images: [
            "https://images.unsplash.com/photo-1515089770059-4a4484e893c5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515089770059-4a4484e893c5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515089770059-4a4484e893c5?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515089770059-4a4484e893c5?q=80&w=800&auto=format&fit=crop"
        ],
        description: "Built for speed, engineered for performance. The Speed Sprint Pro features a carbon fiber plate, lightweight foam midsole, and aerodynamic upper. Whether you're racing or training, these shoes deliver maximum energy return with every stride.",
        sizes: ["6", "7", "8", "9", "10", "11", "12", "13"],
        colors: [
            { name: "Neon Yellow", hex: "#ccff00" },
            { name: "Black", hex: "#1a1a1a" },
            { name: "White", hex: "#ffffff" },
            { name: "Orange", hex: "#ff6600" }
        ]
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
        images: [
            "https://images.unsplash.com/photo-1506053616737-b6a062e6616e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1506053616737-b6a062e6616e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1506053616737-b6a062e6616e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1506053616737-b6a062e6616e?q=80&w=800&auto=format&fit=crop"
        ],
        description: "The Mountain Ridge Boot is built for the toughest trails. Full-grain leather, Vibram outsole, and GORE-TEX waterproofing keep you dry and supported in any weather. Vibrant colors make you visible on the trail while the ergonomic fit reduces fatigue on long hikes.",
        sizes: ["7", "8", "9", "10", "11", "12", "13", "14"],
        colors: [
            { name: "Black", hex: "#1a1a1a" },
            { name: "Olive Green", hex: "#556b2f" },
            { name: "Coyote Brown", hex: "#8b7355" }
        ]
    }
];

let wishlistCount = 0;
let selectedSize = null;
let selectedColor = null;
let quantity = 1;
const CART_STORAGE_KEY = 'soleStepCart';
const WISHLIST_STORAGE_KEY = 'soleStepWishlist';

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
 * Get total cart item count.
 */
function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
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
 * Update the wishlist badge in the header.
 */
function updateWishlistBadge() {
    const badge = document.querySelector('.wishlist-count');
    if (badge) {
        const count = getWishlist().length;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
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
    updateWishlistBadge();
    renderProductDetails(getProductById(id)); // re-render to update heart state
}

/**
 * Add product to cart.
 */
function addToCart(productId, qty) {
    const product = getProductById(productId);
    if (!product) return;

    let cart = getCart();
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            category: product.category,
            quantity: qty
        });
    }

    saveCart(cart);
    updateCartBadge();

    // Visual feedback
    const btn = document.getElementById('btn-add-to-cart');
    if (btn) {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
        btn.style.backgroundColor = '#06d6a0';
        btn.style.borderColor = '#06d6a0';

        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.backgroundColor = '';
            btn.style.borderColor = '';
        }, 1500);
    }

    console.log(`Added ${qty}x ${product.name} to cart`);
}

/**
 * Get product ID from URL query string.
 */
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10);
}

/**
 * Find product by ID.
 */
function getProductById(id) {
    return allProducts.find(p => p.id === id);
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
 * Render product details page.
 */
function renderProductDetails(product) {
    if (!product) return;

    // Breadcrumb
    const breadcrumbEl = document.getElementById('breadcrumb-product');
    if (breadcrumbEl) breadcrumbEl.textContent = product.name;

    // Category
    const categoryEl = document.getElementById('detail-category');
    if (categoryEl) categoryEl.textContent = product.category;

    // Name
    const nameEl = document.getElementById('detail-name');
    if (nameEl) nameEl.textContent = product.name;

    // Rating
    const starsEl = document.getElementById('detail-stars');
    if (starsEl) starsEl.innerHTML = renderStars(product.rating);

    const reviewCountEl = document.getElementById('detail-review-count');
    if (reviewCountEl) reviewCountEl.textContent = `(${product.reviewCount} reviews)`;

    // Pricing
    const priceEl = document.getElementById('detail-price');
    if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;

    const originalPriceEl = document.getElementById('detail-original-price');
    const discountBadgeEl = document.getElementById('detail-discount-badge');

    if (product.discount && product.originalPrice > product.price) {
        if (originalPriceEl) originalPriceEl.textContent = `$${product.originalPrice.toFixed(2)}`;
        if (discountBadgeEl) {
            discountBadgeEl.textContent = `-${product.discount}%`;
            discountBadgeEl.style.display = 'inline-block';
        }
    } else {
        if (originalPriceEl) originalPriceEl.style.display = 'none';
        if (discountBadgeEl) discountBadgeEl.style.display = 'none';
    }

    // Description
    const descEl = document.getElementById('detail-description');
    if (descEl) descEl.textContent = product.description;

    // Main image + thumbnails
    const mainImg = document.getElementById('main-product-img');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImg && product.images.length > 0) {
        mainImg.src = product.images[0];
        mainImg.alt = product.name;
    }

    thumbnails.forEach((thumb, index) => {
        const img = product.images[index] || product.images[0];
        const thumbImg = thumb.querySelector('img');
        if (thumbImg) {
            thumbImg.src = img;
            thumbImg.alt = `${product.name} ${index + 1}`;
        }
        thumb.setAttribute('data-img', img);

        if (index === 0) {
            thumb.classList.add('active');
        }

        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            if (mainImg) {
                mainImg.style.opacity = '0';
                setTimeout(() => {
                    mainImg.src = img;
                    mainImg.style.opacity = '1';
                }, 200);
            }
        });
    });

    // Size selection
    const sizeOptions = document.getElementById('size-options');
    if (sizeOptions && product.sizes) {
        sizeOptions.innerHTML = product.sizes.map(size => `
            <button class="size-btn" data-size="${size}">${size}</button>
        `).join('');

        sizeOptions.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                sizeOptions.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedSize = btn.dataset.size;
            });
        });
        // Select first size by default
        if (sizeOptions.firstElementChild) {
            sizeOptions.firstElementChild.classList.add('active');
            selectedSize = product.sizes[0];
        }
    }

    // Color selection
    const colorOptions = document.getElementById('color-options');
    if (colorOptions && product.colors) {
        colorOptions.innerHTML = product.colors.map((color, index) => `
            <button class="color-btn" data-color="${color.name}" style="background-color: ${color.hex};" aria-label="${color.name}"></button>
        `).join('');

        colorOptions.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                colorOptions.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedColor = btn.dataset.color;
            });
        });
        // Select first color by default
        if (colorOptions.firstElementChild) {
            colorOptions.firstElementChild.classList.add('active');
            selectedColor = product.colors[0].name;
        }
    }

    // Quantity selector
    const qtyInput = document.querySelector('.qty-input');
    const qtyDecrease = document.querySelector('.qty-decrease');
    const qtyIncrease = document.querySelector('.qty-increase');

    if (qtyInput) {
        qtyInput.value = quantity;
        qtyInput.addEventListener('change', () => {
            quantity = Math.max(1, Math.min(99, parseInt(qtyInput.value) || 1));
            qtyInput.value = quantity;
        });
    }

    if (qtyDecrease) {
        qtyDecrease.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                qtyInput.value = quantity;
            }
        });
    }

    if (qtyIncrease) {
        qtyIncrease.addEventListener('click', () => {
            if (quantity < 99) {
                quantity++;
                qtyInput.value = quantity;
            }
        });
    }

    // Add to Cart
    const addToCartBtn = document.getElementById('btn-add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.dataset.id = product.id;
        addToCartBtn.addEventListener('click', () => {
            addToCart(product.id, quantity);
        });
    }
}

/**
 * Render related products (excluding current product).
 */
function renderRelatedProducts(currentId) {
    const grid = document.getElementById('related-product-grid');
    if (!grid) return;

    const related = allProducts.filter(p => p.id !== currentId).slice(0, 4);

    grid.innerHTML = related.map(product => {
        const discountBadge = product.discount
            ? `<span class="discount-badge">-${product.discount}%</span>`
            : '';

        return `
        <article class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${discountBadge}
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <a href="product-detail.html?id=${product.id}" class="btn-add-cart">View Details</a>
            </div>
        </article>
        `;
    }).join('');
}

/**
 * Initialize page.
 */
document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromUrl();
    const product = getProductById(productId);

    if (product) {
        renderProductDetails(product);
        renderRelatedProducts(productId);
    } else {
        // Fallback if invalid ID: show first product
        const fallback = allProducts[0];
        if (fallback) {
            renderProductDetails(fallback);
            renderRelatedProducts(fallback.id);
        }
    }

    // Mobile menu toggle (same as index)
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

    // Initialize badges
    updateCartBadge();
    updateWishlistBadge();

    // Wishlist button in product overlay
    const overlayWishlist = document.querySelector('.product-overlay .wishlist');
    if (overlayWishlist) {
        overlayWishlist.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productId = getProductIdFromUrl();
            toggleWishlist(productId);
        });
    }
});
