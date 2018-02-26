'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const os = require("os");
const hostname = os.hostname();
const ipinterface = os.networkInterfaces();
const hostip = (ipinterface.eth0||false)? ipinterface.eth0[0].address : '0.0.0.0';
// console.dir(ipinterface);
// App
const app = express();
app.use(express.static('frontend'));

app.get('/simple', (req, res) => {
  let msg = `<h1>Hello i am the webapp</h1>`;
      msg += `<h3>and this is my hostname ${hostname}</h3>`;
      msg += `<h2>with ipv4 address ${hostip} on eth0</h2>`;
      msg += `<p>some env varibles:<br> NODE_hello ${process.env.NODE_hello}<br> NODE_ENV ${process.env.NODE_ENV}</p>`;
  res.send(msg);
});

app.get('/hostdata', (req,res) => {
	res.status(200).json({hostname,hostip,buildversion:process.env.buildversion});
});

app.get('/test/truefalse/', (req,res) => {
  res.status(200).json({testTrue:true,testFalse:false});
});
app.get('/test/env/', (req,res) => {
  res.status(200).json(process.env);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app; // for testing