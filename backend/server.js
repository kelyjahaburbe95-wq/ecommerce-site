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
});

/* PORT (Render utilise process.env.PORT) */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Serveur lancé sur le port", PORT);

app.post("/order", (req, res) => {
  const order = req.body;

  console.log("📦 Nouvelle commande reçue :", order);

  res.json({
    message: "Commande reçue avec succès ✅"
  });
});
