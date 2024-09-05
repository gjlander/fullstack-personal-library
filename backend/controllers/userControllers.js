const User = require('../models/user.js');

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('readingList.bookRefId');
        if (!users.length) {
            res.status(200).json({ msg: 'No users in the DB' });
        } else {
            res.status(200).json({ users });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// get one user
const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('readingList.bookRefId');

        if (user) {
            return res.status(200).json(user);
        }
        res.status(404).json({ msg: 'I did not find this user :(' });
    } catch (error) {
        res.status(500).json(error);
    }
};

// create a new user
const createUser = async (req, res) => {
    try {
        // We grab exactly the keys that we have in the blueprint (Schema)
        const { firstName, lastName, email } = req.body;
        const user = await User.create({ firstName, lastName, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

// update a user
const updateUser = async (req, res) => {
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
        res.status(500).json(error);
    }
};

// delete a user
const deleteOneUser = async (req, res) => {
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
        res.status(500).json(error);
    }
};

const addBookToList = async (req, res) => {
    try {
        const { bookRefId } = req.body;
        const { id } = req.params;

        const newBook = {
            bookRefId,
        };
        const user = await User.findById(id);

        user.readingList.push(newBook);
        await user.save();

        if (!user) {
            res.status(404).json({ msg: "I don't know this user :(" });
        } else {
            res.status(200).json({
                msg: 'Book added successfully',
                user,
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
const removeBookFromList = async (req, res) => {
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
        res.status(500).json(error);
    }
};
const updateBookInList = async (req, res) => {
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
        res.status(500).json(error);
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteOneUser,
    addBookToList,
    removeBookFromList,
    updateBookInList,
};
