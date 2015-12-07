var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({ 
	name: String, 
	password: String, 
	email: String, 

	usertype: String, 
	address1: String, 
	address2: String, 
	state: String, 
	country: String, 
	admin: Boolean,
	mytoken: String 

}));