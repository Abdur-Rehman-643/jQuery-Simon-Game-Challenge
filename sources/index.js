
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;

$(document).on("keypress", function() {
    if (!isGameStarted) {
        isGameStarted = true;
        $("h1").text("LEVEL " + level);
        nextSequence();
    }
});

function playMusic(colour) {
    var audio = new Audio('sounds/' + colour + '.mp3');
    audio.play();
}

function addTransition(colour) {
    $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + colour).addClass("pressed");
    setTimeout(function() {
        $("#" + colour).removeClass("pressed");
    }, 500);
}

function nextSequence() {
    level = level + 1;
    $("h1").text("LEVEL " + level);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    addTransition(randomChosenColour);
    playMusic(randomChosenColour);
}

function checkAnswer() {
    if (userClickedPattern.length === gamePattern.length) {
        var flag = true;
        for (var i = 0; i < userClickedPattern.length; i++) {
            if (userClickedPattern[i] !== gamePattern[i]) {
                flag = false;
                break;
            }
        }
        if (!flag) {
            GameOver();
        } else {
            setTimeout(nextSequence, 1000);
        }
    }
}

function GameOver() {
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    isGameStarted = false;
    gamePattern = [];
    level = 0;
    $("h1").text("Game Over! Press A Key to Restart");
}

$(".btn").on("click", function() {
    var buttonId = $(this).attr("id");
    addTransition(buttonId);
    playMusic(buttonId);
    userClickedPattern.push(buttonId);
    checkAnswer();
});