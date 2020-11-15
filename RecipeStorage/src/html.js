"use strict";

export const showContent = function ()
  {
    document.querySelector('#recipe-app .login').classList.add('hidden');
    document.querySelector('#recipe-app .logged-in').classList.remove('hidden');
    document.querySelector('#recipe-app .new-recipe').classList.remove('hidden');



};

export const showLogin = function ()
{
    document.querySelector('#recipe-app .login').classList.remove('hidden');
    document.querySelector('#recipe-app .logged-in').classList.add('hidden');
    document.querySelector('#recipe-app .new-recipe').classList.add('hidden');

};

export const showReccipes = function ()
{
    document.querySelector('#recipe-app .recipe-list').classList.remove('hidden');
    document.querySelector('#recipe-app .recipe-detail').classList.add('hidden');


};

export const showRecipeDetail = function ()
{

    document.querySelector('#recipe-app .recipe-list').classList.add('hidden');
    document.querySelector('#recipe-app .recipe-detail').classList.remove('hidden');

  };

