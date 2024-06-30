import { isValidObjectId } from "mongoose";
import { Purchase } from "../models/purchase.models.js";
import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import updateStock from "../Helper/updateStock.js";

const addPurchase = asyncHandler(async (req, res) => {
  const { productId, quantity, totalAmount } = req.body;
  const userId = req.user?._id;

  if (!productId || !quantity || !totalAmount) {
    throw new ApiError(400, "All fields are required.");
  }

  const purchaseStockData = {
    quantity,
    type: "purchase",
  };

  await updateStock(productId, purchaseStockData);

  const purchase = await Purchase.create({
    owner: userId,
    productId: productId,
    quantity: quantity,
    totalAmount: totalAmount,
  });

  if (!purchase) {
    throw new ApiError(400, "Error in creating purchase.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, purchase, "Purchase added successfully."));
});

const getPurchaseById = asyncHandler(async (req, res) => {
  const { purchaseId } = req.params;

  if (!isValidObjectId(purchaseId)) {
    throw new ApiError(400, "Invalid Purchase Id.");
  }

  const purchase = await Purchase.findById(purchaseId);
  if (!purchase) {
    throw new ApiError(400, "Purchase not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, purchase, "Purchase fetched successfully."));
});

const getAllPurchase = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid User Id.");
  }

  const purchase = await Purchase.find({ owner: userId });
  if (!purchase) {
    throw new ApiError(400, "No purchase found.");
  }
  res
    .status(200)
    .json(new ApiResponse(200, purchase, "Purchase fetched of user."));
});

const deletePurchase = asyncHandler(async (req, res) => {
  const { purchaseId } = req.params;

  if (!isValidObjectId(purchaseId)) {
    throw new ApiError(400, "Invalid Purchase Id");
  }

  const purchase = await Purchase.findById(purchaseId);

  if (!purchase) {
    throw new ApiError(404, "Purchase not found.");
  }
  const product = await Product.findById(purchase.productId);

  if (!product) {
    throw new ApiError(404, "Product not found for this purchase.");
  }
  
  product.stock -= purchase.quantity;
  await product.save();

  await Purchase.findByIdAndDelete(purchaseId);

  res
    .status(200)
    .json(new ApiResponse(200, purchase, "Purchase deleted Successfully."));
});

const updatePurchase = asyncHandler(async (req, res) => {
  const { purchaseId } = req.params;
  const { totalAmount, quantity, productId } = req.body;
  const obj = {};
  if (totalAmount) obj.totalAmount = totalAmount;
  if (quantity) obj.quantity = quantity;
  if (productId) obj.productId = productId;

  const purchase = await Purchase.findByIdAndUpdate(
    purchaseId,
    {
      $set: obj,
    },
    { new: true, runValidators: true }
  ).select("-password");

  if (!purchase) {
    throw new ApiError(400, "Purchase updation error.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, purchase, "Purchase updated successfully."));
});

export {
  addPurchase,
  getPurchaseById,
  getAllPurchase,
  deletePurchase,
  updatePurchase,
};
