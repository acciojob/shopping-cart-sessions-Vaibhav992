const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const CART_STORAGE_KEY = "cart";

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ================= STORAGE =================

function getCart() {
  const stored = sessionStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// ================= RENDER PRODUCTS =================

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.dataset.id = product.id;

    li.append(`${product.name} - $${product.price} `);
    li.appendChild(btn);

    productList.appendChild(li);
  });
}

// ================= RENDER CART =================

function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");

    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.dataset.id = item.id;

    li.append(`${item.name} - $${item.price} `);
    li.appendChild(btn);

    cartList.appendChild(li);
  });
}

// ================= CART ACTIONS =================

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  cart.push(product);   // ✅ IMPORTANT: push, do NOT overwrite

  saveCart(cart);
  renderCart();
}

function removeFromCart(productId) {
  const cart = getCart();

  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);  // remove only one instance
  }

  saveCart(cart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem(CART_STORAGE_KEY);
  cartList.innerHTML = "";
}

// ================= EVENTS =================

productList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    addToCart(Number(e.target.dataset.id));
  }
});

cartList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    removeFromCart(Number(e.target.dataset.id));
  }
});

clearCartBtn.addEventListener("click", clearCart);

// ================= INIT =================

renderProducts();
renderCart();