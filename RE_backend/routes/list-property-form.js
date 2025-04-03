const express = require("express")
const router = express.Router()
const { createPropertyDetails, getPropertyPreview } = require("../controllers/lpf-controller")
const upload = require('../middleware/multer')
const authenticationMiddleware = require("../middleware/authentication")

router.post('/', authenticationMiddleware,
    upload.fields([
        {
            name: "Cover_Image",
            maxCount: 1
        },
        {
            name : "Images",
            maxCount: 5
        }
    ]), 
    createPropertyDetails
)
router.get('/:id', getPropertyPreview)

module.exports = router