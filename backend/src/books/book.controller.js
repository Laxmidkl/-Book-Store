const Book = require("./book.model");

// Helper function to get user preferences from localStorage
const getUserPreferences = () => {
  const userId = localStorage.getItem("uid");
  const interactions = JSON.parse(
    localStorage.getItem("userInteractions") || "{}"
  );

  if (!interactions[userId]) {
    return { likedCategories: [] };
  }

  const likedCategories = Object.entries(interactions[userId])
    .filter(([_, data]) => data.likes > 0)
    .map(([bookId, _]) => bookId);

  return { likedCategories };
};

// Get recommended books based on user likes
const getRecommendedBooks = async (req, res) => {
  try {
    const { category } = req.query;
    const { id } = req.params; // current book ID to exclude

    if (!category) {
      return res.status(400).send({ message: "Category is required" });
    }

    const recommendedBooks = await Book.find({
      category: { $regex: new RegExp(category, "i") },
      _id: { $ne: id }, // Exclude current book
    })
      .sort({
        "likes.length": -1, // Sort by most liked first
        createdAt: -1, // Then by newest
      })
      .limit(15);

    res.status(200).send({ recommendedBooks });
  } catch (error) {
    console.error("Error fetching recommended books:", error);
    res.status(500).send({ message: "Failed to fetch recommendations" });
  }
};

// Like a book
const likeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found!" });
    }

    // Check if user already liked the book
    const likeIndex = book.likes.findIndex((like) => like.userId === userId);
    let liked = false;

    if (likeIndex === -1) {
      // Add like
      book.likes.push({ userId });
      liked = true;
    } else {
      // Remove like
      book.likes.splice(likeIndex, 1);
    }

    await book.save();

    //  ADD THIS: Log who liked which book
    console.log(
      `User ${userId} ${liked ? "liked" : "removed like from"} book "${
        book.title
      }" (${book._id})`
    );

    res.status(200).send({
      message: liked ? "Book liked successfully" : "Like removed successfully",
      book,
      liked,
    });
  } catch (error) {
    console.error("Error liking book:", error);
    res.status(500).send({ message: "Failed to like book" });
  }
};

// Other controller methods remain the same...
const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book Posted Successfully", book: newBook });
  } catch (error) {
    console.error("Error created book", error);
    res.status(500).send({ message: "Failed to create book" });
  }
};

// get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send({ books });
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({ message: "Failed to fetch books" });
  }
};

//get a single book
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not Found!" });
    }
    res.status(200).send({ book });
  } catch (error) {
    console.error("Error fetching book", error);
    res.status(500).send({ message: "Failed to fetch book" });
  }
};

// update book data
const updatedBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).send({ message: "Book is not Found!" });
    }
    res.status(200).send({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating a book", error);
    res.status(500).send({ message: "Failed to update a book" });
  }
};

//delete book data
const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).send({ message: "Book is not Found!" });
    }
    res.status(200).send({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error deleting a book", error);
    res.status(500).send({ message: "Failed to delete a book" });
  }
};

// Add review to a book
const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, userName, rating, comment } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found!" });
    }

    const newReview = {
      userId,
      userName,
      rating,
      comment,
    };

    book.reviews.push(newReview);
    await book.save();

    res.status(201).send({ message: "Review added successfully", book });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).send({ message: "Failed to add review" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updatedBook,
  deleteABook,
  addReview,
  likeBook,
  getRecommendedBooks,
};
