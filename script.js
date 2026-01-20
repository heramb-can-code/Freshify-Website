// Elements
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('#menu-btn');
const cartToggle = document.querySelector('#cart-toggle');
const cartSidebar = document.querySelector('#cart-sidebar');
const closeCart = document.querySelector('#close-cart');
const cartOverlay = document.querySelector('#cart-overlay');

// Toggle Menu
menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
});

// Toggle Cart
const toggleCart = () => {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    navbar.classList.remove('active');
}

cartToggle.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Scroll Effect
window.onscroll = () => {
    navbar.classList.remove('active');

    // Optional: Hide cart on scroll
    // cartSidebar.classList.remove('active');
    // cartOverlay.classList.remove('active');
}

// Product Data
const products = [
    // Vegetable (3)
    { id: 1, category: "Vegetable", name: "Fresh Spinaches (Bunch)", price: 90.00, oldPrice: 110.00, image: "images/product-1.png" },
    { id: 2, category: "Vegetable", name: "Organic Broccoli", price: 70.00, oldPrice: 90.00, image: "images/product-2.png" },
    { id: 3, category: "Vegetable", name: "Red Carrots", price: 50.00, oldPrice: 60.00, image: "images/product-3.png" },

    // Sea Fish (3)
    { id: 4, category: "Sea Fish", name: "Fresh Salmon Fillet", price: 360.00, oldPrice: 440.00, image: "images/product-4.png" },
    { id: 5, category: "Sea Fish", name: "Tuna Steaks", price: 300.00, oldPrice: 400.00, image: "images/product-5.png" },
    { id: 6, category: "Sea Fish", name: "Mackerel", price: 240.00, oldPrice: 300.00, image: "images/product-6.png" },

    // Egg (3)
    { id: 7, category: "Egg", name: "Farm Fresh Brown Eggs (12)", price: 100.00, oldPrice: 120.00, image: "images/product-7.png" },
    { id: 8, category: "Egg", name: "Organic White Eggs (6)", price: 60.00, oldPrice: 80.00, image: "images/product-8.png" },
    { id: 9, category: "Egg", name: "Quail Eggs (Pack)", price: 160.00, oldPrice: 200.00, image: "images/product-9.png" },

    // Cheese (3)
    { id: 10, category: "Cheese", name: "Cheddar Cheese Block", price: 140.00, oldPrice: 180.00, image: "images/product-10.png" },
    { id: 11, category: "Cheese", name: "Mozzarella Ball", price: 120.00, oldPrice: 160.00, image: "images/product-11.png" },
    { id: 12, category: "Cheese", name: "Parmesan Wedge", price: 180.00, oldPrice: 220.00, image: "images/product-12.png" },

    // Baking (3)
    { id: 13, category: "Baking", name: "Whole Wheat Flour (2kg)", price: 80.00, oldPrice: 100.00, image: "images/product-13.png" },
    { id: 14, category: "Baking", name: "Instant Yeast", price: 40.00, oldPrice: 50.00, image: "images/product-14.png" },
    { id: 15, category: "Baking", name: "Baking Powder", price: 30.00, oldPrice: 40.00, image: "images/product-15.png" },

    // Fruits (3)
    { id: 16, category: "Fruits", name: "Red Apples (1kg)", price: 100.00, oldPrice: 130.00, image: "images/product-16.png" },
    { id: 17, category: "Fruits", name: "Bananas Bunch", price: 40.00, oldPrice: 50.00, image: "images/product-17.jpeg" },
    { id: 18, category: "Fruits", name: "Fresh Oranges (1kg)", price: 110.00, oldPrice: 140.00, image: "images/product-18.jpeg" },

    // Meat (3)
    { id: 19, category: "Meat", name: "Chicken Breast (1kg)", price: 220.00, oldPrice: 280.00, image: "images/product-19.png" },
    { id: 20, category: "Meat", name: "Mutton (500gm)", price: 240.00, oldPrice: 300.00, image: "images/product-20.png" },
    { id: 21, category: "Meat", name: "Pork Chops", price: 280.00, oldPrice: 340.00, image: "images/product-21.png" },

    // Milk (3)
    { id: 22, category: "Milk", name: "Whole Milk (1 Gallon)", price: 90.00, oldPrice: 100.00, image: "images/product-22.png" },
    { id: 23, category: "Milk", name: "Soy Milk", price: 70.00, oldPrice: 90.00, image: "images/product-23.png" },
    { id: 24, category: "Milk", name: "Almond Milk", price: 80.00, oldPrice: 100.00, image: "images/product-24.png" }
];

// State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productWrapper = document.getElementById('product-wrapper');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

// Render Products
function renderProducts(filter = 'all') {
    let filteredProducts = products;

    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter);
    }

    productWrapper.innerHTML = filteredProducts.map(product => `
        <div class="box">
            <div class="image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="content">
                <h3>${product.name}</h3>
                <div class="grid-flex">
                    <div class="price">₹${product.price.toFixed(2)} <span>₹${product.oldPrice.toFixed(2)}</span></div>
                    <div class="add-btn" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter and Scroll
window.filterProducts = (category) => {
    // Update active class on buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.includes(category) || (category === 'all' && btn.innerText.includes('All'))) {
            btn.classList.add('active');
        }
    });

    renderProducts(category);

    // Scroll to products section
    const productsSection = document.getElementById('products');
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

// Add to Cart
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCart();
    // Show feedback (optional)
    // alert('Added to cart!');
    toggleCart(); // Open cart to show item
};

// Update Cart UI
function updateCart() {
    // Save to LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update Count
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCount.innerText = totalQty;

    // Update Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <h3>${item.name}</h3>
                    <div class="price">₹${item.price.toFixed(2)}</div>
                    <div class="qty-controls">
                        <span onclick="changeQty(${item.id}, -1)">-</span>
                        <p>${item.qty}</p>
                        <span onclick="changeQty(${item.id}, 1)">+</span>
                    </div>
                </div>
                <i class="fa-solid fa-trash" onclick="removeFromCart(${item.id})"></i>
            </div>
        `).join('');
    }

    // Update Total
    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartTotal.innerText = '₹' + totalAmount.toFixed(2);
}

// Change Quantity
window.changeQty = (id, change) => {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.qty += change;
    if (item.qty <= 0) {
        removeFromCart(id);
    } else {
        updateCart();
    }
};

// Remove from Cart
window.removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCart();
};

// Initial Render
renderProducts();
updateCart(); // Load cart from local storage on init

