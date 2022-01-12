var apiKey = "2401e5f244d6edfc7b640a1343114a6e";

$("#subBtn").on("click", function () {
    var cityName = $("#cityTxt").val();
    console.log(cityName);
    getLocation(cityName)
});

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
            oneCallApi(lon, lat, cityName);
        },
        error: function (err) {
            console.log("Error in getting API Data", err)
        }
    });

};

function oneCallApi(lon, lat, cityName) {
    
    var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    $.ajax({
        type: 'GET',
        url: oneCall,
        datatype: 'JSON',
        success: function (apiData) {
            console.log(apiData);
            $("#current").html(`<h4 class="font-weight-bold">${cityName}
                    <p>Temp: ${apiData.current.temp}°F</p>
                   
                    <p>Humidity: ${apiData.current.humidity}</p>
                    <p>Wind Speed: ${apiData.current.wind_speed}</p>
                    `)

            for (let i = 1; i < 7; i++) {
                $(`#day-${i}`).html(`
                <p>Temp: ${apiData.daily[i].temp.day}°F</p> 
                <p>Temp Evening: ${apiData.daily[i].temp.eve}°F</p>
                <p>Humidity: ${apiData.daily[i].humidity}</p>
                <p>Wind Speed: ${apiData.daily[i].wind_speed}</p>
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

