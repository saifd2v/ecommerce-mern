const User = require("../models/User");
const bcrypt = require("bcrypt");
const { genJWT } = require("../utils/index");

exports.register = async (req, res) => {
    const { username, email, password } = req.body || {};
    try {
        if (!username || !email || !password) return res.status(400).json({ success: false, message: "Missing fields" });
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(409).json({ success: false, message: "Email already exists" });
        const usersCount = await User.countDocuments();

        const role = usersCount === 0 ? "admin" : "user";
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();

        const token = genJWT(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        }).status(200).json({ success: true, message: "Account created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }   
}

exports.login = async (req, res) => {
    const { email, password } = req.body || {};
    try {
        if (!email || !password) return res.status(400).json({ success: false, message: "Missing fields" });
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

        const token = genJWT(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        }).status(200).json({ success: true, message: "Logged successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }   
}

exports.logout = (req, res) => {
    try {
        res.clearCookie("token").status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}