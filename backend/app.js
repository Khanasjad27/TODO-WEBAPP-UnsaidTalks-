const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");
const mongoose = require('mongoose');

const userRouter = require('./api/routes/user');
const taskRouter = require('./api/routes/task');

// PROPER CORS (FINAL FIX)
const corsOptions = {
  origin: "https://todo-webapp-unsaid-talks.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// apply cors
app.use(cors(corsOptions));

// HANDLE PREFLIGHT (MOST IMPORTANT LINE)
app.options("*", cors(corsOptions));

// middleware
app.use(express.json());

// routes
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// test route
app.get('/', (req, res) => {
  res.send("API running...");
});

// DB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

module.exports = app;