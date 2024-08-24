const express = require("express")
const router = express.Router()
const { createPropertyDetails, getPropertyPreview } = require("../controllers/lpf-controller")

router.post('/', createPropertyDetails)
router.get('/:id', getPropertyPreview)

module.exports = router