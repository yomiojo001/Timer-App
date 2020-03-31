let timerValue = {
    minutes: 0,
    seconds: 0,
    timerId: 0
}

function soundTimer(){
    let amt = 2;
    let audio = new Audio("timer_beep.mp3");

    function playSound(){
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }

    for(i = 0; i< amt; i++){
        setTimeout(playSound, 1200 * i)
    }
}

function updateValue(key, value){
    if(value <0){
        value = 0;
    }

    if(key == "seconds"){
        if(value <10){
            value = "0" + value;
        }

        if(value>59){
            value = 59;
        }
    }
    $("#" + key).html(value || 0);
    timerValue[key] = value;
    
}

(function detectChanges(key){

    let input = "#" + key + "-input";

    $(input).change(function() {
        updateValue(key, $(input).val());
    });

    return arguments.callee;
})("minutes")("seconds");

function startTimer(){
    buttonManager(["start", false], ["pause", true], ["stop", true])
    freezeInput();

    timerValue.timerId = setInterval(function(){
        timerValue.seconds--;
        if(timerValue.seconds < 0){
            if(timerValue.minutes ==0){
                soundTimer();
                return stopTimer();
            }
            timerValue.seconds = 59;
            timerValue.minutes--;
        }

        updateValue("minutes", timerValue.minutes);
        updateValue("seconds", timerValue.seconds);
    }, 1000)

}

function pauseTimer(){
    buttonManager(["start", true], ["pause", false], ["stop", true])
    clearInterval(timerValue.timerId);
}


function stopTimer() {
    clearInterval(timerValue.timerId);
    buttonManager(["start", true], ["pause", false], ["stop", false]);
    unFreezeInput();
    updateValue("minutes", $("#minutes-input").val());
    
    let seconds = $("#seconds-input").val();
    if(seconds < 10) { seconds = "0" + seconds; }
    updateValue("seconds", seconds);
}


function buttonManager(...buttonsArray){
    for(let i = 0; i < buttonsArray.length; i++){
        let button = "#" + buttonsArray[i][0] + "-button";
        if(buttonsArray[i][1]){
            $(button).removeAttr("disabled");
        }else{
            $(button).attr("disabled", "disabled");
        }
    }
}

function freezeInput(){
    $("#minutes-input").attr("disabled", "disabled");
    $("#seconds-input").attr("disabled", "disabled");
}
function unFreezeInput(){
    $("#minutes-input").removeAttr("disabled");
    $("#seconds-input").removeAttr("disabled");
}