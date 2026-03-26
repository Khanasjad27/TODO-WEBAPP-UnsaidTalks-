const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");
const mongoose = require('mongoose');

const userRouter = require('./api/routes/user');
const taskRouter = require('./api/routes/task');

// FINAL CORS 
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// HANDLE PREFLIGHT REQUESTS
app.options("*", cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// Health check
app.get('/', (req, res) => {
  res.send("API is running...");
});

// MongoDB connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Mongo Error:', err));

module.exports = app;