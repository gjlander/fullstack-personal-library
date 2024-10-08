const express = require('express');
const validateSchema = require('../middlewares/validateSchema.js');
const { joiUserSchema } = require('../lib/joiSchemas.js');

// import all the controllers
const {
    getAllUsers,
    getOneUser,
    createUser,
    getUserByEmail,
    updateUser,
    deleteOneUser,
    addBookToList,
    removeBookFromList,
    updateBookInList,
} = require('../controllers/userControllers.js');

// create a new instance or express router
const userRouter = express.Router();

// decide which controllers to execute on the specific actions
userRouter
    .route('/')
    .get(getAllUsers)
    .post(validateSchema(joiUserSchema), createUser);

userRouter.route('/login').post(getUserByEmail);

userRouter
    .route('/auth/:id')
    .get(getOneUser)
    .put(validateSchema(joiUserSchema), updateUser)
    .delete(deleteOneUser);

userRouter.route('/auth/:id/books').post(addBookToList);

userRouter
    .route('/auth/:id/books/:bookId')
    .put(updateBookInList)
    .delete(removeBookFromList);

module.exports = userRouter;
