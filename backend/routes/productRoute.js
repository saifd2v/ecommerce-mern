const { addProduct, deleteProduct } = require("../controllers/productController");
const upload = require("../middlewares/Upload");
const router = require("express").Router();

router.post("/", upload.single("image"), addProduct);
router.delete("/:id", deleteProduct);

module.exports = router;