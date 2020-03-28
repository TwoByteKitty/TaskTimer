const SETTINGS_FORM = document.settings;
const SETTINGS_BTN = document.getElementById('saveSettingsBtn');

function saveSettings(event) {
  const settingsData = $(SETTINGS_FORM).serialize();
  console.log(settingsData);
  $.post('/user/settings', settingsData).then((user) => {
    const updateSettings = new CustomEvent('settings.updated', { bubbles: true, detail: user.settings });
    //Show success message, use foundation hide

    //CloseDrawer need to look at foundation api

    //Dispatch event to timer
    SETTINGS_FORM.dispatchEvent(updateSettings);
  });
}

export function initSettingsForm() {
  SETTINGS_BTN.addEventListener('click', saveSettings);
}
