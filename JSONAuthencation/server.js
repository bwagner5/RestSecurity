
		var express 	= require('express');
		var app         = express();
		var bodyParser  = require('body-parser');
		var morgan      = require('morgan');
		var mongoose    = require('mongoose');

		var jwt    = require('jsonwebtoken');
		var config = require('./config'); 

		var User   = require('./app/models/user'); 

		var port = process.env.PORT || 4040;
		mongoose.connect(config.database);
		app.set('superSecret', config.secret); 
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());
		app.use(morgan('dev'));


  
	  
		var Schema = mongoose.Schema;




		app.get('/setup', function(req, res) {


		});

		app.get('/', function(req, res) {
			res.send('The URL is  http://localhost:' + port + '/api');
		});


		var apiRoutes = express.Router(); 
		apiRoutes.post('/addnewuser', function(req, res) {
			// add a new user
			var newUser = new User({ 
				name: req.body.user, 
				password: req.body.password,
		        email: req.body.email,
		        usertype: req.body.usertype,
			    address1: req.body.address1,
			    address2: req.body.address2,
			    state: req.body.state,
			    country: req.body.country,
				admin: false 
			});
			console.log(newUser);

			newUser.save(function(err) {
				if (err) throw err;

				console.log('User saved successfully');
				res.json({ success: true });
			});
		});


		// http://localhost:8080/api/authenticate
		//Authenticate using name and password
		apiRoutes.post('/authenticate', function(req, res) {

			User.findOne({
				name: req.body.name
			}, function(err, user) {

				if (err) throw err;

				if (!user) {
					res.json({ success: false, message: 'user was not found' });
				} else if (user) {

					// check if password matches
					if (user.password != req.body.password) {
						res.json({ success: false, message: 'password was not found' });
					} else {

						// if user is found and password is right
						// create a token
						var token = jwt.sign(user, app.get('superSecret'), {
							expiresInMinutes: 1440 // expires in 24 hours
						});
		                  User.findByIdAndUpdate(user._id, { mytoken: token }, function(err, user) {
		                  if (err) throw err;
		                 console.log(user);
		                  });
						res.json({
							success: true,
							message: 'this is your token',
							token: token
						});
					}		

				}

			});
		});


		apiRoutes.use(function(req, res, next) {
			var token = req.body.token || req.param('token') || req.headers['x-access-token'];
			if (token) {
				jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
					if (err) {
						return res.json({ success: false, message: 'Failed to authenticate token.' });		
					} else {
						req.decoded = decoded;	
						next();
					}
				});
			} else {
				return res.status(403).send({ 
					success: false, 
					message: 'No token provided.'
				});
			}
		});

       //get user profile (username,email,usertype,address1,address2,state practice)
		apiRoutes.post('/profile', function(req, res) {
			var token = req.body.token || req.param('token') || req.headers['x-access-token'];

			User.findOne({mytoken: token}, function(err, users) {
			var result = [];

		     result.push(
		     {name: users.name, 
		     email: users.email,
		     usertype: users.usertype,
		     address1: users.address1,
		     address2: users.address2,
		     state: users.state,
		      practise: users.practise
		      });

		      res.contentType('application/json');
		      res.send(JSON.stringify(result));
			});
			//res.status(201).end()

		});
     

		apiRoutes.get('/check', function(req, res) {
			res.json(req.decoded);
		});

		app.use('/api', apiRoutes);

		app.listen(port);
		console.log('hi starts http://localhost:' + port);
