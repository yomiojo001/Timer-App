let timerValue = {
    minutes: 0,
    seconds: 0,
    timerId: 0
}

function soundTimer(){
    let amt = 3;
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