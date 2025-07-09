document.addEventListener('DOMContentLoaded', function() {
    const startQuizBtn = document.getElementById('startQuiz');
    
    startQuizBtn.addEventListener('click', function() {
        window.location.href = 'quiz.html';
    });
});