var express = require('express');
var morgan = require('morgan');
var travelRouter = require('./routes/travel');
var directionsRouter = require('./routes/directions');

var port = process.env.PORT || 8080;

express()
	.use(morgan('dev'))
	.use(express.static('public'))
	.use('/travel', travelRouter)
	.use('/directions', directionsRouter)
	.listen(8080, ()=>console.log('Listening on http://localhost:8080'));