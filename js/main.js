import questionsData from "../data/questions.json" assert { type: "json" };

const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers-container");
const feedback = document.querySelector(".feedback");

let questionIndex = 0;

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
    return true;
    
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
