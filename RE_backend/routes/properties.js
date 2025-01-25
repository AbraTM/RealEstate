const express = require("express")
const router = express.Router()
const { getAllProperties } = require("../controllers/properties")

router.route('/').get(getAllProperties)

module.exports = router