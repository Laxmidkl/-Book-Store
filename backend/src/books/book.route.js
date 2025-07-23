const express = require('express')
const router =  express.Router();
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, updatedBook, deleteABook} = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');

// const { searchBooks } = require('./book.controller');
// const { getSimilarBooks } = require('./book.controller');



router.post("/create-book",verifyAdminToken, postABook)

//get all books 
router.get("/", getAllBooks)

// single book endpoint
router.get("/:id", getSingleBook);

// update a book endpoint
router.put("/edit/:id",verifyAdminToken,  updatedBook);
  
router.delete("/:id",verifyAdminToken, deleteABook)
  
// router.get("/search/query", searchBooks); // <-- Add this line

 
// router.get('/similar/:bookId', getSimilarBooks);  // <-- Add this route for similar books


module.exports = router;

//post = when submit something fronted to db
// get =  when get something back from db
// put/patch = when edit or update something
// delete = when delete something
