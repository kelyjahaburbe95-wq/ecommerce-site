const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "T-shirt", price: 20 },
  { id: 2, name: "Casquette", price: 15 }
];

// Route test
app.get("/", (req, res) => {
  res.send("Backend en ligne");
});

// Voir les produits
app.get("/products", (req, res) => {
  res.json(products);
});

// ➕ Ajouter un produit (ADMIN)
app.post("/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Données manquantes" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price
  };

  products.push(newProduct);
  res.json({ message: "Produit ajouté", product: newProduct });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Serveur lancé sur le port " + PORT);
});
