import {initTaskCreate} from "./components/task";

function initPage(event) {
  initTaskCreate();
  console.info('Page Loaded');
}

document.addEventListener('DOMContentLoaded', initPage);
