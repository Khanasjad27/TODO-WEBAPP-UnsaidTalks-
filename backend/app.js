const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");

const mongoose = require('mongoose');

const userRouter = require('./api/routes/user');
const taskRouter = require('./api/routes/task');

// Middleware
app.use(cors());
app.use(express.json());

// Routers
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// Creating MongoBD connection
mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('MongoDB is Connected'))
    .catch((err) => console.log(`Mongoose Connection error : ${err}`));

module.exports = app;