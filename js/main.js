import questionsData from "../data/questions.json" assert { type: "json" };

const quizContainer = document.querySelector("#quiz-container");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers-container");
const feedback = document.querySelector(".feedback");
const totalPoints = document.querySelector(".points");
const nextButton = document.querySelector(".next-question");

let questionIndex = 0;
let score = 0;
let questionAnswered = false;

nextButton.addEventListener("click", showNextQuestion);

function showNextQuestion () {
    questionAnswered = false;
    feedback.textContent = "";

    if (questionIndex < questionsData.length - 1) {
        questionIndex++;
        showQuestion();
    }else{
        finishQuiz();
    }
}

function finishQuiz () {
    question.classList.add("hide");
    answersContainer.classList.add("hide");
    feedback.classList.add("hide");
    nextButton.classList.add("hide");

    const span = document.createElement("span");
    span.classList.add("end-quiz");
    span.textContent = `
        Parabéns!
        Você concluiu todas as perguntas.
    `
    quizContainer.appendChild(span);
}

function showFeedback (event) {

    const span = event.target;

    console.log(span);

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
    answersContainer.innerHTML = "";
    question.innerHTML = currentQuestion.title;

    currentQuestion.answers.forEach(item => {
        const span = document.createElement("span");
        
        span.classList.add("alternative");
        span.setAttribute("data-correct",item.isCorrect);
        span.setAttribute("tabindex","0");        
        span.innerHTML = item.alternative;
        
        answersContainer.appendChild(span);

    });

        const alternatives = document.querySelectorAll(".alternative");

        alternatives.forEach(item => {
            item.addEventListener("click", showFeedback);
            item.addEventListener("focus", () => item.classList.add("alternative-focus"));
            item.addEventListener("blur", () => item.classList.remove("alternative-focus"));
        })
}

showQuestion();
showScore(score);