const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todolist')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTasks)

router.post('/addTask', todosController.addTask)

router.put('/completeTask', todosController.completeTask)

router.put('/uncompleteTask', todosController.uncompleteTask)

router.delete('/deleteTask', todosController.deleteTask)

module.exports = router
