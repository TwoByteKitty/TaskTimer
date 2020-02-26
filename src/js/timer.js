const $TIMER_MINUTES = $('.timer-group .timer.minute .hand span');
const $TIMER_SECONDS = $('.timer-group .timer.second .hand span');
const $FACE = $('#timeDisplay');
const TIMER_TOGGLE = document.getElementById('workOrRest')
const DEFAULTS = {
    timer = undefined,
    typeofTimer = "work",
    workTime = 2,
    breakTime = 1,
};

let settings = {};

let timer = undefined;
let timerInterval = undefined;
let typeOfTimer = "work";

let workTime;
let breakTime;

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

export function initTimer (settings = {}) {
    settings = Object.assign(

    )
};

export function startTimer(minutes, timerType) {
    if (!timer || timer.asMilliseconds() === 0 || typeOfTimer !== timerType) {
        typeOfTimer = timerType;
        timer = moment.duration(minutes, 'minutes');
    }
    timerInterval = setInterval(runTimer, 1000);
    $TIMER_MINUTES.css({ 'animation-duration': `${timer.asSeconds()}s`, 'animation-play-state' : 'running' });
    $TIMER_SECONDS.css({ 'animation-iteration-count': `${timer.asSeconds()}`, 'animation-duration': '1000ms', 'animation-play-state' : 'running'  });
}

export function pauseTimer() {
    clearInterval(timerInterval);
    $TIMER_MINUTES.css({'animation-play-state' : 'paused'});
    $TIMER_SECONDS.css({'animation-play-state' : 'paused'});
}
