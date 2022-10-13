const get = (target) => {
    return document.querySelector(target);
}

const getAll = (target) => {
    return document.querySelectorAll(target);
}

const mainEl = get('main');
const loginForm = get('.login-form');
const loginInput = get('.login-form input');
const loginButton = get('.login-form button');

const helloTitle = get('.hello-title');
const helloDesc = get('.hello-desc');

const clock = get('.clock h2');

const quote = get('.quote span:first-child');
const author = get('.quote span:last-child');

const todoForm = get('.todo-form');
const todoList = get('.todo-list');
const todoInput = get('.todo-form input');

const myStorage = window.localStorage;

const STORAGE_NAME = "userName";
const STORAGE_TODOS = "todos";

const API_URL = 'http://localhost:5000/todos';

const setBackgroundImages = () => {
    const backgroundImages = [];
    for (let i = 1; i < 11; i++) {
        backgroundImages.push(`background${i}.jpeg`);
    }

    //배경이미지는 1~10까지 있음
    const randomNum = Math.floor(Math.random() * 10) + 1; //1~10까지 무작위 숫자
    mainEl.style.backgroundImage = `url(../assets/image/background${randomNum}.jpeg)`;
}

const quotes = [
    {
        quote: "You cannot change what you are, only what you do",
        author: "Philip Pullman"
    },
    {
        quote: "Change the way you look at the things and the things you look at change",
        author: "Wayne Dyer"
    },
    {
        quote: "If you run you stand a chance of losing, but if you don't run you've already lost",
        author: "Barack Obama"
    },
    {
        quote: "If you have always done it that way, it is probably wrong",
        author: "Charles Kettering"
    },
    {
        quote: "The greatest mistakes you can make in life is to be continually fearing you will make one",
        author: "Elbert Hubbard"
    },
    {
        quote: "Not everything that is faced can be charged, but nothing can be changed until it it is faced",
        author: "James Baldwin"
    },
    {
        quote: "If work were so pleasant, the rich would keep it for themselves",
        author: "Mark Twain"
    },
    {
        quote: "When you go through hardships and decide not to surrender, that is strength",
        author: "Arnold Schwarzenegger"
    },
    {
        quote: "It is kind of fun to do the impossible",
        author: "Walt Disney"
    },
    {
        quote: "There are better starters than me but I’m a strong finisher",
        author: "Usain Bolt"
    },
]

const setQuote = () => {
    let todayQuote = quotes[Math.floor(Math.random() * 10)];
    quote.innerText = todayQuote.quote;
    author.innerText = todayQuote.author;
}

const setClock = () => {
    const time = new Date();
    const hour = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');

    const now = `${hour}: ${minutes}: ${seconds}`;
    clock.innerText = `🪐 ${now}`;
}

const setName = () => {
    const userName = loginInput.value;
    myStorage.setItem(STORAGE_NAME, userName);
}

const getName = () => {
    return myStorage.getItem(STORAGE_NAME);
}

const sayHello = (name) => {
    const time = new Date();
    const hour = time.getHours();
    if (hour > 4 && hour < 13) {
        helloTitle.innerText = `Good morning! ${name}`;
    } else if (hour > 12 && hour < 21) {
        helloTitle.innerText = `Good afternoon! ${name}`;
    } else {
        helloTitle.innerText = `Good night! ${name}`;
    }
}

//todolist start 

let todos = [];

const saveTodos = () => {
    localStorage.setItem(STORAGE_TODOS, JSON.stringify(todos));
}

const deleteTodo = (e) => {
    const removeEl = e.target.parentElement;
    removeEl.remove();
    const liId = parseInt(removeEl.id);
    todos = todos.filter((item) => item.id !== liId);
    saveTodos();
}


const renderTodo = (item) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.id = item.id;

    const checkBox = document.createElement('input');
    checkBox.type='checkbox'
    checkBox.classList.add('todo-checkbox');
    
    const span = document.createElement('span');
    span.classList.add('todo-txt');

    const button = document.createElement('button');
    button.classList.add('todo-del-btn');

    button.addEventListener('click', deleteTodo);

    span.innerText = item.text;
    button.innerText = 'X';
    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);

}

const handleTodo = (e) => {
    e.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = '';
    const newTodoObj = {
        id: Date.now(),
        text: newTodo,
    }
    todos.push(newTodoObj);
    renderTodo(newTodoObj);
    saveTodos();
}


todoForm.addEventListener('submit', handleTodo);

const savedTodos = localStorage.getItem(STORAGE_TODOS);

if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach(todo => {
        renderTodo(todo);
    })
}

const render = () => {
    if (getName() !== null) {
        loginForm.style.display = "none";
        sayHello(getName());
        helloDesc.innerText = '';
        setInterval(setClock, 1000);
        setQuote();
    } else {
        loginForm.style.display = "flex";
    }
}

const init = () => {

    setBackgroundImages();
    render();

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        setName();
        render();
    })
}

init();