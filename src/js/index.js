import { dom } from '@fortawesome/fontawesome-svg-core';
import 'foundation-sites';

import './fontawesome';
import { startTimer } from './timer';
import '../scss/main.scss';

document.addEventListener('DOMContentLoaded', function() {
  console.info('Loaded');
  dom.watch();
  $(document).foundation();
  startTimer(1);
});
