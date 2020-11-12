/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/recipe.js":
/*!***********************!*\
  !*** ./src/recipe.js ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");




(function iife() {
  var appState = {
    pollId: null,
    isLoggedIn: false,
    todos: [],
    error: ''
  };
  var errMsgs = {
    'duplicate': 'That name already exists',
    'network-error': 'There was a problem connecting to the network, try again'
  };
  var usernameInputEl = document.querySelector('#todo-app .username-input');
  var loginButton = document.querySelector('#todo-app .login button');
  var logoutButton = document.querySelector('#todo-app .logout-button');
  var status = document.querySelector('.status');
  var taskInputEl = document.querySelector('#todo-app .add-task');
  var addTaskButton = document.querySelector('#todo-app .addTask-button');
  var recipeListEl = document.querySelector('main .recipe-list');
  var listEl = document.querySelector('#todo-app .todos');
  disableButtonIfNoInput();
  addLogin();
  addLogout();
  addAbilityToCompleteItems();
  addAbilityToAddItems();
  addAbilityToDeleteItems(); // Check for login

  (0,_services__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function (userInfo) {
    appState.isLoggedIn = true;
    poll(true);
    showContent();
  })["catch"](function (error) {
    appState.isLoggedIn = false;
    showLogin();
  });

  function poll(shouldPoll) {
    if (shouldPoll && !appState.pollId) {
      appState.pollId = setInterval(function () {
        (0,_services__WEBPACK_IMPORTED_MODULE_0__.getRecipes)()["catch"](function (err) {
          updateStatus(errMsgs[err.error] || err.error);
        }).then(function (recipes) {
          appState.error = '';
          appState.todos = recipes;
          renderRecipes(recipes);
        });
      }, 3000);
    } // For when a user logs out:


    if (!shouldPoll && appState.pollId) {
      clearTimeout(appState.pollId);
      appState.pollId = null;
    }
  }

  function updateStatus(message) {
    status.innerText = message;
  }

  function convertError(response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  } // TODO: Move these HTML-changing functions to an import from another file


  function showContent() {
    document.querySelector('#todo-app .login').classList.add('hidden');
    document.querySelector('#todo-app .logged-in').classList.remove('hidden');
  }

  function showLogin() {
    document.querySelector('#todo-app .login').classList.remove('hidden');
    document.querySelector('#todo-app .logged-in').classList.add('hidden');
  }

  function addLogin() {
    document.querySelector('#todo-app .login button').addEventListener('click', function () {
      var username = usernameInputEl.value;
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogin)(username).then(function (userInfo) {
        appState.isLoggedIn = true;
        appState.todos = userInfo;
        appState.error = '';
        poll(true);
        showContent(); // renderTodos(userInfo.todos);

        renderRecipes(userInfo);
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
        showLogin();
      });
    });
  }

  function addLogout() {
    logoutButton.addEventListener('click', function () {
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogout)().then(function (userInfo) {
        showLogin();
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
        showContent();
      });
    });
  }

  function renderTodos(todos) {
    var html = todos.map(function (todo, index) {
      return "\n      <li>\n        <span class=\"todo ".concat(todo.done ? "complete" : "", "\" data-index=\"").concat(index, "\">").concat(todo.task, "</span>\n        <span class=\"delete\" data-index=\"").concat(index, "\">X</span>\n      </li>");
    }).join("\n");
    listEl.innerHTML = html;
    addTaskButton.disabled = !taskInputEl.value;
  }

  function renderRecipes(recipes) {
    var html = '';

    for (var recipe_id in recipes) {
      var recipe = recipes[recipe_id];
      html += "\n        <div class=\"card\">\n          <div class=\"card__body\">\n            <img src=\"".concat(recipe.image, "\" alt=\"image for ").concat(recipe.title, "\" class=\"card__image\">\n            <h2 class=\"card__title\">").concat(recipe.title, "</h2>\n            <p class=\"card__description\">").concat(recipe.description, "</p>\n          </div>\n          <button class=\"card__btn\">View Recipe</button>\n        </div>");
    }

    recipeListEl.innerHTML = html;
    addTaskButton.disabled = !taskInputEl.value;
  }

  function disableButtonIfNoInput() {
    usernameInputEl.addEventListener('input', function () {
      loginButton.disabled = !usernameInputEl.value;
    });
    taskInputEl.addEventListener('input', function () {
      addTaskButton.disabled = !taskInputEl.value;
    });
  }

  function addAbilityToCompleteItems() {
    listEl.addEventListener('click', function (e) {
      if (!e.target.classList.contains('todo')) {
        return;
      }

      var index = e.target.dataset.index;
      fetch("/todos/".concat(index), {
        method: 'PATCH'
      })["catch"](function () {
        return Promise.reject({
          error: 'network-error'
        });
      }).then(convertError).then(function (todos) {
        taskInputEl.value = '';
        renderTodos(todos);
        updateStatus('');
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
      });
    });
  }

  function addAbilityToAddItems() {
    addTaskButton.addEventListener('click', function (e) {
      var task = taskInputEl.value;
      fetch("/todos/".concat(task), {
        method: 'POST'
      })["catch"](function () {
        return Promise.reject({
          error: 'network-error'
        });
      }).then(convertError).then(function (todos) {
        taskInputEl.value = '';
        renderTodos(todos);
        updateStatus('');
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
      });
    });
  }

  function addAbilityToDeleteItems() {
    listEl.addEventListener('click', function (e) {
      if (!e.target.classList.contains('delete')) {
        return;
      }

      var index = e.target.dataset.index;
      fetch("/todos/".concat(index), {
        method: 'DELETE'
      })["catch"](function () {
        return Promise.reject({
          error: 'network-error'
        });
      }).then(convertError).then(function (todos) {
        taskInputEl.value = '';
        renderTodos(todos);
        updateStatus('');
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
      });
    });
  }

  fetch('/recipes/', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(convertError).then(function (recipes) {
    renderRecipes(recipes);
    updateStatus('');
  })["catch"](function (err) {
    updateStatus(errMsgs[err.error] || err.error);
  });
})();

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/*! namespace exports */
/*! export checkLoginStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getRecipes [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getTodos [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export performLogout [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkLoginStatus": () => /* binding */ checkLoginStatus,
/* harmony export */   "performLogin": () => /* binding */ performLogin,
/* harmony export */   "performLogout": () => /* binding */ performLogout,
/* harmony export */   "getTodos": () => /* binding */ getTodos,
/* harmony export */   "getRecipes": () => /* binding */ getRecipes
/* harmony export */ });
var checkLoginStatus = function checkLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogin = function performLogin(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogout = function performLogout() {
  return fetch('/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var getTodos = function getTodos() {
  return fetch('/todos', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var getRecipes = function getRecipes() {
  return fetch('/recipes', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/recipe.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=recipe.js.map