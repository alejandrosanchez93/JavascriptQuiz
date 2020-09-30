function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show choices
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i< choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }

};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
}

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " " + "of " + quiz.questions.length;
}

function showScores() {
    var gameOverHtml = "<h1>Result</h1>";
    gameOverHtml += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
}





var questions = [
    new question("Commonly used data types DO NOT include:", ["strings", "booleans", "alerts", "numbers"], "alerts"),
    new question("The condition of an if/else statement is enclosed within a __.", ["quotes", "curly braces", "parentheses", "square brackets"], "curly braces"),
    new question("Arrays in Javascript can be used to store __.", ["numbers", "other arrays", "booleans", "all of the above"], "all of the above"),
    new question("String values must be enclosed within __ when being assigned to variables.", ["commas", "curly braces", "quotes", "parentheses"], "quotes"),
    new question("A very useful tool used during development and debugging for printing content to the debugger is:", ["Javascript", "terminal/bash", "for loops", "console.log"], "console.log")
];

var quiz = new Quiz(questions);

populate();