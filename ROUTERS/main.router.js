const userRouter = require('./users.router')

const maineRouter = (app) => {
    app.use('/users', userRouter)
}

module.exports = maineRouter