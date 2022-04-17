const router = require('express').Router();
const AdminController = require('../controllers/AdminControllers')
const { validateToken, permitAdmin } = require('../middleware/AuthMiddleware')

router.get('/getUsers', validateToken, permitAdmin, AdminController.getUsers);
router.get('/getUsers/:user_id', validateToken, permitAdmin, AdminController.getUsers);

router.post('/deleteUser/:user_id', validateToken, permitAdmin, AdminController.deleteUser);
router.post('/updateUser', validateToken, permitAdmin, AdminController.updateUser);

router.post('/toggleFeaturedVenue/:venue_id', validateToken, permitAdmin, AdminController.toggleFeaturedVenue);

module.exports = router;
