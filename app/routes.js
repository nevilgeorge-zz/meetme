var Event = require('../models/event.js'),
	uuid = require('node-uuid'),
	datejs = require('../node_modules/datejs/date.js');

// aggregate all of the apps routes to one file

module.exports = function(app, passport) {

	// Render first login page
	app.get('/', function(req, res) {
		var showMessage = {
			message: req.flash('loginMessage')
		};
		res.render('index.ejs', showMessage);
	});

	app.get('/event', function(req, res) {
		res.render('event.ejs');
	});

	app.post('/event', function(req, res) {
		console.log(req.body);
		//console.log(req.user);
		var newEvent = new Event();
		newEvent.uuid = uuid.v1();
		newEvent.title = req.body.title;
		newEvent.location = req.body.location;
		newEvent.description = req.body.description;
		newEvent.duration = req.body.duration;
		newEvent.startDate = Date.today();

		switch (req.body.happenWithin) {
			case 'Next day':
				newEvent.endDate = Date.today().add({ days: 1 });
				break;

			case 'Next 2 days':
				newEvent.endDate = Date.today().add({ days: 2 });
				break;

			case 'Next week':
				newEvent.endDate = Date.today().add({ weeks: 1 });
				break;

			case 'Next 2 weeks':
				newEvent.endDate = Date.today().add({ weeks: 2 });
				break;
		}

		newEvent.users.push(req.user);
		//req.user.events.push(newEvent);
		newEvent.save(function(err) {
			if (err) {
				throw err;
			} else {
				//res.render('schedule.ejs', { thisEvent: newEvent });
				res.redirect('/schedule');
			}
		});
	});

	app.get('/schedule', function(req, res) {
		console.log(req.user);
		console.log(req.body);
		res.render('schedule.ejs');
	});

	app.get('/sendEvent', function(req, res) {
		res.render('sendEvent.ejs');
	});

	app.get('/profile', function(req, res) {
		//console.log(req.user);
		res.render('profile.ejs', {
			user: req.user
		});
	});

	app.get('/scheduleEvent', function(req, res) {
		res.render('scheduleEvent.ejs');
	});

	app.get('/sendInvites', function(req, res) {
		res.render('sendInvites.js');
	});

	app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'] }));

	app.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect: '/event',
			failureRedirect: '/'
		}));
};

var isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
};