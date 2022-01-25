
import { getRefs } from './get-refs.js';
import itemTemplate from '../template/template.js';
import { v4 as uuidv4 } from 'uuid';
import toastr from "toastr";
import { deleteModal } from './get-refs.js';
import { loadingModal } from './get-refs.js';
import { fetchTodos, saveData } from './data-storage.js';
// import * as basicLightbox from 'basiclightbox';

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
let todos = [];
let currentId;

function handleModalCancel() {
  deleteModal.close();
}

function handleModalDelete() {
  todos = todos.filter((todo) => todo.id !== currentId);
  // toastr.warning('todo is successfully deleted');
  deleteModal.close();

  loadingModal.show();
  saveData('todos', todos)
    .then(() => {
      toastr.warning('todo is successfully deleted');
    })
    .finally(() => {
      renderList();
      loadingModal.close();
    });
  
}

function renderList() {
  const items = todos.map((todo) => itemTemplate(todo));
  refs.listGroup.innerHTML = "";
  refs.listGroup.insertAdjacentHTML('beforeend', items.join(''));
  // saveData('todos', todos);
}

function deleteItem(id) {
  console.log("delete", id);
  // todos = todos.filter(todo => todo.id !== id);
  //  toastr.warning('Todo is successfuly deleted');
    const { label } = todos.find((todo) => todo.id === id);

  currentId = id;
  refs.modalText.textContent = label;
  deleteModal.show();
}

function toggleItem(id) {
  todos = todos.map((todo) => 
    todo.id === id
      ? {
        ...todo,
        checked: !todo.checked,
      }
      : todo);
   loadingModal.show();
  saveData('todos', todos).finally(() => {
    renderList();
    loadingModal.close();
  });
  
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

function onPrintBtn(e) {
  console.table(todos);
}

function addTodo(value) {
 
  const newTodo = {
     id:uuidv4(), label: value, checked: false 
  }
  todos.push(newTodo);
  toastr.success('Todo is successfuly created');
  refs.form.reset();
  renderList();
  return Promise.resolve();
}

function handleSubmit(e) {
   e.preventDefault();
  const { value } = e.target.elements.text;
  if (!value) return;

  addTodo(value)
    .then(() => refs.form.reset())
    .then(render);
}
// refs.form.addEventListener('input', onFormInput);
// refs.listGroup.addEventListener('click', handleClick);
// refs.printBtn.addEventListener('click', onPrintBtn);
// refs.form.addEventListener('submit', addTodo);

function addEventListeners() {
  refs.listGroup.addEventListener('click', handleClick);
  refs.printBtn.addEventListener('click', onPrintBtn);
  refs.form.addEventListener('submit', handleSubmit);
  refs.modalCancelButton.addEventListener('click', handleModalCancel);
  refs.modalDeleteButton.addEventListener('click', handleModalDelete);
}

function onLoad() {
 
  loadingModal.show();
  fetchTodos('todos')
    .then((data) => {
      todos = data;
      renderList();
    })
    .catch((errorMessage) => {
      toastr.error(errorMessage);
    })
    .finally(() => {
      addEventListeners();
      loadingModal.close();
    });
}
onLoad();