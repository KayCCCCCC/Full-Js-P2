const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middlewares/authentication');
const { customerController } = require('../controllers/customerController');

router.post('/create', authenticationMiddleware.checkJWT, authenticationMiddleware.checkUserPermission, customerController.createUser);
router.get('/list-user', authenticationMiddleware.checkJWT, authenticationMiddleware.checkUserPermission, customerController.getListUsers);
router.get('/get/:id', customerController.getUserById);
router.patch('/update', authenticationMiddleware.checkJWT, authenticationMiddleware.checkUserPermission, customerController.updateUser);
router.delete('/delete', authenticationMiddleware.checkJWT, authenticationMiddleware.checkUserPermission, customerController.deleteUser);

module.exports = router