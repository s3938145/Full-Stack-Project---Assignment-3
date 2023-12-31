const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,
  address: { type: String, default: 'Not provided' },
  role: { type: String, default: 'Customer' },
  cart: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Reference to the product in the cart
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});



// schema for warehouse admin
const whAdminSchema = new Schema({
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'Admin' }
});

// schema for sellers
const sellerSchema = new Schema({
  email: { type: String },
  phone: { type: String, default: '1234567890'},
  password: String,
  businessName: { type: String, default: 'Unnamed Business' },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  role: { type: String, default: 'Seller' }
});

// schema for products
const productSchema = new Schema({
  name: { type: String, default: 'Unnamed Product' },
  basicAttributes: { type: Object, default: [] },
  category: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  dateAdded: { type: Date, default: Date.now }, // Date when the product is added
  seller: { type: Schema.Types.ObjectId, ref: 'Seller' }, // Reference to the seller
  price: { type: Number, required: true, default: 0 },
});

// schema for orders
const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  product: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      customerStatus: { type: String, enum: ['Accepted', 'Rejected', 'Pending'], default: 'Pending' },
      sellerStatus: { type: String, enum: ['Canceled', 'Shipped', 'Pending'], default: 'Pending' },
      price: { type: Number, required: true },  // Changed type to Number and added required: true
      seller: { type: Schema.Types.ObjectId, ref: 'Seller' },
    },
  ],
  datePlaced: { type: Date, default: Date.now },
  totalPrice: { type: Number, default: null },
});



// schema for categories
const categorySchema = new Schema({
  name: { type: String, default: 'Unnamed Category' },
  parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null},
  additionalAttributes: {type: Array, default: []},
  products: { type: Array, default: [] }
});

// schema for attributes
// const attributeSchema = new Schema({
//   name: { type: String, default: 'Unmaned Attribute' },
//   value: { type: String, Number },
//   required: { type: Boolean }
// })

const Category = mongoose.model('Category', categorySchema);
// const Attribute = mongoose.model('Attribute', attributeSchema);
const Order = mongoose.model('Order', orderSchema);
const Product = mongoose.model('Product', productSchema);
const Seller = mongoose.model('Seller', sellerSchema);
const WH_Admin = mongoose.model('WH_Admin', whAdminSchema);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = {
  Category,
  // Attribute,
  Order,
  Product,
  Seller,
  WH_Admin,
  Customer
};
