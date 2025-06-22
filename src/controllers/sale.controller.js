import Sale from "../models/sale.model.js";
import { getProductById } from "../utils/getProductById.js";

// Get all sales
export const getSales = async (_, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    const message = "Error fetching sales";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Get single sale
export const getSale = async (req, res) => {
  try {
    const saleId = req.params.id;
    const sale = await Sale.findById(saleId);
    res.status(200).json(sale);
  } catch (error) {
    const message = "Error fetching sales";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Add a sale
export const addSale = async (req, res) => {
  try {
    const { items, customerName, address } = req.body;
    const expandedItems = [];
    for (const item of items) {
      const product = await getProductById(item.productId);
      if (!product)
        return res
          .status(400)
          .json({ message: `Invalid product ${item.productId}` });
      const { unitPrice, name, _id } = product;
      expandedItems.push({
        productId: _id,
        productName: name,
        productUnitPrice: unitPrice,
        quantity: item.quantity,
      });
    }
    const sales = await Sale.create({
      items: expandedItems,
      customerName,
      address,
    });
    res.status(201).json(sales);
  } catch (error) {
    const message = "Error fetching sales";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Update a sale
export const editSale = async (req, res) => {
  try {
    const { items, customerName, address } = req.body;
    const saleId = req.params.id;
    const expandedItems = [];
    for (const item of items) {
      const product = await getProductById(item.productId);
      if (!product)
        return res
          .status(400)
          .json({ message: `Invalid product ${item.productId}` });
      const { unitPrice, name, _id } = product;
      expandedItems.push({
        productId: _id,
        productName: name,
        productUnitPrice: unitPrice,
        quantity: item.quantity,
      });
    }
    const sale = await Sale.findByIdAndUpdate(
      saleId,
      { items: expandedItems, customerName, address },
      { new: true }
    );
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json(sale);
  } catch (error) {
    const message = "Error fetching sales";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};

// Delete a sale
export const deleteSale = async (req, res) => {
  try {
    const saleId = req.params.id;
    const sale = await Sale.findByIdAndDelete(saleId);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    const message = "Sale deleted";
    res.status(200).json({ message });
  } catch (error) {
    const message = "Error fetching sales";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};
