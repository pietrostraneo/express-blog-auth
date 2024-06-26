const jwt = require('jsonwebtoken');
require('dotenv').config();
const users = require('../db/users.json');

const key = process.env.PRIVATE_KEY;

const generateToken = user => jwt.sign(user, key, { expiresIn: "1m" });

const authenticate = (req, res, next) => {

    const token = req.cookies.auth_token

    if (!token) {
        return res.status(401).json({ error: "You must be logged in" });
    }

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
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = generateToken(user);
    res.format({
        json: () => res.json({ token }),
        html: () => {
            res.cookie('auth_token', token, { httpOnly: true });
            res.cookie('username', user.username, { httpOnly: true });
            res.redirect('/');
        }
    })
}

const admin = (req, res, next) => {
    const { username, password } = req.user;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user || !user.admin) {
        return res.status(403).send('Non sei autorizzato, devi essere admin');
    }
    next();
}

module.exports = {
    generateToken,
    authenticate,
    login,
    admin
}