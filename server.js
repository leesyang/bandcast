require('dotenv').config();

var express = require('express');
var connectEnsure = require('connect-ensure-login');
var passport = require('passport');
var { googleAuth, googleAuthCb, googleStrategy } = require('./middleware/auth.js');


// Configure Passport authenticated session persistence for non-database app.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Configure static files.
app.use('/assets', express.static('assets'))

// Define routes.
app.get('/', connectEnsure.ensureLoggedIn(),
  function(req, res) {
    console.log(req.user);
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

// ----- auth routes -----
app.get('/auth/google', googleAuth);

app.get( '/auth/google/callback', googleAuthCb);

app.get('/auth/google/failure', function(req, res) {
  res.render('login');
});

app.get('/profile',
  connectEnsure.ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  }); 

app.get('/home',
  connectEnsure.ensureLoggedIn(),
  function(req, res){
    console.log(req.user)
    res.render('home', { user: req.user });
  }); 

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(process.env['PORT'] || 8080);