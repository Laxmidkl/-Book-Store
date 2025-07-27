const express = require("express");
const router = express.Router();
const verifyAdminToken = require("../middleware/verifyAdminToken");

const Book = require("../books/book.model");
const Order = require("../orders/order.model");
const User = require("../users/user.model");

// Controller logic directly in the route file
router.get("/stats", verifyAdminToken, async (req, res) => {
  try {
    // Count books, orders, users in parallel
    const [totalBooks, totalOrders, totalUsers] = await Promise.all([
      Book.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
    ]);

    // Get completed sales info
    const salesResult = await Order.aggregate([
      { $match: { paymentStatus: "COMPLETE" } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
          completedOrders: { $sum: 1 },
        },
      },
    ]);

    // Trending books
    const trendingBooks = await Order.aggregate([
      { $unwind: "$productIds" },
      { $group: { _id: "$productIds", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          title: "$bookDetails.title",
          price: "$bookDetails.price",
          coverImage: "$bookDetails.coverImage",
          count: 1,
        },
      },
    ]);

    // Monthly sales
    const monthlySales = await Order.aggregate([
      { $match: { paymentStatus: "COMPLETE" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalSales: { $sum: "$totalPrice" },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { month: "$_id", totalSales: 1, orderCount: 1, _id: 0 } },
    ]);

    res.status(200).json({
      // Basic counts
      totalBooks,
      totalOrders,
      totalUsers,

      // Sales data
      totalSales: salesResult[0]?.totalSales || 0,
      completedOrders: salesResult[0]?.completedOrders || 0,
      averageOrderValue: salesResult[0]
        ? (salesResult[0].totalSales / salesResult[0].completedOrders).toFixed(
            2
          )
        : 0,

      // Trending data
      trendingBooks,
      trendingBooksCount: await Book.countDocuments({ trending: true }),

      // Time-based analytics
      monthlySales,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({
      message: "Failed to fetch admin stats",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
