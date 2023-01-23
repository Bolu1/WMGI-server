import express from 'express'
const auth = require('./modules/auth.route')
const response = require('./modules/response.route')

const routes = express()

routes.use('/auth', auth)
routes.use('/response', response)


module.exports = routes