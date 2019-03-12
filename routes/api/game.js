const express = require('express');
const router = express.Router();

// Game Model
const Game = require('../../models/Game')
const User = require('../../models/User');


module.exports = (app) => {
  
  // @route GET api/games
  // Get All Games
  app.get('/api/games', (req, res) => {
    const userId = app.get('userId');
    User.findById(userId)
    .populate('games')
    .sort({ date: -1 })
    .then(games => res.json(games) )
  })

  // @route POST api/games
  // Create a Game
  app.post('/api/games', (req, res) => {
    const newGame = new Game({
      date: req.body.date,
      time: req.body.time,
      assinger: req.body.assinger,
      partner: req.body.partner,
      position: req.body.position,
      paymentStatus: req.body.paymentStatus,
      fee: req.body.fee,
      level: req.body.level,
      paymentType: req.body.paymentType,
      town: req.body.town,
      site: req.body.site,
      notes: req.body.site
    });

    newGame.save().then(game => {
      const userId = app.get('userId');
      return User.findByIdAndUpdate(userId, {$push: {games: game._id}}, {new: true})
    })
    .then(dbUser => res.json(dbUser));
  });

   // @route DELETE api/games
  // Delete a Game
  app.delete('/api/games/:id', (req, res) => {
    Game.findById(req.params.id)
    .then(game => game.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}))
  });
    

    
  
}