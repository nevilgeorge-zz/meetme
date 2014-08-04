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

	app.get('/schedule', function(req, res) {
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
			successRedirect: '/profile',
			failureRedirect: '/'
		}));
};

var isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
};