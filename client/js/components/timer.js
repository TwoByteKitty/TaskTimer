import { Reveal } from 'foundation-sites';
import { min } from 'moment';

const PLAYBTN = document.getElementById('startTimerBtn');
const PAUSEBTN = document.getElementById('pauseTimerBtn');
const STOPBTN = document.getElementById('resetTimerBtn');
const TIMER_TOGGLE = document.getElementById('workOrRest');

const MODAL_RESET_TIMER = document.getElementById('yesResetTimer');
const MODAL_NO_RESET_TIMER = document.getElementById('noResetTimer');

const MINS_PROGRESS_BAR = document.querySelector('.hand.minutes');
const SECS_PROGRESS_BAR = document.querySelector('.hand.seconds');
const DISPLAY_OUTPUT = document.querySelector('.display-remain-time');

const MINUTES_LENGTH = Math.PI * 2 * 110;
const SECONDS_LENGTH = Math.PI * 2 * 100;

const DEFAULTS = {
  timer: undefined,
  typeOfTimer: 'work',
  workTime: 30,
  breakTime: 5,
  volume: 50
};

let isPaused = false;
let isStarted = false;
let settings = {};

let intervalTimer;
let secondsInterval;
let timerModal;
let currrentTimerTotalTime;

//Called by displayTimeLeft
function updateSvg() {
  let timeInitial;
  if (settings.typeOfTimer === 'work') {
    timeInitial = moment.duration(currrentTimerTotalTime, 'minutes');
  } else {
    timeInitial = moment.duration(currrentTimerTotalTime, 'minutes');
  }
  const timeFraction = settings.timer.asSeconds() / timeInitial.asSeconds();
  const minsOffset = -MINUTES_LENGTH - MINUTES_LENGTH * timeFraction;
  MINS_PROGRESS_BAR.style.strokeDashoffset = minsOffset;
}

function displayTimeLeft() {
  let minAccumualtor = settings.timer.minutes();

  if (settings.timer.hours() > 0) {
    minAccumualtor += settings.timer.hours() * 60;
  }
  const minutesDisp = `${
    minAccumualtor < 10 ? '0' + minAccumualtor : minAccumualtor
  }`;
  const secondsDisp = `${
    settings.timer.seconds() < 10
      ? '0' + settings.timer.seconds()
      : settings.timer.seconds()
  }`;
  console.log('Log from displayTimeLeft', settings.timer.hours());
  console.log('Log from displayTimeLeft', minutesDisp);
  const displayString = `${minutesDisp}:${secondsDisp}`;
  DISPLAY_OUTPUT.textContent = displayString;
  updateSvg();
}

//Starts Timer Intervals
function runTimer() {
  let mSec = 1000;

  secondsInterval = setInterval(function() {
    const timeFraction = mSec / 1000;
    const secsOffset = SECONDS_LENGTH - SECONDS_LENGTH * timeFraction;
    SECS_PROGRESS_BAR.style.strokeDashoffset = secsOffset;
    mSec = mSec - 100;
  }, 100);

  intervalTimer = setInterval(function() {
    settings.timer.subtract(1000, 'ms');
    const timeLeft = settings.timer.asSeconds();
    if (timeLeft < 0) {
      clearInterval(intervalTimer);
      clearInterval(secondsInterval);
      SECS_PROGRESS_BAR.style.strokeDashoffset = 1000;
      isStarted = false;
    }
    displayTimeLeft();
  }, 1000);
}

//#region Event Handlers
function resetTimer(event, toggle) {
  let minutes;
  if (isStarted === true || toggle) {
    clearInterval(intervalTimer);
    clearInterval(secondsInterval);
    SECS_PROGRESS_BAR.style.strokeDashoffset = 0;
    isPaused = false;
    isStarted = false;
    if (settings.typeOfTimer === 'work') {
      minutes = settings.workTime;
    } else {
      minutes = settings.breakTime;
    }
    console.log('Log from reset', minutes);
    settings.timer = moment.duration(minutes, 'minutes');
    currrentTimerTotalTime = minutes;
    console.log('Log from reset', currrentTimerTotalTime);
    PLAYBTN.disabled = false;
    PAUSEBTN.disabled = true;
    STOPBTN.disabled = true;
    displayTimeLeft();
  }
}

function playTimer(event) {
  if (isStarted === false) {
    isStarted = true;
    PLAYBTN.disabled = true;
    PAUSEBTN.disabled = false;
    STOPBTN.disabled = false;
  } else if (isPaused === true) {
    isPaused = false;
    PLAYBTN.disabled = true;
    PAUSEBTN.disabled = false;
    STOPBTN.disabled = false;
  }
  runTimer();
}

//TODO: add saving time to task
function pauseTimer(event) {
  if (isStarted === true) {
    clearInterval(intervalTimer);
    clearInterval(secondsInterval);
    SECS_PROGRESS_BAR.style.strokeDashoffset = 0;
    isPaused = true;
    PLAYBTN.disabled = false;
    PAUSEBTN.disabled = true;
    STOPBTN.disabled = true;
  }
}

function toggleTimer(event) {
  if (TIMER_TOGGLE.checked === true) {
    settings.typeOfTimer = 'work';
  } else {
    settings.typeOfTimer = 'rest';
  }
  resetTimer(null, true);
}

export function updateTimerSettings(event) {
  console.log(event.detail);
  settings = Object.assign(settings, event.detail);
  console.log(settings);
  if (isStarted === true) {
    timerModal.open();
  } else {
    resetTimer(null, true);
  }
}
//#endregion

export function initTimer(options = {}) {
  let minutes;
  settings = Object.assign(DEFAULTS, options);
  if (settings.typeOfTimer === 'work') {
    minutes = settings.workTime;
  } else {
    minutes = settings.breakTime;
  }
  settings.timer = moment.duration(minutes, 'minutes');
  currrentTimerTotalTime = minutes;
  MINS_PROGRESS_BAR.style.strokeDasharray = MINUTES_LENGTH;
  SECS_PROGRESS_BAR.style.strokeDasharray = SECONDS_LENGTH;

  displayTimeLeft();

  timerModal = new Reveal($('#timerModal'));
  PAUSEBTN.addEventListener('click', pauseTimer);
  PLAYBTN.addEventListener('click', playTimer);
  STOPBTN.addEventListener('click', resetTimer);
  TIMER_TOGGLE.addEventListener('click', toggleTimer);

  MODAL_RESET_TIMER.addEventListener('click', event => {
    resetTimer(event);
    timerModal.close();
  });
  MODAL_NO_RESET_TIMER.addEventListener('click', event => {
    timerModal.close();
  });

  document.addEventListener('settings.updated', updateTimerSettings);
}
