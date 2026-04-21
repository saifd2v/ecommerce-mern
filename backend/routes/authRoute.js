const { register, login } = require("../controllers/authController");
const loginValidator = require("../middlewares/LoginValidator");
const registerValidator = require("../middlewares/RegisterValidator");
const router = require("express").Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

module.exports = router;