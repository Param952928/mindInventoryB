const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type :String,
        require: true
    },
    description: {
        type : String
    },
    completed:{
        type: Boolean
    }
})

module.exports = mongoose.model('Task', taskSchema)