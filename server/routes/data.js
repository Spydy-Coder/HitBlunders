// routes/data.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

const dataFilePath = 'data.json';

// Create an empty array if the data file doesn't exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify({ users: [], cartitems: [] }), 'utf-8');
}

// Read existing data from the data file
const loadData = () => {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

// Save data to the data file
const saveData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Endpoint to register a new user
router.post('/users', (req, res) => {
  const newUser = req.body;
  const { users } = loadData();
  users.push(newUser);
  saveData({ users, cartitems: [] });

  console.log('User registered:', newUser);
  res.json(newUser);
});

// Endpoint to add a product to the cart
router.post('/cart', (req, res) => {
  const cartItem = req.body;
  const { cartitems } = loadData();

  cartitems.push(cartItem);
  saveData({ users: [], cartitems });

  console.log('Product added to cart:', cartItem);
  res.json(cartItem);
});

module.exports = router;
