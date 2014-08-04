// User schema - models/user.js
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	uuid: String,
	id: String,
	token: String,
	email: String,
	name: String
});

module.exports = mongoose.model('User', userSchema);