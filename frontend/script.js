let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];

// Sauvegarde du panier
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Ajouter au panier
function addToCart(id) {
  cart.push(id);
  saveCart();
}

// Charger les produits depuis le backend
async function loadProducts() {
  const res = await fetch("https://ecommerce-site-nij4.onrender.com/products");
  products = await res.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin:10px;">
        <h3>${p.name}</h3>
        <p>${p.price} €</p>
        <button onclick="addToCart(${p.id})">Ajouter au panier</button>
      </div>
    `;
  });

  renderCart();
}

// Afficher le panier
function renderCart() {
  const cartDiv = document.getElementById("cart");

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Panier vide</p>";
    return;
  }

  let total = 0;
  cartDiv.innerHTML = "";

  cart.forEach(id => {
    const product = products.find(p => p.id === id);
    if (product) {
      total += product.price;
      cartDiv.innerHTML += `<p>${product.name} – ${product.price} €</p>`;
    }
  });

  cartDiv.innerHTML += `<strong>Total : ${total.toFixed(2)} €</strong>`;
}

// Lancer au chargement
loadProducts();
