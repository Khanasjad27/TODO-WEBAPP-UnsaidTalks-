const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");
const mongoose = require('mongoose');

const userRouter = require('./api/routes/user');
const taskRouter = require('./api/routes/task');

// CORS
app.use(cors({
  origin: [
    "https://todo-webapp-unsaid-talks.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('MongoDB is Connected'))
  .catch((err) => console.log(`Mongoose Error: ${err}`));

module.exports = app;