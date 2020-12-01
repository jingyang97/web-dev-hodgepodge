const {v4: uuidv4} = require('uuid');
// const users = require('./users');

const sessions = {};
const nameToSid = {
    'Admin': '123'
};

const validateSession = (sid) => {
    if(!sid || !sessions[sid] || sessions[sid].expires < Date.now()){
        return false;
    }
    return true;
}

const attemptCreate = (username, password) => {
    if(username.match(/^Trump/)){
        return 'Trump';
    }
    else if(nameToSid[username] || !username.match(/^[A-Za-z0-9_-]{2,20}$/)) {
        return false;
    }
    // const info = users.getInfo(username);
    const sid = uuidv4();
    nameToSid[username] = sid; //map each user's name to sid
    sessions[sid] = {
        // ...info,
        sid,
        password,
        username,
        expires: Date.now() + 1000*60*60*24*365, //cookie expires in 1 year
    };
    return sessions[sid];
};

const attemptLogin = (username, password) => {
    if(!username || !password || !nameToSid[username] || sessions[nameToSid[username]].password !== password){
        return false;
    }
    //续上cookie
    return true;
};

const getSession = (sid) => {
    return sessions[sid];
};

const remove = (sid) => {
    delete sessions[sid];
};

const canReadUser = ({sid, username}) => {
    if(!sid || !username || !sessions[sid].username === username){
        return false;
    }
    return true;
};

module.exports = {
    validateSession,
    attemptCreate,
    attemptLogin,
    getSession,
    remove,
    canReadUser,
    nameToSid
};