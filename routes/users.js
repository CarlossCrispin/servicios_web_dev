const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/UsersController');

const sessionsController = require('../controllers/SessionsController');
/* GET users listing. */
router.route('/')
  .post(
    usersControllers.create, 
    sessionsController.generateToken, 
    sessionsController.sendToken)
  .get(usersControllers.myPlaces)
  // .get(usersControllers.index)//delete segurity
  // .get(usersControllers.destroyAll)

module.exports = router;
