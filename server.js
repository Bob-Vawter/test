const express = require('express')
const app = express()
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todolist')

const PORT = 3000
require('dotenv').config({path: './config/.env'})

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(express.json())

app.use('/',homeRoutes)
app.use('/',todoRoutes)

app.listen(process.env.PORT || PORT, ()=>{
//  console.log(process.env.PORT)
  console.log(`Server running on port ${PORT}`)
})
