let redisdb = {};

RedisSMQ = require("rsmq");
rsmq = new RedisSMQ( {host: "redis", port: 6379, ns: "rsmq"} );


redisdb.createQueue = function(queueName, callback) {
	rsmq.createQueue({qname:queueName}, function (err, resp) {
		if (resp===1) {
			console.log("queue created");
			callback({msg:"queue created"});
		} else {
			callback({err:"fail to create queue"});
		}
	});
};


redisdb.sendMessage = function(queueName, message, callback) {
	rsmq.sendMessage({qname:queueName, message:message}, function (err, resp) {
		if (resp) {
			console.log("Message sent. ID:", resp);
			callback(resp);
		} else {
			console.dir(err);
			callback(err);
		}
	});
};

redisdb.receiveMessage = function(queueName, callback) {
	rsmq.receiveMessage({qname:queueName}, function (err, resp) {
		if (resp.id) {
			console.log("Message received.", resp);
			callback(resp);
		}
		else {
			console.log("No messages for me...");
			callback(err);
		}
	});
};

redisdb.deleteMessage = function(queueName, deleteId, callback) {
	rsmq.deleteMessage({qname:queueName, id:deleteId}, function (err, resp) {
		if (resp===1) {
			console.log("Message deleted.");
			callback(resp);
		}
		else {
			console.log("Message not found.");
			callback(err);
		}
	});
};


redisdb.listQueues = function(callback) {
	rsmq.listQueues( function (err, queues) {
		if( err ){
			console.error( err )
		} else {
			console.log("Active queues: " + queues.join( "," ) );
		}
		callback(err,queues);
	});
};


redisdb.testConnection = function testConnection(callback) {
	redisdb.createQueue('testqueuetest', (resp) => {
		if(!resp) {
			callback('cant connect',resp);
		} else {
			redisdb.listQueues( (err,queues) => {
				callback(err,queues);
			});		
		}
	});
	
};

redisdb.testDatabase = function testDatabase(callback){
  let statBack = {check:'redis',state:false};
  redisdb.testConnection( (err, data) => {
    if(err) {
      statBack.err = err;
    } else if(data||false) {
      statBack.info = 'connection and insert are working';
      statBack.state = true;
    } else {
      statBack.err = err;
      statBack.info = 'some went extreamly wrong';
    }
    callback(statBack);
  });
};
 
// and export all
module.exports = redisdb;