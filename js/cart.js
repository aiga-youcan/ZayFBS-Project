// =========================
// CART DATA
// =========================

let cart = [];
window.cart = cart;

// =========================
// RENDER CART
// =========================

function renderCart() {
  const cartBody = document.getElementById("cart-body");
  const cartTotal = document.getElementById("cart-total");

  if (!cartBody) return;

  cartBody.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartBody.innerHTML =
      "<tr><td colspan='5' style='text-align:center;'>Panier vide</td></tr>";

    if (cartTotal) cartTotal.innerText = "0";
    updateCartCounter();
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let subtotal = item.price * item.quantity;
    total += subtotal;

    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.title}</td>
      <td>${item.price} MAD</td>
      <td>
        <button onclick="window.updateQty(${item.id}, -1)">-</button>
        ${item.quantity}
        <button onclick="window.updateQty(${item.id}, 1)">+</button>
      </td>
      <td>${subtotal} MAD</td>
      <td>
        <button onclick="window.removeItem(${item.id})">x</button>
      </td>
    `;
    cartBody.appendChild(row);
  }

  if (cartTotal) cartTotal.innerText = total;
  updateCartCounter();
}

// =========================
// ADD TO CART
// =========================

function addToCart(productId) {
  if (typeof window.products === "undefined") return;

  let product = window.products.find((p) => p.id === productId);
  if (!product) return;

  let found = cart.find((p) => p.id === productId);

  if (found) {
    found.quantity++;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  }

  renderCart();
  updateCartCounter();
  openCart();
}

// =========================
// UPDATE QTY
// =========================

function updateQty(id, change) {
  let item = cart.find((p) => p.id === id);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeItem(id);
    return;
  }

  renderCart();
  updateCartCounter();
}

// =========================
// REMOVE ITEM
// =========================

function removeItem(id) {
  cart = cart.filter((p) => p.id !== id);
  window.cart = cart;
  renderCart();
  updateCartCounter();
}

// =========================
// SIDEBAR CART OPEN/CLOSE
// =========================

function openCart() {
  const sidebar = document.getElementById("cart-sidebar");
  if (sidebar) sidebar.classList.add("active");
}

function closeCart() {
  const sidebar = document.getElementById("cart-sidebar");
  if (sidebar) sidebar.classList.remove("active");
}

// =========================
// GLOBAL EXPORT
// =========================

window.addToCart = addToCart;
window.updateQty = updateQty;
window.removeItem = removeItem;
window.openCart = openCart;
window.closeCart = closeCart;

// =========================
// INIT
// =========================

renderCart();