const express = require('express');
const app = new express();
// const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');
// const summernote = require('summernote');

// const BlogPost = require('./models/BlogPost.js');

//controllers
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const editPostController = require('./controllers/editPost');
const deletePostController = require('./controllers/delete');

//global login

global.loggedIn = null;

//middleware
const validateMiddleWare = require('./middleware/validationMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const authMiddleware = require('./middleware/authMiddleware');

const customMiddleWare = (req,res,next) =>{
  console.log('Custom middle ware called')
  next();
}
// const validateMiddleWare = (req,res,next)=>{
//   if(req.files == null || req.body.title == null || req.body.title == null){
//     return res.redirect('/posts/new');
//   }
//   next();
// }

app.use(flash());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(customMiddleWare);
app.use('/posts/store',validateMiddleWare);

app.use(expressSession({
  secret: 'keybord cat'
}))
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId
  next()
});



mongoose.connect('mongodb+srv://marcus:Marcusiscool15!@cluster0-pan1z.mongodb.net/my_database', {useNewUrlParser: true});
app.set('view engine', 'ejs'); //this is telling express to use ejs as our templating engine. any file ending in .ejs should be rendered with the EJS package
//tells it that all static assets live in the public library
app.use(express.static('public'));

//uncomment below for local use

// app.listen(4000,() => {
//   console.log('app listening on port 4000');
// })

let port = process.env.PORT;
if (port == null || port == ""){
  port = 4000;
}

app.listen(port, () =>{
  console.log('App Listening...')
})




// app.post('/posts/store', storePostController);
// app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.post('/posts/store', authMiddleware, storePostController);

app.get('/post/:id', getPostController);
app.get('/', homeController);
app.get('/posts/new', newPostController);
// app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/posts/new', authMiddleware, newPostController);
app.get('/auth/logout', logoutController);

// get for edit route

app.get('/post/:id/edit', editPostController);

//delete route

app.post('/post/:id', deletePostController);



app.use((req, res) => res.render('notfound'));
