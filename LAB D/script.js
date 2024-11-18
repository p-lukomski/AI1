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
        if (index % 8 === 0) {
            const forecast_data = data.list[index];

            const date = new Date(forecast_data.dt_txt);
            const formattedDate = date.toLocaleString('pl-PL', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const forecast_element = document.createElement("div");
            forecast_element.classList.add("forecast-item");

            const icon_code = forecast_data.weather[0].icon;
            const icon_url = `https://openweathermap.org/img/wn/${icon_code}@2x.png`;

            forecast_element.innerHTML = `
            <img src="${icon_url}" alt="${forecast_data.weather[0].description}">
            <div>
                <p>Data i godzina: ${formattedDate}</p>
                <p>Temperatura: ${forecast_data.main.temp}°C</p>
                <p>Opis: ${forecast_data.weather[0].description}</p>
            </div>
        `;
            
            forecast.appendChild(forecast_element);
        }
    }



}

