const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name:String,
    description:String,
    rating:Number,
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
