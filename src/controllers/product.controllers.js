import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

//Add Product
const addProduct = asyncHandler(async (req, res) => {
  const { name, manufacturer, description } = req.body;
  const userId = req.user?._id;

  if (![name, manufacturer, description].every(Boolean)) {
    throw new ApiError(400, "All details are required");
  }
  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid User ID");
  }

  const product = await Product.create({
    owner: userId,
    name,
    manufacturer,
    description,
  });
  if (!product) {
    throw new ApiError(400, "Error while adding product");
  }
  res
    .status(200)
    .json(new ApiResponse(200, product, "Product added successfully"));
});

// Get All Products
const getAllProducts = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID.");
  }

  const products = await Product.find({ owner: userId });

  if (!products || products.length === 0) {
    throw new ApiError(400, "No products found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

// Delete Selected Product
const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw new ApiError(400, "Invalid Product Id");
  }

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new ApiError(400, "Error while deleting product.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product deleted successfully."));
});

// Update Selected Product
const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  const { name, manufacturer, description } = req.body;

  if (!isValidObjectId(productId)) {
    throw new ApiError(400, "Invalid Product ID");
  }

  const obj = {};
  if (name) obj.name = name;
  if (manufacturer) obj.manufacturer = manufacturer;
  if (description) obj.description = description;

  const product = await Product.findByIdAndUpdate(
    productId,
    {
      $set: obj,
    },
    { new: true, runValidators: true }
  ).select("-password");

  if (!product) {
    throw new ApiError(400, "Error while updating product details.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product detail updated."));
});

// Search Products
const searchProduct = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { name, manufacturer, description } = req.query;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID.");
  }

  let query = { owner: userId };

  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive search by name
  }
  if (manufacturer) {
    query.manufacturer = { $regex: manufacturer, $options: "i" }; // Case-insensitive search by manufacturer
  }
  if (description) {
    query.description = { $regex: description, $options: "i" }; // Case-insensitive search by description
  }

  const products = await Product.find(query);

  if (!products || products.length === 0) {
    throw new ApiError(404, "No products found matching the search criteria.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully."));
});

export {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  searchProduct,
};
