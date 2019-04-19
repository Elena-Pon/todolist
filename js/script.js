const url = `http://localhost:3000/`;
const contentType = {
    'Content-Type': 'application/json'
};

const deleteTask = id => {

    fetch(`${url}tasks/${id}`, {
        method: 'DELETE',
        headers: contentType
    })
        .then(() => getTask())
};


const setCheckBox = (task) => {
    const value = {
        task: task.task,
        checked: !task.checked,
        date: task.date
    }

    fetch(`${url}tasks/${task.id}`, {
        method: 'PUT',
        headers: contentType,
        body: JSON.stringify(value)
    })
        .then(() => console.log('checked'))
};

const isValid = (task) => task;

const addTask = (task) => {
    if (isValid(task)) {

        const checkedStartState = false;

        let today = new Date().toLocaleString('ru');

        const value = { 
            task: task,
            checked: checkedStartState,
            date: today
        };

        fetch(`${url}tasks`, {
            method: 'POST',
            headers: contentType,
            body: JSON.stringify(value)
        })
            .then(() => getTask())
            .then(() => reset.click())

    }
};

const save = (task, input) => {

    if (task.task !== input.value) {

        let today = new Date().toLocaleString('ru');

        const value = {
                task: input.value,
                checked: task.checked,
                date: today
            };

        fetch(`${url}tasks/${task.id}`, {
            method: 'PUT',
            headers: contentType,
            body: JSON.stringify(value)
        })
            .then(() => getTask())
    }
}

const getTask = () => {

    fetch(`${url}tasks`, {
        method: 'GET',
        headers: contentType
    })
        .then(json => json.json())
        .then(tasks => {
            let wrapper = document.querySelector('.task-wrapper');
            wrapper.innerHTML = '';
            tasks.reverse().forEach(taskItem => {
                const newTask = document.createElement('div');

                const taskContent = document.createElement('input');
                taskContent.className = "edit";
                taskContent.value = `${taskItem.task}: ${taskItem.date}`;
                newTask.classList.add('task');
                newTask.appendChild(taskContent);
                

                const deleteButton = document.createElement('span');
                deleteButton.setAttribute('type', 'button');
                deleteButton.onclick = () => deleteTask(taskItem.id);
                deleteButton.innerHTML = "\u00D7";
                deleteButton.className = "close";
                newTask.appendChild(deleteButton); 

                const saveButton = document.createElement('span');
                saveButton.setAttribute('type', 'button');
                saveButton.innerHTML = '<i class="fas fa-save"></i>';
                saveButton.className = "save-btn";
                saveButton.onclick = () => save(taskItem, taskContent);
                newTask.appendChild(saveButton);

                const check = document.createElement('input');
                check.setAttribute('type', 'checkbox');
                check.className = "checked";
                check.checked = taskItem.checked;
                check.onclick = () => setCheckBox(taskItem);
                newTask.appendChild(check);

                wrapper.appendChild(newTask);
            });
            return 'we have got data';
        })
        .then(isDone => console.log(isDone));
};

getTask();

form.onsubmit = function (event) {

    let check = false;

    let today = new Date().toLocaleString('ru');
    
    event.preventDefault();
    addTask(task.value, check.value, today.value);
    getTask(); 
};


