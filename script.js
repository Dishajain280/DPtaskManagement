let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (!input || !input.value.trim()) return;

    tasks.push({
        id: Date.now(),
        text: input.value.trim(),
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const newText = prompt("Edit task:", task.text);
    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}


function setFilter(value) {
    filter = value;
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    if (!list) return;
    list.innerHTML = "";

    let filtered = tasks;

    if (filter === "completed") {
        filtered = tasks.filter(t => t.completed);
    }

    if (filter === "pending") {
        filtered = tasks.filter(t => !t.completed);
    }

    filtered.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
        <label style="display:flex;align-items:center;gap:10px;">
            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleComplete(${task.id})"
            />
            <span>${task.text}</span>
        </label>
        <div class="actions">
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
        `;

        list.appendChild(li);
    });
}


function toggleTheme() {
    document.body.classList.toggle("dark");
}

renderTasks();
