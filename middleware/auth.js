'use strict';
var passport = require('passport');

let googleAuth = passport.authenticate('google',
{ successRedirect: '/auth/google/success', failureRedirect: '/auth/google/failure' });

let googleAuthLogin = passport.authenticate('google',
	{ scope: [ 'https://www.googleapis.com/auth/userinfo.profile'], successRedirect: '/auth/google/success', failureRedirect: '/auth/google/failure' });

let googleProtected = passport.authenticate();

module.exports = { googleAuth, googleAuthLogin, googleProtected };