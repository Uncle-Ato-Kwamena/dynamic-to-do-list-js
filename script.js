document.addEventListener('DOMContentLoaded', () => {
    // Load existing tasks from Local Storage when the page loads
    loadTasks();

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        // Retrieve and parse tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Add each task to the list
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents saving tasks again
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Check if the task text is not empty
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create and configure the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => {
            // Remove the task from the list and Local Storage
            taskList.removeChild(listItem);
            removeTaskFromLocalStorage(taskText);
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Save the task to Local Storage if required
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        // Clear the task input field
        taskInput.value = '';
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        // Retrieve existing tasks
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Add new task
        storedTasks.push(taskText);
        // Save updated list back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        // Retrieve existing tasks
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Remove the task
        storedTasks = storedTasks.filter(task => task !== taskText);
        // Save updated list back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add event listener to the Add Task button
    addButton.addEventListener('click', () => {
        addTask(taskInput.value.trim());
    });

    // Add event listener for pressing Enter in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim());
        }
    });
});
