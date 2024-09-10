var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var hl = 0;
$(".bttn").click(function (){
    if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $(this).hide();
    }
});

$(document).keydown(function(){
    if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $(".bttn").hide();
    }
});
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("succes");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000);
        }
    }
        else{
            console.log("wrong");

            playSound("wrong");
            $("body").addClass("gameover");
            setTimeout(function(){
                $("body").removeClass("gameover")
            },200);

            $("#level-title").text("Game over press any key to restart the game");
            hl = max(level,hl);

            startOver ();
        }

}



function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100); 
}
function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    $(".bttn").show().text("Restart");
    $("h4").text("Highest Level : "+hl);
} 
function max(a,b){
   if(a>b){
    return a;
   }
   else{
    return b;
   }
}