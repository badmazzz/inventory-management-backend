import mongoose from "mongoose";

const sellSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    stockSold: {
      type: Number,
      required: true,
    },
    totalSellAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Sell = mongoose.model("Sell", sellSchema);
