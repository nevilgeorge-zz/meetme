// Take care of authorization - app/passport.js

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load user model
var User = require('..models/user.js');