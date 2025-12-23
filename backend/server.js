const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTE TEST API (IMPORTANT) */
app.get("/api/test", (req, res) => {
  res.json({ message: "Connexion frontend ↔ backend OK ✅" });
});

/* ROUTE RACINE */
app.get("/", (req, res) => {
  res.send("Backend e-commerce en ligne 🚀");
});

/* ROUTE PRODUITS */
app.get("/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Produit test",
      price: 24.9
    }
  ]);

