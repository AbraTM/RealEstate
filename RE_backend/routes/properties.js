const express = require("express")
const router = express.Router()
const { getAllProperties, getAllUsersProperties } = require("../controllers/properties")
const authenticationMiddleware = require("../middleware/authentication")

router.route('/').get(getAllProperties)
router.route('/user').get(authenticationMiddleware, getAllUsersProperties)

module.exports = router