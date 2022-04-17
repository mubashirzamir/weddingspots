const router = require('express').Router();
const UserController = require('../controllers/UserControllers')
const { validateToken } = require('../middleware/AuthMiddleware')

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/getUser', validateToken, UserController.getUser);
router.get('/isLoggedIn', validateToken, UserController.getUser);

module.exports = router;
