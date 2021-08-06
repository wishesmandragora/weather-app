const api = {
    key: '10c9d20a16e2fb70d303e79430aa9a66',
    baseUrl: 'https://api.openweathermap.org/data/2.5/'
}
window.addEventListener('load', showFromBrowser)

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if(event.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value)
    }
}
function showFromBrowser() {
    let long;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position.coords.latitude)
            fetch(`${api.baseUrl}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${api.key}`).then(weather=> {
                return weather.json();
            }).then(displayResults)
        })
    } else {
        document.querySelector('h1').textContent = 'Type your desired location in the search bar above!'
    }
}
function getResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather=> {
        return weather.json();
    }).then(displayResults)
}

function displayResults(weather) {
    console.log(weather)
    let city = document.querySelector('.city h1');
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let temperature = document.querySelector('.temp .num');
    temperature.innerText = `${Math.round(weather.main.temp)}°C`


    let weatherDescription = document.querySelector('.current .weather');
    weatherDescription.innerText = `${weather.weather[0].description}`

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);


    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}


function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}, ${month} ${year}`;
}


