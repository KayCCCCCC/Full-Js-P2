const router = require("express").Router();
const authenticationMiddleware = require('../middlewares/authentication');

// Apply authentication middleware to all routes
// router.use('*', authenticationMiddleware.auth);

//web
const homeRoutes = require('./homeRoute');
const userRoutes = require('./userRoute');

router.use('/home', homeRoutes);
router.use('/user', userRoutes);


// new API
const authRoutes = require('./authRoute');
router.use('/auth', authRoutes)

const cusRoutes = require('./customerRoute');
router.use('/cus', cusRoutes)



module.exports = router;