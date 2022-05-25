const router = require('express').Router();
const VenueController = require('../controllers/VenueControllers');
const { validateToken } = require('../middleware/AuthMiddleware');

router.get('/reviews', VenueController.getReviews);
router.post('/addReview', validateToken, VenueController.addReview);

router.get('', VenueController.getVenues);
router.get('/:venue_id', VenueController.getVenues);
router.get('/contact/:venue_id', VenueController.getVenueContact);

router.post('/book/:venue_id', validateToken, VenueController.book);


module.exports = router;
