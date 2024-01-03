const express = require('express');
const router = express.Router();
const { userController } = require('../controllers/userController')

router.get('/', userController.getUserPage);
router.post('/create', userController.createUserPage);
router.get('/list-user', userController.getAllUser);
router.post('/delete/:id', userController.deleteUser)
router.post('/get/:id', userController.getUserById);
router.post('/update/:id', userController.updateUser);

module.exports = router