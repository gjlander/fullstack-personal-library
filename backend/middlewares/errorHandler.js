const errorHandler = (err, req, res, next) => {
    console.error(err.stack.red);
    res.status(err.statusCode || 500).json({ message: err.message });
};

module.exports = errorHandler;
