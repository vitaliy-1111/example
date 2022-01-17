import getRefs from './get-refs.js';
import itemTemplate from '../template/template.js';

const refs = getRefs();

refs.form.addEventListener('input', onFormInput);
refs.listGroup.addEventListener('click', handleClick);

function onFormInput(e) {
  console.log(e.target.value)
}

let todos = [
  { id: 1, label: 'text', checked: true },
  { id: 2, label: 'text', checked: false },
  { id: 3, label: 'text', checked: false },
  { id: 4, label: 'text', checked: true }, 
]

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
  todos = todos.filter(todo => todo.id !== Number(id));
}
function toggleItem(id) {
  todos = todos.map((todo) => 
    todo.id === Number(id)
      ? {
        ...todo,
        checked: !todo.checked,
      }
      : todo);
  
}
  
