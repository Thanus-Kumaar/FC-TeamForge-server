const { userModule } = require("../db/userModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const authController = {
  signup: async (req, res) => {
    const { username, email, password } = req.body; // Password should be send hashed

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await userModule.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    await userModule.createUser(username, email, password);

    res.status(201).json({ message: "User registered successfully" });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await userModule.findUserByEmail(email);

    if(!user){
        return res.status(400).json({error: "User not found"});
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "6h",
    });
    res.status(200).json({ message: "Login successful", token });
  },
};


module.exports = { authController };
