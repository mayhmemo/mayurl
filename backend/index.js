const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const urlRouter = require('./routes/url');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

mongoose
  .connect('mongodb://127.0.0.1/mayurl-shortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use('/', urlRouter);

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});