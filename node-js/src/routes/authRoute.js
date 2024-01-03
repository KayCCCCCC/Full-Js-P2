const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middlewares/authentication');
const { authController } = require('../controllers/authController');

router.post('/register', authController.Register);
router.post('/login', authController.Login);
router.post("/logout", authController.logout);
// router.get('/account', authenticationMiddleware.checkJWT, authenticationMiddleware.refresh_token, authController.getUserAccount)
router.get('/account', authenticationMiddleware.checkJWT, authController.getUserAccount)
module.exports = router