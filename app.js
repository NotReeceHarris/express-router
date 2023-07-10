const express = require('express');
const app = require('./router.js')(express);

app.listen(80, ()=>{
    console.log('Listening on port 80...')
})