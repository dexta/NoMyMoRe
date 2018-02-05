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

app.use(express.static('frontend'));

app.get('/', (req, res) => {
  res.send('<h1>Hello i am the webapp</h1>\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);