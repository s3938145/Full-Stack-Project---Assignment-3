require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const {
  Category,
  Product,
  Seller,
  Customer,
  WH_Admin,
  Order,
} = require("./schema");
const passport = require("passport");
require("./passport-config")(passport);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(passport.initialize());
app.use((req, res, next) => {
  console.log("Debugging Middleware: ", {
    body: req.body,
    params: req.params,
    query: req.query,
  });
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
    req.categoriesWithParents = categories; // Attach the populated categories to the request object
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Middleware to check user role
function checkRole(role) {
  return function (req, res, next) {
    if (req.user && req.user.role === role) {
      // Check if req.user exists
      next();
    } else {
      res.status(403).json({ message: "Access Denied" });
    }
  };
}

// Root API Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
    availableEndpoints: [
      {
        method: "GET",
        path: "/getCategories",
        description: "Fetch all categories",
      },
      {
        method: "GET",
        path: "/getCategoryByName/:name",
        description: "Fetch a single category by name",
      },
      {
        method: "POST",
        path: "/addCategory",
        description: "Add a new category",
      },
      {
        method: "PUT",
        path: "/updateCategoryByName/:name",
        description: "Update a category by name",
      },
      {
        method: "PUT",
        path: "/updateCategoryAttribute/:name",
        description: "Update a category attribute",
      },
      {
        method: "DELETE",
        path: "/deleteCategoryByName/:name",
        description: "Delete a category by name",
      },
      {
        method: "GET",
        path: "/sellers",
        description: "Fetch all registered sellers",
      },
      {
        method: "PATCH",
        path: "/sellers/:email",
        description: "Update a seller's status by email",
      },
      {
        method: "POST",
        path: "/register",
        description: "Register a new user",
      },
      {
        method: "POST",
        path: "/login",
        description: "Login",
      },
    ],
  });
});

//===========WAREHOUSE ADMIN CRUD============//

// Create a New Category
app.post("/addCategory", async (req, res) => {
  const { name, parent } = req.body;

  // Find the parent category by its name
  const parentCategory = await Category.findOne({ name: parent });

  if (parent && !parentCategory) {
    return res.status(404).json({ message: "Parent category not found" });
  }

  // Use the ObjectId of the parent category
  const newCategory = new Category({
    name,
    parent: parent ? parentCategory._id : null,
  });

  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Read All Categories with all their parents
app.get("/getCategories", populateAllParents, async (req, res) => {
  res.status(200).json(req.categoriesWithParents); // Use the populated categories from the request object
});

// Read a Single Category by Name
app.get("/getCategoryByName/:name", populateAllParents, async (req, res) => {
  const { name } = req.params;

  // Use req.categoriesWithParents to find the category by name
  const category = req.categoriesWithParents.find((cat) => cat.name === name);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
});

// Update a Category by Name
app.put("/updateCategoryByName/:name", async (req, res) => {
  const { name } = req.params;
  const { newName, parent, additionalAttributes } = req.body;

  const updatedFields = {};
  if (newName) updatedFields.name = newName;
  if (parent) updatedFields.parent = parent;
  if (additionalAttributes)
    updatedFields.additionalAttributes = additionalAttributes;

  const category = await Category.findOneAndUpdate(
    { name: name },
    updatedFields,
    { new: true }
  );

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ message: "Category updated", category });
});

// Update category's attributes by name
app.put("/updateCategoryAttribute/:name", async (req, res) => {
  const { name } = req.params;
  const { operationType, fieldName, value, id } = req.body;

  if (operationType === "append") {
    await Category.updateOne({ name: name }, { $push: { [fieldName]: value } });
  } else if (operationType === "delete") {
    await Category.updateOne(
      { name: name },
      { $pull: { [fieldName]: { id: id } } }
    );
  } else if (operationType === "update") {
    await Category.updateOne({ name: name }, { $set: { [fieldName]: value } });
  } else {
    return res.status(400).json({ message: "Operation type not found" });
  }

  const category = await Category.findOne({ name: name });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ message: "Category updated", category });
});

// Delete a Category by Name
app.delete("/deleteCategoryByName/:name", async (req, res) => {
  const { name } = req.params;
  const category = await Category.findOneAndDelete({ name: name });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json({ message: "Category deleted" });
});

