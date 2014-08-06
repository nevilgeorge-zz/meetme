// app.js - the central file that brings all other files together

// require all modules
var flash = require('connect-flash'),
	express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	fs = require('fs');

// instantiate app
var app = express();

// connect to mongoDB database
mongoose.connect('mongodb://localhost:27017/meetme');

// set up ejs for templating
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('assets', __dirname + '/views/assets');

// pass the passport to the file that takes care of authentication
require('./app/passport.js')(passport);

// include views directory to app
app.use('/views', express.static(__dirname + '/views'));
app.use('/assets', express.static(__dirname + '/views/assets'));

// Set up the app to use modules when needed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(flash());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: 'nevilandjonmakeanapp'}));
app.use(passport.initialize());
app.use(passport.session());

// seperating the app's routes from the rest of the app
require('./app/routes.js')(app, passport); //routes.js needs app and passport to be used

app.listen(8080, function(){
	console.log('Listening on port 8080...');
});