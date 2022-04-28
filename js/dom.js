var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

for (let i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var info = localStorage.getItem(key);
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(info));

    //Create delete button element
    var deleteBtn = document.createElement('button');

    //Add class to delete button
    deleteBtn.className = 'btn btn-danger btn-sm float-end delete';
    deleteBtn.appendChild(document.createTextNode('X'));

    li.appendChild(deleteBtn);
    itemList.appendChild(li)
}

//Form submit event
form.addEventListener('submit', addItem);

//Delete event
itemList.addEventListener('click', removeItem);

//Filter event
filter.addEventListener('keyup', filterItem);

//Add item
function addItem(e) {
    e.preventDefault();

    // Get input value
    var newItem = document.getElementById('item').value;

    //Create new li element
    var li = document.createElement('li');
    li.className = 'list-group-item';

    //Add text node with input value
    li.appendChild(document.createTextNode(newItem));

    //Create delete button element
    var deleteBtn = document.createElement('button');

    //Add class to delete button
    deleteBtn.className = 'btn btn-danger btn-sm float-end delete';
    deleteBtn.appendChild(document.createTextNode('X'));

    li.appendChild(deleteBtn);

    itemList.appendChild(li);
    localStorage.setItem(newItem, newItem);
    location.reload();

    // for (let i = 0; i < localStorage.length; i++) {
    //     var key = localStorage.key(i);
    //     var info = localStorage.getItem(key);
    //     var tmp = '<li class="list-group-item">' + info + '<button class="btn btn-danger btn-sm float-end delete">X</button></li>'
    //     // itemList.appendChild(info)
    //     // itemList.innerHTML = info + ' <br>'
    //     // console.log(key, info)
    // }
}

//Remove item
function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
            console.log(li.firstChild.textContent)
            localStorage.removeItem(li.firstChild.textContent);
        }
    }
}

//Filter item
function filterItem(e) {
    // convert text to lowercase
    var text = e.target.value.toLowerCase();
    // Get element li
    var items = itemList.getElementsByTagName('li');
    // Covert to array
    Array.from(items).forEach(function(item) {
        var itemName = item.firstChild.textContent;

        if (itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'block';
        }
        else {
            item.style.display = 'none';
        }
    })
}