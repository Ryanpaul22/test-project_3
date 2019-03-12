const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3001;

mongoose.Promise = global.Promise;

// Set up Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/project3', { useNewUrlParser: true });

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('client/build'));
// API routes
require('./routes')(app);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  }
  console.info('>>> 🌎 Open localhost:%s/ in your browser.', PORT);
});
