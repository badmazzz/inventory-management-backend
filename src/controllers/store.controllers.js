import { isValidObjectId } from "mongoose";
import { Store } from "../models/store.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Add Store
const addStore = asyncHandler(async (req, res) => {
  const { name, category, address, city } = req.body;
  console.log(req.body);
  const userId = req.user?._id;
  if (!name || !category || !address || !city) {
    throw new ApiError(400, "All fields are required.");
  }
  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user id.");
  }

  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required.");
  }
  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(400, "Error while uploading image on cloudinary.");
  }
  const store = await Store.create({
    owner: userId,
    name,
    category,
    address,
    city,
    image: image.url,
  });

  if (!store) {
    throw new ApiError(400, "Store is not created.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, store, "Store added successfully."));
});

// Get All Stores
const getAllStores = async (req, res) => {
  const allStores = await Store.find({ owner: req.user?._id }).sort({
    _id: -1,
  });

  res
    .status(200)
    .json(new ApiResponse(200, allStores, "All store fetched successfully."));
};

export { addStore, getAllStores };
