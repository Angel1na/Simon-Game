var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//start game 
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text('Level ' + level)
        nextSequence()
        started = true;
    }
})

//userClickedButton
$('.btn').click(function () {

    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)

    // var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    // audio.play();
})

//Sound


function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        playSound('wrong')
        console.log("wrong");
        $('body').addClass("game-over");
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);

        $("#level-title").text('Game Over, Press Any Key to Restart')

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200)
    // .fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}




function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed')
    setTimeout(function () {
        $('#' + currentColour).removeClass('pressed')
    }, 100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
// $('btn').click(function() {
//     $(this).attr(id)
// })






// nextSequence()