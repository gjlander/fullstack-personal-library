const User = require('../models/user.js');
const ErrorResponse = require('../utils/ErrorResponse.js');

// get all users
const getAllUsers = async (req, res, next) => {
    try {
        // throw new Error('Something went wrong');
        const users = await User.find().populate('readingList.bookRefId');
        if (!users.length) {
            res.status(200).json({ msg: 'No users in the DB' });
        } else {
            res.status(200).json({ users });
        }
    } catch (error) {
        // res.status(500).json(error.message);
        // next()
        next(error);
    }
};

// get one user
const getOneUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('readingList.bookRefId');

        if (!user) {
            throw new ErrorResponse('I did not find this user :(', 404);
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// create a new user
const createUser = async (req, res, next) => {
    try {
        // We grab exactly the keys that we have in the blueprint (Schema)
        const { firstName, lastName, email } = req.body;
        const user = await User.create({ firstName, lastName, email });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.find({ email }).populate(
            'readingList.bookRefId'
        );
        if (!user.length) {
            throw new ErrorResponse('User not found', 404);
        }

        return res.status(200).json(user);
        // res.status(404).json({ msg: 'I did not find this user :(' });
    } catch (error) {
        next(error);
    }
};

// update a user
const updateUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email } = req.body;
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                email,
            },
            {
                new: true,
            }
        );

        if (!user) {
            res.status(404).json({ msg: "I don't know this user :(" });
        } else {
            res.status(200).json({
                msg: 'User updated successfully',
                user,
            });
        }
    } catch (error) {
        next(error);
    }
};

// delete a user
const deleteOneUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            res.status(404).json({ msg: "I don't know this user :(" });
        } else {
            res.status(200).json({
                msg: 'User deleted successfully',
                user,
            });
        }
    } catch (error) {
        next(error);
    }
};

const addBookToList = async (req, res, next) => {
    try {
        const { bookRefId } = req.body;
        const { id } = req.params;

        const newBook = {
            bookRefId,
        };
        const user = await User.findById(id);

        user.readingList.push(newBook);
        await user.save();
        await user.populate('readingList.bookRefId');

        if (!user) {
            res.status(404).json({ msg: "I don't know this user :(" });
        } else {
            res.status(200).json({
                msg: 'Book added successfully',
                user,
            });
        }
    } catch (error) {
        next(error);
    }
};
const removeBookFromList = async (req, res, next) => {
    try {
        const { id, bookId } = req.params;

        const user = await User.findById(id);

        user.readingList.id(bookId).deleteOne();
        await user.save();

        if (!user) {
            res.status(404).json({ msg: "I don't know this user :(" });
        } else {
            res.status(200).json({
                msg: 'Book removed successfully',
                user,
            });
        }
    } catch (error) {
        next(error);
    }
};
const updateBookInList = async (req, res, next) => {
    try {
        const { id, bookId } = req.params;
        const { status } = req.body;

        const user = await User.findById(id);

        const book = user.readingList.id(bookId);

        book.status = status;
        await user.save();

        if (!user) {
            res.status(404).json({ msg: "I don't know this user :(" });
        } else {
            res.status(200).json({
                msg: 'Book removed successfully',
                user,
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    getUserByEmail,
    createUser,
    updateUser,
    deleteOneUser,
    addBookToList,
    removeBookFromList,
    updateBookInList,
};
