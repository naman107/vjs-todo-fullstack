const {getAll, create, getDataByStatus, deleteData} = require('../model/todoModel');
const { getPostData } = require('../utils');

// GET -> get all the todos
async function getAllTodos(req,res){
    try {
        const todos = await getAll();
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify(todos));
    } catch (error) {
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({message: error}));    
    }
}

// POST -> create a todo
async function createTodo(req,res){
    try {
        let newTodo = await getPostData(req);
        const {todo,status} = JSON.parse(newTodo);
        let body = {todo,status};
        newTodo = await create(body);
        res.writeHead(201,{"Content-Type":"application/json"});
        res.end(JSON.stringify(newTodo));
    } catch (error) {
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({message: error}));    
    }
}

// GET -> get a todo by status
async function getTodo(res,status){
    try {
        const todo = await getDataByStatus(status);
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify(todo));
    } catch (error) {
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({message: error}));    
    }
}

// DELETE -> remove a todo
async function deleteTodo(res,id){
    try {
        const todo = await deleteData(id);
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify(todo));
    } catch (error) {
        res.writeHead(404,{"Content-Type":"text"});
        res.end(JSON.stringify({message: error}));    
    }
}

module.exports = {
    getAllTodos,
    createTodo,
    getTodo,
    deleteTodo
}