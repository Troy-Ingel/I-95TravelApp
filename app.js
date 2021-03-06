// variables
var express = require('express');
var morgan = require('morgan');
var travelRouter = require('./routes/travel');
var directionsRouter = require('./routes/directions');
var cameraRouter = require('./routes/cameras');
var port = process.env.PORT || 8080;

// set up express routers, host server on port 8080
express()
	.use(morgan('dev'))
	.use(express.static('public'))
	.use('/travel', travelRouter)
	.use('/directions', directionsRouter)
	.use('/cameras', cameraRouter)
	.listen(port);