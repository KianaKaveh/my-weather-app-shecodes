function showCurrentDate(latestDate) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let day = days[latestDate.getDay()];
  let month = months[latestDate.getMonth()];
  let date = latestDate.getDate();
  let year = latestDate.getFullYear();
  let hours = latestDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = latestDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dateToday = document.querySelector("#current-date-time");
  dateToday.innerHTML = `${day}, ${date} ${month} ${year}<br />${hours}:${minutes}`;
  return dateToday;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index > 0 && index < 7) {
  forecastHTML = forecastHTML + `
                    <div class="col-2">
                <div style="min-height: 0px">
                  <div
                    class="collapse collapse-horizontal"
                    id="weatherForecast"
                  >
                    <div class="card card-body text-center weather-forecast-box" style="width: 100%" id="forecast">
                      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                      <div class="weather-icon">
                      ${forecastWeatherIcon(forecastDay.weather[0].description)}
                      </div>
                      <div class="weather-forecast-temperature">
                        <span class="weather-forecast-temperature-max"
                          >${Math.round(forecastDay.temp.max)}°/</span
                        >
                        <span class="weather-forecast-temperature-min"
                          >${Math.round(forecastDay.temp.min)}°</span
                        >
                      </div>
                      <div>
                        <br />
                        <i class="bi bi-umbrella"></i>
                        <span style="font-size: 14px">${(forecastDay.pop) * 100}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
    };
    document.querySelector("#rain-probability").innerHTML = ((forecastDay.pop) * 100);
  });
  forecastHTML = forecastHTML + `</div>`;                    
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let units = "metric";
  let apiKey = "82a7c76c4a898d9f4cee978bafdd1b60";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}`;
  let apiUrl = `${apiEndpoint}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
//Refactored code:
celsiusTemperature = response.data.main.temp;
celsiusTemperatureMax = response.data.main.temp_max;
celsiusTemperatureMin = response.data.main.temp_min;
celsiusTempPerception = response.data.main.feels_like;
windSpeedConversion = response.data.wind.speed;
document.querySelector("h2").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = `${Math.round(celsiusTemperature)}°`;
document.querySelector("#perception").innerHTML = `Feels like ${Math.round(celsiusTempPerception)}°`;
document.querySelector("#max-temp").innerHTML = `${Math.round(celsiusTemperatureMax)}°`;
document.querySelector("#min-temp").innerHTML = `${Math.round(celsiusTemperatureMin)}°`;
document.querySelector("#humidity-value").innerHTML = response.data.main.humidity;
document.querySelector("#wind-speed").innerHTML = `${Math.round(windSpeedConversion)} km/h`;
document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
document.querySelector("#current-weather-icon").setAttribute("alt", response.data.weather[0].description);
document.querySelector("#current-weather-icon").setAttribute("src", changeWeatherIcon(response.data.weather[0].description));
getForecast(response.data.coord);
//Detailed code:
//let city = response.data.name;
//let temperature = Math.round(response.data.main.temp);
//let temperatureFeelsLike = Math.round(response.data.main.feels_like);
//let temperatureMax = Math.round(response.data.main.temp_max);
//let temperatureMin = Math.round(response.data.main.temp_min);
//let humidityElement = Math.round(response.data.main.humidity);
//let windElement = Math.round(response.data.wind.speed);
//let weatherSentence = response.data.weather[0].description;
//let cityName = document.querySelector("h2");
//let temperatureCity = document.querySelector("#temperature");
//let temperaturePerception = document.querySelector("#perception");
//let maximumTemp = document.querySelector("#max-temp");
//let minimumTemp = document.querySelector("#min-temp");
//let humidity = document.querySelector("#humidity-value");
//let windSpeed = document.querySelector("#wind-speed");
//let weatherDescription = document.querySelector("#weather-description");
//let weatherIcon = document.querySelector("#current-weather-icon");
//cityName.innerHTML = city;
//temperatureCity.innerHTML = `${temperature}°`;
//temperaturePerception.innerHTML = `Feels like ${temperatureFeelsLike}°`;
//maximumTemp.innerHTML = `${temperatureMax}°`;
//minimumTemp.innerHTML = `${temperatureMin}°`;
//humidity.innerHTML = `${humidityElement}%`;
//windSpeed.innerHTML = `${windElement} km/h`;
//weatherDescription.innerHTML = weatherSentence;
//weatherIcon.setAttribute("alt", response.data.weather[0].description);
//weatherIcon.setAttribute("src", changeWeatherIcon(response.data.weather[0].description));
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "82a7c76c4a898d9f4cee978bafdd1b60";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
  let apiUrl = `${apiEndpoint}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  //let cityName = document.querySelector("#city-input");
  //let city = `${cityName.value}`;
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "82a7c76c4a898d9f4cee978bafdd1b60";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`;
  let apiUrl = `${apiEndpoint}&appid=${apiKey}&units=${units}`;
   axios.get(apiUrl).then(showWeather);
}

function getGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function changeWeatherIcon(iconChange) {
  let icon = "";
  if (iconChange === "clear sky") {
    icon = "images/sun.gif";
  } else if (iconChange === "few clouds" || iconChange === "scattered clouds" || iconChange === "broken clouds") {
    icon = "images/few clouds.gif";
  } else if (iconChange === "overcast clouds") {
  icon = "images/overcast clouds.gif";
  } else if (iconChange === "rain" || iconChange === "moderate rain") {
    icon = "images/rain.gif";
  } else if (iconChange === "heavy rain" || iconChange === "heavy intensity rain" || iconChange === "very heavy rain" || iconChange === "extreme rain" || iconChange === "heavy intensity shower rain") {
    icon = "images/heavy rain.gif";
  } else if (iconChange === "light rain" || iconChange === "light intensity shower rain") {
    icon = "images/light rain.gif";
  } else if (iconChange === "freezing rain") {
    icon = "images/freezing rain.gif";
  } else if (iconChange === "shower rain" || iconChange === "ragged shower rain") {
    icon = "images/shower rain.gif";
  } else if (iconChange === "thunderstorm" || iconChange === "light thunderstorm" || iconChange === "ragged thunderstorm" || iconChange === "thunderstorm with light rain") {
    icon = "images/thunderstorm.gif";
  } else if (iconChange === "thunderstorm with heavy rain" || iconChange === "heavy thunderstorm" || iconChange === "thunderstorm with rain") {
    icon = "images/heavy thunderstorm.gif";
  } else if (iconChange === "thunderstorm with light drizzle" || iconChange === "thunderstorm with drizzle" || iconChange === "thunderstorm with heavy drizzle") {
    icon = "images/thunderstorm drizzle.gif";
  } else if (iconChange === "snow" || iconChange === "light snow" || iconChange === "light rain and snow" || iconChange === "rain and snow") {
    icon = "images/snow.gif";
  } else if (iconChange === "shower snow" || iconChange === "ight shower sleet" || iconChange === "light shower snow") {
    icon = "images/light snow.gif";
  } else if (iconChange === "heavy snow" || iconChange === "sleet" || iconChange === "shower sleet" || iconChange === "heavy shower snow") {
    icon = "images/heavy snow.gif";
  } else if (iconChange === "drizzle" || iconChange === "drizzle rain" || iconChange === "light intensity drizzle") {
    icon = "images/drizzle.gif";
  } else if (iconChange === "heavy intensity drizzle" || iconChange === "light intensity drizzle rain" || iconChange === "heavy intensity drizzle rain" || iconChange === "shower rain and drizzle" || iconChange === "heavy shower rain and drizzle" || iconChange === "shower drizzle") {
    icon = "images/more drizzle.gif";
  } else if (iconChange === "mist" || iconChange === "fog") {
    icon = "images/foggy.gif";
  }
  return icon;
}

function forecastWeatherIcon(forecastIcon) {
  let icon = "";
  if (forecastIcon === "clear sky") {
    icon = `<i class="bi bi-sun"></i>`;
  } else if (forecastIcon === "few clouds" || forecastIcon === "scattered clouds" || forecastIcon === "broken clouds") {
    icon = `<i class="bi bi-cloud-sun"></i>`;
  } else if (forecastIcon === "overcast clouds") {
    icon = `<i class="bi bi-clouds"></i>`;
  } else if (forecastIcon === "rain" || forecastIcon === "moderate rain") {
    icon = `<i class="bi bi-cloud-rain"></i>`;
  } else if (forecastIcon === "heavy rain" || forecastIcon === "heavy intensity rain" || forecastIcon === "very heavy rain" || forecastIcon === "extreme rain" || forecastIcon === "heavy intensity shower rain") {
    icon = `<i class="bi bi-cloud-rain-heavy"></i>`;
  } else if (forecastIcon === "light rain" || forecastIcon === "light intensity shower rain") {
    icon = `<i class="bi bi-cloud-drizzle"></i>`;
  } else if (forecastIcon === "freezing rain") {
    icon = `<i class="bi bi-cloud-hail"></i>`;
  } else if (forecastIcon === "shower rain" || forecastIcon === "ragged shower rain") {
    icon = `<i class="bi bi-cloud-rain-heavy"></i>`;
  } else if (forecastIcon === "thunderstorm" || forecastIcon === "light thunderstorm" || forecastIcon === "ragged thunderstorm" || forecastIcon === "thunderstorm with light rain") {
    icon = `<i class="bi bi-cloud-lightning"></i>`;
  } else if (forecastIcon === "thunderstorm with heavy rain" || forecastIcon === "heavy thunderstorm" || forecastIcon === "thunderstorm with rain") {
    icon = `<i class="bi bi-cloud-lightning-rain"></i>`;
  } else if (forecastIcon === "thunderstorm with light drizzle" || forecastIcon === "thunderstorm with drizzle" || forecastIcon === "thunderstorm with heavy drizzle") {
    icon = `<i class="bi bi-cloud-lightning-rain"></i>`;
  } else if (forecastIcon === "snow" || forecastIcon === "light snow" || forecastIcon === "light rain and snow" || forecastIcon === "rain and snow") {
    icon = `<i class="bi bi-cloud-snow"></i>`;
  } else if (forecastIcon === "shower snow" || forecastIcon === "ight shower sleet" || forecastIcon === "light shower snow") {
    icon = `<i class="bi bi-cloud-snow"></i>`;
  } else if (forecastIcon === "heavy snow" || forecastIcon === "sleet" || forecastIcon === "shower sleet" || forecastIcon === "heavy shower snow") {
    icon = `<i class="bi bi-cloud-sleet"></i>`;
  } else if (forecastIcon === "drizzle" || forecastIcon === "drizzle rain" || forecastIcon === "light intensity drizzle") {
    icon = `<i class="bi bi-cloud-drizzle"></i>`;
  } else if (forecastIcon === "heavy intensity drizzle" || forecastIcon === "light intensity drizzle rain" || forecastIcon === "heavy intensity drizzle rain" || forecastIcon === "shower rain and drizzle" || forecastIcon === "heavy shower rain and drizzle" || forecastIcon === "shower drizzle") {
    icon = `<i class="bi bi-cloud-drizzle"></i>`;
  } else if (forecastIcon === "mist" || forecastIcon === "fog") {
    icon = `<i class="bi bi-cloud-fog"></i>`;
  }
  return icon;
}

function showMiles() {
  let windElement = document.querySelector("#wind-speed");
  let windSpeed = Math.round((windSpeedConversion) / 1.609);
  windElement.innerHTML = `${windSpeed} mph`;
}

function showKilometers () {
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${Math.round(windSpeedConversion)} km/h`;
}

