var startButton = document.getElementById('startBtn')
var answerButtonsElement = document.getElementById('answerBtns')
var submitButton = document.getElementById('submitBtn')
var answer1 = document.getElementById("btn1");
var answer2 = document.getElementById("btn2");
var answer3 = document.getElementById("btn3");
var answer4 = document.getElementById("btn4");
var timerEl = document.getElementById("timer");
var homePageElemenets = document.getElementById('homePage')
var endGameElements = document.getElementById('end-page')
var scoreElement = document.getElementById('score')
var displayEl = document.getElementById('display')
var displayEl2 = document.getElementById('display2')
var initials = document.getElementById('initials')
var scores = document.getElementById('high-scores')
var newScore = document.getElementById('newScores')
var viewScoreList = document.getElementById('highscore')
var container = document.getElementById('container')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')


//Questions
var questions = [{
    question: "Which of the following is not a commonly used data type?",
    answers: [ "Widgets", "Strings", "Booleans", "Numbers"],
    correctAnswer: "Widgets"

}, {
    question: "What can arrays in JavaScript can be used to store?",
    answers: [ "Booleans",  "Numbers and Strings", "Other arrays", "All of the above"], 
    correctAnswer: "All of the above"
    
}, {
    question: "How do you enclose the condition of an ' if ' statement?",
    answers: ["Quotes",  "Square brackets",  "Curly brackets",  "Parentheses"],
    correctAnswer: "Parentheses" 
    
}, {
    question: "What is a very useful tool for debugging and printing content to the debugger?",
    answers: ["console.log", "For loops",  "CSS",  "JavaScript"], 
    correctAnswer: "console.log"

}, {
    question: "What does DOM stand for?",
    answers: ["Don't Over Manage", "Document Object Model", "Data Object Model",  "Document Option Model"], 
    correctAnswer: "Document Object Model"
}];

// Question Functions
var createQuestionElement = function(index) {
    
    var currentQuestion = questions[questionCounter]
    question.textContent = currentQuestion.question;
    
    answer1.textContent = currentQuestion.answers[0]
    answer2.textContent = currentQuestion.answers[1]
    answer3.textContent = currentQuestion.answers[2]
    answer4.textContent = currentQuestion.answers[3]
}

var checkAnswer = function(event) {
    var correctAnswer = questions[questionCounter].correctAnswer
    var currentAnswer = event.target.textContent   
    displayEl.classList.remove('hide') 
    displayEl2.classList.remove('hide')
    
    if (currentAnswer === correctAnswer) {
        displayEl2.classList.add('hide')
        displayEl.textContent = "Correct!"
    } else {
        displayEl.classList.add('hide')
        displayEl2.textContent = "Incorrect!"
        timeLeft -= 10;
    }
    
    questionCounter++;
    if(questionCounter === questions.length){
        endGame();
    } else {
        createQuestionElement();
    }
}

// Timer functions
var startGame = function(){
    timeInterval = setInterval(countDown, 1000);
    startButton.classList.add('hide')
    homePageElemenets.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    countDown();
    createQuestionElement();
}

var endGame = function(){
    clearInterval(timeInterval);
    questionContainerElement.classList.add('hide')
    endGameElements.classList.remove('hide')
    scoreElement.textContent = "Your final score is " + timeLeft;
    timerEl.classList.add('hide')

    setTimeout(function() {
        displayEl.setAttribute("class", "hide");
    }, 1000);
    setTimeout(function() {
        displayEl2.setAttribute("class", "hide");
    }, 1000);
    highScore();
}

var questionCounter = 0;
var timeLeft = 75;     
                                              
function countDown() {
                            
        if(timeLeft > 0){
            timerEl.textContent = "Timer:  " + timeLeft;
            timeLeft--
        }
        else {
            timerEl.textContent = "Timer:  " + timeLeft; 
            endGame();
        }
    }

// Scoreboard Function
function highScore(){
    submitButton.addEventListener("click", function(event) {
        
        
        var id = initials.value
        var score = timeLeft;
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        if(id.length > 0) {
            var newScore = {
                id,
                score
            }
            console.log(id)
            scores.classList.remove('hide');
            endGameElements.classList.add('hide');
            container.classList.add('hide')
            viewScoreList.classList.add('hide')
            highscores.push(newScore);
            window.localStorage.setItem("highscores", JSON.stringify(highscores)); 
            
            if(highscores !== undefined) {
                highscores.sort(function(a,b){
                    return b.score - a.score
                })
                highscores.forEach(function(score){
                    console.log(score)
                    var li = document.createElement("li");
                    li.innerHTML = "<h5>" + score.id + "  " + score.score + "</h5>"
                    var olEl = document.getElementById('newScores');
                    olEl.appendChild(li)
                })
            }
        }
 })
}

function clearHighscores() {
    localStorage.clear();
    newScore.classList.add('hide');
}

function viewHighScores(){
    startButton.classList.add('hide')
    homePageElemenets.classList.add('hide')
    questionContainerElement.classList.add('hide')
    displayEl.classList.add('hide') 
    displayEl2.classList.add('hide')
    timerEl.classList.add('hide')
    scores.classList.remove('hide')
    container.classList.add('hide')
    viewScoreList.classList.add('hide')

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        
highscores.sort(function(a,b){
    return b.score - a.score
})

highscores.forEach(function(score){
    var li = document.createElement("li");
    li.innerHTML = "<h5>" + score.id + "  " + score.score + "</h5>"
    var olEl = document.getElementById('newScores');
    olEl.appendChild(li)
})
}

function clearHighscores() {
    localStorage.clear();
    newScore.classList.add('hide');
}

// Click Event Listeners to fun all functions on click
document.getElementById("clear").onclick = clearHighscores;
startButton.addEventListener('click', startGame)
answer1.addEventListener("click", checkAnswer)
answer2.addEventListener("click", checkAnswer)
answer3.addEventListener("click", checkAnswer)
answer4.addEventListener("click", checkAnswer)
viewScoreList.addEventListener("click", viewHighScores)