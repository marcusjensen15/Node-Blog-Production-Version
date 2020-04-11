const express = require('express');
const app = new express();
//tells it that all static assets live in the public library
app.use(express.static('public'));
app.listen(4000,() => {
  console.log('app listening on port 4000');
})
