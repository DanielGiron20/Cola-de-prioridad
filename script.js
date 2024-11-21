//obtener elementos
const addTaskForm = document.getElementById("addTaskForm");
const taskNameInput = document.getElementById("taskName");
const taskPriorityInput = document.getElementById("taskPriority");
const tasksContainer = document.getElementById("tasks");
const executeBtn = document.getElementById("executeTasks");

// Lista de tareas
let tasks = [];
function renderTasks() {
    tasksContainer.innerHTML = ""; 

    const sortedTasks = tasks.sort((a, b) => b.priority - a.priority);

    sortedTasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.innerHTML = `
            <span class="task-name">${task.name}</span>
            <span class="task-priority">Prioridad: ${task.priority}</span>
            <span class="task-status" id="status-${index}">Esperando...</span>
            <button class="remove-btn" data-index="${index}">Eliminar</button>
        `;
        tasksContainer.appendChild(taskDiv);
    });

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((btn) =>
        btn.addEventListener("click", (e) => {
            const taskIndex = e.target.dataset.index;
            removeTask(taskIndex);
        })
    );
}


function addTask(name, priority) {
    tasks.push({ name, priority: parseInt(priority) });
    renderTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
function executeTasks() {
    if (tasks.length === 0) {
        alert("No hay tareas para ejecutar.");
        return;
    }

    const sortedTasks = tasks.sort((a, b) => b.priority - a.priority);
    let index = 0;
    sortedTasks.forEach((task, i) => {
        const statusElement = document.getElementById(`status-${i}`);
        statusElement.textContent = "Resolviendo...";
    });

    const interval = setInterval(() => {
        if (index >= sortedTasks.length) {
            clearInterval(interval);
            const statusElement = document.createElement("div");
            statusElement.textContent = "Tareas solucionadas";
            tasksContainer.appendChild(statusElement);
            return;
        }

        const currentTask = sortedTasks[index];
        const statusElement = document.getElementById(`status-${index}`);
        statusElement.textContent = "Resolviendo...";
        setTimeout(() => {
            statusElement.textContent = `Tarea ejecutada: ${currentTask.name}`;
        }, 2000); 

        index++;
    }, 2500); 
}

addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const taskName = taskNameInput.value.trim();
    const taskPriority = taskPriorityInput.value.trim();

    if (taskName === "" || taskPriority === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    addTask(taskName, taskPriority);

    //Limpiar
    taskNameInput.value = "";
    taskPriorityInput.value = "";
});
executeBtn.addEventListener("click", executeTasks);
