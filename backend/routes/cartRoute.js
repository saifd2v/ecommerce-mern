const { addToCart, removeFromCart } = require("../controllers/cartController");
const router = require("express").Router();

router.post("/:id", addToCart);
router.delete("/:id", removeFromCart);

module.exports = router;