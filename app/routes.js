// aggregate all of the apps routes to one file

module.exports = function(app, passport) {

	// Render first login page
	app.get('/', function(req, res) {
		var showMessage = {
			message: req.flash('loginMessage')
		};
		res.render('index.ejs', showMessage);
	});

	app.get('/homepage', function(req, res) {
		res.render('homepage.ejs');
	});

	app.get('/scheduleEvent', function(req, res) {
		res.render('scheduleEvent.ejs');
	});

	app.get('/sendInvites', function(req, res) {
		res.render('sendInvites.js');
	});
}