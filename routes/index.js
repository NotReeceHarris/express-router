module.exports = {
    route: '/',
    function: (express) => {
        const router = express.Router();

        router.get('/', (req, res) => {
            res.send('Hello World!')
        })

        return router
    }
}