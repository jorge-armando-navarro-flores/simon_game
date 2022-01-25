var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;



$(document).on("keypress", function(event) {
  if (!started) {
    // console.log(event.key);
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
})

$(".btn").on("click", function() {
  var userChosenColor = this.id; // $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor)
  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){

    if(currentLevel == gamePattern.length-1){
      setTimeout(() => {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }

  } else {
    console.log("You are wrong!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    $("h1").text("Game Over, Press Any Key to Restart");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}

function nextSequence() {
  level++
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(chosenColor) {
  var audio = new Audio("sounds/" + chosenColor + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(() => {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
