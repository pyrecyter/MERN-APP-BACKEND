import Category from "../models/category.model.js";

export const getCategoryIdByName = async (name) => {
  try {
    const category = await Category.findOne({ name });
    if (!category) throw Error("Not found");
    return category._id;
  } catch (error) {
    console.error(error);
    return null;
  }
};