// Seller Approval //
// Read all registered sellers
app.get("/sellers", async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a seller's status by Email
app.patch("/sellers/:email", getSellerByEmail, async (req, res) => {
  console.log(req.seller);
  try {
    const { status } = req.body;

    // Update seller status
    if (status && ["Approved", "Rejected"].includes(status)) {
      req.seller.status = status;
      await req.seller.save();
      res.json({ message: "Seller status updated successfully" });
    } else {
      res.status(400).json({ message: "Invalid status value" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware to get a specific seller by Email
async function getSellerByEmail(req, res, next) {
  try {
    const seller = await Seller.findOne({ email: req.params.email });
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    req.seller = seller;
    console.log(req.seller);
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//==============Product CRUD=============//

/// Middleware to get seller data from JWT payload
async function getSellerFromJwt(req, res, next) {
  try {
    // Assuming req.user.id stores the seller ID in JWT payload, adjust if necessary
    const seller = await Seller.findById(req.user.id);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    req.seller = seller;
    console.log("Seller data from JWT:", req.seller);
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// CREATE a new product
app.post(
  "/products",
  passport.authenticate("jwt", { session: false }),
  getSellerFromJwt, // Use the new middleware here
  checkRole("Seller"),
  async (req, res) => {
    if (req.seller.status !== "Approved") {
      return res
        .status(403)
        .json({ message: "Only approved sellers can add products" });
    }

    try {
      const { name, basicAttributes, category } = req.body;

      // Use the Product.create method to create a new product
      const newProduct = await Product.create({
        name,
        category,
        seller: req.seller._id,
        basicAttributes,
      });

      res.status(201).json({ message: "Product added", newProduct });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// READ all products for a specific seller
app.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  getSellerByEmail,
  checkRole("Seller"),
  async (req, res) => {
    if (req.seller.status !== "Approved") {
      return res
        .status(403)
        .json({ message: "Only approved sellers can view products" });
    }
    try {
      const sellerId = req.query.sellerId;
      const products = await Product.find({ seller: sellerId });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Could not fetch products" });
    }
  }
);

// UPDATE a product by ID
app.put(
  "/products/:id",
  passport.authenticate("jwt", { session: false }),
  getSellerByEmail,
  checkRole("Seller"),
  async (req, res) => {
    if (req.seller.status !== "Approved") {
      return res
        .status(403)
        .json({ message: "Only approved sellers can update products" });
    }
    try {
      const productId = req.params.id;
      const sellerId = req.query.sellerId;
      const updates = req.body;

      const product = await Product.findOne({
        _id: productId,
        seller: sellerId,
      });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      Object.assign(product, updates);
      await product.save();

      res.status(200).json({ message: "Product updated", product });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// DELETE a product by ID
app.delete(
  "/products/:id",
  passport.authenticate("jwt", { session: false }),
  getSellerByEmail,
  checkRole("Seller"),
  async (req, res) => {
    if (req.seller.status !== "Approved") {
      return res
        .status(403)
        .json({ message: "Only approved sellers can delete products" });
    }
    try {
      const productId = req.params.id;
      const sellerId = req.query.sellerID;
      const product = await Product.findOneAndDelete({
        _id: productId,
        seller: sellerId,
      });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//===============Order CRUD for sellers==============//

// Seller Order Management
app.get("/sellerOrders/:sellerId", async (req, res) => {
  const { sellerId } = req.params;

  try {
    // Find orders containing products sold by the seller
    const orders = await Order.find({ "products.seller": sellerId }).populate(
      "customer"
    );

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching seller orders" });
  }
});

app.patch("/updateProductStatus/:orderId/:productId", async (req, res) => {
  const { orderId, productId } = req.params;
  const { status } = req.body;

  try {
    // Find the order and product
    const order = await Order.findById(orderId);
    const productIndex = order.products.findIndex(
      (p) => p.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in order" });
    }

    // Update the product status in the order
    order.products[productIndex].status = status;

    // Update the order status based on product statuses
    const productStatuses = order.products.map((p) => p.status);
    if (productStatuses.includes("Shipped")) {
      order.status = "Shipped";
    } else {
      order.status = "New";
    }

    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating product status" });
  }
});

app.patch(
  "/updateProductStatus/:orderId/:productId/:sellerStatus",
  async (req, res) => {
    const { orderId, productId, sellerStatus } = req.params;

    try {
      // Find the order
      const order = await Order.findById(orderId);

      console.log(order);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Find the product in the order
      const productInOrder = order.product.find((product) =>
        product.productId.equals(productId)
      );

      console.log("Dawg", productInOrder);

      if (!productInOrder) {
        return res
          .status(404)
          .json({ message: "Product not found in the order" });
      }

      // // Check if the seller can update the product status
      // if (productInOrder.seller !== req.user.id) {
      //   return res.status(403).json({ message: 'You are not authorized to update this product' });
      // }
      console.log("sellerStatus:", sellerStatus);

      if (sellerStatus === "Shipped" || sellerStatus === "Canceled") {
        // Update the status of the product
        productInOrder.sellerStatus = sellerStatus;

        console.log("Status: ", sellerStatus);
        console.log("productInOrder: ", productInOrder);

        order.markModified("product"); // Add this line to mark the 'product' field as modified
        await order.save();

        console.log("order after save: ", order); // Log the order after saving it to see the updated status

        res
          .status(200)
          .json({ message: `Product status updated to "${sellerStatus}"` });
      } else {
        res.status(400).json({ message: "Invalid status" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating product status" });
    }
  }
);

app.get("/sales-statistics/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;

    // Validate seller ID
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    console.log(seller);

    // Gather sales statistics
    const orders = await Order.find().populate({
      path: "product.productId",
      populate: {
        path: "seller",
        model: "Seller",
      },
    });

    const stats = {
      new: 0,
      shipped: 0,
      canceled: 0,
      accepted: 0,
      rejected: 0,
    };

    orders.forEach((order) => {
      order.product.forEach((product) => {
        // Get detailed product info, including the seller ID
        const detailedProduct = product.productId;

        // Check if the product belongs to the seller we are calculating the stats for
        if (
          detailedProduct &&
          detailedProduct.seller &&
          detailedProduct.seller._id.toString() === sellerId
        ) {
          if (product.sellerStatus === "Shipped") {
            stats.shipped += 1;
          } else if (product.sellerStatus === "Canceled") {
            stats.canceled += 1;
          }

          if (product.customerStatus === "Accepted") {
            stats.accepted += 1;
          } else if (product.customerStatus === "Rejected") {
            stats.rejected += 1;
          } else if (product.customerStatus === "Pending") {
            stats.new += 1;
          }
        }
      });
    });

    res.json({ statistics: stats });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

//==============Order CRUD for customer===============//

/// Middleware to get customer data from JWT payload
async function getCustomerFromJwt(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from Bearer

    // Decode the token without verifying it to inspect its payload
    const decoded = jwt.decode(token);

    console.log("Decoded JWT:", decoded);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Now we use the ID from the decoded JWT payload to find the customer
    const customer = await Customer.findById(decoded.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    req.customer = customer;
    console.log("Customer data from JWT:", req.customer);
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

// Place an order
app.post("/placeOrder", getCustomerFromJwt, async (req, res) => {
  console.log("pp", req.customer);
  const { cart } = req.body;

  try {
    // Create a new order with initial status "New"
    const order = await Order.create({
      customer: req.customer._id,
      product: cart, // Use the "cart" array as the products in the order
      status: "New",
    });
    
    console.log("Cart:", cart); // Log the cart for debugging

    console.log("Order created:", order); // Log the created order if it's successful

    res.status(201).json(order);
  } catch (error) {
    console.error("Error placing order:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
});

// Customer Order Interaction
app.get("/customerOrders/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    // Find orders for the customer
    const orders = await Order.find({ customer: customerId }).populate(
      "product"
    );
    console.log("here is the thing", orders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer orders" });
  }
});

// Customer can accept or reject products in their order
app.patch(
  "/updateProductCustomerStatus/:orderId/:productId/:customerStatus",
  async (req, res) => {
    const { orderId, productId, customerStatus } = req.params;

    try {
      // Find the order
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Find the product in the order
      const productInOrder = order.product.find((product) =>
        product.productId.equals(productId)
      );

      if (!productInOrder) {
        return res
          .status(404)
          .json({ message: "Product not found in the order" });
      }

      if (productInOrder.sellerStatus !== "Shipped") {
        return res
          .status(400)
          .json({ message: 'Product status must be "Shipped" to update' });
      }

      if (customerStatus === "Accepted" || customerStatus === "Rejected") {
        productInOrder.customerStatus = customerStatus;
        await order.save();
        res
          .status(200)
          .json({ message: `Product status updated to "${customerStatus}"` });
      } else {
        res.status(400).json({ message: "Invalid status" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating product status" });
    }
  }
);




// Endpoint to get all products for a customer
app.get("/productCustomer", async (req, res) => {
  try {
    // Assuming you have a customer ID available in the request, you can use it to find products
    // Also, populate the 'seller' field to get the seller's information
    const products = await Product.find().populate('seller');

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});



// Define a route to get a product by its ID
app.get("/getProduct/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // Use Mongoose to find the product by its ID
    const product = await Product.findById(productId);

    if (!product) {
      // If the product with the given ID is not found, return an error
      return res.status(404).json({ message: "Product not found" });
    }

    // If the product is found, return it in the response
    res.status(200).json(product);
  } catch (error) {
    // Handle any errors that occur during the database query
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
});



//=============Sign/Auth==========//

// Register a new user

app.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  // Hash the password (you'll need to install bcrypt)
  const hashedPassword = bcrypt.hashSync(password, 10);

  let newUser;

  if (role === "Admin") {
    newUser = new WH_Admin({ email, password: hashedPassword, role });
  } else if (role === "Seller") {
    newUser = new Seller({ email, password: hashedPassword, role });
  } else {
    newUser = new Customer({ email, password: hashedPassword, role, phone });
  }

  await newUser.save();
  res.status(201).json({ message: "User registered", newUser });
});

//=============Login/Auth============//

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email (you'll need to search in all collections)

  let user =
    (await WH_Admin.findOne({ email })) ||
    (await Seller.findOne({ email })) ||
    (await Customer.findOne({ email }));

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Validate password
  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({ token });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
