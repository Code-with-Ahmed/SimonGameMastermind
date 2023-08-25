var userClickPatteren = [];
 var gamePatteren = [];
 var level= 0;
 var started=false;
 var array = ["red", "blue", "green", "yellow"];

$(".btn").click(function() 
{
  var userChososenColor = this.id;

  playSound(userChososenColor);
  animatePress(this.id);
  userClickPatteren.push(userChososenColor);
  checkAnswer(userClickPatteren.length-1);
});

$(document).keydown(function() {
 if(started === false)
 {
  $("h1").text("Level " + level);
  started=true;
  nextSequence();   
 }
});

// FUNCTIONS 
function nextSequence()
{
  userClickPatteren = [];
  level++;
  $("h1").text("Level " + level);
  var randonNumber = Math.floor(Math.random()*3)+1;

  var randomChoosenColor = array[randonNumber];

  gamePatteren.push(randomChoosenColor);

  $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChoosenColor);
}

function playSound(name)
{
  var currentSelectedButtonSound = new Audio("sounds/"+name+".mp3");
  currentSelectedButtonSound.play();
}

function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  } , 100);
}

function checkAnswer(currentLevel)
{
 if(userClickPatteren[currentLevel] === gamePatteren[currentLevel])
 {
  if(userClickPatteren.length === gamePatteren.length)
  {
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }
 }
 else{
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout( function(){
    $("body").removeClass("game-over")}, 200);

  $("h1").text("Game-over, Press Any Key to Start");
  startOver(); 
}}

function startOver()
{
  level=0;
  gamePatteren=[];
  started=false;
}