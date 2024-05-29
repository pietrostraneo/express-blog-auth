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

const login = (req, res) => {
    const { username, password } = req.body;
    const user = user.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = generateToken(user);
    res.json({ token });
}

module.exports = {
    generateToken,
    authenticate,
    login
}