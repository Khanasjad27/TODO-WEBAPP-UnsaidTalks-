const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");
const mongoose = require('mongoose');

const userRouter = require('./api/routes/user');
const taskRouter = require('./api/routes/task');

// CORS (important for Vercel frontend)
app.use(cors({
  origin: "*", // you can restrict later to your vercel URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);

// Health check route (very useful)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// MongoDB connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB is Connected'))
  .catch((err) => console.log(`Mongoose Connection error: ${err}`));

module.exports = app;