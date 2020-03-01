/**
 * This file is where home-page set up is done. 
 * Anything that should exist and needs set up on the home page should be handled here.
 */
import { initTimer } from './components/timer';

function initPage(event) {
    initTimer();
    console.info('Page Loaded');
  };

document.addEventListener('DOMContentLoaded', initPage);

