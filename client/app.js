// Selectors
const todoInput = document.querySelector(".todo-input");
const todoSubmit = document.querySelector(".todo-submit");
const todoList = document.querySelector(".todo-list");

const BASE_URL = "http://localhost:8000/api/todos";
const xhrReq = new XMLHttpRequest();

// Server calls
class XHR {
    
    xhrGetTodos(){
        xhrReq.open("GET",BASE_URL);
        xhrReq.send();
        xhrReq.onload = function(){
            if(xhrReq.status === 200){
                const todos = xhrReq.response;
                UI.displayTodos(JSON.parse(todos));
            }
        }
    }

    xhrCreateTodo(todo){
        xhrReq.open("POST",BASE_URL);
        xhrReq.send(JSON.stringify(todo));
        xhrReq.onload = function(){
            console.log(xhrReq.status, xhrReq.response);
        }
    }

    xhrDeleteTodo(todo){
        xhrReq.open("DELETE",BASE_URL + "/" + todo);
        xhrReq.send();
        xhrReq.onload = function(){
            console.log(xhrReq.response);
        }
    }
}

class UI {

    static displayTodos(todos){
        console.log(todos);
        let result = "";
        todos.forEach(function(item){
            result += `
            <div class="todo">
            <li>${item.todo}</li>
            <button class="trash-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
            `
        });
        todoList.innerHTML = result;
    }

}

const xhr = new XHR();

function createNewTodo(e){
    e.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const li = document.createElement("li");
    li.innerText = todoInput.value;
    todoDiv.appendChild(li);

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);

    const todoObj = {
        todo: todoInput.value,
    }

    xhr.xhrCreateTodo(todoObj);

    todoInput.value = "";
}

function deleteTodo(e){
    const todoEl = e.target;
    const todo = todoEl.children[0].textContent;
    xhr.xhrDeleteTodo(todo);
    todoEl.remove();
}

document.addEventListener("DOMContentLoaded",async function(){
    xhr.xhrGetTodos();
});

todoSubmit.addEventListener("click",createNewTodo);

todoList.addEventListener("click",deleteTodo);

