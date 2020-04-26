const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

BlogPost.create({
  title: 'Guide to saving on energy bills',
  body: 'Using less energy is a great way to save money on energy bills.'
}, (error, blogpost) =>{
  console.log(error,blogpost);
})
