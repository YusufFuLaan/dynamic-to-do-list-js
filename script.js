document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new li element
        const li = document.createElement('li');
        li.classList.add('task-item'); // Add a class to the li element
        li.textContent = taskText;

        // Create a new remove button element
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // Add a class to the remove button
        
        // Assign an onclick event to the remove button
        removeButton.onclick = () => {
            taskList.removeChild(li);
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Append the li element to the task list
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = '';
    }

    // Attach event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        // Allow tasks to be added by pressing the "Enter" key
        if (event.key === 'Enter') {
            addTask();
            event.preventDefault(); // Prevent form submission
        }
    });
});
