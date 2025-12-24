const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();
const PORT = process.env.PORT || 10000;

// ⚠️ MET TA CLÉ STRIPE ICI
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Produits
const products = [
  { id: 1, name: "T-shirt", price: 20 },
  { id: 2, name: "Casquette", price: 15 }
];

// Test
app.get("/", (req, res) => {
  res.send("Backend en ligne ✅");
});

// Produits
app.get("/products", (req, res) => {
  res.json(products);
});

// 🔥 STRIPE CHECKOUT
app.post("/create-checkout-session", async (req, res) => {
  const cart = req.body;

  const line_items = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: product.name
        },
        unit_amount: product.price * 100
      },
      quantity: item.qty
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: "https://ecommerce-site-frontend.onrender.com/success.html",
    cancel_url: "https://ecommerce-site-frontend.onrender.com/cancel.html"
  });

  res.json({ url: session.url });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
