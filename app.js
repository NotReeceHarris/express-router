const express = require('express');
const app = require('./router.js')(express);

app.use(function(req, res, next) {
    res.status(404);
  
    // respond with json
    if (req.accepts('json')) {
      res.json({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('404 Not Found');
  });

app.listen(80, ()=>{
    console.log('Listening on port 80...')
})