import Sale from "../models/sale.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const soldStock = require("../controller/soldStock");

// Add Sales
const addSale = asyncHandler(async (req, res) => {
    
});

// Get All Sales Data
const getSalesData = async (req, res) => {
  const findAllSalesData = await Sale.find({ userID: req.params.userID })
    .sort({ _id: -1 })
    .populate("ProductID")
    .populate("StoreID"); // -1 for descending order
  res.json(findAllSalesData);
};

// Get total sales amount
const getTotalSalesAmount = async (req, res) => {
  let totalSaleAmount = 0;
  const salesData = await Sale.find({ userID: req.params.userID });
  salesData.forEach((sale) => {
    totalSaleAmount += sale.TotalSaleAmount;
  });
  res.json({ totalSaleAmount });
};

const getMonthlySales = async (req, res) => {
  try {
    const sales = await Sale.find();

    // Initialize array with 12 zeros
    const salesAmount = [];
    salesAmount.length = 12;
    salesAmount.fill(0);

    sales.forEach((sale) => {
      const monthIndex = parseInt(sale.SaleDate.split("-")[1]) - 1;

      salesAmount[monthIndex] += sale.TotalSaleAmount;
    });

    res.status(200).json({ salesAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addSales,
  getMonthlySales,
  getSalesData,
  getTotalSalesAmount,
};
