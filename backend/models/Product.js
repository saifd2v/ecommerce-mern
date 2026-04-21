const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: String },
    slug: { type: String },
    image: { type: String, default: null },
    category: { type: String },
    stock: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);