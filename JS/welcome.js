// Welcome Page - Start Quiz Button
document.addEventListener('DOMContentLoaded', function() {
    // Start Quiz Button
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            window.location.href = 'level.html';
        });
    }
    
    // Level Selection Buttons
    const levelButtons = document.querySelectorAll('[data-level]');
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            localStorage.setItem('selectedLevel', level);
            window.location.href = 'quiz.html';
        });
    }
});