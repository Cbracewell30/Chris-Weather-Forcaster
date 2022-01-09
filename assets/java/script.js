var apiKEy = "2401e5f244d6edfc7b640a1343114a6e";

$("#subBtn").on("click", function () {
    var cityName = $("#cityTxt").val();
    console.log(cityName);
    getLocation(cityName)
});

function getLocation(cityName) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKEy}`;
    $.ajax({
        type: 'GET',
        url: apiURL,
        datatype: 'JSON',
        success: function (apiData) {
            console.log(apiData)
            var lat = apiData.coord.lat;
            var lon = apiData.coord.lon;
            oneCallApi(lon, lat);
        }, 
        error: function (err) {
            console.log("Error in getting API Data", err)
        }
    });

};

        function oneCallApi(lon, lat) {
        var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKEy}&units=imperial`
            $.ajax({
                type: 'GET',
                url: oneCall,
                datatype: 'JSON',
                success: function (apiData) {
                    console.log(apiData);
                    $("#current").html(`<h4 class="font-weight-bold">${cityNAme}
                    <p>temp:${apiData.daily[0].temp.day}</p>
                    <img src ="http://openweathermap.org/img/wn/${apiData.daily[0].weather[0].icon}@2x.png" />
                    <p>Humidity: ${}</p>
                    <p>WindSpeed: ${}</p>
                    `)

                    for(let i=1;i<6;i++){
                        $(`#day-${i}`).html(``)
                    }


                },
                error: function (err) {
                    console.log("Error in getting oneCall API Data", err)
                }
           })
        };
