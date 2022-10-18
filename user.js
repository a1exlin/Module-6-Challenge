var curentforcast = document.getElementById("current-weather");
// searchbar (passed into getweather to recieve data from userinput)
var searchbar = document.getElementById("showweather");

// search button function.
var searchButtonClick = document.getElementById("searchButton");
searchButtonClick.addEventListener("click", function () {
    // .value is whatever input of the searchbar is put in 
    // searchbar.value is passed into city and city is passed into the geocode url
    getweather(searchbar.value)

});
// function for getting city weather data
function getweather(city) {
    var geocodeurl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=ce9d98967d8af2e02237f6859bd30006'
    // A promise, awaits a response from the API
    fetch(geocodeurl)
        .then(function (response) {
            // also a promise
            return response.json();
        })
        // gives lon and lat

        .then(function (data) {
            console.log(data);
            var weatherurl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=ce9d98967d8af2e02237f6859bd30006'
            fetch(weatherurl)
                .then(function (response) {

                    return response.json();

                })
                .then(function (weatherdata) {
                    console.log(weatherdata);

                    // Filter method 
                    // array for the weather inside the weatherdata The list is the array and filter is the method to pick out specific elements
                    // cast is a name given for looping through the list object inside weatherdata
                    var weatherarray = weatherdata.list.filter(function (cast) {
                        if (cast.dt_txt.includes("00:00:00")) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    })

                    console.log(weatherarray);

                    // for loop that prints out 5 days of weather forecast

                    for (var i = 0; i < 5; i++) {

                        //  city timezone
                        var date = weatherarray[i].dt_txt;
                        var dateElement = document.createElement("p");
                        dateElement.textContent = "Date: " + date;
                        // gets the array of temp per element
                        var temp = weatherarray[i].main.temp;
                        temp = Math.round(temp - 273.15) * 9/5 + 32
                        
                
                        // insert p dag in createElement
                        var tempElement = document.createElement("p");
                        tempElement.textContent = "Temperature: " + temp + " F°";

                        

                        //. append allows you to add a child into a element. our child is the created P tag added into the weathercontainer
                        var wind = weatherarray[i].wind.speed;
                        var windElement = document.createElement("p");
                        windElement.textContent = "Wind Speed: " + wind + " anemometers";

                        var humindity = weatherarray[i].main.humidity;
                        var humindityElement = document.createElement("p");
                        humindityElement.textContent = "Humindity: " + humindity + " %rh";

                        // Inserts the actual output onto the page
                        var weatherElements = document.createElement("div");
                        weatherElements.setAttribute("class" , "weatherbox");
                        weatherElements.append(tempElement, windElement, humindityElement, dateElement);
                        curentforcast.append(weatherElements);
                        
                    }

                    // sets the city info into localstorage in the Google dev tools. weatherdata = city
                    localStorage.setItem("city" , JSON.stringify(weatherdata));
                    // sets the weather info into localstorage in Google dev tools. weatherarray = weather
                    localStorage.setItem("weather" , JSON.stringify(weatherarray))

                
                })
        })
}

 //     let searching = browser.history.search(
//     query                  // object
//     )
// button function for refreshing the page
function refreshPage() {
    window.location.reload();

}
// // allows user to hit enter key to search for desired weather of city.
// document.addEventListener("keypress", function(event) {
//   console.log(`Successful submission.`)
//   if (event.key === "Enter") {
//     event.preventDefault();
//     initMap();}
// })