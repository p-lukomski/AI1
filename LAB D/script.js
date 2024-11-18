let weather_button = document.getElementById('weather-button');
weather_button.addEventListener('click', function () {
    const city = document.getElementById('city-input').value;

    if(city) {
        fetchCurrentWeather(city);
        fetchForecast(city);
    } else {
        alert("Podaj nazwę miasta.");
    }
});

function fetchCurrentWeather(city) {
    const api_key = '87dd8ba528bbf7b9a25e79f6c78186dc';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric&lang=pl`;

    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();

    req.onload = function () {
        if (req.status === 200) {
            const data = JSON.parse(req.responseText);
            const icon_code = data.weather[0].icon;
            const icon_url = `https://openweathermap.org/img/wn/${icon_code}@2x.png`;
            console.log(data);
            const current_weather = document.getElementById('current-weather');

            const forecast_element = document.createElement('div');
            forecast_element.classList.add('forecast-item');

            current_weather.innerHTML = `
            <h3>Obecna Pogoda w ${data.name}</h3>
            <div class="forecast-item">
                <img src="${icon_url}" alt="${data.weather[0].description}">
                <div>
                    <p>Temperatura: ${data.main.temp}°C</p>
                    <p>Wilgotność: ${data.main.humidity}%</p>
                    <p>Opis: ${data.weather[0].description}</p>
                </div>
            </div>`;
        } else {

            alert("Błąd: nie udało się pobrać danych pogodowych.");
        }
    };
}

function fetchForecast(city) {
    const api_key = '87dd8ba528bbf7b9a25e79f6c78186dc';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric&lang=pl`;

    fetch(url).then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Nie udało się pobrać prognozy pogody.")
        }
    }).then(data => displayForecast(data)).catch(error => alert(error.message));
}

function displayForecast(data) {
    console.log(data);
    const forecast = document.getElementById("forecast-weather");

    forecast.innerHTML = "<h3>Prognoza 5-dniowa:</h3>";

    for (let index = 0; index < data.list.length; index++) {
        // Only process every 8th entry
        if (index % 8 === 0) {
            const forecast_data = data.list[index]; // Access current element

            // Format the date and time to the Polish locale
            const date = new Date(forecast_data.dt_txt); // Parse the date string
            const formattedDate = date.toLocaleString('pl-PL', {
                weekday: 'long',  // Full weekday name
                day: 'numeric',   // Day of the month
                month: 'long',    // Full month name
                year: 'numeric',  // Full year
                hour: '2-digit',  // Hours (2-digit format)
                minute: '2-digit' // Minutes (2-digit format)
            });

            // Create the forecast element
            const forecast_element = document.createElement("div");
            forecast_element.classList.add("forecast-item");

            const icon_code = forecast_data.weather[0].icon;
            const icon_url = `https://openweathermap.org/img/wn/${icon_code}@2x.png`;

            // Add content to the forecast element
            forecast_element.innerHTML = `
            <img src="${icon_url}" alt="${forecast_data.weather[0].description}">
            <div>
                <p>Data i godzina: ${formattedDate}</p>
                <p>Temperatura: ${forecast_data.main.temp}°C</p>
                <p>Opis: ${forecast_data.weather[0].description}</p>
            </div>
        `;

            // Append the forecast item to the container
            forecast.appendChild(forecast_element);
        }
    }



}

