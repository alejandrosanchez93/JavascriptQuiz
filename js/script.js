var score = 0;
var questionIndex = 0;

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        choices: ["Curly Brackets","Parentheses","Quotes","Square Brackets"],
        answer: "Parentheses",
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["Quotes","Curly Brackets","Commas","Parenthesis"],
        answer: "Quotes",
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        choices: ["Booleans","Other Arrays","Numbers and Strings","all of the above"],
        answer: "all of the above",
    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["For Loops","Console.log","Javascript","Terminal/Bash"],
        answer: "Console.log",
    }
]

var clock = document.querySelector("#timer");
var countdown = document.querySelector("#start");
var question = document.querySelector("#question");
var wrapper = document.querySelector("#container");
var penalty = 10;
var time = 80;
var holdInterval = 0;
var newList = document.createElement("ul");

countdown.addEventListener("click", function() {
    if(holdInterval === 0) {
        holdInterval = setInterval(function() {
            time--;
            clock.textContent = "Time: " + time;
            if(time <= 0) {
                clearInterval(holdInterval);
                finished();
                clock.textContent = "Time!";
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex) {
    question.innerHTML = "";
    newList.innerHTML = "";
    for ( var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].choices;
        question.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        question.appendChild(newList);
        newList.appendChild(listItem);
        listItem.addEventListener("click", (checkAnswer));
    })
}

function checkAnswer(event) {
    var element = event.target;
    if(element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if(element.textContent == questions[questionIndex].answer) {
            score++;
        } else {
            time = time - penalty;
            createDiv.textContent = "Incorrect";
        }
    }
    questionIndex++;

    if(questionIndex >= questions.length) {
        finished();
        createDiv.textContent = "You got " + score + " out of " +questions.length + " correct";
    } else {
        render(questionIndex);
    }
    question.appendChild(createDiv);
}

function finished() {
    question.innerHTML - "";
    clock.innerHTML = "";

    var complete = document.createElement("h1");
    complete.setAttribute("id", "complete");
    complete.textContent = "You are finished"

    question.appendChild(complete);
    var createParagraph = document.createElement("p");
    createParagraph.setAttribute("id", "createParagraph");

    question.appendChild(createParagraph);

    if(time >= 0) {
        var timeLeft = time;
        var endScore = document.createElement("p");
        clearInterval(holdInterval);
        createParagraph.textContent = "Your final score is: " + timeLeft;
        question.appendChild(endScore);
    }
    var initial = document.createElement("label");
    initial.setAttribute("id", "initial");
    initial.textContent = "Enter your initials: ";

    question.appendChild(initial);

    var askInitials = document.createElement("input");
    askInitials.setAttribute("type", "text");
    askInitials.setAttribute("id", "initials");
    askInitials.textContent = "";

    question.appendChild(askInitials);

    var submitButton = document.createElement("btn");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "submit");
    submitButton.textContent = "Submit";

    question.appendChild(submitButton);

    submitButton.addEventListener("click", function() {
        var initials = askInitials.value;
        if(initials === null) {
            alert("Enter initials");
        } else {
            var finalScore = {
                initials: initials,
                score: timeLeft
            }
            var scores = localStorage.getItem("scores");
            if(scores === null) {
                scores = [];
            } else {
                scores = JSON.parse(scores);
            }
            scores.push(finalScore);
            var newScore = JSON.stringify(scores);
            localStorage.setItem("scores", newScore);
            window.location.replace("highscores.html");
        }
    });
};