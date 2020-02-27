
let userName;

function timer(timeEl) {
    setInterval(() => {
        let currentDateAndTime = moment().format('LLLL');
        timeEl.html(currentDateAndTime);
    }, 10000);
}

export function initHeader(user){
    let userGreeting = "";
    const greetingMsgEl = $("#greeting");
    const dateAndTimeEl = $("#headDateTime");

    if (user) {
        userGreeting = `Welcome, ${user.name}!`
    } else {
        userGreeting = "Welcome, New User!"
    };
    
    greetingMsgEl.text(userGreeting);
    dateAndTimeEl.text(moment().format('LLLL'));
    timer(dateAndTimeEl);
}