const express = require('express');
const app = new express();
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const BlogPost = require('./models/BlogPost.js');
const customMiddleWare = (req,res,next) =>{
  console.log('Custom middle ware called')
  next();
}
const validateMiddleWare = (req,res,next)=>{
  if(req.files == null || req.body.title == null || req.body.title == null){
    return res.redirect('/posts/new');
  }
  next();
}


app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(customMiddleWare);
app.use('/posts/store',validateMiddleWare);



mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});
app.set('view engine', 'ejs'); //this is telling express to use ejs as our templating engine. any file ending in .ejs should be rendered with the EJS package
//tells it that all static assets live in the public library
app.use(express.static('public'));
app.listen(4000,() => {
  console.log('app listening on port 4000');
})

app.get('/post/:id' ,async (req,res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  res.render('post', {
    blogpost
  })
})

app.post('/posts/store', (req,res) => {
   // console.log(req.body);
   let image = req.files.image;
   image.mv(path.resolve(__dirname,'public/img',image.name),async (error) => {
     await BlogPost.create({...req.body,
     image: '/img/' + image.name});
      res.redirect('/')
   })
})

app.get('/', async (req,res) => {
  const blogposts = await BlogPost.find({})
  res.render('index', {
    blogposts
  });
  console.log(blogposts)
})

app.get('/about', (req,res) => {
  // res.sendFile(path.resolve(__dirname,'pages/about.html'));
  res.render('about');
});

app.get('/posts/new', (req,res) => {
  res.render('create');
});

app.get('/contact',(req,res) => {
  // res.sendFile(path.resolve(__dirname,'pages/contact.html'));
  res.render('contact');
});
