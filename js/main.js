// =========================
// DOM READY
// =========================

document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // MOBILE MENU
  // =========================
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  // =========================
  // CONTACT FORM
  // =========================
  const form = document.getElementById("contact-form");
  const msg = document.getElementById("success-msg");

  if (form && msg) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      msg.style.display = "block";
      form.reset();

      setTimeout(function () {
        msg.style.display = "none";
      }, 3000);
    });
  }

  // =========================
  // INIT COUNTER
  // =========================
  updateCartCounter();

  // =========================
  // CART ICON CLICK (OPEN SIDEBAR)
  // =========================
  const cartIcons = document.querySelectorAll(".cart-icon");
  cartIcons.forEach(function (icon) {
    icon.addEventListener("click", function (e) {
      e.preventDefault();
      if (typeof window.openCart === "function") window.openCart();
    });
  });

  // =========================
  // SIDEBAR CLOSE BUTTON
  // =========================
  const sidebar = document.getElementById("cart-sidebar");
  if (sidebar) {
    sidebar.addEventListener("click", function (e) {
      if (e.target === sidebar) {
        window.closeCart();
      }
    });
  }
});

// =========================
// CART COUNTER (SAFE VERSION)
// =========================

function updateCartCounter() {
  const counter = document.getElementById("cart-counter");
  if (!counter) return;

  let total = 0;

  if (Array.isArray(window.cart)) {
    for (let i = 0; i < window.cart.length; i++) {
      total += window.cart[i].quantity;
    }
  }

  counter.innerText = total;
}

window.updateCartCounter = updateCartCounter;