/**
 * This file is where home-page set up is done.
 * Anything that should exist and needs set up on the home page should be handled here.
 */
import { initTimer, initTimer2 } from './components/timer';
import { initTaskList } from './components/task';

function initPage(event) {
  initTimer();
  initTimer2();
  initTaskList();
  console.info('Page Loaded');
}

document.addEventListener('DOMContentLoaded', initPage);