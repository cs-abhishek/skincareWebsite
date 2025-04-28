const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();  // Loads the .env file

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',   // ✅ your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  };
  
  app.use(cors(corsOptions));
  
app.use(express.json()); // Middleware to parse incoming JSON data
const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB connection using the URI from your .env file
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));





// Test route to confirm the backend is running
app.get("/", (req, res) => {
  res.send("Skincare Backend is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
