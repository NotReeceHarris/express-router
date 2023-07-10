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