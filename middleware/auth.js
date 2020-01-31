'use strict';
var passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

let googleStrategy = passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
  }
));

let googleAuth = passport.authenticate('google', { scope: 
	[ 'https://www.googleapis.com/auth/userinfo.profile' ] }
);

let googleAuthCb = passport.authenticate( 'google', { 
	successRedirect: '/home',
    failureRedirect: '/auth/google/failure'
})

module.exports = { googleAuth, googleAuthCb, googleStrategy  };