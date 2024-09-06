const Book = require('../models/Book.js');
const ErrorResponse = require('../utils/ErrorResponse.js');

// get all books
const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();

        if (!books.length) {
            return res.status(200).json({ msg: 'No books in the DB' });
        }

        return res.status(200).json({ books });
    } catch (error) {
        next(error);
    }
};

// get one book
const getOneBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            throw new ErrorResponse('I did not find this book :(', 404);
        }
        return res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

// create a new book
const createBook = async (req, res, next) => {
    try {
        // We grab exactly the keys that we have in the blueprint (Schema)
        const { title, isbn, author } = req.body;

        const book = await Book.create({ title, isbn, author });
        if (!book) {
            throw new ErrorResponse(
                'Something went wrong creating this book',
                400
            );
        }

        return res.status(201).json({ msg: 'Book successfully created', book });
    } catch (error) {
        next(error);
    }
};

// update a book
const updateBook = async (req, res, next) => {
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
            throw new ErrorResponse('Book not found', 404);
        }

        return res.status(200).json({
            msg: 'Book updated successfully',
            book,
        });
    } catch (error) {
        next(error);
    }
};

// delete a book
const deleteOneBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            throw new ErrorResponse('Book not found', 404);
        }
        return res.status(200).json({
            msg: 'Book deleted successfully',
            book,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteOneBook,
};