function showFahrenheit() {
  showMiles();
  let temperatureElement = document.querySelector("#temperature");
  let temperatureElementMax = document.querySelector("#max-temp");
  let temperatureElementMin = document.querySelector("#min-temp");
  let temperatureElementPerception = document.querySelector("#perception");
  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let fahrenheitTemperatureMax = Math.round((celsiusTemperatureMax * 9) / 5 + 32);
  let fahrenheitTempeartureMin = Math.round((celsiusTemperatureMin * 9) / 5 + 32);
  let fahrenheitTempPerception = Math.round((celsiusTempPerception * 9) / 5 + 32);
  temperatureElement.innerHTML = `${fahrenheitTemperature}°`;
  temperatureElementMax.innerHTML = `${fahrenheitTemperatureMax}°`;
  temperatureElementMin.innerHTML = `${fahrenheitTempeartureMin}°`;
  temperatureElementPerception.innerHTML = `Feels like ${fahrenheitTempPerception}°`;
}

function showCelsius() {
  showKilometers();
  let temperatureElement = document.querySelector("#temperature");
  let temperatureElementMax = document.querySelector("#max-temp");
  let temperatureElementMin = document.querySelector("#min-temp");
  let temperatureElementPerception = document.querySelector("#perception");
  fahrenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
  temperatureElementMax.innerHTML = `${Math.round(celsiusTemperatureMax)}°`;
  temperatureElementMin.innerHTML = `${Math.round(celsiusTemperatureMin)}°`;
  temperatureElementPerception.innerHTML = `Feels like ${Math.round(celsiusTempPerception)}°`;
}

function forecastBtn() {
  buttonForecast.classList.add("active");
}

let currentDate = new Date();
showCurrentDate(currentDate);

let enterCityForm = document.querySelector("#search-city");
enterCityForm.addEventListener("submit", showCity);

let currentLocationButton = document.querySelector("#location-icon");
currentLocationButton.addEventListener("click", getGeoLocation);

let celsiusTemperature = null;
let celsiusTemperatureMax = null;
let celsiusTemperatureMin = null;
let celsiusTempPerception = null;
let windSpeedConversion = null;

let fahrenheitButton = document.querySelector("#fahrenheit-temperature");
fahrenheitButton.addEventListener("click", showFahrenheit);

let celsiusButton = document.querySelector("#celsius-temperature");
celsiusButton.addEventListener("click", showCelsius);

let buttonForecast = document.querySelector("#forecastButton");
buttonForecast.addEventListener("click", forecastBtn);

searchCity("Munich");