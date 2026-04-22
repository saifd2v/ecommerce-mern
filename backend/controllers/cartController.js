const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
    const userId = req.params.id;
    const { productId } = req.body || {};
    try {
        if (!productId) return res.status(400).json({ success: false, message: "Missing product" });
        let userCart = await Cart.findOne({ userId: userId });

        if (!userCart) {
            userCart = await Cart.create({ userId: userId, items: [] });
        }

        const existsItem = userCart.items.find(item => item.product.equals(productId));
        if (existsItem) {
            existsItem.quantity += 1;
        } else {
            userCart.items.push({
                product: productId,
                quantity: 1
            });
        }

        await userCart.save();
        res.status(200).json({ userCart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

exports.removeFromCart = async (req, res) => {
    const userId = req.params.id;
    const { productId } = req.body || {};
    try {
        if (!productId) return res.status(400).json({ success: false, message: "Missing product" });
        const userCart = await Cart.findOne({ userId: userId });
        if (!userCart) return res.status(404).json({ success: false, message: "Cart not found" });

        const existsItem = userCart.items.find(item => item.product.equals(productId));
        if (!existsItem) return res.status(404).json({ success: false, message: "Product not found" });
 
        if (existsItem.quantity > 1) {
            existsItem.quantity -= 1;
        } else {
            userCart.items = userCart.items.filter(item => !item.product.equals(productId));
        }

        await userCart.save();
        res.status(200).json({ success: true, userCart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}