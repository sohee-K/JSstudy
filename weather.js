const tempArea = document.querySelector(".w-temp"),
    descArea = document.querySelector(".w-desc"),
    tempsArea = document.querySelector(".w-temps"),
    othersArea = document.querySelector(".w-others");

const key = "ba4223b1f0c4f7e2cff0dc9034b3f91e";

function drawIcon(id) {
    const skycons = new Skycons({"color": "white", "resizeClear": true});
    skycons.add("w-icon", Skycons.CLOUDY);

    const code = parseInt(id / 100);
    const time = new Date().getHours();

    switch(code) {
        case 2:
            skycons.set("w-icon", Skycons.WIND);
            break;
        case 3:
        case 5:
            skycons.set("w-icon", Skycons.RAIN);
            break;
        case 6:
            skycons.set("w-icon", Skycons.SNOW);
            break;
        case 7:
            skycons.set("w-icon", Skycons.FOG);
            break;
        case 8:
            switch(id) {
                case 800:
                    if (time >= 6 && time <= 17) skycons.set("w-icon", Skycons.CLEAR_DAY);
                    else skycons.set("w-icon", Skycons.CLEAR_NIGHT);
                    break;
                case 801:
                case 802:
                    if (time >= 6 && time <= 17) skycons.set("w-icon", Skycons.PARTLY_CLOUDY_DAY);
                    else skycons.set("w-icon", Skycons.PARTLY_CLOUDY_NIGHT);
                    break;
                case 803:
                case 804:
                    skycons.set("w-icon", Skycons.CLOUDY);
                    break;
            }
            break;
        default:
            skycons.set("w-icon", Skycons.SLEET);
            break;       
    }
    skycons.play();
}

function drawWeather(weather) {
    drawIcon(weather.id);
    tempArea.innerHTML = `${weather.temp} °C`;
    descArea.innerHTML = `${weather.main}`;
    tempsArea.innerHTML = `<span>Feels:</span> ${weather.tempFeel} °C &nbsp;&nbsp;
        <span>Min:</span> ${weather.tempMin} °C &nbsp;&nbsp;
        <span>Max:</span> ${weather.tempMax} °C`;
    if (weather.rain) {
        othersArea.innerHTML = `<span>Humidity:</span> ${weather.hum} % &nbsp;&nbsp;
        <span>Rain:</span> ${weather.rain} mm/h &nbsp;&nbsp;
        <span>Wind:</span> ${weather.wind} m/s`;
    } else {
        othersArea.innerHTML = `<span>Humidity:</span> ${weather.hum} % &nbsp;&nbsp;
        <span>Wind:</span> ${weather.wind} m/s`;
    }
}

async function getData(lat, lon) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
    const weatherData = await data.json();

    const temp = (weatherData.main.temp - 273.15).toFixed(2),
        tempFeel = (weatherData.main.feels_like - 273.15).toFixed(2),
        tempMin = (weatherData.main.temp_min - 273.15).toFixed(2),
        tempMax = (weatherData.main.temp_max - 273.15).toFixed(2),
        hum = weatherData.main.humidity,
        main = weatherData.weather[0].main,
        wind = weatherData.wind.speed,
        id = weatherData.weather[0].id,
        rain = weatherData.rain ? weatherData.rain["1h"] : null;

    const weather = {temp, tempFeel, tempMin, tempMax, hum, main, rain, wind, id};
    drawWeather(weather);
}

function handleError() {
    console.log("Failed to get current position");
}

function handleSuccess(position) {
    const {latitude, longitude} = position.coords;
    console.log(latitude, longitude);
    getData(latitude, longitude);
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function init() {
    getLocation();
}

init();