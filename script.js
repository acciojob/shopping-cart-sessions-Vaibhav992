// This is the boilerplate code given for you
// You can modify this code
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

function getCart() {
  try {
    const stored = window.sessionStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  window.sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  const cart = getCart();
  cart.push({ id: product.id, name: product.name, price: product.price });
  saveCart(cart);
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }
}

// Clear cart
function clearCart() {
  window.sessionStorage.removeItem(CART_STORAGE_KEY);
  cartList.innerHTML = "";
  renderCart();
}

// Event listeners
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    addToCart(Number(e.target.dataset.id));
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
