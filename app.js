var express = require('express');
var morgan = require('morgan');
var travelRouter = require('./routes/travel');
var directionsRouter = require('./routes/directions');

express()
	.use(morgan('dev'))
	.use(express.static('public'))
	.use('/travel', travelRouter)
	.use('/directions', directionsRouter)
	.listen(8080, ()=>console.log('Listening on http://localhost:8080'));