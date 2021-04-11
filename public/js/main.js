const trashCan = document.querySelectorAll('#trash')
const strikeTask = document.querySelectorAll('.fa-check')
const unstrikeTask = document.querySelectorAll('.fa-times')

Array.from(trashCan).forEach((element)=>{
  element.addEventListener('click', deleteTask)
})
Array.from(strikeTask).forEach((element)=>{
  element.addEventListener('click', completeTask)
})
Array.from(unstrikeTask).forEach((element)=>{
  element.addEventListener('click', uncompleteTask)
})

async function deleteTask (){
  //const tName = this.parentNode.childNodes[1].innerText
  const iD = this.parentNode.dataset.id
  try{
    const res = await fetch('deleteTask', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        //'taskNameS': tName,
        'iDS': iD
      })
    })
    const data = await res.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}

async function completeTask (){
  //const tName = this.parentNode.childNodes[1].innerText
  const iD = this.parentNode.dataset.id

  try{
    const res = await fetch('completeTask', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        //'taskNameS': tName,
        'iDS': iD
      })
    })
    const data = await res.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}

async function uncompleteTask (){
  //const tName = this.parentNode.childNodes[1].innerText
  const iD = this.parentNode.dataset.id

  try{
    const res = await fetch('uncompleteTask', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        //'taskNameS': tName,
        'iDS': iD
      })
    })
    const data = await res.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}
