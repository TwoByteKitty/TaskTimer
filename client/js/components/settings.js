const SETTINGS_FORM = document.settings;
const SETTINGS_BTN = document.getElementById('saveSettingsBtn');



function saveSettings(event) {
    console.log(SETTINGS_FORM);
    const settingsData = $(SETTINGS_FORM).serialize();
    console.log(settingsData);
    $.post('/user/settings', settingsData).then((err, user) => {
        if (err) {
            console.log(err);
        } 
        console.log(user);
    });

};


export function initSettingsForm() {


    SETTINGS_BTN.addEventListener('click', saveSettings);
};