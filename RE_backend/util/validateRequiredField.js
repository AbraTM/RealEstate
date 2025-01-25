const validateRequiredFields = (data, fields) =>{
    return fields.filter(field => !data[field])
}

module.exports = { validateRequiredFields }