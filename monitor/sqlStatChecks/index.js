const mysql = require('mysql');
const async = require('async');

const db_config = {
  host     : 'sqldb',
  user     : 'testdbuser',
  password : 'testdbpassword',
  database : 'teststatdb'
};

let rdb = {};


function handleDisconnect() {
  rdb.connection = mysql.createConnection(db_config);
  rdb.connection.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  rdb.connection.on('error', function(err) {
    console.log('db error', err.code);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log("reconect to maria !!!");
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();
// beware the disconect

// rdb.connection = mysql.createConnection({
//   host     : 'madb',
//   user     : 'key',
//   password : 'value',
//   database : 'keystore'
// });

// rdb.connection.connect();

rdb.testDatabase = function testDatabase(callback){
  let statBack = {check:'sql',state:false};
  rdb.testConnection( (err, data) => {
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


rdb.testConnection = function testConnection(callback) {
  rdb.connection.query('SELECT * FROM firstconect LIMIT 10', function(err, rows, fields) {
    if(err) {
      let cTable = 'CREATE TABLE `firstconect` (`id` INTEGER NULL AUTO_INCREMENT,`key` VARCHAR(256) NULL,`value` VARCHAR(4096) NULL ,PRIMARY KEY (`id`));';
      rdb.connection.query(cTable, function(err, rows, fields) {
        if(err) { 
          callback({error:'cant create table',query:cTable},null);
        } else {
          let createRows = rows;
          let iTable = 'INSERT INTO firstconect (`key`, `value`) VALUES ("version","0.0.1");';
          rdb.connection.query(iTable, function(err, rows, fields) {
            if(err) {
              callback({error:'table created but instert miss',query:iTable},null);
            } else {
              callback(null,{createRows, insertRows:rows});
            }
          });
        }
      });
    } else {
      callback(null,rows);
    }
  });
};

// and export all
module.exports = rdb;