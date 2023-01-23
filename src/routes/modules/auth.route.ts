import express from "express"
const controller = require("../../controllers/auth.controller")
const isAuth = require('../../middleware/isAuth')

const router = express()

router.post("/signup", controller.addUser)
router.post("/signin", controller.login)



module.exports = router