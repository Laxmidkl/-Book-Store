const express = require("express");
const router = express.Router();
// const { getRecommendedBooks, likeBook } = require('./book.controller');

const {
  postABook,
  getAllBooks,
  getSingleBook,
  updatedBook,
  deleteABook,
  addReview,
  likeBook,
  // trackBookView,
  getRecommendedBooks,
} = require("./book.controller");

router.post("/create-book", postABook);

router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.put("/edit/:id", updatedBook);
router.delete("/:id", deleteABook);

// New routes for content-based features
router.post("/:id/reviews", addReview);
router.post("/:id/like", likeBook);
// router.post("/:id/view", trackBookView);
router.get("/:id/recommendations", getRecommendedBooks);

module.exports = router;
