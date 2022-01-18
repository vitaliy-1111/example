import getRefs from './get-refs.js';
import itemTemplate from '../template/template.js';
import { v4 as uuidv4 } from 'uuid';

const refs = getRefs();

refs.form.addEventListener('input', onFormInput);
refs.listGroup.addEventListener('click', handleClick);
refs.printBtn.addEventListener('click', onPrintBtn);
refs.form.addEventListener('submit', addTodo);



function onFormInput(e) {
  console.log(e.target.value)
}

let todos = [
  { id: '1', label: 'text', checked: true },
  { id: '2', label: 'text', checked: false },
  { id: '3', label: 'text', checked: false },
  { id: '4', label: 'text', checked: true }, 
]
function addTodo(e) {
  e.preventDefault();
  const { value } = e.target.elements.text;
  if (!value) return;

  const newTodo = {
     id:uuidv4(), label: value, checked: false 
  }
  todos.push(newTodo);
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
}
renderList();

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
  
