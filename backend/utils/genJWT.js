const jwt = require("jsonwebtoken");

const genJWT = (id) => {
    const token = jwt.sign(
        { userId: id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return token;
}

module.exports = { genJWT };