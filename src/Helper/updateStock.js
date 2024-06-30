import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const updateStock = asyncHandler(async (productId, purchaseStockData) => {
  const { quantity, type } = purchaseStockData;

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  if (type === "purchase") {
    product.stock += quantity;
  } else if (type === "order") {
    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }
    product.stock -= quantity;
  } else {
    throw new Error("Invalid operation type");
  }

  await product.save();
});

export default updateStock;
