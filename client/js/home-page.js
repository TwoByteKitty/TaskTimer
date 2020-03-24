/**
 * This file is where home-page set up is done.
 * Anything that should exist and needs set up on the home page should be handled here.
 */
import { initTimer, updateTimerSettings } from './components/timer';
import { initTaskList } from './components/task';

function initPage(event) {
  //Need to get user setting and pass to initTimer
  let settings = {};
  //use ajax to get and then assign settings
  initTimer(settings);
  initTaskList();
  console.info('Page Loaded');
  //Need to setup a listener for the custom event from settings update and call updateTimerSettings with the new settings from event.
}

document.addEventListener('DOMContentLoaded', initPage);
