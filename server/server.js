require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Category, Product, Seller, Customer } = require('./schema');
const passport = require('passport');
require('./passport-config')(passport);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use((req, res, next) => {
  console.log("Debugging Middleware: ", {body: req.body, params: req.params, query: req.query});
  next();
});

// Middleware to populate all parents
const populateAllParents = async (req, res, next) => {
  const populateParents = async (category) => {
    let currentCategory = category;
    while (currentCategory.parent) {
      currentCategory.parent = await Category.findById(currentCategory.parent);
      currentCategory = currentCategory.parent;
    }
  };

  try {
    let categories = await Category.find({});
    await Promise.all(categories.map(populateParents));
    req.categoriesWithParents = categories;  // Attach the populated categories to the request object
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


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

// Middleware cheking for cookie
const authorization = (reg, res, next) => {
  const token = reg.cookies.token;
  if (!token) {
    res.status(403).json({ message: 'No authorization token detected' });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
  } catch {
    res.status(403).json({ message: 'No authorization cookie detected' });
  }
};

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
        method: 'PUT',
        path: '/updateCategoryAttribute/:name',
        description: 'Update a category attribute'
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
  const { name, parent } = req.body;

  // Find the parent category by its name
  const parentCategory = await Category.findOne({ name: parent });

  if (parent && !parentCategory) {
    return res.status(404).json({ message: 'Parent category not found' });
  }

  // Use the ObjectId of the parent category
  const newCategory = new Category({
    name,
    parent: parent ? parentCategory._id : null
  });

  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Read All Categories with all their parents
app.get('/getCategories', populateAllParents, async(req, res) => {
    res.status(200).json(req.categoriesWithParents);  // Use the populated categories from the request object
  }
);



// Read a Single Category by Name
app.get('/getCategoryByName/:name', populateAllParents, async (req, res) => {
    const { name } = req.params;

    // Use req.categoriesWithParents to find the category by name
    const category = req.categoriesWithParents.find(cat => cat.name === name);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  }
);



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



// Update category's attributes by name
app.put('/updateCategoryAttribute/:name', async (req, res) => {
  const { name } = req.params;
  const { operationType, fieldName, value, id } = req.body;

  if (operationType === 'append') {
    await Category.updateOne(
      { name: name },
      { $push: { [fieldName]: value } }
    );
  } else if (operationType === 'delete') {
    await Category.updateOne(
      { name: name },
      { $pull: { [fieldName]: {id: id} } }
    );
  } else if (operationType === 'update') {
    await Category.updateOne(
      { name: name },
      { $set: { [fieldName]: value } }
    );
  } else {
    return res.status(400).json({ message: 'Operation type not found' });
  }

  const category = await Category.findOne({ name: name });

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.status(200).json({ message: 'Category updated', category });
});



// Delete a Category by Name
app.delete('/deleteCategoryByName/:name', async (req, res) => {
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
app.patch('/sellers/:email', getSellerByEmail, async (req, res) => {
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
    const seller = await Seller.findOne({ email: req.user.email });
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    req.seller = seller;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//==============Product CRUD=============//

// CREATE a new product
app.post('/products', passport.authenticate('jwt', { session: false }), getSellerByEmail, checkRole("Seller"), async (req, res) => {
  if (req.seller.status !== 'Approved') {
    return res.status(403).json({ message: 'Only approved sellers can add products' });
  }
  try {
    const { name, basicAttributes, category, sellerId } = req.body;
    const newProduct = new Product({
      name,
      basicAttributes,
      category,
      seller: sellerId
    });
    await newProduct.save();
    res.status(201).json({ message: 'Product added', newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// READ all products for a specific seller
app.get('/products', passport.authenticate('jwt', { session: false }), getSellerByEmail, checkRole("Seller"), async (req, res) => {
  if (req.seller.status !== 'Approved') {
    return res.status(403).json({ message: 'Only approved sellers can view products' });
  }
  try {
    const sellerId = req.query.sellerID;
    const products = await Product.find({ seller: sellerId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch products' });
  }
});

// UPDATE a product by ID
app.put('/products/:id', passport.authenticate('jwt', { session: false }), getSellerByEmail, checkRole("Seller"), async (req, res) => {
  if (req.seller.status !== 'Approved') {
    return res.status(403).json({ message: 'Only approved sellers can update products' });
  }  
  try {
    const productId = req.params.id;
    const sellerId = req.query.sellerID;
    const updates = req.body;

    const product = await Product.findOne({ _id: productId, seller: sellerId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.assign(product, updates);
    await product.save();

    res.status(200).json({ message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE a product by ID
app.delete('/products/:id', passport.authenticate('jwt', { session: false }), getSellerByEmail, checkRole("Seller"), async (req, res) => {
  if (req.seller.status !== 'Approved') {
    return res.status(403).json({ message: 'Only approved sellers can delete products' });
  }  
  try {
    const productId = req.params.id;
    const sellerId = req.query.sellerID;
    const product = await Product.findOneAndDelete({ _id: productId, seller: sellerId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



//=============Sign/Auth==========//

// Register a new user
app.post('/register', async (req, res) => {
  const { email, password, role, phone } = req.body;

  try {
    const existingUserByEmail = await Promise.all([
      Seller.findOne({ email }),
      Customer.findOne({ email }),
    ]);

    if (existingUserByEmail.some(user => user)) {
      const errorMessage = "Email already in use";
      return res.status(409).json({ errorMessage, user: req.user });
    }

    const existingUserByPhone = await Promise.all([
      Seller.findOne({ phone }),
      Customer.findOne({ phone }),
    ]);

    if (existingUserByPhone.some(user => user)) {
      const errorMessage = "Phone number already in use";
      return res.status(409).json({ errorMessage, user: req.user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }    

  // Hash the password (you'll need to install bcrypt)
  const hashedPassword = bcrypt.hashSync(password, 10);

  let newUser;

if (role === 'Seller') {
    newUser = new Seller({ email, password: hashedPassword, role, phone });
  } else {
    newUser = new Customer({ email, password: hashedPassword, role, phone });
  }

  await newUser.save();
  res.status(201).json({ message: 'User registered', newUser });
});



//=============Login/Auth============//

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email (you'll need to search in all collections)
  let user = await Seller.findOne({ email }) || await Customer.findOne({ email });
  
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
  res.cookie('token', token)
  res.status(200).json({ token });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});




