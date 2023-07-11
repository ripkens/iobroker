const targetTemperature = 22; // Zieltemperatur in Grad Celsius
const acStateId = 'tuya.0.41742628c45bbee74fac.1'; // ID des Klimaanlagen-Zustands

// Funktion zum Steuern der Klimaanlage
function controlAirConditioner(targetTemp, acState) {
    if (acState === 'off') {
        // Klimaanlage einschalten
        setState(acStateId, true);
    } else {
        // Aktuelle Raumtemperatur abrufen
        const currentTemp = getState('tuya.0.41742628c45bbee74fac.3').val;

        if (currentTemp > targetTemp) {
            // Klimaanlage ausschalten, wenn Raum zu kalt ist
            setState(acStateId, false);
        } else if (currentTemp < targetTemp) {
            // Klimaanlage einschalten, wenn Raum zu warm ist
            setState(acStateId, true);
        }
    }
}

// Ereignis bei Änderung der Raumtemperatur
on({ id: 'tuya.0.41742628c45bbee74fac.3', change: 'ne' }, function (obj) {
    controlAirConditioner(targetTemperature, getState(acStateId).val);
});

// Ereignis beim Start des Skripts
on({ id: acStateId, change: 'ne' }, function (obj) {
    controlAirConditioner(targetTemperature, obj.state.val);
});
