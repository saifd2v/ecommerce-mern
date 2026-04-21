const Product = require("../models/Product");
const { productSlug } = require("../utils/index");

exports.addProduct = async (req, res) => {
    const { title, description, price, stock, category } = req.body || {};
    try {
        if (!title || !description || !price || !stock || !category) return res.status(400).json({ success: false, message: "Missing fields" });
        const productExists = await Product.findOne({ title });
        if (productExists) return res.status(400).json({ success: false, message: "Product already added" });

        const slug = productSlug(title);
        const product = new Product({ title, description, price, stock, category, slug });
        await product.save();

        res.status(201).json({ success: true, message: "Product created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}