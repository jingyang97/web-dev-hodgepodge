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
  delete session.sessions[sid];
  res.status(200).json(session.recipes_ls);
});

app.post('/session', express.json(), (req, res) =>
{
  const { username } = req.body;
  const errors = session.validateUsername(username);

  if (errors.length > 0)
  {
    res.status(400).json(errors);

    return;
  }

  const sid = session.createSession(username);
  res.cookie('sid', sid);
  res.status(200).json(session.recipes_ls);

});




app.get('/recipes', (req, res) =>
{
  res.json(session.recipes_ls);
});

app.post('/recipes', express.json(), (req, res) =>
{
  const recipe = req.body;

  // no recipe
  if (!recipe)
  {
    res.status(400).json({ error: 'no-recipe' });
    return;
  }

  // empty required fields
  if (!recipe.title || !recipe.ingredients || !recipe.instructions)
  {
    res.status(400).json({ error: 'empty-recipe' });
    return;
  }

  const sid = req.cookies.sid;
  const author = session.sessions[sid];
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
  session.recipes_ls[recipe_id] = new_recipe;

  res.json(session.recipes_ls);
});

app.get('/recipes/:recipe_id', express.json(), (req, res) =>
{
  const recipe_id = req.params.recipe_id;


  if (!recipe_id || !recipe_id in session.recipes_ls)
  {
    res.status(400).json({ error: 'missing-recipe_id' });
    return;
  }


  res.json(session.recipes_ls[recipe_id]);
});






app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

