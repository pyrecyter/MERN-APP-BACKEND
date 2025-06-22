import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const errorMessages = {
  notFound: "User not found",
};

// Get all users
export const getUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    const message = "Error fetching users";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Get a single user
export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: errorMessages.notFound });
    res.status(200).json(user);
  } catch (error) {
    const message = "Error fetching users";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Create a user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // check if the email is already registed
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    const message = "Error creating user";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, role } = req.body;
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: errorMessages.notFound });
    }
    // check if the email is already registed
    if (userData.email !== email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already taken" });
      }
    }
    const newUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        role,
      },
      { new: true }
    );
    res.status(200).json(newUser);
  } catch (error) {
    const message = "Error updating user";
    console.error(error);
    res.status(500).json({ message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: errorMessages.notFound });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    const message = "Error deleting user";
    console.error(error);
    res.status(500).json({ message });
  }
};
