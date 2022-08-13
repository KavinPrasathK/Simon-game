var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ['red','blue','green','yellow'];
var level = 0;
var started = false;

$(document).keypress(function(KeyboardEvent){
    if (!started){
        $("#level-title").text("Level "+level);
        nextSequence();
    }  
    started = true;     
})

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = (Math.floor(((Math.random())*4))); //generates random numbers

    //for choosing random colors
    var randomChosenColour = buttonColors[randomNumber];

    //appends the chosen color to the gamePattern array
    gamePattern.push(randomChosenColour);

    //randomChosenColor button animation and sound
    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
}

//User clicked buttons

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    //adds sounds and animation to the user clicked color
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var x=userClickedPattern.length-1;
    checkAnswer(x);
});

//Function for checking answers
function checkAnswer(i){
    if((gamePattern[i]===userClickedPattern[i])){
        if ((i+1)==gamePattern.length){
            userClickedPattern=[];
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        else{

        }
    }
    else{
        $("#level-title").text("Game Over! Press any key to start");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        startOver();
    }
}
        

//Function for adding sound to the buttons
function playSound(key){
    var audio = new Audio("sounds/"+key+".mp3");
    audio.play();
}

//Function for adding animation to the user clicked buttons
function animatePress(key){
    $("#"+key).addClass("pressed");
    setTimeout(function(){
        $("#"+key).removeClass("pressed"); 
    },100);
}

//Start Over Function
function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    index = 0;
}