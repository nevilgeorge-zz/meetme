// Event schema - models/event.js
var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	uuid: String,
	title: String,
	location: String,
	description, String,
	startDate: Date,
	endDate: Date,
	duration: Number,
	users: Array
});

module.exports = mongoose.model('Event', eventSchema);