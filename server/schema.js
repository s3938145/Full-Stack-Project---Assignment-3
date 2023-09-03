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
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,
  businessName: { type: String, default: 'Unnamed Business' },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  role: { type: String, default: 'Seller' }
});

// schema for products
const productSchema = new Schema({
  name: { type: String, default: 'Unnamed Product' },
  basicAttributes: { type: Object, default: {} },
  category: { type: Schema.Types.ObjectId, ref: 'Category', default: null }
});

// schema for orders
const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  products: { type: Array, default: [] },
  datePlaced: { type: Date, default: Date.now }
});

// schema for inbound orders
const inboundOrderSchema = new Schema({
  seller: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  products: { type: Array, default: [] },
  dateCreated: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Finished'], default: 'Pending' }
});

// schema for categories
const categorySchema = new Schema({
  name: { type: String, default: 'Unnamed Category' },
  parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null},
  additionalAttributes: { type: Array, default: [{ name: {type: String}, value: {type: [String, Number]}, required: {type: Boolean}}] },
  products: { type: Array, default: [] }
});

const Category = mongoose.model('Category', categorySchema);
const InboundOrder = mongoose.model('InboundOrder', inboundOrderSchema);
const Order = mongoose.model('Order', orderSchema);
const Product = mongoose.model('Product', productSchema);
const Seller = mongoose.model('Seller', sellerSchema);
const WH_Admin = mongoose.model('WH_Admin', whAdminSchema);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = {
  Category,
  InboundOrder,
  Order,
  Product,
  Seller,
  WH_Admin,
  Customer
};
