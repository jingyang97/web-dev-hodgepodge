const {v4: uuidv4} = require('uuid');

const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    

function getFormatedDate(){
    let dateObj = new Date();
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();
    let output = month  + '\n'+ day  + ',' + year;
    return output;
}


const posts = {
    '123': 
    {
        '31258423': 
        {
            'title': 'React Tutorial',
            'category': 'front-end',
            'username': 'Admin',
            'userId': '123',
            'postId': '31258423',
            'timeStamp': getFormatedDate(),
            'comments': [],
            'img': 'https://mildaintrainings.com/wp-content/uploads/2017/11/react-logo.png',
            'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in posuere nisl, in dignissim sem. Nunc cursus, purus id commodo elementum, ante tellus efficitur lacus, vitae molestie ex erat ac urna. Vivamus posuere porta tincidunt. Etiam iaculis ullamcorper mollis. Cras fringilla massa ut nulla elementum elementum. Etiam vitae mattis purus, id fringilla diam. Donec vel blandit elit, eget pharetra eros. Cras non ligula hendrerit, congue enim sed, molestie nulla. Vivamus consequat auctor nunc vel hendrerit. Sed dictum sed ipsum quis lacinia. Praesent facilisis ultricies risus, et placerat diam commodo at. Mauris et elit justo. Etiam eget velit non lorem commodo ultrices nec vel elit.'
        },
        '125523fg': 
        {
            'title': '2012',
            'category': 'Movie',
            'username': 'Admin',
            'userId': '123',
            'postId': '125523fg',
            'timeStamp': getFormatedDate(),
            'comments': [],
            'img': 'https://m.media-amazon.com/images/M/MV5BMTY0MjEyODQzMF5BMl5BanBnXkFtZTcwMTczMjQ4Mg@@._V1_SY1000_CR0,0,672,1000_AL_.jpg',
            'content': ''
        },
        '21412421': 
        {
            'title': 'Aquaman',
            'category': 'Movie',
            'username': 'Admin',
            'userId': '123',
            'postId': '21412421',
            'timeStamp': getFormatedDate(),
            'comments': [{'author': 'Admin', 'date': getFormatedDate(), 'content':'fk'}],
            'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLPSFz2OeblAvfyu73HkPfEBX2h5Wg8mn6cA&usqp=CAU',
            'content': ''
        },
        'djk2190': 
        {
            'title': 'Harry Potter',
            'category': 'Movie',
            'username': 'Admin',
            'userId': '123',
            'postId': 'djk2190',
            'timeStamp': getFormatedDate(),
            'comments': [],
            'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJwhKYluwnEdt-Ao4hY5iZgyYSMnVNe8l35w&usqp=CAU',
            'content': ''
        },
        '2189djio2': 
        {
            'title': 'Captain Marvel',
            'category': 'Movie',
            'username': 'Admin',
            'userId': '123',
            'postId': '2189djio2',
            'timeStamp': getFormatedDate(),
            'comments': [],
            'img': 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnh7mjl79LT48RdL7edizSw_mUWIThy_TBfQ&usqp=CAU',
            'content': ''
        }
    }
};

const categories = [{title: 'front-end', img: 'https://mildaintrainings.com/wp-content/uploads/2017/11/react-logo.png'}, 
{title: 'Movie', img: 'https://m.media-amazon.com/images/M/MV5BMTY0MjEyODQzMF5BMl5BanBnXkFtZTcwMTczMjQ4Mg@@._V1_SY1000_CR0,0,672,1000_AL_.jpg'}];

const getCategories = () => {
    return categories;
}

const getPostUnderCategory = (category) => {
    const res = [];
    for(let key of Object.keys(posts)){
        for(let subkey of Object.keys(posts[key])){
            if(posts[key][subkey].category === category){
                res.push(posts[key][subkey]);
            }
        }
    }
    return res;
}

const addComment = (userId, postId, commentorName, comment) => {
    posts[userId][postId].comments.push({'author' : commentorName, 'date': getFormatedDate(), 'content': comment});
    return posts[userId][postId];
}

const addPost = (userId, post) => {
    posts[userId] = posts[userId] || {};
    const postId = uuidv4();
    posts[userId][postId] = {comments: [], title: post.title, category : post.category, username: post.username, userId, postId, timeStamp: getFormatedDate(), content: post.content};
    if(!post.img){
        posts[userId][postId].img = 'https://picsum.photos/170/200';
    }
    if(!categories.includes(post.category)){
        categories.push({title: post.category, img: posts[userId][postId].img});
    }
    return posts[userId][postId];
};

const readPost = ({userId, postId}) => {
    if(!posts[userId]){
        return {};
    }
    else if(!posts[userId][postId]){
        return {};
    }
    return posts[userId][postId];
};

const readFromAllUsers = () => {
    //return an array of posts
    const temp = [];
    for(let i of Object.keys(posts)){
        for(let j of Object.keys(posts[i])){
            temp.push(posts[i][j]);
        }
    }
    return temp;
}

//read all posts from a single user:
const readAll = (userId) => {
    if(!posts[userId]){
        return [];
    }
    const temp = [];
    for(let i = 0; i < Object.keys(posts[userId]).length; i++){
        temp.push(posts[userId][i]);
    }
    return temp;
};

const removePost = ({userId, postId}) => {
    if(!posts[userId]){
        return;
    }
    const post = posts[userId][postId];
    delete posts[userId][postId];
    return post;
};

module.exports = {
    addPost,
    readPost,
    readAll,
    removePost,
    readFromAllUsers,
    getCategories,
    getPostUnderCategory,
    addComment
}