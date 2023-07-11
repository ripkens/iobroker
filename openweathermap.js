const request = require('request');

// Konfiguration
const apiKey = 'Ihr_OpenWeatherMap_API_Schlüssel';
const city = 'Ihre_Stadt';

// Funktion zum Abrufen der Wetterdaten
function getWeatherData(callback) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const weatherData = JSON.parse(body);
      callback(weatherData);
    } else {
      console.log('Fehler beim Abrufen der Wetterdaten:', error);
    }
  });
}

// Funktion zum Steuern der Markise basierend auf den Wetterdaten
function controlAwning(weatherData) {
  const weatherCondition = weatherData.weather[0].main;

  // Hier können Sie Ihre Logik zur Steuerung der Markise basierend auf den Wetterbedingungen implementieren
  // Zum Beispiel:
  if (weatherCondition === 'Rain') {
    console.log('Es regnet. Markise wird eingefahren.');
    // Code zum Einfahren der Markise
  } else if (weatherCondition === 'Sunny') {
    console.log('Sonnig. Markise wird ausgefahren.');
    // Code zum Ausfahren der Markise
  } else {
    console.log('Keine spezifische Aktion für diese Wetterbedingungen.');
  }
}

// Hauptprogramm
getWeatherData(controlAwning);
