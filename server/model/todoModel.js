const DataStore = require('nedb');
const { getPostData } = require('../utils');
const database = new DataStore("todo.db");
database.loadDatabase();

function getAll(){
    return new Promise(function(resolve,reject){
       database.find({},function(err,docs){
            if(err) reject(err);
            else resolve(docs);
       });
    });
}

function create(todo){
    return new Promise(function(resolve,reject){
        database.insert(todo, function(err,newDoc){
            if(err) reject(err);
            resolve(newDoc);
        });
    });
}

function getDataByStatus(status){
    return new Promise(function(resolve,reject){
        if(status === "completed" || status === "pending"){
            database.findOne({status: status},function(err,doc){
                if(err) reject(err);
                else if(!doc) reject(`No such todo with status: ${status}`);
                else resolve(doc);
            });
        }else{
            reject("Bad request");
        }
    });
}

function deleteData(id){
    return new Promise(function(resolve,reject){
        database.remove({_id:id},{},function(err,numDeleted){
            if(err) reject(err);
            else if(numDeleted === 0) reject("No such todo!");
            else resolve("Todo deleted successfully");
        });
    });
}

module.exports = {
    getAll,
    create,
    getDataByStatus,
    deleteData
}