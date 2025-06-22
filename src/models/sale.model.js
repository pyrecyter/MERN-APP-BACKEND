import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: String,
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productUnitPrice: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    customerName: {
      type: String,
      required: true,
    },
    address: String,
  },
  { timestamps: true }
);
const Sale = mongoose.model("sale", saleSchema);
export default Sale;
