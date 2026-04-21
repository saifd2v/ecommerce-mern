const { register } = require("../controllers/authController");
const registerValidator = require("../middlewares/RegisterValidator");
const router = require("express").Router();

router.post("/register", registerValidator, register);

module.exports = router;