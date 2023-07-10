module.exports = {
    route: '/foo',
    function: (express) => {
        const router = express.Router();

        // The web path for this would be "http://localhost/foo"
        router.get('/', (req, res) => {
            res.send('Hello World!')
        })

        return router
    }
}