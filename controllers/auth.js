const jwt = require('jsonwebtoken');
require('dotenv').config();
const user = require('../db/users.json');

const key = process.env.PRIVATE_KEY;

const generateToken = user => jwt.sign(user, key, { expiresIn: "1m" });

const authenticate = (req, res, next) => {

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, key, (err, user) => {
        if (err) {
            return res.status(403).json(err);
        }
        req.user = user;
        next();
    })

}

module.exports = {
    generateToken,
    authenticate
}