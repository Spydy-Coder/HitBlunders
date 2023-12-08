const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());

app.use(express.json());

const dataFilePath = 'data.json';
const dataFilePathCart = 'cartitems.json'
const detailFilePathOrders = 'detail.json';

// Create an empty array if the data file doesn't exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, '[]', 'utf-8');
}

// Read existing data from the data file
const loadData = () => {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};
const loadDataOrders = () => {
  const data = fs.readFileSync(detailFilePathOrders, 'utf-8');
  return JSON.parse(data);
};

// Save data to the data file
const saveData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};
const saveDataOrders = (data) => {
  fs.writeFileSync(detailFilePathOrders, JSON.stringify(data, null, 2), 'utf-8');
};

app.post('/users', (req, res) => {
  const newUser = req.body;
  const users = loadData();
  users.push(newUser);
//   saveData(users);
saveData(users);

  console.log('User registered:', newUser);
  res.json(newUser);
});

app.post('/cart', (req, res) => {
  const cartItem = req.body;
  const {cartitems} = loadData();

  cartitems.push(cartItem);
//   saveData(cartData);
saveData({ users: [], cartitems });

  console.log('Product added to cart:', cartItem);
  res.json(cartItem);
});


// Endpoint to handle the POST request for orders
app.post('/orders', async (req, res) => {
  const newOrder = req.body;
  const orders = loadData();
  orders.push(newOrder);
//   saveData(users);
saveDataOrders(users);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
