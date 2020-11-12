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
      return response.json().then(err => Promise.reject(err));
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

export const getTodos = function ()
{
  return fetch('/todos', {
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
