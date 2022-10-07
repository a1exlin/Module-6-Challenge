var geocodeurl = 'http://api.openweathermap.org/geo/1.0/direct?q=Atlanta&limit=5&appid=ce9d98967d8af2e02237f6859bd30006'
// A promise, awaits a response from the API
fetch(geocodeurl)
    .then(function (response) {
        // also a promise
        return response.json();
    })
    // gives lon and lat

    .then(function (data) {
        console.log(data);
        // api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=
        var weatherurl = 'api.openweathermap.org/data/2.5/forecast?lat='+ data[0].lat+ '&lon=' + data[0].lon +'&appid=ce9d98967d8af2e02237f6859bd30006'
        fetch(weatherurl)
            .then(function (response) {
                
                return response.json();

            })
            .then(function(weatherdata){
                console.log(weatherdata);

            })
    })
    

// search button function.
var searchButtonClick = document.getElementById("searchButton");
searchButtonClick.addEventListener("click", initMap);

// allows user to hit enter key to search for desired weather of city.
document.addEventListener("keypress", function(event) {
  console.log(`Successful submission.`)
  if (event.key === "Enter") {
    event.preventDefault();
    initMap();
    
  }
});

// Create local storage