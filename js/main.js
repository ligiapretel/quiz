import questionsData from "../data/questions.json" assert { type: "json" };

const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers-container");

let questionIndex = 0;

function showQuestion () {
    const currentQuestion = questionsData[questionIndex];
    question.innerHTML = currentQuestion.title;

    currentQuestion.answers.forEach(item=>{
        const span = document.createElement("span");
        
        span.classList.add("alternative");
        
        span.innerHTML = item.alternative;
        
        answersContainer.appendChild(span);
    })
}

showQuestion();
