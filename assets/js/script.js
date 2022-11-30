var currentIndex = 0



function startQuiz() {
    var startScreenEl = document.querySelector('#start-screen')
    startScreenEl.setAttribute('class', 'hide')
    getQuestion()
}

function getQuestion() {
    var currentQuestion = questions[currentIndex]
    var promptEl = document.querySelector('#question-prompt')
    promptEl.textContent = currentQuestion.prompt
    
}


document.querySelector('#start-button').addEventListener('click', startQuiz);