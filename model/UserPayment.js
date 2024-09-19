const mongoose = require("mongoose")
const {Schema}  = mongoose;

const userDataSchema = new Schema({
  id: String,
  amount: Number,
  email: String,
  status: String,
  order_id: String,
});
const Payments = mongoose.model("payment",userDataSchema);

module.exports = Payments;