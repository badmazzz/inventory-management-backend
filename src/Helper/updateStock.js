import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { sendLowStockEmail } from "./lowStock.js";

const updateStock = async (productId, purchaseStockData) => {
  const { quantity, type, email } = purchaseStockData;

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (type === "sell") {
    if (product.stock < quantity) {
      console.log(email, product.name, quantity);
      sendLowStockEmail(email, product.name, quantity);
      throw new ApiError(400, "Insufficient Stock.");
    }
    product.stock -= quantity;
  } else if (type === "purchase") {
    product.stock += quantity;
  } else {
    throw new ApiError(400, "Invalid operation type");
  }

  await product.save();
};

export default updateStock;
