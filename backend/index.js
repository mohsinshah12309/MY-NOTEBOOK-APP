const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectToMongo = require('./db');

mongoose.set('strictQuery', false);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const notesRouter = require('./routes/notes');
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRouter);

// Connect to MongoDB (only once)
connectToMongo()
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Export app for Vercel serverless functions
module.exports = app;
