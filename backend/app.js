const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')


const app = express()

//This one loads environment variables
dotenv.config()

//the middleware
app.use(cors())
app.use(express.json())

//connecting to mongodb
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB 😊🫢'))
    .catch(err=>console.error('MongoDB Connection error..', err));

//the routes
const authRoutes = require('./routes/authRoutes');


//we mount the routes here
app.use('/api/auth', authRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error' });
  });
  
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  
  module.exports = app;