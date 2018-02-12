'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App 
const app = express();

let swarmStat = {};

const sqlChecks = require('./sqlStatChecks');
sqlChecks.testDatabase( (testresult) => {
  swarmStat[testresult.check] = testresult;
});
const mongoChecks = require('./mongoStatChecks');

mongoChecks.testDatabase( (testresult) => {
  swarmStat[testresult.check] = testresult;
});

const redisChecks = require('./redisStatChecks');

redisChecks.testDatabase( (testresult) => {
  swarmStat[testresult.check] = testresult;
});

app.use(express.static('frontend'));

app.get('/', (req, res) => {
  res.send('<h1>Hello i am the webapp</h1>\n');
});

app.get('/healthcheck', (req, res) => {
	res.json(swarmStat);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);