const SETTINGS_FORM = document.settings;
const SETTINGS_BTN = document.getElementById('saveSettingsBtn');



function saveSettings(event) {
    console.log(SETTINGS_FORM);
    const settingsData = new FormData(SETTINGS_FORM);
    $.post('/user/settings', settingsData).then((err, data) => {
        if (err) {
            console.log(err);
        } 
        console.log(data);
    });

};


export function initSettingsForm() {


    SETTINGS_BTN.addEventListener('click', saveSettings);
};