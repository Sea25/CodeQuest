document.addEventListener('DOMContentLoaded', function() {
    const startQuizBtn = document.getElementById('startQuiz');
    
    startQuizBtn.addEventListener('click', function() {
        // Ensure the quiz.html path is correct relative to your file structure
        window.location.href = 'quiz.html';
    });
});