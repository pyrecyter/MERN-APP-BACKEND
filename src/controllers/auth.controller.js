import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authFailMessage = "Invalid email or password";

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const userData = req.user;
    delete userData.password;
    res.status(200).json(userData);
  } catch (error) {
    const message = "Error fetching users";
    console.error(error);
    res.status(500).json({ message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: authFailMessage });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: authFailMessage });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    const message = "Error login in";
    console.error(error);
    res.status(500).json({ message });
  }
};

// Change password of currently logged in user
export const changePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = req.user;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is invalid" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    const message = "Error updating password";
    console.error(error);
    res.status(500).json({ message });
  }
};
