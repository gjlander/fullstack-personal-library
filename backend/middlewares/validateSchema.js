const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(error);
        }
        return next();
    };
};

module.exports = validateSchema;
