import Product from "../models/product.model.js";
import { getCategoryIdByName } from "../utils/getCategoryIdByName.js";

// Get all products
export const getProducts = async (_, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    const message = "Error fetching products";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    const message = "Error fetching products";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Add a product
export const addProduct = async (req, res) => {
  try {
    const { name, description, images, stock, category, unitPrice } = req.body;
    const categoryId = await getCategoryIdByName(category);
    if (!categoryId)
      return res.status(400).json({ message: "Invalid category" });
    const products = await Product.create({
      name,
      description,
      images,
      stock,
      category,
      unitPrice,
    });
    res.status(201).json(products);
  } catch (error) {
    const message = "Error fetching products";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Update a product
export const editProduct = async (req, res) => {
  try {
    const { name, description, images, stock, category, unitPrice } = req.body;
    const productId = req.params.id;
    const categoryId = await getCategoryIdByName(category);
    if (!categoryId)
      return res.status(400).json({ message: "Invalid category" });
    const product = await Product.findByIdAndUpdate(
      productId,
      { name, description, images, stock, category, unitPrice },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    const message = "Error fetching products";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Update product quantity
export const updateProductQuantity = async (req, res) => {
  try {
    const { stock } = req.body;
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(
      productId,
      { stock },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    const message = "Error fetching products";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const message = "product deleted";
    res.status(200).json({ message });
  } catch (error) {
    const message = "Error fetching products";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};
