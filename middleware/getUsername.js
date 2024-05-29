module.exports = (req, res, next) => {
    if (req.cookies.username) {
        res.locals.user = req.cookies.username;
    }
    next();
};
