const searchInput = document.getElementById("search-input");
const weatherContent = document.querySelector(".card .content");

addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    findWeather();
  }
});

function findWeather() {
  const APIKey = "f56f0263d24a167071cceeea4964c3fe";
  const location = document.getElementById("search-input").value;

  if (location == "") {
    // weatherContent.style.minHeight = "0";
    weatherContent.style.height = "0";
    weatherContent.style.margin = "0";
    return;
  }

  // fetch api
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`)
    .then((response) => response.json())
    .then((json) => {
      const temperature = document.querySelector(".temperature");
      const description = document.querySelector(".description");
      const image = document.querySelector(".weather-img");

      weatherContent.style.height = "320px";
      weatherContent.style.margin = "2rem 0 0.5rem";

      // success
      if (json.cod == 200) {
        image.src = "img/" + json.weather[0].main + ".png";
        temperature.innerHTML = json.main.temp + "<sup> °C</sup>";
        description.innerHTML = json.weather[0].description;
      }
      // error
      else if (json.cod == 404) {
        // console.log("error");
        image.src = "img/notFound.png";
        temperature.innerHTML = "Location Not Found!";
        description.innerHTML = "Try Again";
      }
    });
}
