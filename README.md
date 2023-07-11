# Advanced express routing template 
Effortless, Streamlined, Expandable. This routing template facilitates well-structured file trees and efficient routing capabilities.

## 🌳 File tree
This router grants you the freedom to organize your router files according to your preferences, without any limitations. As long as the file contents adhere to the [template](#-template), you can utilize any file tree scheme or naming convention that suits your needs.
```
web_app/
├─ routes/
│  ├─ foo/
│  │  ├─ bar/
│  │  │  ├─ bar.js
│  │  ├─ foo.js
│  ├─ index.js
├─ app.js
├─ router.js
```
<sub>Any `.js` file and its subfiles within the [`routes/`](/routes/) directory are automatically routed.</sub>
<br>
<br>

## 📜 Template
This router file necessitates a distinctive module export, but it is straightforward and hassle-free to configure. Simply provide the `route`, which serves as the primary web path for every route created within the file. Next, specify the `function`, a simple arrow function that incorporates the express module. To create a middleware router, use [`express.Router()`](https://expressjs.com/en/guide/routing.html#express-router).
```js
module.exports = {
    route: '/foo/bar',
    function: (express) => {
        const router = express.Router();

        // The web path for this would be "http://localhost/foo/bar"
        router.get('/', (req, res) => {
            res.send('Hello World!');
        })

        // The web path for this would be "http://localhost/foo/bar/again"
        router.get('/again', (req, res) => {
            res.send('Hello again, World!');
        })

        return router;
    }
}
```
<sub>The code snippet provided above represents an example code located within the file [`routes/foo/bar/bar.js`](/routes/foo/bar/bar.js).</sub>
<br>
<br>


## 🚧 Error handling
Handling HTTP errors can be accomplished seamlessly in [Express error handling](https://expressjs.com/en/guide/error-handling.html), following the usual practices. However, when it comes to dealing with a `404 error` within a router, Express requires a slightly different approach. To tackle this, it is recommended to follow the best practice of handling `404 errors` in the main `app.js` file. In this case, you can utilize `app.use()` to effectively handle the error.

```js
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
```
<sub>The code snipped provided above is from [`app.js`](/app.js).</sub>
