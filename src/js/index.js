import { dom } from '@fortawesome/fontawesome-svg-core';
import 'foundation-sites';

import './fontawesome';
import { startTimer, stopTimer } from './timer';

import '../scss/main.scss';



function handlePlay(event) {
    console.log(event);
    startTimer(2, 'work');
};
const playBtn = document.getElementById("startTimerBtn");
playBtn.addEventListener("click", handlePlay);

function handlePause(event) {
    stopTimer();
};
const pauseBtn = document.getElementById("pauseTimerBtn");
pauseBtn.addEventListener("click", handlePause)

 

function initPg(event) {
    console.log(event);
    console.info('Loaded');
    dom.watch();
    $(document).foundation();
  //  startTimer(1);
  };


document.addEventListener('DOMContentLoaded', initPg);

