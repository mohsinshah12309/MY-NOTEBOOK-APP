const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const app = express();
const port = 5000;

// Fix Mongoose deprecation warning
// mongoose.set('strictQuery', false);

// Connect to MongoDB first
connectToMongo().then(() => {
  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  const authRoutes = require('./routes/auth');
  const notesRouter = require('./routes/notes');
  
  app.use('/api/auth', authRoutes);
  app.use('/api/notes', notesRouter);

  // Start server
  app.listen(port, () => {
    console.log(`Notebook backend Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});
