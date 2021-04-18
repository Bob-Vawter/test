const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todolist')
const authRoutes = require('./routes/auth')

const PORT = 3000
require('dotenv').config({path: './config/.env'})

require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(express.json())

// Sessions
app.use(
    session({
      secret: 'demo',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/',homeRoutes)
app.use('/auth', authRoutes)
app.use('/todolist',todoRoutes)

app.listen(process.env.PORT || PORT, ()=>{
//  console.log(process.env.PORT)
  console.log(`Server running on port ${PORT}`)
})
