const Todo = require('../models/todolist')

module.exports = {
  getTasks: async (req,res)=>{
    try{
      const data = await Todo.find()
      const leftToDo = await Todo.countDocuments({completed: false})
      res.render('todolist.ejs',{info: data, left: leftToDo})
    }catch(err){
      console.log(err)
    }
  },
  addTask: async (req,res)=>{
    try{
      await Todo.create({taskName: req.body.taskName, completed: false})
      console.log('Task add to list!')
      res.redirect('/todolist')
    }catch(err){
      console.log(err)
    }
  },
  completeTask: async (req,res)=>{
    try{
      await Todo.findOneAndUpdate({_id:req.body.iDS},{
        completed: true
      })
      console.log('Marked Completed')
      res.json('Marked Complete')
    }catch(err){
      console.log(err)
    }
  },
  uncompleteTask: async (req,res)=>{
    try{
      await Todo.findOneAndUpdate({_id:req.body.iDS},{
        completed: false
      })
      console.log('Marked InComplete')
      res.json('Marked InComplete')
    }catch(err){
      console.log(err)
    }
  },
  deleteTask: async (req,res)=>{
    console.log(req.body.iDS)
    try{
      await Todo.findOneAndDelete({_id:req.body.iDS})
      console.log('Deleted Task')
      res.json('Deleted Task')
    }catch(err){
      console.log(err)
    }
  }
}
