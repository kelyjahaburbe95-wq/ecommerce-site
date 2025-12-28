let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ➕ Ajouter au panier
function addToCart(id) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveCart();
}

// ➕ augmenter quantité
function increaseQty(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty++;
    saveCart();
  }
}

// ➖ diminuer quantité
function decreaseQty(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty--;
    if (item.qty <= 0) {
      cart = cart.filter(p => p.id !== id);
    }
    saveCart();
  }
}

// Charger produits
async function loadProducts() {
  const res = await fetch("https://ecommerce-site-nij4.onrender.com/products");
  products = await res.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>${p.price} €</p>
        <button onclick="addToCart(${p.id})">Ajouter au panier</button>
      </div>
    `;
  });

  renderCart();
}

// 🛒 Affichage panier
function renderCart() {
  const cartDiv = document.getElementById("cart");

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Panier vide</p>";
    return;
  }

  let total = 0;
  cartDiv.innerHTML = "";

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      const lineTotal = product.price * item.qty;
      total += lineTotal;

      cartDiv.innerHTML += `
        <p>
          ${product.name} – ${lineTotal} €
          <span>
            <button onclick="decreaseQty(${item.id})">−</button>
            ${item.qty}
            <button onclick="increaseQty(${item.id})">+</button>
          </span>
        </p>
      `;
    }
  });

  cartDiv.innerHTML += `<strong>Total : ${total} €</strong>`;
}

// ✅ Commander
async function placeOrder() {
  if (cart.length === 0) {
    alert("Panier vide ❌");
    return;
  }

  const res = await fetch("https://ecommerce-site-nij4.onrender.com/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart)
  });

  const data = await res.json();
  alert(data.message);

  cart = [];
  saveCart();
}

loadProducts();
