var apiKEy = "2401e5f244d6edfc7b640a1343114a6e";

$("#subBtn").on("click", function () {
    var cityName = $("#cityTxt").val();
    console.log(cityName);
    getLocation(cityName)
});

function getLocation(cityName) {
    var apiURL =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKEy}`;
    $.ajax({
        type: 'GET',
        url: apiURL,
        datatype: 'JSON',
        success: function (apiData) {
            console.log(apiData)
            var lat = apiData.coord.lat;
            var lon = apiData.coord.lon;
        },
        error: function (err) {
            console.log("Error in getting API Data", err)
        }
    })
}