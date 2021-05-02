const http = require('http');
const {getAllTodos, createTodo, deleteTodo} = require('./controller/todoController');

// Create a server
const server = http.createServer(function(req,res){

    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // GET all todos
    if(req.url === "/api/todos" && req.method === "GET") {
        getAllTodos(req,res);
    }

    // Create a todo
    else if(req.url === "/api/todos" && req.method === "POST"){
        createTodo(req,res);
    }

    // DELETE -> delete a todo by todo name
    else if(req.url.match(/\/api\/todos\/([A-z]+)/) && req.method === "DELETE"){
        res.setHeader('Access-Control-Allow-Origin', '*');
        const todo = req.url.split('/')[3];
        deleteTodo(res,todo);
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