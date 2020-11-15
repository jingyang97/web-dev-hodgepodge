export const checkLoginStatus = function ()
{
  return fetch('/session', {
    method: 'GET',
  })
    .catch(() =>
    {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response =>
    {
      if (response.ok)
      {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
};

export const performLogin = function (username)
{
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
    .catch(() =>
    {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response =>
    {
      if (response.ok)
      {
        return response.json();
      }
      return response.json().then(err =>


        Promise.reject(err));
    });
};

export const performLogout = function ()
{
  return fetch('/session', {
    method: 'DELETE',

  })
    .catch(() =>
    {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response =>
    {
      if (response.ok)
      {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
};

export const getRecipes = function ()
{
  return fetch('/recipes', {
    method: 'GET',
  })
    .catch(() =>
    {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response =>
    {
      if (response.ok)
      {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
};

export const getRecipeDetail = function (recipe_id) {
  return  fetch(`/recipes/${recipe_id}`, {
    method: 'get',
  })
  .catch(() =>
    {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response =>
    {
      if (response.ok)
      {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });

  };

export const onLoad = function () {
    return fetch('/recipes/', {
      method: 'GET',
    })
    .catch(() =>
    {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response =>
    {
      if (response.ok)
      {
        return response.json();
      }
      return response.json().then(err => Promise.reject(err));
    });
  };

  export const createNewRecipe = function (recipe) {
    return fetch(`/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      redirect: 'follow',
      body: JSON.stringify({
        recipe
      })
    })
    .catch(() =>
    {
      return Promise.reject({ error: 'network-error' });
    })
    .then(response =>
    {
      if (response.ok)
      {
        return response.json();
      }
      return response.json().then(err =>


        Promise.reject(err));
    });

    };
