const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputField = document.querySelectorAll('.goal-1')
const error = document.querySelector('.error-message')
const progressValue = document.querySelector('.progress-value')
const message = document.querySelector('.progress-label')

const allQuets = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away keep going',
    'Whoa! you just completed all the goals, time for chill now!' 
]


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${completedGoalsCount / 3 * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
message.innerText = allQuets[completedGoalsCount]

checkBoxList.forEach((checkbox) =>{
    checkbox.addEventListener('click',() =>{
        const allGoalSet = [...inputField].every((input) => {
            return input.value
        })
        if(allGoalSet){
            checkbox.parentElement.classList.toggle('completed')
            const inputID = checkbox.nextElementSibling.id
            allGoals[inputID].completed = !allGoals[inputID].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${completedGoalsCount / 3 * 100}%`
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
            message.innerText = allQuets[completedGoalsCount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }
        else{
            error.parentElement.classList.add('show-error')
        }
        
    })
})

inputField.forEach((input) => {
    if(allGoals[input.id]){
        input.value = allGoals[input.id].name
        if(allGoals[input.id].completed) {
            input.parentElement.classList.add('completed')
        }
    }
        
    input.addEventListener('focus',() =>{
        error.parentElement.classList.remove('show-error')
    })

    input.addEventListener('input',(e) =>{
        if(allGoals[input.id] && allGoals[input.id].completed) {
            e.target.value = allGoals[input.id].name
            return
        }
        
        if(allGoals[input.id]){
            allGoals[input.id].name = input.value
        }
        else{
            allGoals[input.id] ={
                name : input.value,
                completed: false
            }
        }
        
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})