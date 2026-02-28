// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const CART_STORAGE_KEY = "shoppingCart";

// DOM elements
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
  } catch (error) {
    console.error("Error parsing cart:", error);
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
  productList.innerHTML = ""; // prevent duplicate render

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${product.name} - $${product.price}</span>
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

  cart.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${item.name} - $${item.price}</span>
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

  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
  });

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
  saveCart([]);
  renderCart();
}


// ============================
// Event Listeners
// ============================

// Add to cart (event delegation)
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = Number(e.target.dataset.id);
    addToCart(productId);
  }
});

// Remove from cart (event delegation)
cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const productId = Number(e.target.dataset.id);
    removeFromCart(productId);
  }
});

// Clear cart
clearCartBtn.addEventListener("click", clearCart);


// ============================
// Initial Render
// ============================

renderProducts();
renderCart();