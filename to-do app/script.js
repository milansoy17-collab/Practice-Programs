const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const container = document.getElementById("taskContainer");
const Task = document.getElementsByClassName("task");
const delBtn = document.getElementsByClassName("deleteBtn");


// DATA (very important)
let tasks = [];
let currentFilter = "all" ;

// Add task
button.addEventListener("click", () => {

    const text = input.value;

    if(text === ""){
        alert("Enter a task");
        return;
    }

    // create task object
    const task = {
        id: Date.now(),
        text: text,
        status: "pending"
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    input.value = "";
});

container.addEventListener("click", (e) => {

    if(e.target.classList.contains("deleteBtn")){

        const taskEl = e.target.parentElement;
        const id = taskEl.dataset.id;

        // remove from array
        tasks = tasks.filter(task => task.id != id);

        // save + update UI
        saveTasks();
        renderTasks();
    }

    if(e.target.classList.contains("doneBtn")){
        const taskEl = e.target.parentElement;
        const id = taskEl.dataset.id;

        const task = tasks.find(t=> t.id == id);

        //toggle status
        task.status = task.status === "pending" ? "done" :"pending";

        saveTasks();
        renderTasks();
    }

});
// Render tasks
function renderTasks(){

    container.innerHTML = "";

    let fillteredTasks = tasks;

    if(currentFilter === "pending"){
        fillteredTasks = tasks.filter(t => t.status === "pending");
    }else if(currentFilter === "done"){
        fillteredTasks = tasks.filter(t => t.status === "done");
    }
    fillteredTasks.forEach(task => {

        const div = document.createElement("div");
        div.classList.add("task");

        div.dataset.id = task.id
        //text
        const text = document.createElement("span");
        text.textContent = task.text;

        if(task.status === "done"){
            text.style.textDecoration = "line-through";
            text.style.opacity = "0.6";
        }

        //Delete btn
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.classList.add("deleteBtn");

        //Done btn
        const donebtn = document.createElement("button");
        donebtn.textContent = task.status === "done" ? "Undo" : "Done";
        donebtn.classList.add("doneBtn");

        div.appendChild(delBtn);
        div.appendChild(donebtn);
        div.appendChild(text);

        container.appendChild(div);

    });

}
// Save Tasks
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
// Load Tasks
function loadTasks(){

    const saved = localStorage.getItem("tasks");

    if(saved){
        tasks = JSON.parse(saved);
        renderTasks();
    }
}

function setFilter(type){
    currentFilter = type;
    renderTasks();
}

loadTasks();
console.log(localStorage)
