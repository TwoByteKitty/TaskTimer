//#region 1st Timer
const PLAYBTN = document.getElementById('startTimerBtn');
const PAUSEBTN = document.getElementById('pauseTimerBtn');
const STOPBTN = document.getElementById('resetTimerBtn');

const TIMER_TOGGLE = document.getElementById('workOrRest');
//#endregion

//#region 2st Timer
const MINS_PROGRESS_BAR = document.querySelector('.hand.minutes');
const SECS_PROGRESS_BAR = document.querySelector('.hand.seconds');
const MINS_POINTER = document.getElementById('mins-pointer');
const SECS_POINTER = document.getElementById('secs-pointer');
const MINUTES_LENGTH = Math.PI * 2 * 110;
const SECONDS_LENGTH = Math.PI * 2 * 100;
const DISPLAY_OUTPUT = document.querySelector('.display-remain-time');
//#endregion

const DEFAULTS = {
  timer: undefined,
  typeOfTimer: 'work',
  workTime: 2,
  breakTime: 1
};

let intervalTimer;
let timeLeft;
let wholeTime; // manage this to set the whole time
let isPaused = false;
let isStarted = false;

let timerInterval = undefined;

let settings = {};

//#region 2nd Timer
function update(value) {
  let timeInitial;
  if (settings.typeOfTimer === 'work') {
    timeInitial = moment.duration(settings.workTime, 'minutes')
  } else {
    timeInitial = monent.duration(settings.breakTime, 'minutes')
  }
  const minsOffset = -MINUTES_LENGTH - (MINUTES_LENGTH * value) / timeInitial.asSeconds();
  const secsOffset = -SECONDS_LENGTH - (SECONDS_LENGTH * value) / timeInitial.asSeconds();
  MINS_PROGRESS_BAR.style.strokeDashoffset = minsOffset;
  SECS_PROGRESS_BAR.style.strokeDashoffset = secsOffset;
  console.log(value)
  console.log(timeInitial.asSeconds())
  console.log((360 * value) / timeInitial);
  MINS_POINTER.style.transform = `rotate(${360 * value / timeInitial.asSeconds()}deg)`;
  SECS_POINTER.style.transform = `rotate(${360 * value / timeInitial.asSeconds()}deg)`;
}

function runTimer(seconds) {
  displayTimeLeft(seconds);

  intervalTimer = setInterval(function () {
    settings.timer.subtract(1000, 'ms');
    timeLeft = settings.timer.asSeconds();
    if (timeLeft < 0) {
      clearInterval(intervalTimer);
      isStarted = false;
      displayTimeLeft(wholeTime);
      return;
    }
    displayTimeLeft(timeLeft);
  }, 1000);
}
function displayTimeLeft(timeLeft) {
  const displayString = `${
    settings.timer.minutes() > 0 ? settings.timer.minutes() + ' : ' : ''
    }
  ${
    settings.timer.seconds() < 10
      ? '0' + settings.timer.seconds()
      : settings.timer.seconds()
    }`;
  DISPLAY_OUTPUT.textContent = displayString;
  update(timeLeft);
}
//need to set up functionality of stop btn
export function resetTimer(event) {
  let minutes;

  if (isStarted === true) {
    clearInterval(intervalTimer);
    isPaused = false;
    isStarted = false;
    if (settings.typeOfTimer === 'work') {
      minutes = settings.workTime;
    } else {
      minutes = settings.breakTime;
    }
    settings.timer = moment.duration(minutes, 'minutes');
    PLAYBTN.disabled = false;
    PAUSEBTN.disabled = true;
    STOPBTN.disabled = true;
    displayTimeLeft(wholeTime);
  }
}

export function playTimer(event) {
  if (isStarted === false) {
    runTimer(wholeTime);
    isStarted = true;
    PLAYBTN.disabled = true;
    PAUSEBTN.disabled = false;
    STOPBTN.disabled = false;
  } else if (isPaused === true) {
    runTimer(timeLeft);
    isPaused = false;
    PLAYBTN.disabled = true;
    PAUSEBTN.disabled = false;
    STOPBTN.disabled = false;
  }
}
//add saving time to task
export function pauseTimer(event) {
  if (isStarted === true) {
    clearInterval(intervalTimer);
    isPaused = true;
    PLAYBTN.disabled = false;
    PAUSEBTN.disabled = true;
    STOPBTN.disabled = true;
  }
}

export function initTimer(options = {}) {
  let minutes;
  settings = Object.assign(DEFAULTS, options);
  if (settings.typeOfTimer === 'work') {
    minutes = settings.workTime;
  } else {
    minutes = settings.breakTime;
  }
  settings.timer = moment.duration(minutes, 'minutes');
  MINS_PROGRESS_BAR.style.strokeDasharray = MINUTES_LENGTH;
  SECS_PROGRESS_BAR.style.strokeDasharray = SECONDS_LENGTH;
  wholeTime = settings.timer.asSeconds();

  displayTimeLeft(wholeTime);

  PAUSEBTN.addEventListener('click', pauseTimer);
  PLAYBTN.addEventListener('click', playTimer);
  STOPBTN.addEventListener('click', resetTimer)

}
//#endregion
