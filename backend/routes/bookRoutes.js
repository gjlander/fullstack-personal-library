const express = require('express');
const validateSchema = require('../middlewares/validateSchema.js');
const { joiBookSchema } = require('../lib/joiSchemas.js');

// import all the controllers
const {
    getAllBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteOneBook,
} = require('../controllers/bookControllers.js');

// create a new instance or express router
const bookRouter = express.Router();

// decide which controllers to execute on the specific actions
bookRouter
    .route('/')
    .get(getAllBooks)
    .post(validateSchema(joiBookSchema), createBook);

bookRouter
    .route('/:id')
    .get(getOneBook)
    .put(validateSchema(joiBookSchema), updateBook)
    .delete(deleteOneBook);

module.exports = bookRouter;
