"use strict";

import { showContent, showLogin, showReccipes, showRecipeDetail } from './html';
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

  const addRecipeButton = document.querySelector('#todo-app .addRecipe-btn');

  const recipeListEl = document.querySelector('main .recipe-list');
  const recipeDetailEl = document.querySelector('main .recipe-detail');



  const titleInputEl = document.getElementById('title');
  const imageInputEl = document.getElementById('image');
  const descriptionInputEl = document.getElementById('description');
  const ingredientsInputEl = document.getElementById('ingredients');
  const instructionsInputEl = document.getElementById('instructions');



  disableButtonIfNoInput();
  addLogin();
  addLogout();
  addAbilityToViewRecipes();
  addAbilityToAddRecipes();



  // Check for login
  checkLoginStatus()
    .then((userInfo) =>
    {
      appState.isLoggedIn = true;
      poll(true);
      showContent();
      showReccipes();
    })
    .catch(error =>
    {
      appState.isLoggedIn = false;
      showLogin();
      showReccipes();
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
          showReccipes();
          renderRecipes(userInfo);
        })
        .catch(err =>
        {
          updateStatus(errMsgs[err.error] || err.error);
          showLogin();
          showReccipes();
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
          console.log('logout successfully');

          showLogin();
        })
        .catch(err =>
        {
          updateStatus(errMsgs[err.error] || err.error);
          showContent();
          showReccipes();
        });

    });
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
    }
    recipeListEl.innerHTML = html;
    // addRecipeButton.disabled = !taskInputEl.value;
  }

  function strArrayProcessor(plainText) {
    const strArray = plainText.split("\n");



    const processedArray = strArray.map((s) =>
    {
      return `
      <li>
        ${s}
      </li>`;
    }).join("");
    return processedArray;

  }

  function renderRecipeDetail(recipe)
  {
    const ingredients = strArrayProcessor(recipe.ingredients);
    const instructions = strArrayProcessor(recipe.instructions);
    let html = `
        <img src="${recipe.image}" alt="image for ${recipe.title}" class="">
        <h2>${recipe.title}</h2>
        <p class="author">Written By: ${recipe.author}</p>
        <p class="description">${recipe.description}</p>
        <h3>Ingredients</h3>
        <ul class="ingredients">${ingredients}</ul>
        <h3>Instructions</h3>
        <ol class="instructions">${instructions}</ol>`;

    recipeDetailEl.innerHTML = html;

  }

  function disableButtonIfNoInput()
  {
    usernameInputEl.addEventListener('input', () =>
    {
      loginButton.disabled = !usernameInputEl.value;
    })
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
      const ingredients = ingredientsInputEl.value;
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
          ingredients: ingredients,
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
          ingredientsInputEl.value = '';
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



  fetch('/recipes/', {
    method: 'GET',
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(convertError)
    .then(recipes =>
    {

      showReccipes();
      renderRecipes(recipes);
      updateStatus('');
    })
    .catch(err =>
    {
      updateStatus(errMsgs[err.error] || err.error);
    });

})();
