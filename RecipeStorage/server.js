const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(cookieParser());


const sessions = {};
const username_sid = {};
const isValidSession = function (sid)
{
  return sessions[sid];
};
const validateUsername = function (username)
{
  const errors = [];
  if (!username)
  {
    errors.push('username was empty');
  }
  const clean = username.trim()
  if (clean !== username)
  {

    errors.push('username is not valid');
  }
  if (username.includes('dog'))
  {
    errors.push('username contained disallowed characters');
  }

  return errors;
};
const createSession = function (username)
{
  const sid = uuid();
  sessions[sid] = {
    username,
    todos: [
      {
        task: 'Add more tasks',
        done: false,
      }
    ],
  };
  username_sid[username] = sid;
  return sid;
};


app.get('/session', (req, res) =>
{
  // check cookie from request
  const sid = req.cookies.sid;
  if (!sid)
  {
    res.status(401).json({ error: 'login-required' });
    return;
  }
  if (isValidSession(sid))
  {
    res.status(200).json(sessions[sid]);
    return;
  }

  res.status(403).json({ error: 'login-invalid' });
});

app.delete('/session', (req, res) =>
{

  const sid = req.cookies.sid;

  res.cookie('sid', '');
  res.status(200).json(sessions[sid]);
});

app.post('/session', express.json(), (req, res) =>
{
  const { username } = req.body;
  const errors = validateUsername(username);

  if (errors.length > 0)
  {
    res.status(400).json({ errors });
    return;
  }
  if (username in username_sid)
  {
    const sid = username_sid[username];
    res.cookie('sid', sid);
    res.status(200).json(sessions[sid]);
  } else
  {
    const sid = createSession(username);
    res.cookie('sid', sid);
    res.status(200).json(sessions[sid]);
  }
});

app.get('/todos', (req, res) =>
{
  const sid = req.cookies.sid;
  if (sid && sid in sessions)
  {
    res.json(sessions[sid].todos);
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
  res.json(sessions[sid].todos);
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

  sessions[sid].todos[index].done = !sessions[sid].todos[index].done;
  res.json(sessions[sid].todos);
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
  sessions[sid].todos.splice(index, 1);
  res.json(sessions[sid].todos);
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

