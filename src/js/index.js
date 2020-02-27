import { dom } from '@fortawesome/fontawesome-svg-core';
import 'foundation-sites';

import './fontawesome';
import { initTimer } from './timer';
import { initHeader } from './header';

import '../scss/main.scss';




 

function initPg(event) {
    console.log(event);
    console.info('Loaded');
    dom.watch();
    initHeader();
    initTimer();
    $(document).foundation();
  };


document.addEventListener('DOMContentLoaded', initPg);

