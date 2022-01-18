
import getRefs from './get-refs.js';
import itemTemplate from '../template/template.js';
import { v4 as uuidv4 } from 'uuid';
import toastr from "toastr";
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

const refs = getRefs();

refs.form.addEventListener('input', onFormInput);
refs.listGroup.addEventListener('click', handleClick);
refs.printBtn.addEventListener('click', onPrintBtn);
refs.form.addEventListener('submit', addTodo);

function onLoad() {
  loadData();
  refs.form.addEventListener('input', onFormInput);
refs.listGroup.addEventListener('click', handleClick);
refs.printBtn.addEventListener('click', onPrintBtn);
  refs.form.addEventListener('submit', addTodo);
  renderList();
}

function onFormInput(e) {
  console.log(e.target.value)
}

let todos = [

]
function addTodo(e) {
  e.preventDefault();
  const { value } = e.target.elements.text;
  if (!value) return;

  const newTodo = {
     id:uuidv4(), label: value, checked: false 
  }
  todos.push(newTodo);
  toastr.success('Todo is successfuly created');
  refs.form.reset();
  renderList();
}
function onPrintBtn(e) {
  console.table(todos);
}
function renderList() {
  const items = todos.map((todo) => itemTemplate(todo));
  refs.listGroup.innerHTML = "";
  refs.listGroup.insertAdjacentHTML('beforeend', items.join(''));
  saveData();
}


function handleClick(e) {
  console.log(e.target.closest('li').dataset);
  console.log(e.target.nodeName);
  const { id } = e.target.closest('li').dataset;
  switch (e.target.nodeName) {
    case "BUTTON":
      deleteItem(id);
      break;
    case "LABEL":
    case "INPUT":
      // case "SPAN":
      toggleItem(id);
      break;
     
  }
 renderList();
}
function deleteItem(id) {
  console.log("delete", id);
  todos = todos.filter(todo => todo.id !== id);
   toastr.warning('Todo is successfuly deleted');
}
function toggleItem(id) {
  todos = todos.map((todo) => 
    todo.id === id
      ? {
        ...todo,
        checked: !todo.checked,
      }
      : todo);
  
}
  
function saveData() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
function loadData() {
  try {
    todos = JSON.parse(localStorage.getItem('todos'));
  } catch (error) {
    toastr.error('Error loading todo list');
  }
}
onLoad();