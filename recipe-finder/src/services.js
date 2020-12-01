

export const fetchLoginStatus = ()=>{
    return fetch('/session', {
      method:'GET'
    })
    .catch(()=>{
      return Promise.reject({code:'network-error'});
    })
    .then((response)=>{
      if(!response.ok){
        return response.json().then(result=>Promise.reject(result));
      }
      return response.json();
    });
  };

export const fetchLogin = (username, password) => {
    return fetch('/session/' + username + '/' + password, {
        method: 'GET',
    })
    .catch(() => {
        return Promise.reject({code:'network-error'});
    })
    .then((response) => {
        if(!response.ok){
            return response.json().then(result => Promise.reject(result));
        }
        return response.json();
    });
};

export const performLogout = () => {
    return fetch('/session/', {
        method: 'DELETE',
    })
    .catch(() => {
        return Promise.reject({code:'network-error'});
    })
    .then((response) => {
        if(!response.ok){
            return response.json().then(result => Promise.reject(result));
        }
        return response.json();
    });
}

export const fetchRegister = (username, password)=>{
    return fetch('/session', {
      method:'POST',
      headers:new Headers({
        'content-type':'application/json',
      }),
      body:JSON.stringify({username, password})
    })
    .catch(()=>{
      return Promise.reject({code:'network-error'});
    })
    .then((response)=>{
      if(!response.ok){
        return response.json().then(result => Promise.reject(result));
      }
      return response.json();
    });
};

export const fetchAllUserPosts = () => {
    return fetch('/posts', {
        method:'GET'
    })
    .catch(() => {
        return Promise.reject({code:'network-error'});
    })
    .then((response) => {
        if(!response.ok){
            return response.json().then(result => Promise.reject(result));
        }
        return response.json();
    });
};

export const fetchUserPosts = (username)=>{
    return fetch('/posts/' + username, {
        method:'GET'
    })
    .catch(()=>{
        return Promise.reject({code:'network-error'});
    })
    .then((response)=>{
        if(!response.ok){
            return response.json().then(result=>Promise.reject(result));
        }
        return response.json();
    });
};

export const fetchAddPost = (username, post)=>{
    return fetch('/posts/' + username, {
        method:'POST',
        headers:new Headers({
            'content-type':'application/json',
        }),
        body:JSON.stringify({post})
    })
    .catch(()=>{
        return Promise.reject({code:'network-error'});
    })
    .then((response)=>{
        if(!response.ok){
            return response.json().then(result=>Promise.reject(result));
        }
        return response.json();
    });
};

export const fetchOnePost = (username, postId)=>{
    return fetch('/posts/' + username + '/' + postId, {
        method:'GET'
    })
    .catch(()=>{
        return Promise.reject({code:'network-error'});
    })
    .then((response)=>{
        if(!response.ok){
            return response.json().then(result=>Promise.reject(result));
        }
        return response.json();
    });
};

export const fetchUpdatePost = (username, postId, post)=>{
    return fetch('/posts/' + username + '/' + postId, {
        method:'PUT',
        headers:new Headers({
            'content-type':'application/json',
        }),
        body:JSON.stringify({post})
    })
    .catch(()=>{
        return Promise.reject({code:'network-error'});
    })
    .then((response)=>{
        if(!response.ok){
            return response.json().then(result=>Promise.reject(result));
        }
        return response.json();
    });
};

export const fetchDeleteOnePost = (username, postId)=>{
    return fetch('/posts/' + username + '/' + postId, {
        method:'DELETE'
    })
    .catch(()=>{
        return Promise.reject({code:'network-error'});
    })
    .then((response)=>{
        if(!response.ok){
            return response.json().then(result=>Promise.reject(result));
        }
        return response.json();
    });
};

export const fetchCategories = () => {
    return fetch('/categories', {
        method:'GET'
    })
    .catch(() => {
        return Promise.reject({code: 'network-error'});
    })
    .then((response) => {
        if(!response.ok){
            return response.json().then(result => Promise.reject(result));
        }
        return response.json();
    });
};

export const fetchPostUnderCategory = (category) => {
    return fetch('/posts/category', {
        method:'POST',
        headers:new Headers({
            'content-type':'application/json',
        }),
        body:JSON.stringify({category})
    })
    .catch(() => {
        return Promise.reject({code: 'network-error'});
    })
    .then((response) => {
        if(!response.ok){
            return response.json().then(result => Promise.reject(result));
        }
        return response.json();
    });
};

export const addComment = (userId, postId, commentorName, comment) => {
    return fetch('/posts', {
        method: 'PATCH',
        headers:new Headers({
            'content-type':'application/json',
        }),
        body:JSON.stringify({userId, postId, commentorName, comment})
    })
    .catch(() => {
        return Promise.reject({code: 'network-error'});
    })
    .then((response) => {
        if(!response.ok){
            return response.json().then(result => Promise.reject(result));
        }
        return response.json();
    });
};
