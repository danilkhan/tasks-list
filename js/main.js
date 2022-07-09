function randomId(){return Math.round(Math.random() * 999999)}
const themes = {
  light: {
    '--bg': '#deb887',
    '--color-text': '#010101',
    '--del-btn': '#b10000',
    '--body-bg': '#f2f2f2',
    '--icon-color-light': '#deb887',
    '--icon-color-dark': '#010101',
  },
  dark: {
    '--bg': '#111111',
    '--color-text': '#ffffff',
    '--del-btn': '#ffbb00',
    '--body-bg': '#232323',
    '--icon-color-light': '#ffffff',
    '--icon-color-dark': '#010101',
  },
  
}
// elements
const contentItems = document.querySelector('.content-items');
const taskForm = document.taskForm;
const titleInput = taskForm.elements.title
const contentArea = taskForm.elements.content
const btnTheme = document.querySelector('.navbar-btn')
// events
taskForm.addEventListener('submit', onFormSubmit)
btnTheme.addEventListener('click', selectTheme)
// document.addEventListener('DOMContentLoaded', selectTheme)
document.addEventListener('click', delCard)


loadCards()

// удаление
function delCard(event) {
  if(event.target.classList.contains('item-del')){
    const parent = event.target.closest('.item')
    const parentId = parent.getAttribute('item-id')
    let arr 
    if(localStorage.getItem('tasks') == null){
      arr = []
    }
    else{
      arr = JSON.parse(localStorage.getItem('tasks'))
      parent.remove()
    }
    arr.forEach(function(task, key){
      if(parentId == task.id){
        arr.splice(key, 1)
      }
    })
    localStorage.setItem('tasks', JSON.stringify(arr))
  }
}
// ============
loadTheme()
// ---
function loadTheme(){
  let theme = JSON.parse(localStorage.getItem('theme'))
  document.documentElement.style = theme
  
  let themeColor = JSON.parse(localStorage.getItem('colorIcon'))
  btnTheme.setAttribute('data-theme', themeColor)
    btnTheme.classList.remove('light')
  btnTheme.classList.add(themeColor)
}
// ---
function loadCards(){
  let tasks
  if(localStorage.getItem('tasks') == null){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.reverse()
  tasks.forEach(function(task, key){
    const card = createCardTemplate(task)
    contentItems.append(card)
  })
}

function createCardTemplate({id, title, content}){
  const item = document.createElement('div')
  item.classList.add('item')
  item.setAttribute('item-id', id)
  const itemText = document.createElement('div')
  itemText.classList.add('item__text')
  const itemDel = document.createElement('a')
  itemDel.classList.add('item-del', 'icon-trash')
  itemDel.innerHTML = 'Удалить'
  itemDel.href = '#!'
  const h3 = document.createElement('h3')
  h3.innerHTML = title
  const p = document.createElement('p')
  p.innerHTML = content
  itemText.append(h3, p)
  item.append(itemText, itemDel)
  return item
}


function onFormSubmit(event){
  event.preventDefault()
  const valueInp = titleInput.value
  const valueArea = contentArea.value
  if(!valueArea || !valueInp){
    alert('Заполните все поля')
    return
  }
  const newTask = {id: randomId(), title: valueInp, content: valueArea}
  saveInLocalStorageCard(newTask)
  const card = createCardTemplate(newTask)
  contentItems.insertAdjacentElement('afterbegin',card)
  taskForm.reset();
}
function saveInLocalStorageCard(obj){
  let tasks
  if(localStorage.getItem('tasks') == null){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(obj)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
// ---
function saveInLocalStorageTheme(obj){
  localStorage.setItem('theme', JSON.stringify(obj))
}
function saveInLocalStorageColor(obj){
  localStorage.setItem('colorIcon', JSON.stringify(obj))
}
// ---
function selectTheme(){
  if(btnTheme.classList.contains('light')){
    btnTheme.classList.remove('light')
    btnTheme.classList.add('dark')
    btnTheme.setAttribute('data-theme', 'dark')
  }
  else{
    btnTheme.classList.remove('dark')
    btnTheme.classList.add('light')
    btnTheme.setAttribute('data-theme', 'light')
  }
  if(btnTheme.classList.contains('null')){
    btnTheme.classList.remove('null')
    btnTheme.classList.add('light')
    btnTheme.setAttribute('data-theme', 'light')
  }
  const themeAttr = btnTheme.getAttribute('data-theme')
  // ---
  saveInLocalStorageColor(themeAttr)
  // ---
  const themeObj = themes[themeAttr]
  let themeStr = ''
  for(const key in themeObj){
    themeStr += `${key}: ${themeObj[key]}; `
  }
  // ---
  saveInLocalStorageTheme(themeStr)
  let theme = JSON.parse(localStorage.getItem('theme'))
  document.documentElement.style = theme
  // ---
}