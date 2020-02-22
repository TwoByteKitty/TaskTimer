const DEFAULTS = {};
const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const START_DATE = new Date();
const TIMER_MINUTES = $('.timer-group .timer.minute .hand span');
const TIMER_SECONDS = $('.timer-group .timer.second .hand span');
const $FACE = $('#lazy');

let timer;
let timerInterval;

function runTimer() {
  timer.subtract(1, 's');
  if (timer.seconds() < 1) {
    clearInterval(timerInterval);
    $FACE.text(`Time's Up!!`);
    return;
  }
  $FACE.text(`${timer.minutes() > 0 ?  timer.minutes() +  ' : ' : ''}
    ${timer.seconds() < 10 ? '0' + timer.seconds() : timer.seconds()}`);
}

function tick(){
  const NOW = new Date();
  const ELAPSED = NOW - START_DATE;
  const PARTS = [];

  PARTS[0] = '' + Math.floor(ELAPSED / ONE_HOUR);
  PARTS[1] = '' + Math.floor((ELAPSED % ONE_HOUR) / ONE_MINUTE);
  PARTS[2] = '' + Math.floor(((ELAPSED % ONE_HOUR) % ONE_MINUTE) / ONE_SECOND);

  PARTS[0] = PARTS[0].length == 1 ? '0' + PARTS[0] : PARTS[0];
  PARTS[1] = PARTS[1].length == 1 ? '0' + PARTS[1] : PARTS[1];
  PARTS[2] = PARTS[2].length == 1 ? '0' + PARTS[2] : PARTS[2];
  $FACE.text(PARTS.join(':'));
  window.requestAnimationFrame(tick);
}

export function startTimer(minutes) {
  if (!timer) {
    timer = moment.duration(minutes, 'minutes');
  }
  TIMER_MINUTES.css({ 'animation-duration': `${timer.asSeconds()}s` });
  TIMER_SECONDS.css({ 'animation-iteration-count': `${timer.asSeconds()}`, 'animation-duration': '1s' });
  timerInterval = setInterval(runTimer, 1000);
}

export function stopTimer() {
  clearInterval(timerInterval);
}
