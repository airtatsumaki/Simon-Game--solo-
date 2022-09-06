var gameStarted = false;
var level = 0;
var colours = ["green", "red", "blue", "yellow"];
var generatedSequence = [];
var userSequence = [];
var clicks = 0;

jQuery(document).keypress(function(e){
  if (!gameStarted){
    gameStarted = true;
    jQuery("#level-title").text("Level " + level);
    nextSequence();
  }
});

jQuery('.btn').click(function(){
  animateClicked(jQuery(this));
  playSound(jQuery(this));
  userSequence.push(jQuery(this).attr("id"));
  clicks++;
  checkAnswer(clicks);
});

function checkAnswer(stageLevel){
  if (userSequence[stageLevel-1] == generatedSequence[stageLevel-1]){
    if(userSequence.length == generatedSequence.length){
      level++;
      clicks = 0;
      userSequence = [];
      jQuery("#level-title").text("Level " + level);
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
    console.log("correct");
  }
  else{
    console.log("wrong");
    jQuery('body').addClass('wrong');
    setTimeout(function() {
      jQuery('body').removeClass('wrong');
    }, 200);
    gameStarted = false;
    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();
    jQuery("#level-title").html("GAME OVER! <br/> You reached Level " + level);
    generatedSequence = [];
    userSequence = [];
    level = 0;
    clicks = 0;
  }
}

function nextSequence(){
  var Nextcolour = colours[Math.floor(Math.random() * 4)];
  generatedSequence.push(Nextcolour);
  console.log(generatedSequence);
  jQuery("." + Nextcolour).fadeOut(100).fadeIn(100);
  playSound(jQuery("." + Nextcolour));
}

function animateClicked(theButton){
  theButton.addClass('pressed');
  setTimeout(function() {
    theButton.removeClass('pressed');
  }, 200);
}

function playSound(theButton){
  var sound = new Audio("sounds/" + theButton.attr("id") + ".mp3");
  sound.play();
}