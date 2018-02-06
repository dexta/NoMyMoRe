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

 
// and export all
module.exports = mdb;