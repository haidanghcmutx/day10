var input = document.querySelector('input')
var button = document.querySelector('button')
var form = document.querySelector('form')
var todo = document.querySelector('.todo')

form.addEventListener('submit', function(event) {
    event.preventDefault()
   let val = input.value.trim();    
   if(val) {
        addTodoElement({
            text: val,
        }) 
        saveTodoList
   }
   input.value = ''
})

function addTodoElement(todos) {

    var li = document.createElement('li')
    li.innerHTML = `<span>${todos.text}</span>
    <i class="fa-solid fa-trash-can"></i>`  

    if(todos.status === 'completed') {
        li.setAttribute('class', 'completed')
    }

    li.addEventListener('click', function() {
        this.classList.toggle('completed')
        saveTodoList()
    })

    li.querySelector('i').addEventListener('click', function() {
        this.parentElement.remove()
        saveTodoList()
    })
    todo.appendChild(li)
}

function saveTodoList(){
   let todoList = document.querySelectorAll('li')
   let todoListStorage = []
     todoList.forEach(function(item) {
        let text = item.querySelector('span').innerText
        let status = item.getAttribute('class')
        todoListStorage.push({
            text,
            status
        })
   })
    localStorage.setItem('todoList',JSON.stringify(todoListStorage))
}

function init() {
    let data = JSON.parse(localStorage.getItem('todoList'))
    data.forEach(function(item) {
        addTodoElement(item)
    }) 
}

init();