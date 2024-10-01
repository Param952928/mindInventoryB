const route = require('express').Router()
const taskController = require('../controller/taskController')

route.post('/create', taskController.createTask)
route.put('/update/:id', taskController.updateTask)
route.get('/fetch', taskController.getTask)
route.delete('/delete/:id', taskController.deleteTask)

module.exports = route


