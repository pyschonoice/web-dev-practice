// 🔘 Called when the Add button is clicked
function addTodo() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        createElement(taskText);
    }

    taskInput.value = "";
}

// 📦 Creates a new task entry in the DOM
function createElement(taskText) {
    const parentDiv = document.getElementById("todoList");

    // Create a wrapper div for the task and its buttons
    const elementDiv = document.createElement("div");
    elementDiv.className = "taskWrapper";

    // Create the <h3> that holds the task text
    const taskElement = document.createElement("h3");
    taskElement.className = "todoList";
    taskElement.dataset.task = taskText;

    const currentCount = document.getElementsByClassName("todoList").length;
    taskElement.innerHTML = `${currentCount + 1}. ${taskText}`;

    // Create a container for buttons (right-aligned)
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "buttonGroup";

    // Append buttons
    createUpdateButton(elementDiv, taskElement, buttonGroup);
    createDeleteButton(taskElement, buttonGroup);

    // Build the task DOM
    elementDiv.appendChild(taskElement);
    elementDiv.appendChild(buttonGroup);
    parentDiv.appendChild(elementDiv);
}


// 📝 Adds an "Edit" button and binds edit logic
function createUpdateButton(wrapperDiv, taskElement, buttonGroup) {
    const btn = document.createElement("button");
    btn.textContent = "Edit";
    btn.className = "edit";

    btn.onclick = () => {
        document.getElementById("addBtn").disabled = true;
        updateTodo(wrapperDiv, taskElement);
    };

    buttonGroup.appendChild(btn);
}

// ❌ Adds a "Done" button and binds delete logic
function createDeleteButton(taskElement, buttonGroup) {
    const btn = document.createElement("button");
    btn.textContent = "Done";
    btn.className = "done";

    btn.onclick = () => {
        deleteTodo(taskElement);
    };

    buttonGroup.appendChild(btn);
}

// ✏️ Called when Edit is clicked - replaces task view with input and update/cancel buttons
function updateTodo(wrapperDiv, taskElement) {
    const originalText = taskElement.dataset.task;

    // Wipe the wrapper content
    wrapperDiv.innerHTML = "";

    // Create input field with current task text
    const input = document.createElement("input");
    input.type = "text";
    input.value = originalText;

    // Create a new button group
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "buttonGroup";

    // Create "Update" button
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.className = "update";

    updateBtn.onclick = () => {
        const newTaskText = input.value.trim();

        // 👇 Create dummy h3 element to store updated data
        const temp = document.createElement("h3");
        temp.className = "todoList";
        temp.dataset.task = newTaskText;

        wrapperDiv.innerHTML = ""; // clear again before rebuilding
        wrapperDiv.appendChild(temp);
        refreshIndices(); // will build a clean task from this dummy
        document.getElementById("addBtn").disabled = false;
    };

    // Create "Cancel" button
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "cancel";

    cancelBtn.onclick = () => {
        // 👇 Restore original taskText using dummy h3
        const temp = document.createElement("h3");
        temp.className = "todoList";
        temp.dataset.task = originalText;

        wrapperDiv.innerHTML = "";
        wrapperDiv.appendChild(temp);
        refreshIndices();
        document.getElementById("addBtn").disabled = false;
    };

    // Build the layout again
    buttonGroup.appendChild(updateBtn);
    buttonGroup.appendChild(cancelBtn);
    wrapperDiv.appendChild(input);
    wrapperDiv.appendChild(buttonGroup);
}

// 🧹 Deletes a task
function deleteTodo(taskElement) {
    const wrapperDiv = taskElement.parentNode;
    wrapperDiv.remove();
    refreshIndices();
}

// 🔁 Refreshes all tasks (updates indexes and buttons)
function refreshIndices() {
    const allTasks = document.getElementsByClassName("todoList");
    let index = 1;

    for (const taskElement of allTasks) {
        const wrapperDiv = taskElement.parentNode;
        const taskText = taskElement.dataset.task;

        // Clear current wrapper
        wrapperDiv.innerHTML = "";

        // Create updated task text element
        const newTask = document.createElement("h3");
        newTask.className = "todoList";
        newTask.dataset.task = taskText;
        newTask.innerHTML = `${index}. ${taskText}`;

        // Create new button group
        const buttonGroup = document.createElement("div");
        buttonGroup.className = "buttonGroup";

        // Append everything
        wrapperDiv.appendChild(newTask);
        wrapperDiv.appendChild(buttonGroup);
        createUpdateButton(wrapperDiv, newTask, buttonGroup);
        createDeleteButton(newTask, buttonGroup);

        index++;
    }

    // Reset Add button in case it was disabled during edit
    document.getElementById("addBtn").disabled = false;
}
