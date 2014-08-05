// User schema - models/user.js
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	google: {
		uuid: String,
		id: String,
		token: String,
		email: String,
		name: String,
		events: Array
	}
});

module.exports = mongoose.model('User', userSchema);