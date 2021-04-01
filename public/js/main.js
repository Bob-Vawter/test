const trashCan = document.querySelectorAll('#trash')
const strikeTask = document.querySelectorAll('.fa-thumbs-up')


Array.from(trashCan).forEach((element)=>{
  element.addEventListener('click', deleteTask)
})
Array.from(strikeTask).forEach((element)=>{
  element.addEventListener('click', updateTask)
})

async function deleteTask (){
  const tName = this.parentNode.childNodes[1].innerText
  try{
    const res = await fetch('deleteTask', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'taskNameS': tName
      })
    })
    const data = await res.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}

async function updateTask (){
  const tName = this.parentNode.childNodes[1].innerText
  try{
    const res = await fetch('updateTask', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'taskNameS': tName
      })
    })
    const data = await res.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}
