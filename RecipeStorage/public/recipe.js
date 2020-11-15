/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/html.js":
/*!*********************!*\
  !*** ./src/html.js ***!
  \*********************/
/*! namespace exports */
/*! export showContent [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showLogin [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showReccipes [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showRecipeDetail [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showContent": () => /* binding */ showContent,
/* harmony export */   "showLogin": () => /* binding */ showLogin,
/* harmony export */   "showReccipes": () => /* binding */ showReccipes,
/* harmony export */   "showRecipeDetail": () => /* binding */ showRecipeDetail
/* harmony export */ });


var showContent = function showContent() {
  document.querySelector('#todo-app .login').classList.add('hidden');
  document.querySelector('#todo-app .logged-in').classList.remove('hidden');
  document.querySelector('#todo-app .new-recipe').classList.remove('hidden');
};
var showLogin = function showLogin() {
  document.querySelector('#todo-app .login').classList.remove('hidden');
  document.querySelector('#todo-app .logged-in').classList.add('hidden');
  document.querySelector('#todo-app .new-recipe').classList.add('hidden');
};
var showReccipes = function showReccipes() {
  document.querySelector('#todo-app .recipe-list').classList.remove('hidden');
  document.querySelector('#todo-app .recipe-detail').classList.add('hidden');
};
var showRecipeDetail = function showRecipeDetail() {
  document.querySelector('#todo-app .recipe-list').classList.add('hidden');
  document.querySelector('#todo-app .recipe-detail').classList.remove('hidden');
};

/***/ }),

