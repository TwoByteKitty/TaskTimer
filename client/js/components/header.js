function timer(timeEl) {
  setInterval(() => {
    let currentDateAndTime = moment().format('LLLL');
    timeEl.html(currentDateAndTime);
  }, 10000);
}

export function initHeader(user) {
  const dateAndTimeEl = $('#headDateTime');

  dateAndTimeEl.text(moment().format('LLLL'));
  timer(dateAndTimeEl);
}
