const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const z = require("zod");

const signinBody = z.object({
  username: z.string(),
  password: z.string(),
});

const signin = async (req, res) => {
  try {
    const { success, data: parsedData } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const { username, password } = parsedData;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }
    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);
    localStorage.setItem("token", token);
    return res.status(200).json({ token, message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while processing your request",
    });
  }
};

module.exports = {
  signin,
};