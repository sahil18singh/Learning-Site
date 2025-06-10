const express = require("express")
const router = express.Router()

const  {
    login,
    signUp,
    sendOTP,
    changePassword,
} = require("../controllers/Auth")

const {
    resetPasswordToken,
    resetPassword
} = require("../controllers/ResetPassword")

const {auth} = require("../middlewares/auth")

//Route for user login
router.post("/login",login)

//Route for user signup
router.post("/signup",signUp)

// Route for sending otp to the user's email
router.post("/sendotp",sendOTP)

//Route for changing the password
router.post("/changepassword",auth,changePassword)

//Route for generating reset password token
router.post("/reset-password-token",resetPasswordToken)

//Route for resetting user's password after verification
router.post("/reset-password",resetPassword)

module.exports = router

