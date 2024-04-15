const questionsData = [
    {
        "title": "Quais os 3 pilares da tríade CIA?",
        "answers": [
            { 
                "alternative": "Conscientização, integração e absorção", 
                "isCorrect": false 
            },
            { 
                "alternative": "Confidencialidade, integridade e disponibilidade", 
                "isCorrect": true 
            },
            { 
                "alternative": "Contramedidas, inovação e automação", 
                "isCorrect": false 
            },
            { 
                "alternative": "Cibersegurança, informática e advocacia", 
                "isCorrect": false 
            },
            { 
                "alternative": "Crescimento, intensidade e armazenamento", 
                "isCorrect": false 
            }
        ]
    },
    {
        "title": "Que tipo de malware pode se replicar e ser executado de forma independente?",
        "answers": [
            { 
                "alternative": "Worms", 
                "isCorrect": true 
            },
            { 
                "alternative": "Cavalo de tróia", 
                "isCorrect": false 
            },
            { 
                "alternative": "Vírus", 
                "isCorrect": false 
            },
            { 
                "alternative": "Ramsonware", 
                "isCorrect": false 
            },
            { 
                "alternative": "Bomba lógica", 
                "isCorrect": false 
            }
        ]
    },
    {
        "title": "Ataques de negação de serviço (DoS) são um tipo de ataque de...?",
        "answers": [
            { 
                "alternative": "Phishing", 
                "isCorrect": false 
            },
            { 
                "alternative": "Spam", 
                "isCorrect": false 
            },
            { 
                "alternative": "Engenharia social", 
                "isCorrect": false 
            },
            { 
                "alternative": "Malware", 
                "isCorrect": false 
            },
            { 
                "alternative": "Rede", 
                "isCorrect": true 
            }
        ]
    },
    {
        "title": "Que tipo de ataque explora vulnerabilidades de software desconhecidas por seu fornecedor?",
        "answers": [
            { 
                "alternative": "Bluejacking", 
                "isCorrect": false 
            },
            { 
                "alternative": "Vishing", 
                "isCorrect": false 
            },
            { 
                "alternative": "DDos", 
                "isCorrect": false 
            },
            { 
                "alternative": "Main-in-the-middle", 
                "isCorrect": false 
            },
            { 
                "alternative": "Zero Day", 
                "isCorrect": true 
            }
        ]
    },
    {
        "title": "Qual a nomenclatura dada a hackers que utilizam suas competências para fins éticos e legais?",
        "answers": [
            { 
                "alternative": "Hackers de chapéu cinzento", 
                "isCorrect": false 
            },
            { 
                "alternative": "Hackers de chapéu marrom", 
                "isCorrect": false 
            },
            { 
                "alternative": "Hackers de chapéu branco", 
                "isCorrect": true 
            },
            { 
                "alternative": "Hackers de chapéu preto", 
                "isCorrect": false 
            },
            { 
                "alternative": "Hackers de chapéu azul", 
                "isCorrect": false 
            }
        ]
    }
]

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
    if (questionAnswered) return;

    let isCorrectAnswer = event.target.getAttribute("data-correct");
    
    if (isCorrectAnswer === "false") {
        feedback.classList.remove("correct");
        feedback.classList.add("incorrect");
        feedback.textContent = "Resposta incorreta";

        questionAnswered = true;
        disableAlternatives();
        
        return false;
    }
    
    feedback.classList.remove("incorrect");
    feedback.classList.add("correct");
    feedback.textContent = "Resposta correta";
    
    let rightAnswer = true;
    showScore(rightAnswer, questionAnswered);
    questionAnswered = true;
    disableAlternatives()
    
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

function disableAlternatives() {
    const alternatives = document.querySelectorAll(".alternative");
    alternatives.forEach(alternative => {
        alternative.removeEventListener("click", showFeedback);
        alternative.classList.remove("alternative");
        alternative.classList.add("disabled");
    });
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