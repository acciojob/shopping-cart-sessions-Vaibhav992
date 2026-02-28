// ============================
// Product Data
// ============================

const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// 🔥 IMPORTANT: Must be "cart"
const CART_STORAGE_KEY = "cart";

// ============================
// DOM Elements
// ============================

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ============================
// Storage Helpers
// ============================

function getCart() {
  try {
    const stored = sessionStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// ============================
// Render Products
// ============================

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;

    productList.appendChild(li);
  });
}

// ============================
// Render Cart
// ============================

function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  if (cart.length === 0) return;

  cart.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - $${item.price}
      <button class="remove-btn" data-id="${item.id}">
        Remove
      </button>
    `;

    cartList.appendChild(li);
  });
}

// ============================
// Cart Operations
// ============================

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  cart.push(product);

  saveCart(cart);
  renderCart();
}

function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== productId);

  saveCart(updatedCart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem(CART_STORAGE_KEY);
  cartList.innerHTML = "";
}

// ============================
// Event Listeners
// ============================

productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = Number(e.target.dataset.id);
    addToCart(productId);
  }
});

cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const productId = Number(e.target.dataset.id);
    removeFromCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// ============================
// Initial Render
// ============================

renderProducts();
renderCart();