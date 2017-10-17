var express = require('express');
var morgan = require('morgan');
var travelRouter = require('./routes/travel');

express()
	.use(morgan('dev'))
	.use(express.static('public'))
	.use('/travel', travelRouter)
	.listen(8080, ()=>console.log('Listening on http://localhost:8080'));