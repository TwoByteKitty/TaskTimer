const $TIMER_MINUTES = $('.timer-group .timer.minute .hand span');
const $TIMER_SECONDS = $('.timer-group .timer.second .hand span');
const $FACE = $('#timeDisplay');
const TIMER_TOGGLE = document.getElementById('workOrRest')

let timer = undefined;
let timerInterval = undefined;
let typeOfTimerNow = "work";

let workTime = 2;
let breakTime = 1;

function runTimer() {
    timer.subtract(1000, 'ms');
    if (timer.asMilliseconds() < 1) {
        clearInterval(timerInterval);
        $FACE.text(`Time's Up!!`);
        return;
    }
    $FACE.text(`${timer.minutes() > 0 ? timer.minutes() + ' : ' : ''}
    ${timer.seconds() < 10 ? '0' + timer.seconds() : timer.seconds()}`);
}

function workRestToggle(event){
    clearInterval(timerInterval);
    timer = undefined;
    $TIMER_MINUTES.css({ 'animation-duration': 0, 'animation-iteration-count': `0` });
    $TIMER_SECONDS.css({ 'animation-duration': 0,  'animation-iteration-count': `0`});
    console.log(event);
    console.log(TIMER_TOGGLE.checked);
};

TIMER_TOGGLE.addEventListener("click", workRestToggle);

export function startTimer(minutes, timerType) {
    if (!timer || timer.asMilliseconds() === 0 || typeOfTimerNow !== timerType) {
        typeOfTimerNow = timerType;
        timer = moment.duration(minutes, 'minutes');
    }
    timerInterval = setInterval(runTimer, 1000);
    $TIMER_MINUTES.css({ 'animation-duration': `${timer.asSeconds()}s`, 'animation-play-state' : 'running' });
    $TIMER_SECONDS.css({ 'animation-iteration-count': `${timer.asSeconds()}`, 'animation-duration': '1000ms', 'animation-play-state' : 'running'  });
}

export function stopTimer() {
    clearInterval(timerInterval);
    $TIMER_MINUTES.css({'animation-play-state' : 'paused'});
    $TIMER_SECONDS.css({'animation-play-state' : 'paused'});
}
