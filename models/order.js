const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    owner: {
        type: String,
    },
    total: Number,
    date: {
        type: String,
    },
    quantity:Number,
    address:String,
    email:String,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
