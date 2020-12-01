const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const posts = require('./posts');
const session = require('./session');
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./build'));

const web = (res) => {
    return ({ message, status, data }={}) => {
      if(!message && !data) {
        data = 'OK';
      }
      res.status(status || 200).json({ message, data });
    };
  };

  //session
app.get('/session', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession){
        res.clearCookie('sid');
        web(res)({status: 401, message: 'invalid session'});
        return;
    }
    web(res)({ data: session.getSession(sid) } );
});

app.get('/session/:username/:password', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    const validSession = session.attemptLogin(username, password);
    if(!validSession){
        web(res)({status: 401, message: 'UserName did not match password'});
        return;
    }
    const id = session.nameToSid[username];
    res.cookie('sid', id, { MaxAge: 1000*60*60*24*365 } );
    web(res)({ data: session.getSession(id) } );
})

app.post('/session', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sessionInfo = session.attemptCreate(username, password);
    if(sessionInfo === 'Trump'){
        web(res)({ status: 403, message: 'user name contains "Trump" ' });
        return;
    }
    if(!sessionInfo) {
        web(res)({ status: 403, message: 'user already exists' });
        return;
    }
    web(res)({data: sessionInfo});
});

app.delete('/session', (req, res) => {
    const sid = req.cookies.sid;
    session.remove(sid);
    res.clearCookie('sid');
    res.json({ sid, status: 'removed' });
});

//posts
app.get('/posts', (req, res) => {
    web(res)({data: posts.readFromAllUsers()});
})

app.patch('/posts', (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;
    const commentorName = req.body.commentorName;
    const comment = req.body.comment;
    web(res)({data: posts.addComment(userId, postId, commentorName, comment)});
})

app.get('/categories', (req, res) => {
    web(res)({data: posts.getCategories()});
})

app.post('/posts/category', (req, res) => {
    web(res)({data: posts.getPostUnderCategory(req.body.category)});
})

app.get('/posts/:username', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
        res.clearCookie('sid');
        web(res)({status: 401, message: 'no valid session' });
        return;
    }
    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
        web(res)({status: 403, message: 'action not permitted' });
        return;
    }
    web(res)({ data: posts.readAll(username) } );
});

//get a post
app.get('/posts/:username/:postId', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
        res.clearCookie('sid');
        web(res)({status: 401, message: 'no valid session' });
        return;
    }
    const authorName = req.params.username;
    const postId = req.params.postId;
    const userId = session.nameToSid[authorName];
    const post = posts.readPost({ userId, postId });
    if(!post) {
        web(res)({ status: 404, message: 'no such postId' });
        return;
    }
    web(res)({ data: post } );
});

//add a new post
app.post('/posts/:username', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
      res.clearCookie('sid');
      web(res)({status: 401, message: 'no valid session' });
      return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
      web(res)({status: 403, message: 'action not permitted' });
      return;
    }

    const post = req.body.post;
    web(res)({ data: posts.addPost(sid, post)});
});

//update a post
app.put('/posts/:username/:postId', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
        res.clearCookie('sid');
        web(res)({status: 401, message: 'no valid session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
        web(res)({status: 403, message: 'action not permitted' });
        return;
    }

    const postId = req.params.postId;
    const post = req.body.post;

    const newPost = posts.replaceTask({ username, postId, post });
    if(!newPost) {
        web(res)({ status: 400, message: 'failed to update' });
        return;
    }
    web(res)({ data: newPost } );

});

//delete a post
app.delete('/posts/:username/:postId', (req, res) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
      res.clearCookie('sid');
      web(res)({status: 401, message: 'no valid session' });
      return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
      web(res)({status: 403, message: 'action not permitted' });
      return;
    }

    const postId = req.params.postId;
    const post = posts.removeTask({ username, postId });
    if(!post) {
      web(res)({ status: 404, message: 'no such taskId' });
      return;
    }
    web(res)({ data: post } );
})

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );
