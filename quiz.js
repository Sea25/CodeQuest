const questions = [
    {
        question: "Which HTML tag is used for creating a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<hyperlink>"],
        answer: "<a>"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Computer Style Sheets",
            "Cascading Style Sheets", 
            "Colorful Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which method adds new elements to the end of an array?",
        options: [".push()", ".pop()", ".shift()", ".unshift()"],
        answer: ".push()"
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Output Module",
            "Display Object Manager"
        ],
        answer: "Document Object Model"
    },
    {
        question: "Which property changes the text color in CSS?",
        options: ["text-color", "font-color", "color", "text-style"],
        answer: "color"
    },
    {
        question: "What does 'this' keyword refer to in JavaScript?",
        options: [
            "The current function",
            "The parent element",
            "The global window object",
            "The object it belongs to"
        ],
        answer: "The object it belongs to"
    },
    {
        question: "Which HTML5 element is used for sidebar content?",
        options: ["<sidebar>", "<aside>", "<nav>", "<section>"],
        answer: "<aside>"
    },
    {
        question: "What does 'flex' value of display property do?",
        options: [
            "Creates a flexible grid",
            "Makes elements display in a row",
            "Enables flex container",
            "Allows proportional resizing"
        ],
        answer: "Enables flex container"
    },
    {
        question: "Which selector has highest specificity in CSS?",
        options: [".class", "#id", "tag", "*"],
        answer: "#id"
    },
    {
        question: "What does JSON stand for?",
        options: [
            "JavaScript Object Notation",
            "JavaScript Oriented Networking",
            "JavaScript Operator Names",
            "JavaScript Output Node"
        ],
        answer: "JavaScript Object Notation"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const currentEl = document.getElementById('current');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const resultContainer = document.querySelector('.result-container');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart');

function startQuiz() {
    showQuestion();
    startTimer();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    
    q.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectAnswer(option));
        optionsEl.appendChild(button);
    });

    currentEl.textContent = currentQuestion + 1;
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 10;
    timeEl.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function selectAnswer(selectedOption) {
    clearInterval(timer);
    const options = document.querySelectorAll('.option');
    const currentQ = questions[currentQuestion];
    
    options.forEach(option => {
        option.disabled = true;
        if (option.textContent === currentQ.answer) {
            option.classList.add('correct');
        } else if (option.textContent === selectedOption && selectedOption !== currentQ.answer) {
            option.classList.add('incorrect');
        }
    });

    if (selectedOption === currentQ.answer) {
        score += 5;
        scoreEl.textContent = score;
    }

    setTimeout(() => {
        currentQuestion++;
        showQuestion();
        startTimer();
    }, 1500);
}

function handleTimeout() {
    const options = document.querySelectorAll('.option');
    const currentQ = questions[currentQuestion];
    
    options.forEach(option => {
        option.disabled = true;
        if (option.textContent === currentQ.answer) {
            option.classList.add('correct');
        }
    });

    setTimeout(() => {
        currentQuestion++;
        showQuestion();
        startTimer();
    }, 1500);
}

function endQuiz() {
    clearInterval(timer);
    document.querySelector('.question-container').classList.add('hidden');
    resultContainer.classList.remove('hidden');
    finalScoreEl.textContent = score;
}

restartBtn.addEventListener('click', () => {
    window.location.href = 'quiz.html';
});

startQuiz();