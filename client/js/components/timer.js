const PLAYBTN = document.getElementById("startTimerBtn");
const PAUSEBTN = document.getElementById("pauseTimerBtn");
const $TIMER_MINUTES = $('.timer-group .timer.minute .hand span');
const $TIMER_SECONDS = $('.timer-group .timer.second .hand span');
const $FACE = $('#timeDisplay');
const TIMER_TOGGLE = document.getElementById('workOrRest')
const DEFAULTS = {
    timer: undefined,
    typeOfTimer: "work",
    workTime: 2,
    breakTime: 1,
};

let timerInterval = undefined;

let settings = {};

function runTimer() {
    settings.timer.subtract(1000, 'ms');
    if (settings.timer.asMilliseconds() < 1) {
        clearInterval(timerInterval);
        $FACE.text(`Time's Up!!`);
        return;
    }
    $FACE.text(`${settings.timer.minutes() > 0 ? settings.timer.minutes() + ' : ' : ''}
    ${settings.timer.seconds() < 10 ? '0' + settings.timer.seconds() : settings.timer.seconds()}`);
}

export function initTimer (options = {}) {
    let minutes;
    settings = Object.assign(DEFAULTS, options);
    if (settings.typeOfTimer === "work") {
        minutes = settings.workTime;
    } else {
        minutes = settings.breakTime;
    }
    settings.timer = moment.duration(minutes, 'minutes');

    PLAYBTN.addEventListener("click", startTimer);
    PAUSEBTN.addEventListener("click", pauseTimer);
};

export function startTimer() {
    timerInterval = setInterval(runTimer, 1000);
    $TIMER_MINUTES.css({ 'animation-duration': `${settings.timer.asSeconds()}s`, 'animation-play-state' : 'running' });
    $TIMER_SECONDS.css({ 'animation-iteration-count': `${settings.timer.asSeconds()}`, 'animation-duration': '1000ms', 'animation-play-state' : 'running'  });
}

export function pauseTimer() {
    clearInterval(timerInterval);
    $TIMER_MINUTES.css({'animation-play-state' : 'paused'});
    $TIMER_SECONDS.css({'animation-play-state' : 'paused'});
}
