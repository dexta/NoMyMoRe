'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const os = require("os");
const hostname = os.hostname();
const ipinterface = os.networkInterfaces();
console.dir(ipinterface);
// App
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello i am the webapp</h1>\nand this is my hostname '+hostname+" with ip "+ipinterface.eth0[0].address);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);