# Quiz Maker

Quiz Maker is a simple, browser-based application that allows users to create and take quizzes. It's built with HTML, CSS, and JavaScript, using local storage to save quiz data.

## Features

- Create quizzes with multiple-choice questions
- Take quizzes and get immediate results
- Store quizzes in the browser's local storage
- Simple and intuitive user interface

## Project Structure

```
quiz-maker/

    src/

     index.html

       js/
         script.js

        css/
         styles.css

    README.md
    .gitignore
```

## Setup

1. Clone this repository:
   ```
   git clone https://github.com/your-username/quiz-maker.git
   ```
2. Navigate to the project directory:
   ```
   cd quiz-maker
   ```
3. Open `src/index.html` in your web browser.

## Usage

1. From the main menu, choose to either "Take a Quiz" or "Create a Quiz".
2. To create a quiz:
   - Enter a quiz title
   - Add questions and their multiple-choice answers
   - Specify the correct answer for each question
   - Save the quiz
3. To take a quiz:
   - Select a quiz from the available list
   - Answer the questions
   - Submit your answers to see your score

## Local Storage

This application uses the browser's local storage to save quizzes. This means:
- Quizzes are saved in the browser and will persist even if you close the page
- Quizzes are specific to each browser and device
- Clearing your browser data will remove all saved quizzes

## Development

To modify the application:
1. Edit the HTML in `src/index.html`
2. Modify the JavaScript in `src/js/script.js`
3. Update styles in `src/css/styles.css`

