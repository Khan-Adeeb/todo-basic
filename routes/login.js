const { Router } = require('express')
const loginRouter = Router();
const {signinController , signupController} = require("../controllers/login.controller")

loginRouter.post('/signup', signupController)

loginRouter.post('/signin' , signinController)

module.exports = {loginRouter}