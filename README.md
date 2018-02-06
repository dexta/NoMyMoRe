# NoMyMoRe

simple as possible NodeJS with MySQL[likeDB], MongoDB and Redis docker compose/swarm Project.


# Node
OFFICIAL upstream node container [node:8.9-slim]

```javascript
const express = require('express');
app.use(express.static('frontend'));
```

# MySQL
OFFICIAL standard docker image [mariadb]
```javascript
const mysql = require('mysql');
const async = require('async');

const db_config = {
  host     : 'sqldb',
  user     : 'testdbuser',
  password : 'testdbpassword',
  database : 'teststatdb'
};
```

# MongoDB
latest OFFICIAL mongodb image [mongo:latest]
```javascript
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const URL = 'mongodb://mongo:27017/teststatmongo';
```

# Redis
and of course OFFICIAL redis image as alpine flavour [redis:alpine]
```javascript
RedisSMQ = require("rsmq");
rsmq = new RedisSMQ( {host: "redis", port: 6379, ns: "rsmq"} );
```