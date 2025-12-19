const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ROUTE PRODUITS
app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "T-shirt", price: 20 },
    { id: 2, name: "Casquette", price: 15 }
  ]);
});

// ROUTE TEST (optionnelle)
app.get("/", (req, res) => {
  res.send("Backend e-commerce OK 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur lancé sur le port", PORT);
});

