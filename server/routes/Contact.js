const express = require("express")
const router = express.Router()

const {contactUsController} = require("../controllers/Contact")

router.post("/contactUs",contactUsController)

module.exports = router