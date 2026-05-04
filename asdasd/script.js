const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskItem = taskInput.value.trim();
  if (taskItem != "") {
    const newTask = document.createElement("li");
    newTask.innerHTML = `
    <span>${taskItem}</span>
    <button onclick=""> Concluir </button>
    <button onclick=""> Editar </button>
    <button onclick=""> Remover </button>
    `;
    taskList.appendChild(newTask);
    taskInput.value = "";
  }
}
