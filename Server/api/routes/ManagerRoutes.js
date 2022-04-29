const router = require('express').Router();
const ManagerController = require('../controllers/ManagerControllers')
const { validateToken, permitManager } = require('../middleware/AuthMiddleware')

router.post('/createVenue', validateToken, permitManager, ManagerController.createVenue);
router.post('/updateVenue', validateToken, permitManager, ManagerController.updateVenue);
router.post('/deleteVenue/:venue_id', validateToken, permitManager, ManagerController.deleteVenue);

router.get('/s3Url', validateToken, permitManager, ManagerController.uploadImage);

module.exports = router;
