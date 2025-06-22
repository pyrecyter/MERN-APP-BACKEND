import Category from "../models/category.model.js";

// Get all categories
export const getCategories = async (_, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    const message = "Error fetching categories";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Get single category
export const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    res.status(200).json(category);
  } catch (error) {
    const message = "Error fetching categories";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Add a category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categories = await Category.create({ name });
    res.status(201).json(categories);
  } catch (error) {
    const message = "Error fetching categories";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Update a category
export const editCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryId = req.params.id;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    const message = "Error fetching categories";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const message = "Category deleted";
    res.status(200).json({ message });
  } catch (error) {
    const message = "Error fetching categories";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};
