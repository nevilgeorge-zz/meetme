var Event = require('../models/event.js'),
	User = require('../models/user.js'),
	uuid = require('node-uuid'),
	datejs = require('../node_modules/datejs/date.js'),
	gcal = require('google-calendar'),
	google_calendar;

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

		// Add user to event's array of users - EVENT CAN HAVE MANY USERS
		newEvent.users.push(req.user);

		newEvent.save(function(err) {
			if (err) {
				throw err;
			} else {
				//res.render('schedule.ejs', { thisEvent: newEvent });
				//res.redirect('/schedule');
				// Add event to user's array of events - USER CAN HAVE MANY EVENTS
				User.findOne({ 'google.id': req.user.google.id }, function(err, user) {
					if (err) {
						throw err;
					} else {
						user.google.events.push(newEvent);
						user.save(function(err) {
							if (err) {
								throw err;
							} else {
								res.redirect('/schedule');
							}
						})
					}
				});
			}
		});
	});

	app.get('/schedule', function(req, res) {
		Event.findOne({'users' : [req.user]}, function(err, thisEvent) {
			if (err) {
				throw err;
			} else {
				console.log(thisEvent);
				console.log(req.user);
			}
			// 	google_calendar = new gcal.GoogleCalendar(req.user.google.token);
			// 	google_calendar.events.list(profile.emails[0].value, { 'timeMin': startDate.toISOString(), 'timeMax': endDate.toISOString() }, function(err, eventList) {
			// 		if (err) {
			// 			console.log(err);
			// 		} else {
			// 		console.log(eventList);
			// 	}
			// });
			// }
		});
		
		res.render('schedule.ejs');
	});

	app.get('/sendEvent', function(req, res) {
		res.render('sendEvent.ejs');
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