// count initial ToDo
countTodos();

// capture click event
document.getElementById('checkAll').addEventListener('click', function(){
    AllDone();
});

//capture enter key press
document.getElementById('todo-to-add').addEventListener('keypress',function (e) {
      e.preventDefault // Do not submit form

      if (e.key === "Enter") { // check if enter is pressed
        const todo = document.getElementById('todo-to-add').value.trim();
        if (todo) {
            addToDo(todo);
            document.getElementById('todo-to-add').value = ''; 
        }
    }
});

// capture click event
document.getElementById('addTODO').addEventListener('click',function () {
    const todo = document.getElementById("todo-to-add").value.trim();

    if(todo){
        addToDo(todo);
        document.getElementById('todo-to-add').value = '';	
    }
});

// count tasks (To Complete)
function countTodos() {
    const todos = document.querySelectorAll('#sortable li');

    const incompleteTodos = Array.from(todos).filter(todo => {
        const checkbox = todo.querySelector('input[type="checkbox"]');
        return checkbox && !checkbox.checked;
    });

    const counterElement = document.getElementById('todo-count');

    if(counterElement){
        counterElement.textContent = incompleteTodos.length;
    }
}

// add new todo
function addToDo(todo){
    createTodo(todo); 
    countTodos();
}

//create task (To Complete)
function createTodo(text){
    const todoList = document.getElementById('sortable');
    const newItem = document.createElement('li');
    newItem.className = 'ui-state-default';

    const div = document.createElement('div');
    div.className = 'checkbox';

    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';

    //adicionar eventos de change ao checkbox
    input.addEventListener('change', function () {
        if (this.checked) {
            const doneItem = this.parentElement.innerText;
            done(doneItem);
            newItem.remove(); 
            countTodos(); 
        }
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(text));

    div.appendChild(label);
    newItem.appendChild(div);
    todoList.appendChild(newItem);
}

//mark task as done (To Complete)
function done(doneItem){
    const doneItems = document.getElementById('done-items');

    const newItem = document.createElement('li');
    newItem.textContent = doneItem;

    const button = document.createElement('button');
    button.className = 'remove-item btn btn-default btn-xs pull-right';

    const span = document.createElement('span');
    span.className = 'fa fa-minus-square';
 
    button.appendChild(span);
    newItem.appendChild(button);
    doneItems.appendChild(newItem);

     //adicionar eventos de click
    button.addEventListener('click', function () {
        removeItem(this);
    });
}

//mark all tasks as done (To Complete)
function AllDone(){
    const todos = document.querySelectorAll('#sortable li');

    todos.forEach(todo => {
        const checkbox = todo.querySelector('input[type="checkbox"]');

        if(checkbox && !checkbox.checked){
            checkbox.checked = true;
            const doneItem = todo.querySelector('label').innerText;
            done(doneItem);
            todo.remove();
        }
    });

    countTodos(); //atualizar o contador.
}

//remove done task from list (To Complete)
function removeItem(element){
    element.parentElement.remove();
}