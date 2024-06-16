const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task.controller')
const { isAuthenticated } = require('../middleware/authMiddleware')

router.get('/', taskController.getTasks)
router.post('/', isAuthenticated, taskController.createTask)
router.put('/:id', isAuthenticated, taskController.editTask)
router.delete('/:id', isAuthenticated, taskController.deleteTask)

module.exports = router
