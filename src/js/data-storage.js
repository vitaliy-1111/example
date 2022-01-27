import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:4040';
const server1 = axios.create({
  baseURL :  'https://61f272642219930017f5057f.mockapi.io/api/v1',
}

)

export function fetchTodos() {
  return server1.get("/todos").then(response => response.data);
  // const delay = ~~(Math.random() * 1000);
  // console.log('load delay:', delay);

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     try {
  //       resolve(JSON.parse(localStorage.getItem(key)));
  //     } catch (e) {
  //       reject('error loading todos');
  //     }
  //   }, delay);
  // });
}

export function createTodo(payload) {
  return server1.post("/todos", payload).then(response => response.data);


  // return fetch('http://localhost:4040/todos', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(payload),
  // }).then((response) => response.json());


  // const delay = ~~(Math.random() * 1000);
  // console.log('load delay:', delay);

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     localStorage.setItem(key, JSON.stringify(payload));

  //     resolve();
  //   }, delay);
  // });
}
export function deleteTodo(id) {
   return server1.delete(`/todos/${id}`).then(response => response.data);
  
  // return fetch(`http://localhost:4040/todos/${id}`, {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).then((response) => response.json());
}
export function updateTodo(id, payload) {
  return server1.put(`/todos/${id}`, payload).then(response => response.data);


  //  return fetch(`http://localhost:4040/todos/${id}`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'application/json',
  //    },
  //   body: JSON.stringify(payload)
  // }).then((response) => response.json());
}