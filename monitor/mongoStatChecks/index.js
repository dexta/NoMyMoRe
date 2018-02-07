let mdb = {};

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const URL = 'mongodb://mongo:27017/teststatmongo';

mdb.insert = function insert(insertObj,callback) {
  MongoClient.connect(URL, function(err, client) {
    let db = client.db('teststatmongo'); 
    console.log("debug mongodb "+Array.isArray(insertObj.data));
    // console.dir(err);
    // console.dir(db);
    if(!Array.isArray(insertObj.data)) {
      db.collection(insertObj.table).insertOne(insertObj.data,function(err, r){
        callback(err,r);
        // db.close();
      });
    } else {
      db.collection(insertObj.table).insertMany(insertObj.data,function(err, r){
        callback(err,r);
        // db.close();
      });
    }
  });
};

mdb.select = function select(selectObj,callback) {
  MongoClient.connect(URL, function(err, client) {
    let db = client.db('teststatmongo'); 
    db.collection(selectObj.table).find(selectObj.find).toArray(function(err, docs) {
      callback(err, docs);
      // db.close();      
    });
  });
};


mdb.testConnection = function testConnection(callback) {
  mdb.insert({data:{testinsert:"version"},table:'testdatacheck'}, (err,res) => {
    if(err) {
      callback(err,res);
    } else { 
      mdb.select({table:'testdatacheck',find:'testinsert'}, (err,res) => {
        callback(err,res);
      });
    }
  });  
};


mdb.testDatabase = function testDatabase(callback){
  let statBack = {check:'mongo',state:false};
  mdb.testConnection( (err, data) => {
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
module.exports = mdb;