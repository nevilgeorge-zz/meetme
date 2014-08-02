// Event schema - models/event.js
var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	title: String,
	location: String,
	description, String,
	startDate: String,
	endDate: String,
	duration: Number
});

module.exports = mongoose.model('Event', eventSchema);