const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskItem = taskInput.value.trim();
  if (taskItem != "") {
    const newTask = document.createElement("li");
    newTask.innerHTML = `
    <span>${taskItem}</span>
    <button onclick="completar(this)"> Concluir </button>
    <button onclick="Editar()"> Editar </button>
    <button onclick="delet(this)"> Remover </button>
    `;
    taskList.appendChild(newTask);
    taskInput.value = "";
  }
}

function delet(button){
  const taskToRemove = button.parentElement;
  taskList.removeChild(taskToRemove);
}

function completar(button){
  const taskComplete = button.parentElement;
  taskComplete.classList.toggle('completed');
}

function Editar(button){
  const taskEdit = button.parentElement;
  const newText = prompt('Editar', taskText);
}