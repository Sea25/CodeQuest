document.addEventListener('DOMContentLoaded', function() {
    // Quiz questions
    const questions = [
        {
            question: "What does CSS stand for?",
            options: [
                "Computer Style Sheets",
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Colorful Style Sheets"
            ],
            answer: "Cascading Style Sheets"
        },
        {
            question: "Which HTML tag is used to link an external JavaScript file?",
            options: [
                "<script>",
                "<javascript>",
                "<js>",
                "<link>"
            ],
            answer: "<script>"
        },
        {
            question: "What is the purpose of the 'alt' attribute in an image tag?",
            options: [
                "To provide alternative text for screen readers",
                "To change the image source on hover",
                "To set the image alignment",
                "To add a border to the image"
            ],
            answer: "To provide alternative text for screen readers"
        },
        {
            question: "Which CSS property is used to change the text color of an element?",
            options: [
                "text-color",
                "font-color",
                "color",
                "text-style"
            ],
            answer: "color"
        },
        {
            question: "What is the correct way to comment in JavaScript?",
            options: [
                "<!-- This is a comment -->",
                "// This is a comment",
                "' This is a comment",
                "/* This is a comment */"
            ],
            answer: "// This is a comment"
        },
        {
            question: "Which HTML5 element is used for sidebar content?",
            options: [
                "<sidebar>",
                "<aside>",
                "<nav>",
                "<section>"
            ],
            answer: "<aside>"
        },
        {
            question: "What does the 'flex' value of the display property do?",
            options: [
                "Creates a flexible grid layout",
                "Makes elements display in a row",
                "Enables a flex container",
                "Allows elements to resize proportionally"
            ],
            answer: "Enables a flex container"
        },
        {
            question: "Which method is used to add an element to the end of an array in JavaScript?",
            options: [
                "array.push()",
                "array.pop()",
                "array.shift()",
                "array.unshift()"
            ],
            answer: "array.push()"
        },
        {
            question: "What is the purpose of media queries in CSS?",
            options: [
                "To apply styles based on device characteristics",
                "To import external stylesheets",
                "To create animations",
                "To define variables"
            ],
            answer: "To apply styles based on device characteristics"
        },
        {
            question: "Which selector has the highest specificity in CSS?",
            options: [
                "Class selector (.class)",
                "ID selector (#id)",
                "Element selector (div)",
                "Universal selector (*)"
            ],
            answer: "ID selector (#id)"
        }
    ];

    // Quiz variables
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 10;
    let quizCompleted = false;
    let shuffledQuestions = [];

    // DOM elements
    const questionContainer = document.getElementById('questionContainer');
    const currentQuestionElement = document.getElementById('currentQuestion');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    const timeElement = document.getElementById('time');
    const scoreElement = document.getElementById('score');
    const resultContainer = document.getElementById('resultContainer');
    const finalScoreElement = document.getElementById('finalScore');
    const restartQuizBtn = document.getElementById('restartQuiz');

    // Initialize quiz
    function initQuiz() {
        // Shuffle questions and options
        shuffledQuestions = shuffleArray([...questions]);
        shuffledQuestions.forEach(q => {
            q.options = shuffleArray(q.options);
        });

        totalQuestionsElement.textContent = shuffledQuestions.length;
        showQuestion();
        startTimer();
    }

    // Show current question
    function showQuestion() {
        if (currentQuestionIndex >= shuffledQuestions.length) {
            endQuiz();
            return;
        }

        const question = shuffledQuestions[currentQuestionIndex];
        currentQuestionElement.textContent = currentQuestionIndex + 1;

        questionContainer.innerHTML = `
            <div class="question-text">${question.question}</div>
            <div class="options-container">
                ${question.options.map(option => `
                    <button class="option-btn">${option}</button>
                `).join('')}
            </div>
        `;

        // Add event listeners to options
        const optionButtons = document.querySelectorAll('.option-btn');
        optionButtons.forEach(button => {
            button.addEventListener('click', () => selectOption(button));
        });

        // Reset timer for new question
        resetTimer();
    }

    // Select an option
    function selectOption(selectedButton) {
        if (quizCompleted) return;

        clearInterval(timer);
        const question = shuffledQuestions[currentQuestionIndex];
        const options = document.querySelectorAll('.option-btn');
        const selectedAnswer = selectedButton.textContent;
        let isCorrect = false;

        // Disable all options
        options.forEach(button => {
            button.classList.add('disabled');
        });

        // Check if answer is correct
        if (selectedAnswer === question.answer) {
            selectedButton.classList.add('correct');
            score += 5;
            scoreElement.textContent = score;
            isCorrect = true;
        } else {
            selectedButton.classList.add('incorrect');
            // Highlight correct answer
            options.forEach(button => {
                if (button.textContent === question.answer) {
                    button.classList.add('correct');
                }
            });
        }

        // Move to next question after delay
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 1500);
    }

    // Timer functions
    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timeElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                timeUp();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 10;
        timeElement.textContent = timeLeft;
        startTimer();
    }

    function timeUp() {
        clearInterval(timer);
        const question = shuffledQuestions[currentQuestionIndex];
        const options = document.querySelectorAll('.option-btn');

        // Disable all options
        options.forEach(button => {
            button.classList.add('disabled');
            
            // Highlight correct answer
            if (button.textContent === question.answer) {
                button.classList.add('correct');
            }
        });

        // Move to next question after delay
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 1500);
    }

    // End quiz
    function endQuiz() {
        clearInterval(timer);
        quizCompleted = true;
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        finalScoreElement.textContent = score;
    }

    // Restart quiz
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizCompleted = false;
        scoreElement.textContent = score;
        questionContainer.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        initQuiz();
    }

    // Utility function to shuffle array
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Event listeners
    restartQuizBtn.addEventListener('click', restartQuiz);

    // Start the quiz
    initQuiz();
});