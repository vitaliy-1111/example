const {v4} =  require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());


const todos = [
  {
    id: "35784a1b-d408-4b3f-863a-8df34d7b16d4",
    label: "srsrsr",
    checked: false
  },
  {
    id: "2653454b-8f1f-43e9-a1c7-cefc3c27e60e",
    label: "fdgh",
    checked: true
  }];
  
app.get('/todos', (req, res) => {
  res.set({
    "Access-Control-Allow-Origin":"*"
  })
  res.json(todos);
})
app.post('/todos', (req, res) => {
  const newTodo = {id: v4(), ...req.body };
  todos.push(newTodo);
  res.status(200);
  res.set({
    "Access-Control-Allow-Origin":"*"
  })
  res.json(newTodo);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})