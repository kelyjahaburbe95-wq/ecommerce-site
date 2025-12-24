let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id) {
  cart.push(id);
  saveCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

// Charger les produits
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

// Affichage panier
function renderCart() {
  const cartDiv = document.getElementById("cart");

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Panier vide</p>";
    return;
  }

  let total = 0;
  cartDiv.innerHTML = "";

  cart.forEach((id, index) => {
    const product = products.find(p => p.id === id);
    if (product) {
      total += product.price;
      cartDiv.innerHTML += `
        <p>
          ${product.name} – ${product.price} €
          <button onclick="removeFromCart(${index})">❌</button>
        </p>
      `;
    }
  });

  cartDiv.innerHTML += `<strong>Total : ${total} €</strong>`;
}

// Commander
async function placeOrder() {
  if (cart.length === 0) {
    alert("Panier vide ❌");
    return;
  }

  const orderItems = cart.map(id =>
    products.find(p => p.id === id)
  );

  const total = orderItems.reduce((sum, p) => sum + p.price, 0);

  const res = await fetch("https://ecommerce-site-nij4.onrender.com/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: orderItems,
      total
    })
  });

  const data = await res.json();
  alert(data.message);

  cart = [];
  saveCart();
}

loadProducts();
