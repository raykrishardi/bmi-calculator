// Return 404 error if there's no matching route
const defaultRouteHandler = (req, res) => {
    res.status(404).send('Route does not exist')
}

module.exports = defaultRouteHandler