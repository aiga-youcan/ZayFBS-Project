// =========================
// PRODUCTS DATA
// =========================

let products = [
  {
    id: 1,
    title: "Huile Extra Vierge - 1L",
    desc: "Première pression à froid. Idéale pour les salades et plats froids.",
    price: 85,
    img: "../img/id1.jpg",
  },

  {
    id: 2,
    title: "Huile Premium Bio - 5L",
    desc: "Format familial économique. Récolte manuelle de Fquih Ben Saleh.",
    price: 390,
    img: "../img/id2.png",
  },

  {
    id: 3,
    title: "Huile Artisanale - 500ml",
    desc: "Huile naturelle pressée à froid, goût authentique.",
    price: 55,
    img: "img/id3.jpg",
  },

  {
    id: 4,
    title: "Huile d'Olive Classique - 2L",
    desc: "Idéale pour la cuisine quotidienne.",
    price: 150,
    img: "img/id4.jpg",
  },

  {
    id: 5,
    title: "Huile Bio Premium - 750ml",
    desc: "Qualité supérieure certifiée biologique.",
    price: 95,
    img: "img/id5.jpg",
  },

  {
    id: 6,
    title: "Huile Familiale - 3L",
    desc: "Format économique pour toute la famille.",
    price: 220,
    img: "img/id6.jpg",
  },
];

window.products = products;

// =========================
// DOM
// =========================

const productsGrid = document.getElementById("products-grid");
const productForm = document.getElementById("product-form");
const formContainer = document.getElementById("product-form-container");
const toggleBtn = document.getElementById("toggle-form-btn");
const cancelBtn = document.getElementById("cancel-btn");

// =========================
// RENDER PRODUCTS
// =========================

function renderProducts() {
  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    let p = products[i];

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <h2>${p.price} MAD</h2>
      <button onclick="window.addToCart(${p.id})">Ajouter au panier</button>
      <button onclick="window.editProduct(${p.id})">Edit</button>
      <button onclick="window.deleteProduct(${p.id})">Delete</button>
    `;

    productsGrid.appendChild(card);
  }
}

// =========================
// OPEN FORM
// =========================

if (toggleBtn && formContainer && productForm) {
  toggleBtn.addEventListener("click", function () {
    formContainer.style.display = "block";
    productForm.reset();
    document.getElementById("prod-id").value = "";
    toggleBtn.style.display = "none";
  });
}

// =========================
// CANCEL FORM
// =========================

if (cancelBtn && formContainer && toggleBtn) {
  cancelBtn.addEventListener("click", function () {
    formContainer.style.display = "none";
    toggleBtn.style.display = "inline-block";
  });
}

// =========================
// CREATE / UPDATE
// =========================

if (productForm) {
  productForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let id = document.getElementById("prod-id").value;
    let title = document.getElementById("prod-title").value;
    let desc = document.getElementById("prod-desc").value;
    let price = Number(document.getElementById("prod-price").value);
    let img = document.getElementById("prod-img").value;

    let product = {
      id: id ? Number(id) : Date.now(),
      title,
      desc,
      price,
      img,
    };

    if (id) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === Number(id)) {
          products[i] = product;
        }
      }
    } else {
      products.push(product);
    }

    formContainer.style.display = "none";
    toggleBtn.style.display = "inline-block";

    renderProducts();
  });
}

// =========================
// DELETE
// =========================

function deleteProduct(id) {
  if (confirm("Supprimer produit ?")) {
    products = products.filter((p) => p.id !== id);
    window.products = products;
    renderProducts();
  }
}

// =========================
// EDIT
// =========================

function editProduct(id) {
  let product = products.find((p) => p.id === id);
  if (!product) return;

  document.getElementById("prod-id").value = product.id;
  document.getElementById("prod-title").value = product.title;
  document.getElementById("prod-desc").value = product.desc;
  document.getElementById("prod-price").value = product.price;
  document.getElementById("prod-img").value = product.img;

  formContainer.style.display = "block";
  toggleBtn.style.display = "none";
}

// =========================
// GLOBAL FUNCTIONS
// =========================

window.editProduct = editProduct;
window.deleteProduct = deleteProduct;

// =========================
// INIT
// =========================

renderProducts();