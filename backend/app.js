const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");
const mongoose = require('mongoose');

// Routes
const userRouter = require('./api/routes/user');
const taskRouter = require('./api/routes/task');

// ✅ CORS (FINAL WORKING)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// Health route
app.get('/health', (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Root route
app.get('/', (req, res) => {
  res.send("API is running...");
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

// MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Mongo Error:', err));

module.exports = app;