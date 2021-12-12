var key = "e444f8e33f88e1a3c67ce417f2ab0ca2";
var weatherForecast = document.getElementById("forecast");
var currentEvent = document.getElementById("currentEvent");

//Retreiving Weather function
function getWeatherApi() {

    //Retreiving city from clicking button
    document.getElementById("city-btn").onclick = function(city) {
    var city = document.getElementById("city").value; 
    console.log("This is " + city);


        

        
    // Current Forecast
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;
    
    console.log("API Link: " + requestURL)  
    
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then (function(data){

                // Console Logging for testing
                console.log("Current Temp " + data.main.temp + "°F" );
                console.log("Feels Like " +data.main.feels_like + "°F");
                console.log("High Temp " + data.main.temp_max + "°F");
                console.log("Low Temp " + data.main.temp_min + "°F");
                console.log ("Wind Speed " +data.wind.speed + " MPH")
                console.log ("dt " + data.dt);
            
                

                //Date info
                var dateResponse = (data.dt);
                var date = new Date(0);
                date.setUTCSeconds(dateResponse);
                var d = date;
                console.log("date " +d);
                var dOutput = d.getFullYear();
                console.log(" date updated" +dOutput);
                var monthOutput = d.getMonth()+1;
                console.log(monthOutput);
                var dayOutput = d.getDate();
                console.log(dayOutput);


                
    //             //Creating the elements for display

            var currentDate = document.createElement('h2');
                currentDate.textContent= monthOutput + "/" + dayOutput + "/" + dOutput;

            var currentTemp = document.createElement('h3');
            currentTemp.textContent = parseInt(data.main.temp)+ "° F" ;

            var feelsLike = document.createElement('h4');
            feelsLike.textContent="Feels Like " + parseInt(data.main.feels_like) + "° F";

            var highTemp = document.createElement('p');
            highTemp.textContent="H: " + parseInt(data.main.temp_max) + "° F";

            var lowTemp = document.createElement('p');
            lowTemp.textContent="L: " + parseInt(data.main.temp_min) + "° F";

            var windSpeed = document.createElement('p');
            windSpeed.textContent="Wind: " + parseInt(data.wind.speed)  + " MPH";

                //var icons = document.createElement("img")
                var conditions = data.weather[0].description;
                console.log("Conditions: " + conditions)

                var lat = (data.coord.lat);
                var lon = (data.coord.lon);
                
                console.log(lat);
                console.log(lon);



            gameForecast.appendChild(currentDate);
            gameForecast.appendChild(currentTemp);
            gameForecast.appendChild(feelsLike);
            gameForecast.appendChild(windSpeed);
            gameForecast.appendChild(highTemp);
            gameForecast.appendChild(lowTemp);

        
        var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=" + key;
        
        fetch(forecastURL)
        .then(function (response) {
            return response.json();
            
        })
        .then(function(response){
            console.log( "dt" + response.daily[0].dt);

            for (var i=1; i<8 ;i++){
            var futureDateResponse = (response.daily[i].dt);
            var fd = new Date(i);
            fd.setUTCSeconds(futureDateResponse);


            var fiveDay = document.createElement("h1");
            fiveDay.textContent = fd;

                weatherForecast.appendChild(fiveDay);

                console.log(fd);
            }

        })
        });
    }
}


getWeatherApi();