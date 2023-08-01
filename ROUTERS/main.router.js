const userRouter = require('./users.router')
const filesRouter = require('./files.router')

const maineRouter = (app) => {
    app.use('/users', userRouter)
    app.use('/files', filesRouter)
}

module.exports = maineRouter