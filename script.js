let inputbox = document.querySelector('.inputBox');
let btn = document.getElementById('add');
let list = document.querySelector('.lists');

let storedItems = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

let displayTasks = () => {
    let items = "";
    for (let i = storedItems.length - 1; i >= 0; i--) {
        items += `
        <div class="listItems">
            <input type="checkbox" class="checkbox">
            <li>${storedItems[i]}</li>
            <button class="delete">delete</button>
        </div>`;
    }
    list.innerHTML = items;
}

btn.addEventListener('click', createTask);

inputbox.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        createTask();
    }
});

function createTask() {
    if (inputbox.value.trim() !== "") {
        storedItems.push(inputbox.value);
        localStorage.setItem('tasks', JSON.stringify(storedItems));
        displayTasks();
        inputbox.value = "";
    } else {
        alert("Please enter a task.");
    }
}

window.onload = function() {
    displayTasks();
}

list.addEventListener('change', function(event) {
    if (event.target.matches('.listItems .checkbox')) {
        let listItem = event.target.closest('.listItems').querySelector('li');
        if (event.target.checked) {
            listItem.classList.add('completed');
            listItem.style.color = 'grey';
        } else {
            listItem.classList.remove('completed');
            listItem.style.color = 'black';
        }
    }
});

list.addEventListener('click', function(e) {
    if (e.target.matches('.listItems .delete')) {
        let listItem = e.target.closest('.listItems');
        let taskIndex = Array.from(list.children).indexOf(listItem);
        storedItems.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(storedItems));
        listItem.remove();
    }
});
