# 🕸️ Advanced express routing template 
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
<sub>Any `.js` file and its subfiles within the "`routes/`" directory are automatically routed.</sub>

## 📜 Template
This router file necessitates a distinctive module export, but it is straightforward and hassle-free to configure. Simply provide the "`route`", which serves as the primary web path for every route created within the file. Next, specify the "`function`", a simple arrow function that incorporates the express module. To create a middleware router, use "[`express.Router()`](https://expressjs.com/en/guide/routing.html#express-router)".
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
<sub>The code snippet provided above represents an example code located within the file "`routes/foo/bar/bar.js`".</sub>
