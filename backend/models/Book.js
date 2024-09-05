const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, 'min length is 2 chars'],
        maxLength: 255,
    },
    isbn: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Book', BookSchema);
