const express = require("express");
let router = express.Router();
const placesController = require('../controllers/PlacesController');
const authenticateOwner = require('../middlewares/authenticateOwner');

router
    .route("/")
    .get(placesController.index)
    .post(placesController.multerMiddleware(),placesController.create,placesController.saveImage);
router
    .route("/:id")
    .get(placesController.find, placesController.show)
    .put(placesController.find, authenticateOwner, placesController.update)
    .delete(placesController.find, authenticateOwner, placesController.destroy);

    

/*   .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  }); */
module.exports = router;
