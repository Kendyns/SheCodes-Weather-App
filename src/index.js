// Current Date
let now = new Date();
console.log(now);

// Day of Week
let daily = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let newToday = daily[now.getDay()];

// Change Days

let today = document.querySelector(".today");
today.innerHTML = newToday;

//next 5 Days
for (let i = 1; i < 6; i++) {
  let dayOfW = now.getDay() + i;
  let dayNumber = ".day" + String(i);
  let currentDay = document.querySelector(dayNumber);
  currentDay.innerHTML = daily[dayOfW];
}
// Change Time
function correctMinutes(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
let hour = document.querySelector(".hour");
let minute = document.querySelector(".minutes");
let pm = document.querySelector(".afternoon");
let largeTime = now.getHours();
let afternoon = "am";
if (largeTime > 11) {
  afternoon = "pm";
}
if (largeTime > 12) {
  largeTime = largeTime - 12;
}
hour.innerHTML = largeTime;
let minutes = now.getMinutes();
minute.innerHTML = correctMinutes(minutes);
pm.innerHTML = afternoon;

// Change to Fahrenheit
function toFar() {
  let temper0 = document.querySelector(".temp0");
  temper0.innerHTML = 64 + "°F";
  let temper1 = document.querySelector(".temp1");
  temper1.innerHTML = 59 + "°F";
  let temper2 = document.querySelector(".temp2");
  temper2.innerHTML = 81 + "°F";
  let temper3 = document.querySelector(".temp3");
  temper3.innerHTML = 68 + "°F";
  let temper4 = document.querySelector(".temp4");
  temper4.innerHTML = 66 + "°F";
  let temper5 = document.querySelector(".temp5");
  temper5.innerHTML = 59 + "°F";
}
// Change to Celcius
function toCel() {
  let temper0 = document.querySelector(".temp0");
  temper0.innerHTML = 18 + "°C";
  let temper1 = document.querySelector(".temp1");
  temper1.innerHTML = 15 + "°C";
  let temper2 = document.querySelector(".temp2");
  temper2.innerHTML = 27 + "°C";
  let temper3 = document.querySelector(".temp3");
  temper3.innerHTML = 20 + "°C";
  let temper4 = document.querySelector(".temp4");
  temper4.innerHTML = 19 + "°C";
  let temper5 = document.querySelector(".temp5");
  temper5.innerHTML = 15 + "°C";
}
let changeToF = document.querySelector(".far");
changeToF.addEventListener("click", toFar);
let changetoC = document.querySelector(".cel");
changetoC.addEventListener("click", toCel);

//Change Weather
function changeWeather(name, temp, humid, conditions, windS) {
  temp = Math.round(temp);
  windS = Math.round(windS);
  let place = document.querySelector(".city");
  place.innerHTML = name;
  let todayTemp = document.querySelector(".curr0");
  todayTemp.innerHTML = temp;
  let currentHum = document.querySelector(".humidity");
  currentHum.innerHTML = humid;
  let outside = document.querySelector(".condition");
  outside.innerHTML = conditions;
  let currentWind = document.querySelector(".wind");
  currentWind.innerHTML = windS;
}
function currentWeather(response) {
  let cityName = response.data.name;
  let temp0 = response.data.main.temp;
  let humid = response.data.main.humidity;
  let outsideView = response.data.weather[0].description;
  let windSpeed = response.data.wind.speed;
  changeWeather(cityName, temp0, humid, outsideView, windSpeed);
}

function weatherLookup(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
}
function yourCity() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let yourCurrentCity = document.querySelector("#your-city");
yourCurrentCity.addEventListener("click", yourCity);
//navigator.geolocation.getCurrentPosition(showPosition);

// Change City
function findCity(event) {
  event.preventDefault();
  let input = document.querySelector("#location-input");
  let newPlace = document.querySelector(".city");
  let citySearch = input.value;
  newPlace.innerHTML = citySearch;
  input.value = "";
  weatherLookup(citySearch);
}
let apiKey = "2101a412798b548bf7cc6d35c64d3994";
let locationPlace = document.querySelector("#location-search");
locationPlace.addEventListener("submit", findCity);
let placeLocation = document.querySelector("#location-input");
placeLocation.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    findCity(event);
  }
});
// Things to do

// Make the default your location when you go on to page
// Capitalize WEather Condition First Letter
// Update Date/Time for city Time zone
// Cel and farienheight temp change
// muliday forecasting
//main icon change
// forecasting icon cahnge
// Buttons go grey after clicking - make that go away
// Javascript for weather saying
// descritpion - make left justified
