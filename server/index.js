const http = require('http');
const {getAllTodos, createTodo, getTodo, deleteTodo} = require('./controller/todoController');

// Create a server
const server = http.createServer(function(req,res){

    // GET all todos
    if(req.url === "/api/todos" && req.method === "GET") {
        getAllTodos(req,res);
    }

    // Create a todo
    else if(req.url === "/api/todos" && req.method === "POST"){
        createTodo(req,res);
    }

    // Get a todo by status (completed/pending)
    else if(req.url.match(/\/api\/todos\/[A-z]/) && req.method === "GET"){
        const status = req.url.split('/')[3];
        getTodo(res,status);
    }

    // DELETE -> delete a todo by id
    else if(req.url.match(/\/api\/todos\/([0-9A-Za-z]+)/) && req.method === "DELETE"){
        const id = req.url.split('/')[3];
        deleteTodo(res,id);
    }

    else{ 
        res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message: "Method or route not found!"}))
    }
});
 
const PORT = process.env.PORT || 8000;

server.listen(PORT,function(){
    console.log(`Server is running at PORT: ${PORT}`);
});