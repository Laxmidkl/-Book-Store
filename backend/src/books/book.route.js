const express = require("express");
const router = express.Router();
const {
  postABook,
  getAllBooks,
  getSingleBook,
  updatedBook,
  deleteABook,
} = require("./book.controller");

// const verifyAdminToken = require('../middleware/verifyAdminToken');

router.post("/create-book", postABook); //  protected

router.get("/", getAllBooks); // public
router.get("/:id", getSingleBook);
router.put("/edit/:id", updatedBook);
router.delete("/:id", deleteABook);

module.exports = router;
