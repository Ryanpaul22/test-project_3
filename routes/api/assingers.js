const express = require('express');
const router = express.Router();

// Assinger Model
const Assinger = require('../../models/Assinger')


module.exports = (app) => {
  
  // @route GET api/assingers
  // Get All Assingers
  app.get('/api/assingers', (req, res) => {
    Assinger.find()
    .sort({ date: -1 })
    .then(assingers => res.json(assingers) )
  })

  // @route POST api/assingers
  // Create a Assinger
  app.post('/api/assingers', (req, res) => {
    const newAssinger = new Assinger({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone
    });

    newAssinger.save().then(assinger => res.json(assinger));
  });

   // @route DELETE api/assingers
  // Delete an Assinger
  app.delete('/api/assingers/:id', (req, res) => {
    Assinger.findById(req.params.id)
    .then(assinger => assinger.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}))
  });
    

    
  
}