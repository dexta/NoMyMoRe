let mdb = {};

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const URL = 'mongodb://mongo:27017/viewStore';

mdb.insert = function insert(insertObj,callback) {
  MongoClient.connect(URL, function(err, db) {
    if(!Array.isArray(insertObj.data)) {
      db.collection(insertObj.table).insertOne(insertOne.data,function(err, r){
        callback(err,r);
        db.close();
      });
    } else {
      db.collection(insertObj.table).insertMany(insertOne.data,function(err, r){
        callback(err,r);
        db.close();
      });
    }
  });
};

mdb.select = function select(selectObj,callback) {
  MongoClient.connect(URL, function(err, db) {
    db.collection(selectObj.table).find(selectObj.find).toArray(function(err, docs) {
      callback(err, docs);
      db.close();      
    });
  });
};

 
// and export all
module.exports = mdb;