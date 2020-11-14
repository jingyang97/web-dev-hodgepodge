"use strict";

export const showContent = function ()
  {
    document.querySelector('#todo-app .login').classList.add('hidden');
    document.querySelector('#todo-app .logged-in').classList.remove('hidden');
  };

export const showLogin = function ()
  {
    document.querySelector('#todo-app .login').classList.remove('hidden');
    document.querySelector('#todo-app .logged-in').classList.add('hidden');
  };

export const showReccipes = function ()
  {
    document.querySelector('#todo-app .recipe-list').classList.remove('hidden');
    document.querySelector('#todo-app .recipe-detail').classList.add('hidden');

  };

export const showRecipeDetail = function ()
  {
    document.querySelector('#todo-app .recipe-list').classList.add('hidden');
    document.querySelector('#todo-app .recipe-detail').classList.remove('hidden');

  };
