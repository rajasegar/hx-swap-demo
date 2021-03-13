const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pug = require('pug');
const app = express();

const PORT = process.env.PORT || 3000;

const _todos = [
'Wake up',
'Brush Teeth',
'Take Bath'
];

let todos = [..._todos];
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.post('/reset', (req, res) => {
  //const template = pug.compileFile('views/includes/todolist.pug');
  todos = [..._todos];
  //const markup = template({ todos });
  //res.send(markup);
  res.redirect('/');
});

app.post('/todos', (req, res) => {
  console.log(req.body);
  const { todo } = req.body;
  todos.push(todo);
  res.send(`<li class="green">${todo}</li>`);
});


app.listen(PORT);
console.log('Listening on port: ' + PORT);
