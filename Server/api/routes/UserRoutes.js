const router = require('express').Router();
const UserController = require('../controllers/UserControllers')
const { validateToken } = require('../middleware/AuthMiddleware')

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/about', UserController.about);
router.get('/getUser', validateToken, UserController.getUser);
router.get('/isLoggedIn', validateToken, UserController.getUser);
router.post('/updateProfile', validateToken, UserController.updateProfile);
router.get('/bookings', validateToken, UserController.getBookings);


module.exports = router;
