let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];

// Sauvegarder le panier
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Ajouter au panier
function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
}

// + quantité
function increaseQty(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty++;
    saveCart();
  }
}

// - quantité
function decreaseQty(id) {
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.qty--;
  if (item.qty <= 0) {
    cart = cart.filter(p => p.id !== id);
  }
  saveCart();
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
        <button onclick="addToCart(${p.id})">Ajouter</button>
      </div>
    `;
  });

  renderCart();
}

// Afficher panier
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
    if (!product) return;

    const line = product.price * item.qty;
    total += line;

    cartDiv.innerHTML += `
      <div class="cart-item">
        <span>${product.name} – ${line} €</span>
        <span>
          <button onclick="decreaseQty(${item.id})">−</button>
          ${item.qty}
          <button onclick="increaseQty(${item.id})">+</button>
        </span>
      </div>
    `;
  });

  cartDiv.innerHTML += `<strong>Total : ${total} €</strong>`;
}

// Commander
async function placeOrder() {
  if (cart.length === 0) {
    alert("Panier vide ❌");
    return;
  }

  const total = cart.reduce((sum, item) => {
    const p = products.find(pr => pr.id === item.id);
    return sum + p.price * item.qty;
  }, 0);

  const res = await fetch("https://ecommerce-site-nij4.onrender.com/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: cart,
      total
    })
  });

  const data = await res.json();
  alert(data.message || "Commande envoyée ✅");

  cart = [];
  saveCart();
}

// 🔥 IMPORTANT : liaison bouton → fonction
document.getElementById("orderBtn").addEventListener("click", placeOrder);

// Lancer
loadProducts();
