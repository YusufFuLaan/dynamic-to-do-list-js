document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // Create a new li element
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.textContent = taskText;

        // Create a new remove button element
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        
        // Assign an onclick event to the remove button
        removeButton.onclick = () => {
            taskList.removeChild(li);
            // Update Local Storage after removing the task
            updateLocalStorage();
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Append the li element to the task list
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = '';

        // Save task to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Update Local Storage with current tasks
    function updateLocalStorage() {
        const tasks = Array.from(taskList.children).map(li => li.textContent.replace("Remove", "").trim());
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Attach event listeners
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        addTask(taskText); // Add the task and save it to Local Storage
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
            addTask(taskText); // Add the task and save it to Local Storage
            event.preventDefault(); // Prevent form submission
        }
    });

    // Load tasks when the page loads
    loadTasks();
});
