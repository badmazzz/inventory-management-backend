import { Sell } from "../models/sell.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import updateStock from "../Helper/updateStock.js";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Purchase } from "../models/purchase.models.js";

// Add Sells
const addSells = asyncHandler(async (req, res) => {
  const { productId, storeId, stockSold, totalSellAmount } = req.body;
  const userId = req.user?._id;

  if (
    ![
      isValidObjectId(productId),
      isValidObjectId(storeId),
      isValidObjectId(userId),
      stockSold,
      totalSellAmount,
    ].every(Boolean)
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const obj = {
    quantity: stockSold,
    type: "sell",
    email: req.user?.email,
  };

  await updateStock(productId, obj);

  const sell = await Sell.create({
    owner: userId,
    productId,
    storeId,
    stockSold,
    totalSellAmount,
  });

  if (!sell) {
    throw new ApiError(400, "Sell is not generated.");
  }

  const purchase = await Purchase.find({ productId: productId });

  const totalPurchaseAmount = purchase.reduce(
    (acc, curr) => acc + curr.totalAmount,
    0
  );
  const totalQuantity = purchase.reduce((acc, curr) => acc + curr.quantity, 0);

  const profit =
    Math.round(
      (totalSellAmount / stockSold - totalPurchaseAmount / totalQuantity) *
        stockSold *
        100
    ) / 100;

  res.status(200).json(new ApiResponse(200, { sell, profit }, "Sell added."));
});

// Get All Sells Data
const getSellsData = asyncHandler(async (req, res) => {
  const sell = await Sell.find();
  res
    .status(200)
    .json(new ApiResponse(200, sell, "Sell fetched successfully."));
});

// Get total Sells amount
const getTotalSellsAmount = asyncHandler(async (req, res) => {
  const sells = await Sell.find({ owner: req.user?._id });

  if (!sells) {
    throw new ApiError(400, "Sells are not found.");
  }

  let totalsellAmount = 0;
  sells.forEach((sell) => {
    totalsellAmount += sell.totalSellAmount;
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, totalsellAmount, "Calculated total sell amount.")
    );
});

const getMonthlySells = asyncHandler(async (req, res) => {
  try {
    const sells = await Sell.find({ owner: req.user._id });

    if (!sells) {
      throw new ApiError(400, "No sells");
    }

    const monthlySells = Array(12).fill(0);

    sells.forEach((sell) => {
      const sellMonth = new Date(sell.createdAt).getMonth();
      monthlySells[sellMonth] += sell.totalSellAmount;
    });

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthlySellsWithTitles = monthNames.map((month, index) => ({
      month: month,
      amount: monthlySells[index],
    }));

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          monthlySellsWithTitles,
          "Monthly sells fetched successfully."
        )
      );
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiResponse(500, null, "Internal server error."));
  }
});

export { addSells, getMonthlySells, getSellsData, getTotalSellsAmount };
