var highscore = document.querySelector("#highscore");
var clear = document.querySelector("#clear");
var back = document.querySelector("#back");

clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

var leaderBoard = localStorage.getItem("scores");
leaderBoard = JSON.parse(leaderBoard);

if(leaderBoard !== null) {
    for(var i = 0; i < leaderBoard.length; i++) {
        var hsList = document.createElement("li");
        hsList.textContent = leaderBoard[i].initials + " " + leaderBoard[i].score;
        highscore.appendChild(hsList);
    }
}

back.addEventListener("click", function() {
    window.location.replace("index.html");
});