const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);

function addTodo(event)
{
  event.preventDefault();
  const todoDiv= document.createElement("div");
  todoDiv.classList.add("todo");

  const todoItem= document.createElement("li");
  todoItem.classList.add("todo-item");
  todoItem.innerText=todoInput.value;
  todoDiv.appendChild(todoItem);

  saveLocalTodos(todoInput.value);

  const completedButton= document.createElement("button");
  completedButton.innerHTML= '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);

  const deleteButton= document.createElement("button");
  deleteButton.innerHTML= '<i class="fas fa-trash-alt"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  todoList.appendChild(todoDiv);
  todoInput.value="";
}

function deleteCheck(event)
{
  const todo=event.target.parentElement;
  if(event.target.classList.contains("delete-btn"))
  {
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener('transitionend',function(){
      todo.remove();
    })
  }

  if(event.target.classList.contains("completed-btn"))
  {
    event.target.parentElement.classList.toggle("completed");
  }
}

function filterTodo(event)
{
  const todos= todoList.childNodes;
  todos.forEach(function(todo){
    switch(event.target.value){
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if(todo.classList.contains("completed")){
          todo.style.display = "flex";
        }
        else{
          todo.style.display= "none";
        }
        break;
      case "pending":
      if(todo.classList.contains("completed")){
        todo.style.display = "none";
      }
      else{
        todo.style.display= "flex";
      }
      break;
    }
  })
}

function saveLocalTodos(todo)
{
  //check if file exist
  let todos;
  if(localStorage.getItem('todos')===null){
    todos= [];
  }
  else{
    todos= JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos= [];
  }
  else{
    todos= JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    const todoDiv= document.createElement("div");
    todoDiv.classList.add("todo");

    const todoItem= document.createElement("li");
    console.log(todos);
    todoItem.innerText=todo;
    todoItem.classList.add("todo-item");
    todoDiv.appendChild(todoItem);

    const completedButton= document.createElement("button");
    completedButton.innerHTML= '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    const deleteButton= document.createElement("button");
    deleteButton.innerHTML= '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos= [];
  }
  else{
    todos= JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex= todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
