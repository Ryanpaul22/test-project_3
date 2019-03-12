const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define our Partner Schema
//firstName, lastName, phone, email, partner/assinger

var PartnerSchema = new Schema({


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
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Phone number required']
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  }
});

module.exports = Partner = mongoose.model('Partner', PartnerSchema);