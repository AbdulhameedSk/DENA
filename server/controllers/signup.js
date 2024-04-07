const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const z = require("zod");

const signupBody = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().email(),
  password: z.string(),
  location: z.string(),
  username:z.string().max(50),
});
const signup = async (req, res) => {
  try {
    const { success, data: parsedData } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "Incorrect inputs",
      });
    }
    const { firstName, lastName, email, password, location,username } = parsedData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User Already Exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      location,
    });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
    res.status(201).json({
      message: "User Created Successfully",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while processing your request",
      error
    });
  }
};
module.exports = {
  signup,
};