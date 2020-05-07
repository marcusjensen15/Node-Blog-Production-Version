const BlogPost = require('../models/BlogPost.js');

//the way this is written now should make a duplicate of the post because there is no delete.

module.exports = async (req,res)=>{
  const blogpost = await BlogPost.findById(req.params.id).populate('userid');
  console.log(blogpost);
  res.render('editPost', {
    createPost: true,
    blogpost
  });
}
