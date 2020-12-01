import React, {useEffect, useReducer} from 'react';
import './App.css';
import * as services from './services';
import LoginPane from './LoginPane';
import Posts from './Posts';
import Error from './Error';
import SignupPane from './SignupPane';
import Navbar from './Navbar';
import PostDetail from './PostDetail';
import Commit from './Commit';
import About from './About';
import Category from './Category';

export const StateContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  showSignup: false,
  userName: '',
  error: '',
  posts: [],
  categories: [],
  selectedPost: '',
  showCommit: false,
  showAbout: false,
  showCategory: false
};

const reducer = (state, action) => {
  switch(action.type){
    case 'REGISTER_SUCCESS':
      return {...state, showSignup: false}
    case 'REGISTER_FAILED':
      return {...state, showSignup: true, error: action.payload}
    case 'LOGIN_SUCCESS':
      return {...state, isLoggedIn: true, userName: action.payload};
    case 'LOGIN_FAILED':
      return {...state, isLoggedIn: false, error: action.payload};
    case 'POSTS_FETCHED':
      return {...state, posts: action.payload.data}
    case 'ERR_FOUND':
      return {...state, error: action.payload}
    case 'TOGGLE_SIGNUP':
      return {...state, showSignup: action.payload}
    case 'SELECT_POST':
      return {...state, selectedPost: action.payload}
    case 'SHOW_COMMIT':
      return {...state, showCommit: action.payload}
    case 'SHOW_ABOUT':
      return {...state, showAbout: action.payload}
    case 'SHOW_CATEGORY':
      return {...state, showCategory: action.payload}
    case 'SET_CATEGORY':
      return {...state, categories: action.payload}
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const callRegister = (username, password) => {
  services.fetchRegister(username, password)
  .then((response) => {
    dispatch({type: 'REGISTER_SUCCESS', payload: username});
  })
  .catch((e) => {
    dispatch({type: 'REGISTER_FAILED', payload: e.message});
  })
}

const callLogin = (username, password) => {
  services.fetchLogin(username, password)
  .then((response) => {
    dispatch({type: 'LOGIN_SUCCESS', payload: username});
    fetchAllPosts();
  })
  .catch((e) => {
    dispatch({type: 'ERR_FOUND', payload: e.message});
  })
}

const fetchAllPosts = () => {
  services.fetchAllUserPosts()
  .then(response => {
    dispatch({type: 'POSTS_FETCHED', payload: response})
    dispatch({type: 'ERR_FOUND', payload: ''})
  })
  .catch(err => {
    dispatch({type: 'ERROR_FOUND', payload: err.message})
  });
};

const fetchPostDetail = (username, postId) => {
  services.fetchOnePost(username, postId)
  .then(response => {
    dispatch({type: 'SELECT_POST', payload: response.data})
  })
  .catch(err => {
    dispatch({type: 'ERROR_FOUND', payload: err.message})
  });
};

const commitPost = (username, post) => {
  services.fetchAddPost(username, post)
  .then(response => {
    fetchAllPosts();
    dispatch({type: 'SHOW_COMMIT', payload: false});
  })
  .catch(err => {
    dispatch({type: 'ERROR_FOUND', payload: err.message})
  });
};

const getCategories = () => {
  services.fetchCategories()
  .then(response => {
    dispatch({type: 'SET_CATEGORY', payload: response.data});
  })
  .catch(err => {
    dispatch({type: 'ERROR_FOUND', payload: err.message})
  });
};

const getPostsUnderCategory = (category) => {
  services.fetchPostUnderCategory(category)
  .then(response => {
    dispatch({type: 'POSTS_FETCHED', payload: response});
    dispatch({type: 'SHOW_CATEGORY', payload: false});
  })
  .catch(err => {
    dispatch({type: 'ERROR_FOUND', payload: err.message})
  });
};

const addComment = (userId, postId, commentorName, comment) => {
  services.addComment(userId, postId, commentorName, comment)
  .then(response => {
    dispatch({type: 'SELECT_POST', payload: response.data});
  })
  .catch(err => {
    dispatch({type: 'ERROR_FOUND', payload: err.message})
  });
}

  useEffect(() => {
    services.fetchLoginStatus()
    .then((response) => {
      dispatch({type: 'LOGIN_SUCCESS', payload: response.data.username})
      fetchAllPosts();
    })
    .catch((err) => {
      dispatch({type: 'ERR_FOUND', payload: err.message});
    });
  }, []);

  return (
    <StateContext.Provider value = {{addComment: addComment, fetchAllPosts : fetchAllPosts, getPostsUnderCategory: getPostsUnderCategory, state: state, Dispatch: dispatch, callRegister: callRegister, callLogin: callLogin, fetchPostDetail: fetchPostDetail, commitPost: commitPost, getCategories: getCategories}}>
    <div className="App">
      <div className = "Content">
        {state.error? <Error err = {state.error}/> : ''}
        {state.isLoggedIn? <Navbar/> : ''}
        {state.showSignup? <SignupPane/> : state.isLoggedIn? '' : <LoginPane dispatch = {dispatch}/>}
        {state.isLoggedIn? state.showCategory? <Category/> : state.showAbout? <About/> : state.showCommit? <Commit/> : state.selectedPost? <PostDetail/> : <Posts postsToDisplay = {state.posts}/> : ''}
        <div className = 'footer-container'>
        <footer className = 'footer'>
          ©2020 Copyright: Shiyu Feng
         </footer>
        </div>
      </div>
    </div>
    </StateContext.Provider>
  );
}

export default App;
