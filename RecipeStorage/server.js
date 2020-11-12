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
    res.status(200).json(recipes_ls);
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
    res.status(200).json(recipes_ls);
  } else
  {
    const sid = session.createSession(username);
    res.cookie('sid', sid);
    res.status(200).json(recipes_ls);
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









app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

