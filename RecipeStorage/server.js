const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('./src/session');
const uuid = require('uuid').v4;
const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(cookieParser());


app.get('/session', (req, res) =>
{
  // check cookie from request
  const sid = req.cookies.sid;
  if (!sid)
  {
    res.status(401).json({ error: 'login-required' });
    return;
  }
  if (session.isValidSession(sid))
  {
    res.status(200).json(session.recipes_ls);
    return;
  }

  res.status(403).json({ error: 'login-invalid' });
});

app.delete('/session', (req, res) =>
{

  const sid = req.cookies.sid;

  res.cookie('sid', '');
  res.status(200).json(session.sessions[sid]);
});

app.post('/session', express.json(), (req, res) =>
{
  const { username } = req.body;
  const errors = session.validateUsername(username);

  if (errors.length > 0)
  {
    res.status(400).json({ errors });
    return;
  }
  if (username in session.username_sid)
  {
    const sid = session.username_sid[username];
    res.cookie('sid', sid);
    res.status(200).json(session.recipes_ls);
  } else
  {
    const sid = session.createSession(username);
    res.cookie('sid', sid);
    res.status(200).json(session.recipes_ls);
  }
});

app.get('/todos', (req, res) =>
{
  const sid = req.cookies.sid;
  if (sid && sid in sessions)
  {
    res.json(session.sessions[sid].todos);
  } else
  {
    res.json([]);
  }

});

app.post('/todos/:task', express.json(), (req, res) =>
{
  const task = req.params.task;
  const sid = req.cookies.sid;
  if (!task)
  {
    res.status(400).json({ error: 'missing-task' });
    return;
  }
  const new_todo = {
    task: task,
    done: false
  }
  sessions[sid].todos.push(new_todo);
  res.json(session.sessions[sid].todos);
});

app.patch('/todos/:index', express.json(), (req, res) =>
{
  const index = req.params.index;

  const sid = req.cookies.sid;
  if (!index)
  {
    res.status(400).json({ error: 'missing-index' });
    return;
  }

  session.sessions[sid].todos[index].done = !session.sessions[sid].todos[index].done;
  res.json(session.sessions[sid].todos);
});

app.delete('/todos/:index', (req, res) =>
{
  const sid = req.cookies.sid;
  const index = req.params.index;
  if (!index)
  {
    res.status(400).json({ error: 'missing-index' });
    return;
  }
  session.sessions[sid].todos.splice(index, 1);
  res.json(session.sessions[sid].todos);
});


// ================================= recipes =================================
app.get('/recipes', (req, res) =>
{
  res.json(session.recipes_ls);
});

app.post('/recipes', express.json(), (req, res) =>
{
  const recipe = req.body;
  const sid = req.cookies.sid;
  const author = session.sessions[sid].username;
  const id = uuid();
  const recipe_id = `${author}_${id}`;

  const new_recipe = {
    title: recipe.title,
    author: author,
    image: recipe.image,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions
  }
  session.sessions[sid].recipes.push(recipe_id);
  session.recipes_ls[recipe_id] = new_recipe;
  res.json(session.recipes_ls);
});

app.get('/recipes/:recipe_id', express.json(), (req, res) =>
{
  const recipe_id = req.params.recipe_id;

  const sid = req.cookies.sid;
  if (!recipe_id)
  {
    res.status(400).json({ error: 'missing-recipe_id' });
    return;
  }


  res.json(session.recipes_ls[recipe_id]);
});






app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

