var key = "e444f8e33f88e1a3c67ce417f2ab0ca2";
var dayForecast = document.getElementById("forecast");
var weatherForecast = document.getElementById("fiveDay");

//Retreiving Weather function
function getWeatherApi() {

    //Retreiving city from clicking button
    document.getElementById("city-btn").onclick = function(city) {
    var city = document.getElementById("city").value; 
    // console.log("This is " + city);


    // Current Forecast
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;
    
    // console.log("API Link: " + requestURL)  
    
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

                var conditions = data.weather[0].description;
                console.log("Conditions: " + conditions)

                var lat = (data.coord.lat);
                var lon = (data.coord.lon);
                
                console.log(lat);
                console.log(lon);



            dayForecast.appendChild(currentDate);
            dayForecast.appendChild(currentTemp);
            dayForecast.appendChild(feelsLike);
            dayForecast.appendChild(windSpeed);
            dayForecast.appendChild(highTemp);
            dayForecast.appendChild(lowTemp);

        
        var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=" + key;
        
        fetch(forecastURL)
        .then(function (response) {
            return response.json();
            
        })
        .then(function(response){
            console.log( "dt" + response.daily[0].dt);

            for (var i=1; i<8 ;i++){
            var futureDateResponse = (response.daily[i].dt);
            var forecastDate = new Date(i);
            forecastDate.setUTCSeconds(futureDateResponse);
            var futureDate = forecastDate;
            var forecastMonth = futureDate.getMonth()+1;
            var forecastDay = futureDate.getDate();
            var forecastYear = futureDate.getFullYear();

            var fdOutput = forecastMonth +"/" + forecastDay + "/" + forecastYear

            var fiveDay = document.createElement("div");
            fiveDay.textContent=fdOutput
            
                


            weatherForecast.appendChild(fiveDay);
                
            var highForecast=document.createElement("p");
            highForecast.textContent ="High Temp: " + parseInt(response.daily[i].temp.max)+ "° F" ;

            var lowForecast = document.createElement("p");
            lowForecast.textContent ="Low Temp: " + parseInt(response.daily[i].temp.min)+ "° F";

            var forecastDescription = document.createElement("p");
            forecastDescription.textContent = (response.daily[i].weather[0].description);


                fiveDay.appendChild(highForecast);
                fiveDay.appendChild(lowForecast);
                fiveDay.appendChild(forecastDescription);
                console.log(fdOutput);
                console.log( "High temp " + response.daily[i].temp.max)
                console.log("low temp " +response.daily[i].temp.min );
                console.log("description " + response.daily[i].weather[0].description)
            }




        })
        });
    }
}


getWeatherApi();

// Local Storage for recent searches

