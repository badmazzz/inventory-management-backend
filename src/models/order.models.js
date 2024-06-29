import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    QuantityPurchased: {
      type: Number,
      required: true,
    },
    TotalPurchaseAmount: {
      type: Number,
      required: true,
    },
  }, 
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
