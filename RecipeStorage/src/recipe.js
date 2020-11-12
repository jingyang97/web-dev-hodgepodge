"use strict";


import
  {
    checkLoginStatus,

    getRecipes, performLogin,
    performLogout
  } from './services';


(function iife()
{
  const appState = {
    pollId: null,
    isLoggedIn: false,
    todos: [],
    error: '',
  };

  const errMsgs = {
    'duplicate': 'That name already exists',
    'network-error': 'There was a problem connecting to the network, try again',
  };

  const usernameInputEl = document.querySelector('#todo-app .username-input');

  const loginButton = document.querySelector('#todo-app .login button')

  const logoutButton = document.querySelector('#todo-app .logout-button')

  const status = document.querySelector('.status');
  const taskInputEl = document.querySelector('#todo-app .add-task');
  const addTaskButton = document.querySelector('#todo-app .addTask-button');

  const recipeListEl = document.querySelector('main .recipe-list');

  const listEl = document.querySelector('#todo-app .todos');


  disableButtonIfNoInput();
  addLogin();
  addLogout();

  addAbilityToCompleteItems();
  addAbilityToAddItems();
  addAbilityToDeleteItems();


  // Check for login
  checkLoginStatus()
    .then((userInfo) =>
    {
      appState.isLoggedIn = true;
      poll(true);
      showContent();
    })
    .catch(error =>
    {
      appState.isLoggedIn = false;
      showLogin();
    });


  function poll(shouldPoll)
  {
    if (shouldPoll && !appState.pollId)
    {
      appState.pollId = setInterval(() =>
      {
        getRecipes()
          .catch((err) =>
          {
            updateStatus(errMsgs[err.error] || err.error);
          })
          .then(recipes =>
          {
            appState.error = '';
            appState.todos = recipes;
            renderRecipes(recipes);
          });
      }, 3000);
    }
    // For when a user logs out:
    if (!shouldPoll && appState.pollId)
    {
      clearTimeout(appState.pollId);
      appState.pollId = null;
    }
  }

  function updateStatus(message)
  {
    status.innerText = message;
  }


  function convertError(response)
  {
    if (response.ok)
    {
      return response.json();
    }
    return response.json()
      .then(err => Promise.reject(err));
  }

  // TODO: Move these HTML-changing functions to an import from another file
  function showContent()
  {
    document.querySelector('#todo-app .login').classList.add('hidden');
    document.querySelector('#todo-app .logged-in').classList.remove('hidden');
  }

  function showLogin()
  {
    document.querySelector('#todo-app .login').classList.remove('hidden');
    document.querySelector('#todo-app .logged-in').classList.add('hidden');
  }

  function addLogin()
  {
    document.querySelector('#todo-app .login button').addEventListener('click', () =>
    {

      const username = usernameInputEl.value;

      performLogin(username)
        .then((userInfo) =>
        {

          appState.isLoggedIn = true;
          appState.todos = userInfo;
          appState.error = '';
          poll(true);
          showContent();
          // renderTodos(userInfo.todos);
          renderRecipes(userInfo);
        })
        .catch(err =>
        {
          updateStatus(errMsgs[err.error] || err.error);
          showLogin();
        });

    });
  }
  function addLogout()
  {
    logoutButton.addEventListener('click', () =>
    {
      performLogout()
        .then((userInfo) =>
        {

          showLogin();
        })
        .catch(err =>
        {
          updateStatus(errMsgs[err.error] || err.error);
          showContent();
        });

    });
  }

  function renderTodos(todos)
  {
    const html = todos.map((todo, index) =>
    {



      return `
      <li>
        <span class="todo ${todo.done ? "complete" : ""}" data-index="${index}">${todo.task}</span>
        <span class="delete" data-index="${index}">X</span>
      </li>`;
    }).join("\n");
    listEl.innerHTML = html;
    addTaskButton.disabled = !taskInputEl.value;
  }

  function renderRecipes(recipes)
  {
    let html = '';
    for (const recipe_id in recipes) {
      const recipe = recipes[recipe_id];
      html += `
        <div class="card">
          <div class="card__body">
            <img src="${recipe.image}" alt="image for ${recipe.title}" class="card__image">
            <h2 class="card__title">${recipe.title}</h2>
            <p class="card__description">${recipe.description}</p>
          </div>
          <button class="card__btn">View Recipe</button>
        </div>`;
    }
    recipeListEl.innerHTML = html;
    addTaskButton.disabled = !taskInputEl.value;
  }

  function disableButtonIfNoInput()
  {

    usernameInputEl.addEventListener('input', () =>
    {
      loginButton.disabled = !usernameInputEl.value;
    })
    taskInputEl.addEventListener('input', () =>
    {
      addTaskButton.disabled = !taskInputEl.value;
    });
  }

  function addAbilityToCompleteItems()
  {
    listEl.addEventListener('click', (e) =>
    {
      if (!e.target.classList.contains('todo'))
      {
        return;
      }
      const index = e.target.dataset.index;

      fetch(`/todos/${index}`, {
        method: 'PATCH',
      })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(convertError)
        .then(todos =>
        {
          taskInputEl.value = '';
          renderTodos(todos);
          updateStatus('');
        })
        .catch(err =>
        {
          updateStatus(errMsgs[err.error] || err.error);
        });
    });
  }

  function addAbilityToAddItems()
  {
    addTaskButton.addEventListener('click', (e) =>
    {

      const task = taskInputEl.value;
      fetch(`/todos/${task}`, {
        method: 'POST',
      })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(convertError)
        .then(todos =>
        {
          taskInputEl.value = '';
          renderTodos(todos);

          updateStatus('');
        })
        .catch(err =>
        {
          updateStatus(errMsgs[err.error] || err.error);
        });
    });
  }

  function addAbilityToDeleteItems()
  {
    listEl.addEventListener('click', (e) =>
    {
      if (!e.target.classList.contains('delete'))
      {
        return;
      }

      const index = e.target.dataset.index;

      fetch(`/todos/${index}`, {
        method: 'DELETE',
      })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(convertError)
        .then(todos =>
        {
          taskInputEl.value = '';
          renderTodos(todos);
          updateStatus('');
        })
        .catch(err =>
        {
          updateStatus(errMsgs[err.error] || err.error);
        })
    });
  }

  fetch('/recipes/', {
    method: 'GET',
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(convertError)
    .then(recipes =>
    {

      renderRecipes(recipes);
      updateStatus('');
    })
    .catch(err =>
    {
      updateStatus(errMsgs[err.error] || err.error);
    });

})();
