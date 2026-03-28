const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");
const mongoose = require('mongoose');

// Routes
const userRouter = require('./api/routes/user');
const taskRouter = require('./api/routes/task');

// ✅ CORS (SAFE + WORKING)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// Health
app.get('/health', (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Root
app.get('/', (req, res) => {
  res.send("API running...");
});

// MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Mongo Error:', err));

module.exports = app;