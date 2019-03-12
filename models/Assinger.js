const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define our Assinger Schema
//firstName, lastName, phone #, email

var AssingerSchema = new Schema({


  firstName: {
    type: String,
    trim: true,
    required: "First Name is Required",
  },
  lastName: {
    type: String,
    trim: true,
    required: "Last Name is Required",
  },
  phone: {
    type: String,
    trim: true,
    validate: [
      function (input) {
        return input.length = 10;
      },
      "Invalid Phone Number"
    ]
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  }
});

module.exports = Assinger = mongoose.model('Assinger', AssingerSchema);