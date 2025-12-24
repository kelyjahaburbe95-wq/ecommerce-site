const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Produits (fake base de données)
const products = [
  { id: 1, name: "T-shirt", price: 20 },
  { id: 2, name: "Casquette", price: 15 }
];

// Route test
app.get("/", (req, res) => {
  res.send("Backend en ligne ✅");
});

// Route produits
app.get("/products", (req, res) => {
  res.json(products);
});

// Route commande
app.post("/order", (req, res) => {
  const order = req.body;
  console.log("📦 Nouvelle commande :", order);

  res.json({
    message: "Commande envoyée avec succès ✅"
  });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
