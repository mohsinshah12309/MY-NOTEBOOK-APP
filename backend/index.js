const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const notesRouter = require('./routes/notes');
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Connect to MongoDB once
connectToMongo()
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


module.exports = app;
