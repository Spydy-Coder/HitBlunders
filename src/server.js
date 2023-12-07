// server.js

const express = require('express');
const cors = require('cors'); // Install the 'cors' package if not already installed

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const cartData = [
  // Example cart data
  { id: 1, product: 'Product 1', mrp: '₹100', img1: 'product1.jpg' },
  { id: 2, product: 'Product 2', mrp: '₹150', img1: 'product2.jpg' },
  // Add more cart items as needed
];

app.get('/cart', (req, res) => {
  const { username } = req.query;

  if (!username || username === 'wait') {
    return res.status(400).json({ error: 'Invalid username' });
  }

  // Simulate fetching cart data based on the username
  const userCart = cartData.filter((item) => item.username === username);

  res.json(userCart);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
