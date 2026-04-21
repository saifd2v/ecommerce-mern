const { addProduct, deleteProduct } = require("../controllers/productController");
const router = require("express").Router();

router.post("/", addProduct);
router.delete("/:id", deleteProduct);

module.exports = router;