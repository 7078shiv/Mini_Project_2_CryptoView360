const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');



router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),userController.createSession);

router.get('/logout',userController.destroySession);


module.exports = router;