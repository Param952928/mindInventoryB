const joi = require('joi')

const taskSchema = joi.object({
    title: joi.string().required(),
    description: joi.string(),
    completed: joi.boolean()
})

module.exports = taskSchema