document.addEventListener('DOMContentLoaded', function() {
    // Questions data (same as before)
    const questions = {
        easy: [/*...*/],
        medium: [/*...*/],
        hard: [/*...*/]
    };

    // Quiz state variables
    let currentLevel = localStorage.getItem('selectedLevel') || 'easy';
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 30;
    let quizCompleted = false;

    // DOM elements
    const levelNameElement = document.getElementById('levelName');
    const questionTextElement = document.getElementById('questionText');
    const optionsContainer = document.querySelector('.options-container');
    const currentQuestionElement = document.getElementById('currentQuestion');
    const scoreElement = document.getElementById('score');
    const timeElement = document.getElementById('time');
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('nextBtn');

    // Initialize the quiz
    function initQuiz() {
        // Verify we have questions for the selected level
        if (!questions[currentLevel]) {
            currentLevel = 'easy'; // Default to easy if level is invalid
        }
        
        levelNameElement.textContent = currentLevel.toUpperCase();
        loadQuestion();
        startTimer();
    }

    // Load a question
    function loadQuestion() {
        // Check if quiz is completed
        if (currentQuestionIndex >= questions[currentLevel].length) {
            endQuiz();
            return;
        }

        const question = questions[currentLevel][currentQuestionIndex];
        questionTextElement.textContent = question.question;
        currentQuestionElement.textContent = currentQuestionIndex + 1;

        // Clear previous options
        optionsContainer.innerHTML = '';

        // Create new options
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option', 'pixel-box');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(optionElement);
        });

        // Reset feedback and next button
        feedbackElement.textContent = 'Select an answer!';
        feedbackElement.style.color = '#ffffff';
        nextButton.disabled = true;
        
        // Reset timer
        resetTimer();
    }

    // Timer functions
    function startTimer() {
        timeLeft = 30;
        updateTimerDisplay();
        
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                timeUp();
            }
        }, 1000);
    }

    function resetTimer() {
        timeLeft = 30;
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        timeElement.textContent = timeLeft;
        
        // Change color when time is running low
        if (timeLeft <= 10) {
            timeElement.style.color = '#ff6666';
        } else {
            timeElement.style.color = '#ffffff';
        }
    }

    // Handle when time runs out
    function timeUp() {
        const question = questions[currentLevel][currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        
        // Disable all options
        options.forEach(option => {
            option.classList.add('disabled');
            option.removeEventListener('click', selectAnswer);
        });
        
        // Highlight correct answer
        options[question.answer].classList.add('correct');
        
        feedbackElement.textContent = 'Time is up! The correct answer is highlighted.';
        feedbackElement.style.color = '#ff6666';
        nextButton.disabled = false;
    }

    // Handle answer selection
    function selectAnswer(selectedIndex) {
        const question = questions[currentLevel][currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        
        // Stop the timer
        clearInterval(timer);
        
        // Disable all options
        options.forEach(option => {
            option.classList.add('disabled');
            option.removeEventListener('click', selectAnswer);
        });
        
        // Check if answer is correct
        if (selectedIndex === question.answer) {
            options[selectedIndex].classList.add('correct');
            score++;
            scoreElement.textContent = score;
            feedbackElement.textContent = 'Correct! Well done!';
            feedbackElement.style.color = '#66ff66';
        } else {
            options[selectedIndex].classList.add('wrong');
            options[question.answer].classList.add('correct');
            feedbackElement.textContent = `Wrong! The correct answer is: ${question.options[question.answer]}`;
            feedbackElement.style.color = '#ff6666';
        }
        
        nextButton.disabled = false;
    }

    // Move to next question
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions[currentLevel].length) {
            loadQuestion();
            startTimer();
        } else {
            endQuiz();
        }
    }

    // End the quiz
    function endQuiz() {
        clearInterval(timer);
        quizCompleted = true;
        
        // Display results
        document.querySelector('.quiz-container').innerHTML = `
            <div class="result-screen pixel-box">
                <h2>QUIZ COMPLETED!</h2>
                <p>Level: ${currentLevel.toUpperCase()}</p>
                <p>Score: ${score}/10</p>
                <p>${getResultMessage(score)}</p>
                <button id="restartBtn" class="pixel-button">PLAY AGAIN</button>
            </div>
        `;
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            window.location.href = 'level.html';
        });
    }

    // Get a fun result message based on score
    function getResultMessage(score) {
        if (score >= 9) return "Astronomical! You're a space expert!";
        if (score >= 7) return "Great job! You know your space facts!";
        if (score >= 5) return "Not bad! Keep exploring the cosmos!";
        if (score >= 3) return "Keep practicing! The universe is vast!";
        return "Don't give up! The stars await your knowledge!";
    }

    // Event listeners
    nextButton.addEventListener('click', nextQuestion);

    // Start the quiz
    initQuiz();
});