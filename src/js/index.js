import { dom } from '@fortawesome/fontawesome-svg-core'
import 'foundation-sites'

import './fontawesome';
import '../scss/main.scss';

document.addEventListener("DOMContentLoaded", function(){
    console.info('Loaded');
    dom.watch()
    $(document).foundation();
});