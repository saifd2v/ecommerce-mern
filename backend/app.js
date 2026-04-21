const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
require("dotenv").config({ quiet: true });

const app = express();
const PORT = process.env.PORT;
const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
    handler: (req, res) => {
        return res.status(429).json({ message: "Too many requests, try again later" });
    }
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));