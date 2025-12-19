const API_URL = "https://TON_BACKEND_RENDER.onrender.com/products";

let cart = [];

fetch(API_URL)
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("products");

    products.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>Prix : ${product.price} €</p>
