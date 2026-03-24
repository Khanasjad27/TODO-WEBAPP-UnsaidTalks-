const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get("/", (req, res, next) => {
    User.find().then(users => {
        const responce = {
            users: users.map(user => {
                return {
                    username: user.username,
                    email: user.email,
                    _id: user._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/api/user/" + user._id
                    }
                }
            })
        };
        res.status(200).json(responce);
    })
});

router.post("/signup", (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide username, email and password." });
    }
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                res.status(409).json({ message: "User already exists." });
            } else {
                bcrypt.hash(password, 12, (err, hash) => {
                    if (err) {
                        res.status(500).json({ message: 'Hashing password failed.' });
                    } else {
                        const newUser = new User({
                            username: username,
                            email: email,
                            password: hash
                        });

                        newUser.save()
                            .then(user => {
                                res.status(201).json({ message: "User created successfully.", userId: user._id, username: user.username });
                            })
                            .catch(err => {
                                res.status(500).json({ message: 'User Creation failed', error: err });
                            })
                    }
                })
            }
        })
        .catch();
});

router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password." });
    }
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Login failed, user not found"
                })
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({ message: 'Login failed' });
                };
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    }, process.env.JWT_KEY, {
                        expiresIn: '1h'
                    });

                    res.status(200).json({
                        message: "Login Successfull",
                        token: token
                    })
                } else {
                    res.status(401).json({ message: 'Login failed' });
                }
            })
        }).catch(err => {
            res.status(500).json({ message: 'Login failed', error: err });
        })
});

router.post("/logout", (req, res, next) => {
    const authHeader = req.headers.authorization;   // this is use for taking header ke andar ka data
    if (!authHeader) {
        return res.status(401).json({ message: "Logout failed" });
    }
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];
    if (bearer === "Bearer") {

        if (token) {
            const responce = jwt.verify(token, process.env.JWT_KEY);
            if (responce) {
                return res.status(200).json({ message: "Logout Successfull", responce: responce });
            }else{
                res.status(401).json({ message: "Logout failed, Invalid Token" });
            }
        } else {
            return res.status(401).json({ message: "Logout failed, Token needed for logout" });
        }
    } else {
        return res.status(401).json({ message: "Logout failed" });
    }
});

module.exports = router;