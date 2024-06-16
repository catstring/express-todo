const mongoose = require('mongoose')
const TaskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter task name"]
        },
        is_completed: {
            type: Boolean,
            default: false
        },
        googleId: { 
            type: String, 
            default: null 
        },
        displayName: {
            type: String,
            default: 'Guest'
        }
    },
    {
        timestamps: true
    }
)

const Task = mongoose.model("Task", TaskSchema)

module.exports = Task