/***/ "./src/recipe.js":
/*!***********************!*\
  !*** ./src/recipe.js ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html */ "./src/html.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");





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
  var addRecipeButton = document.querySelector('#todo-app .addRecipe-btn');
  var recipeListEl = document.querySelector('main .recipe-list');
  var recipeDetailEl = document.querySelector('main .recipe-detail');
  var titleInputEl = document.getElementById('title');
  var imageInputEl = document.getElementById('image');
  var descriptionInputEl = document.getElementById('description');
  var ingredientsInputEl = document.getElementById('ingredients');
  var instructionsInputEl = document.getElementById('instructions');
  disableButtonIfNoInput();
  addLogin();
  addLogout();
  addAbilityToViewRecipes();
  addAbilityToAddRecipes(); // Check for login

  (0,_services__WEBPACK_IMPORTED_MODULE_1__.checkLoginStatus)().then(function (userInfo) {
    appState.isLoggedIn = true;
    poll(true);
    (0,_html__WEBPACK_IMPORTED_MODULE_0__.showContent)();
    (0,_html__WEBPACK_IMPORTED_MODULE_0__.showReccipes)();
  })["catch"](function (error) {
    appState.isLoggedIn = false;
    (0,_html__WEBPACK_IMPORTED_MODULE_0__.showLogin)();
    (0,_html__WEBPACK_IMPORTED_MODULE_0__.showReccipes)();
  });

  function poll(shouldPoll) {
    if (shouldPoll && !appState.pollId) {
      appState.pollId = setInterval(function () {
        (0,_services__WEBPACK_IMPORTED_MODULE_1__.getRecipes)()["catch"](function (err) {
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
  }

  function addLogin() {
    document.querySelector('#todo-app .login button').addEventListener('click', function () {
      var username = usernameInputEl.value;
      (0,_services__WEBPACK_IMPORTED_MODULE_1__.performLogin)(username).then(function (userInfo) {
        appState.isLoggedIn = true;
        appState.todos = userInfo;
        appState.error = '';
        poll(true);
        (0,_html__WEBPACK_IMPORTED_MODULE_0__.showContent)();
        (0,_html__WEBPACK_IMPORTED_MODULE_0__.showReccipes)();
        renderRecipes(userInfo);
      })["catch"](function (err) {
        console.log(err);
        console.log("err");
        updateStatus(err);
        (0,_html__WEBPACK_IMPORTED_MODULE_0__.showLogin)();
        (0,_html__WEBPACK_IMPORTED_MODULE_0__.showReccipes)();
      });
    });
  }

  function addLogout() {
    logoutButton.addEventListener('click', function () {
      (0,_services__WEBPACK_IMPORTED_MODULE_1__.performLogout)().then(function (userInfo) {
        console.log('logout successfully');
        (0,_html__WEBPACK_IMPORTED_MODULE_0__.showLogin)();
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
        (0,_html__WEBPACK_IMPORTED_MODULE_0__.showContent)();
        (0,_html__WEBPACK_IMPORTED_MODULE_0__.showReccipes)();
      });
    });
  }

  function renderRecipes(recipes) {
    var html = '';

    for (var recipe_id in recipes) {
      var recipe = recipes[recipe_id];
      html += "\n        <li class=\"card\">\n          <div class=\"card__body\">\n            <img src=\"".concat(recipe.image, "\" alt=\"image for ").concat(recipe.title, "\" class=\"card__image\">\n            <h2 class=\"card__title\">").concat(recipe.title, "</h2>\n            <p class=\"card__description\">By ").concat(recipe.author, "</p>\n          </div>\n          <button class=\"card__btn\" id=\"").concat(recipe_id, "\">View Recipe</button>\n        </li>");
    }

    recipeListEl.innerHTML = html; // addRecipeButton.disabled = !taskInputEl.value;
  }

  function strArrayProcessor(plainText) {
    var strArray = plainText.split("\n");
    var processedArray = strArray.map(function (s) {
      return "\n      <li>\n        ".concat(s, "\n      </li>");
    }).join("");
    return processedArray;
  }

  function renderRecipeDetail(recipe) {
    var ingredients = strArrayProcessor(recipe.ingredients);
    var instructions = strArrayProcessor(recipe.instructions);
    var html = "\n        <img src=\"".concat(recipe.image, "\" alt=\"image for ").concat(recipe.title, "\" class=\"\">\n        <h2>").concat(recipe.title, "</h2>\n        <p class=\"author\">Written By: ").concat(recipe.author, "</p>\n        <p class=\"description\">").concat(recipe.description, "</p>\n        <h3>Ingredients</h3>\n        <ul class=\"ingredients\">").concat(ingredients, "</ul>\n        <h3>Instructions</h3>\n        <ol class=\"instructions\">").concat(instructions, "</ol>");
    recipeDetailEl.innerHTML = html;
  }

  function disableButtonIfNoInput() {
    usernameInputEl.addEventListener('input', function () {
      loginButton.disabled = !usernameInputEl.value;
    });
  }

  function addAbilityToViewRecipes() {
    recipeListEl.addEventListener('click', function (e) {
      if (!e.target.classList.contains('card__btn')) {
        return;
      }

      console.log(e.target.id);
      var recipe_id = e.target.id;
      fetch("/recipes/".concat(recipe_id), {
        method: 'get'
      })["catch"](function () {
        return Promise.reject({
          error: 'network-error'
        });
      }).then(convertError).then(function (recipe) {
        (0,_html__WEBPACK_IMPORTED_MODULE_0__.showRecipeDetail)();
        renderRecipeDetail(recipe);
        updateStatus('');
      })["catch"](function (err) {
        updateStatus(errMsgs[err.error] || err.error);
      });
    });
  }

  function addAbilityToAddRecipes() {
    addRecipeButton.addEventListener('click', function (e) {
      var title = titleInputEl.value;
      var image = imageInputEl.value;
      var description = descriptionInputEl.value;
      var ingredients = ingredientsInputEl.value;
      var instructions = instructionsInputEl.value;
      fetch("/recipes", {
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
      })["catch"](function () {
        return Promise.reject({
          error: 'network-error'
        });
      }).then(convertError).then(function (recipes) {
        titleInputEl.value = '';
        imageInputEl.value = '';
        descriptionInputEl.value = '';
        ingredientsInputEl.value = '';
        instructionsInputEl.value = '';
        renderRecipes(recipes);
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
    (0,_html__WEBPACK_IMPORTED_MODULE_0__.showReccipes)();
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