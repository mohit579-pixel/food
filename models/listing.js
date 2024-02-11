const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: Number,
    image: {
        url:String,
        filename:String,
    },
    category: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
