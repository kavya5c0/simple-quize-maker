let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
let currentQuiz = null;

function showSection(sectionId) {
    document.querySelectorAll('.container > div').forEach(div => div.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

function displayQuizList() {
    const quizList = document.getElementById('quizzes');
    quizList.innerHTML = '';
    if (quizzes.length === 0) {
        quizList.innerHTML = '<li>No quizzes available. Create a quiz first!</li>';
        return;
    }
    quizzes.forEach((quiz, index) => {
        const li = document.createElement('li');
        li.textContent = quiz.title;
        li.onclick = () => startQuiz(index);
        quizList.appendChild(li);
    });
}

function addQuestion() {
    const container = document.getElementById('questions-container');
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `
        <input type="text" class="question-text" placeholder="Question">
        <input type="text" class="option" placeholder="Option A">
        <input type="text" class="option" placeholder="Option B">
        <input type="text" class="option" placeholder="Option C">
        <input type="text" class="option" placeholder="Option D">
        <select class="correct-answer">
            <option value="0">A</option>
            <option value="1">B</option>
            <option value="2">C</option>
            <option value="3">D</option>
        </select>
    `;
    container.appendChild(questionDiv);
}

function saveQuiz() {
    const title = document.getElementById('quiz-title').value;
    if (!title) {
        alert('Please enter a quiz title.');
        return;
    }
    const questionDivs = document.querySelectorAll('#questions-container > div');
    if (questionDivs.length === 0) {
        alert('Please add at least one question.');
        return;
    }
    const questions = Array.from(questionDivs).map(div => ({
        text: div.querySelector('.question-text').value,
        options: Array.from(div.querySelectorAll('.option')).map(opt => opt.value),
        correctAnswer: parseInt(div.querySelector('.correct-answer').value)
    }));

    quizzes.push({ title, questions });
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    alert('Quiz saved successfully!');
    resetCreateQuizForm();
    showSection('main-menu');
}

function resetCreateQuizForm() {
    document.getElementById('quiz-title').value = '';
    document.getElementById('questions-container').innerHTML = '';
}

function startQuiz(index) {
    currentQuiz = quizzes[index];
    const quizQuestionsDiv = document.getElementById('quiz-questions');
    quizQuestionsDiv.innerHTML = '';
    document.getElementById('current-quiz-title').textContent = currentQuiz.title;

    currentQuiz.questions.forEach((question, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <p>${question.text}</p>
            ${question.options.map((opt, oIndex) => `
                <label>
                    <input type="radio" name="q${qIndex}" value="${oIndex}">
                    ${opt}
                </label>
            `).join('')}
        `;
        quizQuestionsDiv.appendChild(questionDiv);
    });

    showSection('take-quiz');
}

function submitQuiz() {
    let score = 0;
    currentQuiz.questions.forEach((question, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === question.correctAnswer) {
            score++;
        }
    });

    document.getElementById('score').textContent = `${score} / ${currentQuiz.questions.length}`;
    showSection('quiz-results');
}

// Event Listeners
document.getElementById('take-quiz-btn').addEventListener('click', () => {
    if (quizzes.length === 0) {
        alert('No quizzes available. Please create a quiz first!');
        return;
    }
    displayQuizList();
    showSection('quiz-list');
});
document.getElementById('create-quiz-btn').addEventListener('click', () => showSection('create-quiz'));
document.getElementById('add-question').addEventListener('click', addQuestion);
document.getElementById('save-quiz').addEventListener('click', saveQuiz);
document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
document.querySelectorAll('.back-to-menu').forEach(btn => {
    btn.addEventListener('click', () => showSection('main-menu'));
});
document.getElementById('back-to-menu').addEventListener('click', () => showSection('main-menu'));

// Initial setup
showSection('main-menu');