// variables for apikey, ol selector, and city namr array

var apiKey = "2401e5f244d6edfc7b640a1343114a6e";
var orderedList = document.querySelector("ol")
var cityArr = {};


// on click function for search button
$("#subBtn").on("click", function () {
    // variable to store search input
    var cityName = $("#cityTxt").val();
    // console.log(cityName);
    getLocation(cityName);

});

// Fetching Lon and Lat coordinates by city name
function getLocation(cityName) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    $.ajax({
        type: 'GET',
        url: apiURL,
        datatype: 'JSON',
        success: function (apiData) {
            console.log(apiData)
            var lat = apiData.coord.lat;
            var lon = apiData.coord.lon;
            // sending the variales to the onecallApi fetch
            oneCallApi(lon, lat, cityName);
            var getCity = JSON.parse(localStorage.getItem("weatherAPI")) || []
            if( getCity.indexOf(cityName) === -1){
            getCity.push(cityName)
            localStorage.setItem('weatherAPI', JSON.stringify(getCity));
            }
            onLoad(getCity);
        },
        error: function (err) {
            $('#current').text(" Error Getting Location's Forecast!");

        }
    });



};

// Using the lon, lat, and city name from the get locaiton in the onecall locaiton to returnt he weather for the locaiton.
function oneCallApi(lon, lat, cityName) {
    var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    $.ajax({
        type: 'GET',
        url: oneCall,
        datatype: 'JSON',
        success: function (apiData) {
            console.log(apiData);
            // adding the current temp detail to the current id div in HTML
            $("#current").html(`<h4 class="font-weight-bold">${cityName}
            
                    <p>Temp: ${apiData.current.temp}°F</p>
                    <p>Humidity: ${apiData.current.humidity}</p>
                    <p>Wind Speed: ${apiData.current.wind_speed}</p>
                    <img src="http://openweathermap.org/img/wn/${apiData.current.weather[0].icon}@2x.png"/>
                    
                    `)
            // looping the 5 day forecast 

            for (let i = 1; i < 7; i++) {
                $(`#day-${i}`).html(`
                <p class="mx-auto">Temp: ${apiData.daily[i].temp.day}°F  </p> 
                <br>                                                                                                                                                              
                      <p class="mx-auto">Humidity:  ${apiData.daily[i].humidity}  </p>

                      <img src="http://openweathermap.org/img/wn/${apiData.daily[i].weather[0].icon}@2x.png"/>

                <p class="mx-auto">Wind Speed: ${apiData.daily[i].wind_speed}</p>
                `)
                $(`#city-${i}`).html(`<h4 class="font-weight-bold"> Day ${i}: ${cityName}
                `)

            }


        },
        error: function (err) {
            console.log("Error in getting oneCall API Data", err)
        }
    })

};
var onLoad = function (saveName) {
    var getCity = JSON.parse(localStorage.getItem("weatherAPI")) || []
    console.log(getCity)
    var blankHTML = ""
    for (let i=0; i< getCity.length;i++){
        blankHTML += `<button class="previous border border-danger">${getCity[i]}</button>`

        //   //  var listEL = document.createElement("li");
        //     var listBtn = document.createElement("Button");

        //     listBtn.className = 'previous border border-danger'
        //     listBtn.textContent = getCity[i];
        //   //  listEL.appendChild(listBtn);
        //     orderedList.appendChild(listBtn);
       
            
    }
    $("#citySearch").html(blankHTML)

};

$("#citySearch").on("click", ".previous",function(){
    var city = $(this).text()
    console.log(city)
    $("#cityTxt").val(city)
    getLocation(city);
})

onLoad();