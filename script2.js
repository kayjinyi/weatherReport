console.log("linked");
var nameInputEl = document.querySelector('#cityName');
var userFormEl = document.querySelector('#userForm');
var searchBtnEl = document.querySelector('#searchBtn');
var cityEl=document.querySelector('#searchCity');
var futureEl = document.querySelector("#futureWeather")

var clearBtnEl = document.querySelector("#clearBtn")
// var containerEl = document.querySelector('#container');
var searchTerm = document.querySelector('#listGroup');
var APIKey="cab24558a9cf0ad3e1292a15fc9c7816";
var today = moment();
var cities=JSON.parse(localStorage.getItem("cities"))||[];

//userFormEl.on('submit', formSubmitHandler);form doesnot work
searchBtnEl.addEventListener('click', function(event){
    event.preventDefault();
    cityname = nameInputEl.value.trim();
    // localStorage.setItem("cityname", cityname);
    console.log(cityname);
    // citynameSaved = localStorage.getItem("cityname");
    cityEl.innerHTML = "";
    cityEl.textContent =`${cityname}(${today.format("MM/DD/YYYY")})`;
    var latE="";
    getWeather(cityname);
    getFutureWeather(cityname);
    savedCities(cityname);

});
// 
clearBtnEl.addEventListener("click",function(){
    // localStorage.clear();
    localStorage.removeItem("cities")
    searchTerm.innerHTML = "";
})
var savedCities = function(cityname){
console.log(cityname);
cities.push(cityname);
localStorage.setItem("cities", JSON.stringify(cities));
displayCities();
}

var displayCities = function(){
    searchTerm.innerHTML = "";
    for( let i =0; i< cities.length; i++){
        var list = document.createElement("li");
        list.textContent = cities[i];
        list.setAttribute('class', 'btn btn-success')
        list.style.border = "success 5px solid";
        list.style.margin = "success 5px solid";
        // $("li").text(cities[i]);
        list.addEventListener("click",function(event){
            var cityname = event.target.textContent
            getWeather(cityname);
            getFutureWeather(cityname);   
        })
        
        searchTerm.append(list);
    }  

}
displayCities();

var lonE="";
var getWeather = function (cityname) {
var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&appid=' + APIKey;
console.log(apiUrl);

fetch(apiUrl).then(function(response){
    return response.json()
}).then(function(readableData){
    console.log(readableData)
        var temp =document.createElement("p");
        var windspeed =document.createElement("p");
        var humidity =document.createElement("p");
        var uv =document.createElement("p");
        temp.textContent =`Temp: ${readableData.main.temp} F`
        windspeed.textContent=`Wind: ${readableData.wind.speed} MPH`;
        humidity.textContent = `Humidity: ${readableData.main.humidity}%`;
        
        cityEl.append(temp);
        cityEl.append(windspeed);
        cityEl.append(humidity);

        var latE=readableData.coord.lat;
        var lonE=readableData.coord.lon;
        console.log(latE);
        console.log(lonE);
        localStorage.setItem("latE", latE);
        localStorage.setItem("lonE", lonE);
        getUV(readableData.name)
        
        uv.textContent = `UV Index: ${uvi}`;
        cityEl.append(uv)
})}
var getUV = function(cityname) {
    var latSaved = localStorage.getItem("latE");
    var lonSaved = localStorage.getItem("lonE");
        var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latSaved}&lon=${lonSaved}&exclude={part}&appid=${APIKey}`;
        console.log(apiUrl);
        fetch(apiUrl).then(function(response){
            return response.json()
        }).then(function(readableData){
            console.log(readableData)
            uv.textContent = `UV Index: ${readableData[0].uvi}`;  
            console.log(uv);
                       })

}

var getFutureWeather = function (cityname) {
var latSaved = localStorage.getItem("latE");
var lonSaved = localStorage.getItem("lonE");
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latSaved}&lon=${lonSaved}&exclude={part}&appid=${APIKey}`;
    console.log(apiUrl);
    fetch(apiUrl).then(function(response){
        return response.json()
    }).then(function(readableData){
        console.log(readableData)
        futureEl.innerHTML ="";
        for(let i=1; i< 6; i++){
            // console.log() </div>
                    var divEl = document.createElement("div")
                    divEl.style.border = "rgb(122, 242, 242) 5px solid";
                    divEl.style.margin = "rgb(122, 242, 242) 5px solid";
                    divEl.classList.add("futureCard")
                    //$(divEl).addClass("futureCard")
                    var dateEl = document.createElement("h4");
                    // var icon =document.createElement("img");
                    var temp =document.createElement("p");          
                    var windspeed =document.createElement("p");
                    var humidity =document.createElement("p");
                    var uv =document.createElement("p");
                    var dateS= new Date((readableData.daily[i].dt*1000)).toLocaleDateString();
                    dateEl.textContent = dateS
                    temp.textContent =`Temp: ${readableData.daily[i].temp.day} F`
                    windspeed.textContent=`Wind: ${readableData.daily[i].wind_speed} MPH`;
                    humidity.textContent = `Humidity: ${readableData.daily[i].humidity}%`;
                    // icon.setAttribute("src", "readableData.daily[i].weather[0].icon");
                    futureEl.append(divEl);
                    divEl.append(dateEl);
                    // divEl.append(icon);
                    divEl.append(temp);
                    divEl.append(windspeed);
                    divEl.append(humidity);
                   
                   }
    })}
    