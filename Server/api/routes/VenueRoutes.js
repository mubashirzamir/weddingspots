const router = require('express').Router();
const VenueController = require('../controllers/VenueControllers');
const { validateToken } = require('../middleware/AuthMiddleware');

router.post('/reviews', validateToken, VenueController.getReviews);
router.post('/addReview', validateToken, VenueController.addReview);

router.get('', VenueController.getVenues);
router.get('/:venue_id', VenueController.getVenues);


module.exports = router;
