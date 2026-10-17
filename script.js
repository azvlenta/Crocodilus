// ===== ELEMENTOS DEL DOM =====
const taskForm = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const colorInput = document.getElementById("color");
const tasksContainer = document.getElementById("tasksContainer");

// ===== DATOS =====
let tasks = JSON.parse(localStorage.getItem("crocodilusTasks")) || [];

// ===== GUARDAR =====
function saveTasks() {
    localStorage.setItem("crocodilusTasks", JSON.stringify(tasks));
}

// ===== FORMATO DE FECHA =====
function getCurrentDate() {
    const now = new Date();
    return now.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

// ===== RENDERIZAR TAREAS =====
function renderTasks() {
    tasksContainer.innerHTML = "";

    if (tasks.length === 0) {
        tasksContainer.innerHTML = `
            <p style="text-align:center; opacity:0.7;">
                No hay tareas pendientes 🐊
            </p>
        `;
        return;
    }

    tasks.forEach(task => {
        const taskElement = document.createElement("article");
        taskElement.classList.add("task-card");

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        // Se envolvieron los IDs en comillas simples '\${task.id}' para evitar errores de sintaxis si el ID es un string.
        taskElement.innerHTML = `
            <div 
                class="task-color"
                style="background:${task.color || '#ccc'};">
            </div>

            <div class="task-content">
                <h3 class="task-title">
                    ${task.title}
                </h3>

                <p class="task-description">
                    ${task.description || "Sin descripción"}
                </p>

                <small class="task-date">
                    Creada el: ${task.date}
                </small>
            </div>

            <div class="task-actions">
                <button
                    class="complete-btn"
                    onclick="toggleTask('${task.id}')">
                    ${task.completed ? "Reabrir" : "Completar"}
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask('${task.id}')">
                    Eliminar
                </button>
            </div>
        `;

        tasksContainer.appendChild(taskElement);
    });
}

// ===== CREAR TAREA =====
// Se completó el evento submit que estaba cortado en tu código original
taskForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que la página se recargue

    if (!titleInput.value.trim()) return; // Validación básica para no añadir tareas vacías

    const newTask = {
        id: Date.now().toString(), // Genera un ID único basado en tiempo
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        color: colorInput ? colorInput.value : "#cdcdcd",
        date: getCurrentDate(),
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskForm.reset(); // Limpia los campos del formulario automáticamente
});

// ===== INTERACCIONES DE TAREAS =====
// Estas funciones no existían en tu script pero los botones las necesitaban

window.toggleTask = function(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks();
};

window.deleteTask = function(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
};

// ===== CARGA INICIAL =====
// Ejecuta el renderizado al cargar la página para mostrar datos almacenados
renderTasks();