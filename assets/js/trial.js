document.getElementById('clickValidate').addEventListener('click', add);
show();

/**
 *This function fetches the todos from the local storage.
 *
 * @returns
 */
function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');


    if (todos_str != null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}
/**
 *This function adds a new entry to the already existing to do list. 
 Value 1 and 2 capture the task title and description. Then, variable task containates them. The values are pushed into the array and then to the local storage.
 *The functio also validates the form for any missing inputs.
 * @returns
 */
function add() {
    var value1 = document.getElementById('TaskTitle').value;
    var value2 = document.getElementById('description').value;

    if (value1 !== "" && value2 !== "") {
        var task = value1 + "<br>" + value2;

        var todos = get_todos();
        todos.push(task);
        localStorage.setItem('todo', JSON.stringify(todos));

        show();

        return false;
    } else {
        document.getElementById("validationAlert").innerHTML = "Please fill the input fields provided";
    }
}


/**
 *this function shows the list of to do list items.
 *
 */
function show() {
    var todos = get_todos();

    var html = '<ul>';
    for (var i = 0; i < todos.length; i++) {
        html += '<li>' + todos[i] + '<button class="remove" id="' + i + '">x</button></li> <br><br>';
    };
    html += '</ul>';

    document.getElementById('todos').innerHTML = html;

    var buttons = document.getElementsByClassName('remove');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}
/**
 *This function is used to remove an item from the to do list item on click of the X button next to the todos.
 *
 * @returns
 */
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));

    show();

    return false;
}