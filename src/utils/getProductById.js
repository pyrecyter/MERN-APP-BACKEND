import Product from "../models/product.model.js";

export const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    return product?.toJSON();
  } catch (error) {
    console.error(error);
    return null;
  }
};
