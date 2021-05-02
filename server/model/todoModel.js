const DataStore = require('nedb');
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

function deleteData(todo){
    return new Promise(function(resolve,reject){
        database.remove({todo:todo},{},function(err,numDeleted){
            if(err) reject(err);
            else if(numDeleted === 0) reject("No such todo!");
            else resolve("Todo deleted successfully");
        });
    });
}

module.exports = {
    getAll,
    create,
    deleteData
}