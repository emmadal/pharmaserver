const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  created_At: { type: String, required: true },
  ordinance: [{ type: String }],
  others_ordinance: [{ type: String }],
  status: { type: String, required: true },
  pharmacy_sender: {
    type: Schema.Types.ObjectId,
    ref: "Pharmacy",
  },
  delivery_boy: {
    type: Schema.Types.ObjectId,
    ref: "DeliveryBoy",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tel: { type: String },
  password: { type: String, required: true },
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  isActive: { type: Boolean },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const pharmacySchema = new Schema({
  name: { type: String, required: true },
  tel: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  doctor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
  ],
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "DeliveryBoy",
    },
  ],
  orders_received: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const deliveryBoySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tel: { type: String },
  password: { type: String, required: true },
  employer: {
    type: Schema.Types.ObjectId,
    ref: "Pharmacy",
  },
  order_attributed: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const doctorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tel: { type: String },
  password: { type: String, required: true },
  pharmacy: {
    type: Schema.Types.ObjectId,
    ref: "Pharmacy",
  },
});

const addressSchema = new Schema({
  country: { type: String },
  city: { type: String },
  state: { type: String },
  town: { type: String },
  coordinate_gps: [{type: Number}],
  default: { type: Boolean },
});

const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("User", userSchema);
const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
const DeliveryBoy = mongoose.model("DeliveryBoy", deliveryBoySchema);
const Doctor = mongoose.model("Doctor", doctorSchema);
const Address = mongoose.model("Address", addressSchema);

module.exports = {
  Order,
  User,
  Pharmacy,
  DeliveryBoy,
  Doctor,
  Address,
};
