const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const app = express()
const port = 3000

// Connect to MongoDB
mongoose.connect("mongodb+srv://toddmctsai:Fo1zwAgUqPvCmPbY@cluster0.ohtvgui.mongodb.net/hanlin?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.error('Failed to connect to MongoDB:', err)
})

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(methodOverride('_method'))

// Session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Set view engine to EJS
app.set('view engine', 'ejs')

// Import routes
const indexRouter = require('./routes/index')
const taskRoutes = require('./routes/taskRoutes')
const authRoutes = require('./routes/authRoutes')

// Use routes
app.use('/', indexRouter)
app.use('/tasks', taskRoutes)
app.use('/auth', authRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});

// Passport configuration
require('./config/passport');