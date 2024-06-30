const Store = require("../models/store");
const { asyncHandler } = require("../utils/asyncHandler");

// Add Store
const addStore = asyncHandler(async (req, res) => {
    const {}
})

// Get All Stores
const getAllStores = async (req, res) => {
  const findAllStores = await Store.find({ userID: req.params.userID }).sort({
    _id: -1,
  }); // -1 for descending;
  res.json(findAllStores);
};

module.exports = { addStore, getAllStores };
