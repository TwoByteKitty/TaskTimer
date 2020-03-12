//#region 1st Timer
const PLAYBTN = document.getElementById('startTimerBtn');
const PAUSEBTN = document.getElementById('pauseTimerBtn');
const $TIMER_MINUTES = $('.timer-group .timer.minute .hand span');
const $TIMER_SECONDS = $('.timer-group .timer.second .hand span');
const $FACE = $('#timeDisplay');
const TIMER_TOGGLE = document.getElementById('workOrRest');
//#endregion

//#region 2st Timer
const MINS_PROGRESS_BAR = document.querySelector('.hand.minutes');
const SECS_PROGRESS_BAR = document.querySelector('.hand.seconds');
const indicator = document.getElementById('e-indicator');
const POINTER = document.getElementById('e-pointer');
const MINUTES_LENGTH = Math.PI * 2 * 110;
const SECONDS_LENGTH = Math.PI * 2 * 100;
const DISPLAY_OUTPUT = document.querySelector('.display-remain-time');
//const PAUSE_BTN = document.getElementById('pause');
const SETTER_BTNS = document.querySelectorAll('button[data-setter]');
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

//#region 1st Timer
function runTimer() {
  settings.timer.subtract(1000, 'ms');
  if (settings.timer.asMilliseconds() < 1) {
    clearInterval(timerInterval);
    $FACE.text(`Time's Up!!`);
    return;
  }
  $FACE.text(`${
    settings.timer.minutes() > 0 ? settings.timer.minutes() + ' : ' : ''
    }
    ${
    settings.timer.seconds() < 10
      ? '0' + settings.timer.seconds()
      : settings.timer.seconds()
    }`);
}
export function startTimer() {
  timerInterval = setInterval(runTimer, 1000);
  $TIMER_MINUTES.css({
    'animation-duration': `${settings.timer.asSeconds()}s`,
    'animation-play-state': 'running'
  });
  $TIMER_SECONDS.css({
    'animation-iteration-count': `${settings.timer.asSeconds()}`,
    'animation-duration': '1000ms',
    'animation-play-state': 'running'
  });
}
export function pauseTimer() {
  clearInterval(timerInterval);
  $TIMER_MINUTES.css({ 'animation-play-state': 'paused' });
  $TIMER_SECONDS.css({ 'animation-play-state': 'paused' });
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
  PLAYBTN.addEventListener('click', startTimer);
  PAUSEBTN.addEventListener('click', pauseTimer);
}
//#endregion

//#region 2nd Timer
function update(value, timeInitial) {
  if (settings.typeOfTimer === 'work') {
    timeInitial = moment.duration(settings.workTime, 'minutes')
  } else {
    timeInitial = monent.duration(settings.breakTime, 'minutes')
  }
  const minsOffset = -MINUTES_LENGTH - (MINUTES_LENGTH * value) / timeInitial.asSeconds();
  const secsOffset = -SECONDS_LENGTH - (SECONDS_LENGTH * value) / timeInitial;
  MINS_PROGRESS_BAR.style.strokeDashoffset = minsOffset;
  SECS_PROGRESS_BAR.style.strokeDashoffset = secsOffset;
  POINTER.style.transform = `rotate(${(360 * value) / timeInitial}deg)`;
}
function changeWholeTime(seconds) {
  if (wholeTime + seconds > 0) {
    wholeTime += seconds;
    update(wholeTime, wholeTime);
  }
}
function runTimer2(seconds) {
  //counts time, takes seconds
  let remainTime = Date.now() + seconds * 1000;
  displayTimeLeft(seconds);

  intervalTimer = setInterval(function () {
    //timeLeft = Math.round((remainTime - Date.now()) / 1000);
    settings.timer.subtract(1000, 'ms');
    timeLeft = settings.timer.asSeconds();
    if (timeLeft < 0) {
      clearInterval(intervalTimer);
      isStarted = false;
      SETTER_BTNS.forEach(function (btn) {
        btn.disabled = false;
        btn.style.opacity = 1;
      });
      displayTimeLeft(wholeTime);
      PAUSE_BTN.classList.remove('pause');
      PAUSE_BTN.classList.add('play');
      return;
    }
    displayTimeLeft(timeLeft);
  }, 1000);
}
function displayTimeLeft(timeLeft) {
  //displays time on the input
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
    }${seconds}`;

  const displayString2 = `${
    settings.timer.minutes() > 0 ? settings.timer.minutes() + ' : ' : ''
    }
  ${
    settings.timer.seconds() < 10
      ? '0' + settings.timer.seconds()
      : settings.timer.seconds()
    }`;
  DISPLAY_OUTPUT.textContent = displayString2;
  update(timeLeft, wholeTime);
}

export function playTimer(event) {
  if (isStarted === false) {
    runTimer2(wholeTime);
    isStarted = true;
  } else if (isPaused === true) {
    runTimer2(timeLeft);
    isPaused = false;
  } 
}

export function pauseTimer2(event) {
  if (isStarted === true) {
    clearInterval(intervalTimer);
    isPaused = true;
  } 
}

// export function pauseTimer2(event) {
//   if (isStarted === false) {
//     runTimer2(wholeTime);
//     isStarted = true;
//     this.classList.remove('play');
//     this.classList.add('pause');

//     SETTER_BTNS.forEach(function(btn) {
//       btn.disabled = true;
//       btn.style.opacity = 0.5;
//     });
//   } else if (isPaused) {
//     this.classList.remove('play');
//     this.classList.add('pause');
//     runTimer2(timeLeft);
//     isPaused = isPaused ? false : true;
//   } else {
//     this.classList.remove('pause');
//     this.classList.add('play');
//     clearInterval(intervalTimer);
//     isPaused = isPaused ? false : true;
//   }
// }
export function initTimer2(options = {}) {
  MINS_PROGRESS_BAR.style.strokeDasharray = MINUTES_LENGTH;
  SECS_PROGRESS_BAR.style.strokeDasharray = SECONDS_LENGTH;
  wholeTime = settings.timer.asSeconds();

  update(wholeTime, wholeTime); //refreshes progress bar
  displayTimeLeft(wholeTime);

  PAUSEBTN.addEventListener('click', pauseTimer2);

  PLAYBTN.addEventListener('click', playTimer);


  // PAUSE_BTN.addEventListener('click', pauseTimer2);
  // for (var i = 0; i < SETTER_BTNS.length; i++) {
  //   SETTER_BTNS[i].addEventListener('click', function(event) {
  //     var param = this.dataset.setter;
  //     switch (param) {
  //       case 'minutes-plus':
  //         changeWholeTime(1 * 60);
  //         break;
  //       case 'minutes-minus':
  //         changeWholeTime(-1 * 60);
  //         break;
  //       case 'seconds-plus':
  //         changeWholeTime(1);
  //         break;
  //       case 'seconds-minus':
  //         changeWholeTime(-1);
  //         break;
  //     }
  //     displayTimeLeft(wholeTime);
  //   });
  // }
}
//#endregion
