const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Q0LAZP88pAFOH9oca7jrvRAvsBAMCAlidiJ4bYtXYDNOBVhP9niix78iFxQfe8KwGjHvFDle7HcZHVHZFNPl3WJ008HkmqVgJ");

const app = express();


app.use(cors({
  origin: "http://localhost:3000", 
}));

app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: "pkr", 
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
