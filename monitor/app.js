'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

const sqlChecks = require('./sqlStatChecks');
sqlChecks.testDatabase( (rows) => {
  console.dir(rows);
});
const mongoChecks = require('./mongoStatChecks');

mongoChecks.insert({table:{testinsert:"version"}}, (err,res) => {
	if(!err) {
		console.log("mongo test insert");
		console.dir(res);
		mongoChecks.select({find:'testinsert'}, (err,res) => {
			console.log("mongo test select");
			console.dir(res);
		});
	}
});

const redisChecks = require('./redisStatChecks');
redisChecks.createQueue('testqueuetest', (resp) => {
	console.dir(resp);
});
redisChecks.listQueues( (err,queues) => {
	if(err) {
		console.dir(err);
	} else {
		console.dir(queues);
	}
});

app.use(express.static('frontend'));

app.get('/', (req, res) => {
  res.send('<h1>Hello i am the webapp</h1>\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);