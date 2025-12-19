const API_URL = "https://ecommerce-site-nij4.onrender.com/products";

fetch(API_URL)
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("products");

    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>Prix : ${p.price} €</p>
        <button>Acheter</button>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => {
    document.getElementById("products").innerText =
      "Erreur chargement produits";
    console.error(err);
  });
