const router = require("express").Router();
let Player = require("../models/players.models");

router.route("/").get((req, res) => {
  Player.find()
    .then(players => res.json(players))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const department = req.body.department;
  const stats = { wins: 0, loss: 0, rating: 1500, streak: 0 };
  const matches = [];

  const newPlayer = new Player({ username, stats, matches, department });

  newPlayer
    .save()
    .then(() => res.json(newPlayer))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Player.findById(req.params.id)
    .then(player => res.json(player))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Player.findById(req.params.id).then(player => {
    player.matches = req.body.matches;
    player.stats = req.body.stats;

    player
      .save()
      .then(() => res.json("Player updated"))
      .catch(err => res.status(400).json("Error: " + err));
  });
});

router.route("/:id").delete((req, res) => {
  Player.findByIdAndDelete(req.params.id)
    .then(() => res.json("Player deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
