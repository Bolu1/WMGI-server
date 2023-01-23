import express from "express"
const controller = require("../../controllers/response.controller")
const isAuth = require('../../middleware/isAuth')
const multer = require('multer')
import path from 'path'


const router = express()

router.get('/response', isAuth, controller.getResponses)
router.post('/response', isAuth, controller.addResponse)
router.get('/search', isAuth, controller.searchResponses)


module.exports = router