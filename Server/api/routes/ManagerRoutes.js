const router = require('express').Router();
const ManagerController = require('../controllers/ManagerControllers')
const { validateToken, permitManager } = require('../middleware/AuthMiddleware')

router.post('/createVenue', validateToken, permitManager, ManagerController.createVenue);
router.post('/updateVenue', validateToken, permitManager, ManagerController.updateVenue);
router.post('/deleteVenue/:venue_id', validateToken, permitManager, ManagerController.deleteVenue);

router.post('/addImage/:venue_id', validateToken, permitManager, ManagerController.addImage);
router.get('/s3URL', validateToken, permitManager, ManagerController.s3URL);

router.post('/addLocation/:venue_id', validateToken, permitManager, ManagerController.addLocation);

router.post('/approveBooking/:booking_id', validateToken, permitManager, ManagerController.approveBooking);
router.post('/refuseBooking/:booking_id', validateToken, permitManager, ManagerController.refuseBooking);
router.get('/bookings', validateToken, ManagerController.getBookings);

module.exports = router;
