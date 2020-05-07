const BlogPost = require('../models/BlogPost.js');


module.exports = async (req, res) => {

  await BlogPost.findByIdAndDelete(req.params.id);

  await res.redirect('/');
}
