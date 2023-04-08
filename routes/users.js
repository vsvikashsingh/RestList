import express from 'express';
import passport from 'passport';

import { userRegistrationForm, userRegistration, loginForm, userLogIn, userLogOut } from '../controllers/users.js';

const router = express.Router();

router.get('/register', userRegistrationForm)

router.post('/register', userRegistration)

router.get('/login', loginForm)

router.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect:'/login', keepSessionInfo: true}) , userLogIn)

router.get('/logout', userLogOut)

export default router;