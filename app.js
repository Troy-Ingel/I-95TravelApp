var express = require('express');
var travelRouter = require('./routes/travel');

express()

.use(express.static('public'))
.use('/travel', travelRouter)

.listen(8080);