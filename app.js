
const api = "http://localhost:3000";
const form = document.querySelector("form");
const btn = document.querySelector("button");
const taskList = document.querySelector("ul");
const editButtons = document.getElementsByClassName("editBtn");
const taskInput = document.getElementById("taskInput");
const donelist = document.getElementById("done");
const editBtn = document.querySelector(".editbtn");
async function todolist(task){
let res = await fetch(api+"/todolist", {
  method : "POST",
  body : JSON.stringify({
  task : task
  }), 
  headers : {
    "Content-Type":"application/json"
  }
})
} 

async function getTask () {
 const res = await fetch(api+`/todolist`);
 let tasks = await res.json();
 for(const element of tasks){
   const li = document.createElement("li");
   taskList.appendChild(li);   
   li.innerHTML = element.task;
   const deleteButton = document.createElement("span");
   deleteButton.innerHTML = ` <i class='bx bxs-trash delete' id='${element.id}'></i><i class='bx bxs-edit-alt edit' id='${element.id}'></i>`;
   const doneButton = document.createElement("button");
   doneButton.textContent = "Done";
   doneButton.classList.add("done");
   doneButton.id = element.id;
   li.appendChild(deleteButton);
   li.appendChild(doneButton);
  }
}
getTask();
form.addEventListener("submit", async function(event) {
let inputValue =  taskInput.value;
await todolist(inputValue);
});

async function deletetask(id){
const res = await fetch(api + `/todolist/${id}`, {
  method : "DELETE"
})
}
async function getTodolist(id){
const res = await fetch(api + `/todolist/${id}`);
const task = await res.json();
  taskInput.value = task.task;
}

taskList.addEventListener("click", async function(event){
let id ;
if( event.target.classList.contains("delete")){
let confirmDelete = confirm("Are you sure you want to delete this task؟");
if (confirmDelete) {
 id = event.target.id;
await deletetask(id);
}
}

if( event.target.classList.contains("edit")){
 id = event.target.id;
 editBtn.id = id;
 getTodolist(id);
}

if( event.target.classList.contains("done")){
 id = event.target.id;
 deletetask(id);
getdonelist(id);
}
});

async function editTask(task , id){
let res = await fetch(api+`/todolist/${id}`, {
  method : "PATCH",
  body : JSON.stringify({
  task : task
  }), 
  headers : {
    "Content-Type":"application/json"
  }
})
} 

editBtn.addEventListener("click", async function(){
let inputValue = taskInput.value;
let id = this.id;
await editTask(inputValue , id);
})

async function doneList(task){
let res = await fetch(api+`/donelist`, {
method : "POST" ,
body : JSON.stringify({
  task : task
  }), 
  headers : {
    "Content-Type":"application/json"
  }
})
}

async function getdonelist(id){
const res = await fetch(api + `/todolist/${id}`);
const task = await res.json();
doneList(task.task);
}

async function getDone() {
 const res = await fetch(api+`/donelist`);
 let tasks = await res.json();
 for(const element of tasks){
   const li = document.createElement("li");
   donelist.appendChild(li);   
   li.innerHTML = element.task;
   const deleteButton = document.createElement("span");
   deleteButton.innerHTML = `<i class='bx bxs-trash deleteDone' id='${element.id}'></i> <i id='${element.id}' class='bx bx-undo undo'></i>`;
   li.appendChild(deleteButton);
  }
}
getDone();

donelist.addEventListener("click", async function(event){
  let id ;
if( event.target.classList.contains("deleteDone")){
var confirmDelete = confirm("Are you sure you want to delete this task؟");
if (confirmDelete) {
 id = event.target.id;
await  deleteDone(id);
}
}

if (event.target.classList.contains("undo")){
  id = event.target.id;
  getUndo(id);
  deleteDone(id);
}
})

async function deleteDone(id){
const res = await fetch(api + `/donelist/${id}`, {
  method : "DELETE"
})
}

async function getUndo(id){
const res = await fetch(api + `/donelist/${id}`);
const task = await res.json();
todolist(task.task);
}

async function todolist(task){
let res = await fetch(api+`/todolist`, {
method : "POST" ,
body : JSON.stringify({
  task : task
  }), 
  headers : {
    "Content-Type":"application/json"
  }
})
}

