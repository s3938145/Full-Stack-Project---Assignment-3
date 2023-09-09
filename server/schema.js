const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema for customer
const customerSchema = new Schema({
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,
  address: { type: String, default: 'Not provided' },
  role: { type: String, default: 'Customer' }
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
  basicAttributes: { type: Array, default: [] },
  category: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  dateAdded: { type: Date, default: Date.now }, // Date when the product is added
  seller: { type: Schema.Types.ObjectId, ref: 'Seller' }, // Reference to the seller
});

// schema for orders
const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  product: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number,
      customerStatus: {
        type: String,
        enum: [ 'Accepted', 'Rejected', 'Pending'],
        default: 'Pending', // You can set a default status if needed
      },
      sellerStatus: {
          type: String,
          enum: ['Canceled', 'Shipped', 'Pending'],
          default: 'Pending', // You can set a default status if needed
      }
    }
  ],
  datePlaced: { type: Date, default: Date.now },
});


// schema for categories
const categorySchema = new Schema({
  name: { type: String, default: 'Unnamed Category' },
  parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null},
  // additionalAttributes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attribute' }],
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
