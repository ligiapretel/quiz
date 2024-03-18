import questionsData from "../data/questions.json" assert { type: "json" };

const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers-container");
const feedback = document.querySelector(".feedback");
const totalPoints = document.querySelector(".points");

let questionIndex = 0;
let score = 0;
let questionAnswered = false;

function showFeedback (event) {
    let isCorrectAnswer = event.target.getAttribute("data-correct");
    
    if (isCorrectAnswer === "false") {
        feedback.classList.remove("correct");
        feedback.classList.add("incorrect");
        feedback.textContent = "Resposta incorreta";
        
        return false;
    }
    
    feedback.classList.remove("incorrect");
    feedback.classList.add("correct");
    feedback.textContent = "Resposta correta";
    
    let rightAnswer = true;
    showScore(rightAnswer, questionAnswered);
    questionAnswered = true;
    
    return true;
    
}

function showScore (isCorrect, questionAnswered) {

    const pointsEarned = 1;

    if (isCorrect && !questionAnswered) {
        score = score + pointsEarned;
        totalPoints.textContent = `${score} ponto(s)`;
        return true;
    }
    return totalPoints.textContent = `${score} ponto(s)`;
}

function showQuestion () {
    const currentQuestion = questionsData[questionIndex];
    question.innerHTML = currentQuestion.title;

    currentQuestion.answers.forEach(item => {
        const span = document.createElement("span");
        
        span.classList.add("alternative");

        span.setAttribute("data-correct",item.isCorrect);
        
        span.innerHTML = item.alternative;
        
        answersContainer.appendChild(span);

        const alternatives = document.querySelectorAll(".alternative");

        alternatives.forEach(item => item.addEventListener("click", showFeedback));
    })
}

showQuestion();
showScore(score);