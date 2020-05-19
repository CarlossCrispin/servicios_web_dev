const express = require("express");
let router = express.Router();

const favoritesController = require('../controllers/FavoritesController');
const authenticateOwner = require("../middlewares/authenticateOwner");

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secrets');

router.route('/')
    .post(favoritesController.create)
    .get(jwtMiddleware({secret:secrets.jwtSecret}),favoritesController.index)
    // .get(favoritesController.index)

router.route('/:id')
    .get(favoritesController.show)
    .delete(favoritesController.find, authenticateOwner, favoritesController.destroy )

module.exports = router;