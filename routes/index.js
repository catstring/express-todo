const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task.controller')

router.get('/', (req, res) => {
    res.redirect('/tasks')
})

module.exports = router
