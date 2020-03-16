/**
 * This file is where global set up is done.
 * Anything that should exist and needs set up on all pages should be handled here.
 */

import { dom } from '@fortawesome/fontawesome-svg-core';
import 'foundation-sites';

import './configs/fontawesome';
import { initHeader } from './components/header';
import { initSettingsForm } from './components/settings';

import '../scss/main.scss';

function initGlobals(event) {
  dom.watch();
  initHeader();
  initSettingsForm();
  $(document).foundation();
  console.info('Globals Loaded');
}

document.addEventListener('DOMContentLoaded', initGlobals);
