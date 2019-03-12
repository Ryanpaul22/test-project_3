const express = require('express');
const router = express.Router();

// Partner Model
const Partner = require('../../models/Partner')


module.exports = (app) => {
  
  // @route GET api/partners
  // Get All Partners
  app.get('/api/partners', (req, res) => {
    Partner.find()
    .sort({ date: -1 })
    .then(partners => res.json(partners) )
  })

  // @route POST api/partners
  // Create a Partner
  app.post('/api/partners', (req, res) => {
    const newPartner = new Partner({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone
    });

    newPartner.save().then(partner => res.json(partner));
  });

   // @route DELETE api/partners
  // Delete a partner
  app.delete('/api/partners/:id', (req, res) => {
    Partner.findById(req.params.id)
    .then(partner => partner.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}))
  });
    

}