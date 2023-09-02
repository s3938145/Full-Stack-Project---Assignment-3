require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Category, Product, Seller, Customer, WH_Admin } = require('./schema');
const passport = require('passport');
require('./passport-config')(passport);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(passport.initialize());
app.use((req, res, next) => {
  console.log("Debugging Middleware: ", req.user);
  next();
});


// Middleware to check user role
function checkRole(role) {
  return function(req, res, next) {
    if (req.user && req.user.role === role) {  // Check if req.user exists
      next();
    } else {
      res.status(403).json({ message: 'Access Denied' });
    }
  };
}


// Root API Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome',
    availableEndpoints: [
      {
        method: 'GET',
        path: '/getCategories',
        description: 'Fetch all categories',
      },
      {
        method: 'GET',
        path: '/getCategoryByName/:name',
        description: 'Fetch a single category by name',
      },
      {
        method: 'POST',
        path: '/addCategory',
        description: 'Add a new category',
      },
      {
        method: 'PUT',
        path: '/updateCategoryByName/:name',
        description: 'Update a category by name',
      },
      {
        method: 'DELETE',
        path: '/deleteCategoryByName/:name',
        description: 'Delete a category by name',
      },
      {
        method: 'GET',
        path: '/sellers',
        description: 'Fetch all registered sellers',
      },
      {
        method: 'PATCH',
        path: '/sellers/:email',
        description: 'Update a seller\'s status by email',
      },
      {
        method: 'POST',
        path: '/register',
        description: 'Register a new user',
      },
      {
        method: 'POST',
        path: '/login',
        description: 'Login',
      }

    ],
  });
});



//===========WAREHOUSE ADMIN CRUD============//

// Create a New Category
app.post('/addCategory', async (req, res) => {
  console.log("Request Body:", req.body);  // Log the request body
  try {
    const { name, parent, additionalAttributes } = req.body;
    const newCategory = new Category({
      name,
      parent,
      additionalAttributes,
    });
    await newCategory.save();
    console.log("New Category:", newCategory);  // Log the new category
    res.status(201).json({ message: 'Category added', newCategory });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Read All Categories
app.get('/getCategories', async (req, res) => {
  try {
    const categories = await Category.find({});
    console.log("Fetched Categories:", categories);
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error fetching categories:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Read a Single Category by Name
app.get('/getCategoryByName/:name', async (req, res) => {
  const { name } = req.params;
  const category = await Category.findOne({ name: name });
  if (!category) {

    return res.status(404).json({ message: 'Category not found' });
  }
  res.status(200).json(category);
});


// Update a Category by Name
app.put('/updateCategoryByName/:name', async (req, res) => {
  const { name } = req.params;
  const { newName, parent, additionalAttributes } = req.body;
  
  const updatedFields = {};
  if (newName) updatedFields.name = newName;
  if (parent) updatedFields.parent = parent;
  if (additionalAttributes) updatedFields.additionalAttributes = additionalAttributes;

  const category = await Category.findOneAndUpdate(
    { name: name },
    updatedFields,
    { new: true }
  );

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.status(200).json({ message: 'Category updated', category });
});


// Delete a Category by Name
app.delete('/deleteCategoryByName/:name',  async (req, res) => {
  const { name } = req.params;
  const category = await Category.findOneAndDelete({ name: name });

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.status(200).json({ message: 'Category deleted' });
});


// Seller Approval //
// Read all registered sellers
app.get('/sellers', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a seller's status by Email
app.patch('/sellers/:email', passport.authenticate('jwt', { session: false }), getSellerByEmail, checkRole("Admin"), async (req, res) => {
  try {
    const { status } = req.body;
    
    // Update seller status
    if (status && ['Approved', 'Rejected'].includes(status)) {
      res.seller.status = status;
      await res.seller.save();
      res.json({ message: 'Seller status updated successfully' });
    } else {
      res.status(400).json({ message: 'Invalid status value' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware to get a specific seller by Email
async function getSellerByEmail(req, res, next) {
  try {
    const seller = await Seller.findOne({ email: req.params.email });
    if (seller == null) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.seller = seller;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


// Register a new user
app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  
  // Hash the password (you'll need to install bcrypt)
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  let newUser;
  
  if (role === 'Admin') {
    newUser = new WH_Admin({ email, password: hashedPassword, role });
  } else if (role === 'Seller') {
    newUser = new Seller({ email, password: hashedPassword, role });
  } else {
    newUser = new Customer({ email, password: hashedPassword, role });
  }
  
  await newUser.save();
  res.status(201).json({ message: 'User registered', newUser });
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email (you'll need to search in all collections)
  let user = await WH_Admin.findOne({ email }) || await Seller.findOne({ email }) || await Customer.findOne({ email });
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Validate password
  const validPassword = bcrypt.compareSync(password, user.password);
  
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Generate JWT token
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  
  res.status(200).json({ token });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
