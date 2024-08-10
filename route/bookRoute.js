import express from "express";
import Book from "../model/bookModel.js";

const router = express.Router();

//Route for Save a new Book
router.post("/", async (req, res) => {
  try {
    if (!(req.body.title || req.body.author || req.body.publishYear)) {
      return res.status(400).send({
        message: "Send all required fields: title,author,publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// All books
router.get("/", async (req, res) => {
  try {
    const book = await Book.find({});
    return res.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
});

// One books
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
});

// Update book
router.put("/:id", async (req, res) => {
  try {
    if (!(req.body.title || req.body.author || req.body.publishYear)) {
      return res.status(400).send({
        message: "Send all required fields: title,author,publishYear",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not Found" });
    }

    return res.status(200).json({ mesage: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.meaage });
  }
});

// Delete Book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted succeefully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
