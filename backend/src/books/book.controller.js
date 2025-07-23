const Book = require("./book.model");

const postABook = async (req, res) => {
      try {
        const newBook = await Book ({...req.body});
        await newBook.save();
        res.status(200).send({message:"Book Posted Successfully", book: newBook})
      } catch (error) {
        console.error("Error created book", error);
        res.status(500).send({message:"Failed to create book"})

      }

}

// get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1});
        res.status(200).send({books})
    } catch (error) {
         console.error("Error fetching  books", error);
        res.status(500).send({message:"Failed to fetch books"})
        
    }
}

//get a single book
const getSingleBook = async (req, res) => {
    try {
         const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
           res.status(404).send({message: "Book not Found!"})

        }
        res.status(200).send({book})

        
    } catch (error) {
         console.error("Error fetching  book", error);
        res.status(500).send({message:"Failed to fetch book"})
        
    }
}

// update book data
const updatedBook = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBook =  await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedBook) {
            res.status(404).send({message: "Book is not Found!"})
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        console.error("Error updating a book", error);
        res.status(500).send({message: "Failed to update a book"})
    }
}

//delete book data
const deleteABook = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedBook =  await Book.findByIdAndDelete(id);
        if(!deletedBook) {
            res.status(404).send({message: "Book is not Found!"})
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({message: "Failed to delete a book"})
    }
};








module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    updatedBook,
    deleteABook,

}














// const Book = require("./book.model");
// const mongoose = require("mongoose");

// // 📘 Create a new book
// const postABook = async (req, res) => {
//   try {
//     const newBook = await Book({ ...req.body });
//     await newBook.save();
//     res.status(200).send({
//       message: "Book Posted Successfully",
//       book: newBook,
//     });
//   } catch (error) {
//     console.error("Error creating book", error);
//     res.status(500).send({ message: "Failed to create book" });
//   }
// };

// // 📚 Get all books
// const getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.find().sort({ createdAt: -1 });
//     res.status(200).send({ books });
//   } catch (error) {
//     console.error("Error fetching books", error);
//     res.status(500).send({ message: "Failed to fetch books" });
//   }
// };

// // 📖 Get a single book by ID
// const getSingleBook = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const book = await Book.findById(id);
//     if (!book) {
//       return res.status(404).send({ message: "Book not found!" });
//     }
//     res.status(200).send({ book });
//   } catch (error) {
//     console.error("Error fetching book", error);
//     res.status(500).send({ message: "Failed to fetch book" });
//   }
// };

// // 🛠️ Update a book
// const updatedBook = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updatedBook) {
//       return res.status(404).send({ message: "Book not found!" });
//     }
//     res.status(200).send({
//       message: "Book updated successfully",
//       book: updatedBook,
//     });
//   } catch (error) {
//     console.error("Error updating book", error);
//     res.status(500).send({ message: "Failed to update book" });
//   }
// };

// // ❌ Delete a book
// const deleteABook = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedBook = await Book.findByIdAndDelete(id);
//     if (!deletedBook) {
//       return res.status(404).send({ message: "Book not found!" });
//     }
//     res.status(200).send({
//       message: "Book deleted successfully",
//       book: deletedBook,
//     });
//   } catch (error) {
//     console.error("Error deleting book", error);
//     res.status(500).send({ message: "Failed to delete book" });
//   }
// };

// // 🔍 Search books (linear + content-based)
// const searchBooks = async (req, res) => {
//   const { q } = req.query;

//   if (!q || q.trim() === "") {
//     return res.status(400).send({ message: "Search query is required" });
//   }

//   const regex = new RegExp(q, "i"); // case-insensitive match

//   try {
//     const books = await Book.find({
//       $or: [
//         { title: regex },
//         { description: regex },
//         { category: regex },
//         { author: regex },         // optional field if your model has it
//         { tags: regex }            // if tags is an array of strings
//       ]
//     });

//     res.status(200).send({ books });
//   } catch (error) {
//     console.error("Search error:", error);
//     res.status(500).send({ message: "Search failed" });
//   }
// };

// // Get similar books by category (example logic)

// const getSimilarBooks = async (req, res) => {
//   try {
//     const { bookId } = req.params;

//     // Validate bookId to be a valid ObjectId string
//     if (!mongoose.Types.ObjectId.isValid(bookId)) {
//       return res.status(400).json({ message: "Invalid book ID" });
//     }

//     const currentBook = await Book.findById(bookId);
//     if (!currentBook) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     const similarBooks = await Book.find({
//       category: currentBook.category,
//       _id: { $ne: bookId },
//     }).limit(10);

//     res.status(200).json({ books: similarBooks });
//   } catch (error) {
//     console.error("Error fetching similar books", error);
//     res.status(500).json({ message: "Failed to get similar books" });
//   }
// };

// // ✅ Export all controller functions
// module.exports = {
//   postABook,
//   getAllBooks,
//   getSingleBook,
//   updatedBook,
//   deleteABook,
//   searchBooks, 
//    getSimilarBooks  // <-- add here!

// };
