const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()
const mongodb = require('mongodb')

let db,
dbConnectionStr = process.env.DB_STRING,
dbName = 'todolist'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
  console.log(`Connected to ${dbName} Database`)
  db = client.db(dbName)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))
app.use(express.json())

// app.get('/',(req,res)=>{
//   // db.collection('tasks').find().toArray()
//   // .then(data => {
//   //   res.render('index.ejs', { info:data })
//   // })
//   // .catch(error => console.error(error))
// })

app.get('/', async (req,res)=>{
  const data = await db.collection('tasks').find().toArray()
  const leftToDo = await db.collection('tasks').countDocuments({completed:false})
  res.render('index.ejs', { info:data, left:leftToDo })
})

app.post('/addTask', (req, res) => {
  db.collection('tasks').insertOne({taskName:req.body.taskName,completed:false})
  .then(result => {
    console.log('Task Added')
    res.redirect('/')
  })
  .catch(error => console.error(error))
})

app.delete('/deleteTask', (req,res) => {
  db.collection('tasks').deleteOne({_id: new mongodb.ObjectID(req.body.iDS)})
  .then(result => {
    console.log('Task Removed')
    res.json('Task Deleted')
  })
  .catch(error => console.error(error))
})

app.put('/completeTask', (req,res) => {
  db.collection('tasks').updateOne({_id: new mongodb.ObjectID(req.body.iDS)},
    {$set: {completed:true}}
  )
  .then(result => {
    console.log('Task Completed')
    res.json('Task Completed')
  })
  .catch(error => console.error(error))
})
app.put('/uncompleteTask', (req,res) => {
  db.collection('tasks').updateOne({_id: new mongodb.ObjectID(req.body.iDS)},
    {$set: {completed:false}}
  )
  .then(result => {
    console.log('Task Marked inComplete')
    res.json('Task Marked inComplete')
  })
  .catch(error => console.error(error))
})


app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
