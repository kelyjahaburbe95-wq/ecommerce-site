let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Panier vide</p>";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      total += product.price * item.qty;
      cartDiv.innerHTML += `
        <p>${product.name} x ${item.qty}</p>
      `;
    }
  });

  cartDiv.innerHTML += `<strong>Total : ${total} €</strong>`;
}

async function loadProducts() {
  const res = await fetch("https://ecommerce-site-nij4.onrender.com/products");
  products = await res.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div>
        <h3>${p.name}</h3>
        <p>${p.price} €</p>
        <button onclick="addToCart(${p.id})">Ajouter</button>
      </div>
    `;
  });

  renderCart();
}

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
