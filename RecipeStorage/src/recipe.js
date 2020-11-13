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
  // const taskInputEl = document.querySelector('#todo-app .add-task');
  const addRecipeButton = document.querySelector('#todo-app .addRecipe-btn');

  const recipeListEl = document.querySelector('main .recipe-list');
  const recipeDetailEl = document.querySelector('main .recipe-detail');

  const listEl = document.querySelector('#todo-app .todos');

  const titleInputEl = document.getElementById('title');
  const imageInputEl = document.getElementById('image');
  const descriptionInputEl = document.getElementById('description');
  const ingridientsInputEl = document.getElementById('ingredients');
  const instructionsInputEl = document.getElementById('instructions');



  disableButtonIfNoInput();
  addLogin();
  addLogout();

  addAbilityToViewRecipes();
  addAbilityToAddRecipes();
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
  function showReccipes()
  {
    document.querySelector('.recipe-list').classList.remove('hidden');
    document.querySelector('.recipe-detail').classList.add('hidden');

  }
  function showRecipeDetail()
  {
    document.querySelector('.recipe-list').classList.add('hidden');
    document.querySelector('.recipe-detail').classList.remove('hidden');

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
    // addRecipeButton.disabled = !taskInputEl.value;
  }

  function renderRecipes(recipes)
  {
    let html = '';
    for (const recipe_id in recipes) {
      const recipe = recipes[recipe_id];
      html += `
        <li class="card">
          <div class="card__body">
            <img src="${recipe.image}" alt="image for ${recipe.title}" class="card__image">
            <h2 class="card__title">${recipe.title}</h2>
            <p class="card__description">${recipe.author}</p>
          </div>
          <button class="card__btn" id="${recipe_id}">View Recipe</button>
        </li>`;

        // html += `
        // <li class="card">
        //   <div class="card__body">
        //     <span class="card__image" data-index="${recipe_id}"><img src="${recipe.image}" alt="image for ${recipe.title}"></span>
        //     <span class="words" data-index="${recipe_id}">

        //     <h2 class="card__title" data-index="${recipe_id}>${recipe.title}</h2>
        //     <p class="card__author">${recipe.author}</p>
        //     <p class="card__description" data-index="${recipe_id}>${recipe.description}</p>
        //     </span>
        //   </div>

        // </li>`;
    }
    recipeListEl.innerHTML = html;
    // addRecipeButton.disabled = !taskInputEl.value;
  }

  function renderRecipeDetail(recipe)
  {
    let html = `
        <img src="${recipe.image}" alt="image for ${recipe.title}" class="">
        <h2>${recipe.title}</h2>
        <p>${recipe.author}</p>
        <p>${recipe.discription}</p>
        <p>${recipe.ingredients}</p>
        <p>${recipe.instructions}</p>`;



    recipeDetailEl.innerHTML = html;
    // addRecipeButton.disabled = !taskInputEl.value;
  }

  function disableButtonIfNoInput()
  {

    usernameInputEl.addEventListener('input', () =>
    {
      loginButton.disabled = !usernameInputEl.value;
    })
    // taskInputEl.addEventListener('input', () =>
    // {
    //   addRecipeButton.disabled = !taskInputEl.value;
    // });
  }

  function addAbilityToViewRecipes()
  {

    recipeListEl.addEventListener('click', (e) =>
    {
      if (!e.target.classList.contains('card__btn'))
      {
        return;
      }
      console.log(e.target.id);
      const recipe_id = e.target.id;

      fetch(`/recipes/${recipe_id}`, {
        method: 'get',
      })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(convertError)
        .then(recipe =>
        {
          // taskInputEl.value = '';
          showRecipeDetail();
          renderRecipeDetail(recipe);
          updateStatus('');
        })
        .catch(err =>
        {
          updateStatus(errMsgs[err.error] || err.error);
        });
    });
  }

  function addAbilityToAddRecipes()
  {

    addRecipeButton.addEventListener('click', (e) =>
    {
      const title = titleInputEl.value;
      const image = imageInputEl.value;
      const description = descriptionInputEl.value;
      const ingridients = ingridientsInputEl.value;
      const instructions = instructionsInputEl.value;


      fetch(`/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        redirect: 'follow',
        body: JSON.stringify({
          title: title,
          image: image,
          description: description,
          ingridients: ingridients,
          instructions: instructions
        })
      })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(convertError)
        .then(recipes =>
        {
          titleInputEl.value = '';
          imageInputEl.value = '';
          descriptionInputEl.value = '';
          ingridientsInputEl.value = '';
          instructionsInputEl.value = '';
          renderRecipes(recipes);

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
          // taskInputEl.value = '';
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
