const Book = require('../models/Book.js');

// get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if (!books.length) {
            res.status(200).json({ msg: 'No books in the DB' });
        } else {
            res.status(200).json({ books });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// get one book
const getOneBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (book) {
            return res.status(200).json(book);
        }
        res.status(404).json({ msg: 'I did not find this book :(' });
    } catch (error) {
        res.status(500).json(error);
    }
};

// create a new book
const createBook = async (req, res) => {
    try {
        // We grab exactly the keys that we have in the blueprint (Schema)
        const { title, isbn, author } = req.body;
        const book = await Book.create({ title, isbn, author });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json(error);
    }
};

// update a book
const updateBook = async (req, res) => {
    try {
        const { title, isbn, author } = req.body;
        const { id } = req.params;

        const book = await Book.findByIdAndUpdate(
            id,
            { title, isbn, author },
            {
                new: true,
            }
        );

        if (!book) {
            res.status(404).json({ msg: "I don't know this book :(" });
        } else {
            res.status(200).json({
                msg: 'Book updated successfully',
                book,
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// delete a book
const deleteOneBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            res.status(404).json({ msg: "I don't know this book :(" });
        } else {
            res.status(200).json({
                msg: 'Book deleted successfully',
                book,
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getAllBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteOneBook,
};
