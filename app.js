$(document).ready(function() {
  var TempUnit = " °F";
  var TempUrl = "&units=imperial";
  var WindUnit = "miles/hour"
  var WeatherType;
  var WindSpeed;

  var setBackgroundImage = function(code) {
    var imgUrl;

    if (code == 701) {
      imgUrl = "https://45.media.tumblr.com/28fe099f90cc0e336665baf6dd1b6473/tumblr_o13ckk4DNK1v5rklgo1_500.gif";
    }
    if (code == 511) {
      imgUrl = "http://res.cloudinary.com/daily-voice/image/upload/c_limit,f_auto,w_640/Upper_Chorlton_Road_in_the_Snow_gsq0bh.jpg";
    }
    if (code >= 500 && code <= 531) {
      imgUrl = "http://data.whicdn.com/images/33403233/large.gif";

    }

    if (code >= 600 && code <= 631) {
      imgUrl = "http://cdn.shopify.com/s/files/1/0301/0065/files/photo_snow_trees_background_landscape_2048x2048.png?3582";
    }
    // else {
    //   imgUrl = "http://ngm.nationalgeographic.com/u/TvyamNb-BivtNwcoxtkc5xGBuGkIMh_nj4UJHQKuq1gPz4fsBWCZs83e4FIIOk5CIZXGagdYZy91/";
    //
    // }

    $("body").css("background-image", 'url(' + imgUrl + ')');

  };

  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?zip=07670,us&APPID=28c215c3b28d2475777641bc0321dd92&units=imperial",
    type: "GET",
    dataType: "json",
    success: function(data) {
      console.log(JSON.stringify(data));
      handleData(data);
    }
  });

  var handleData = function(json) {

    var location = JSON.stringify(json.name).replace(/^"(.*)"$/, '$1');
    var weather = JSON.stringify(json.weather[0]["description"]).replace(/^"(.*)"$/, '$1');
    var temp = JSON.stringify(json.main["temp"]);
    var wind = JSON.stringify(json.wind["speed"]);
    var iconCode = JSON.stringify(json.weather[0]["icon"]).replace(/^"(.*)"$/, '$1') + ".png";
    var weatherCode = JSON.stringify(json.weather[0]["id"]);

    var iconUrl = "http://openweathermap.org/img/w/" + iconCode;

    if (weatherCode) {
      setBackgroundImage(weatherCode);
      WeatherType = weatherCode;
      WindSpeed = wind;
    }


    $(".place").text(location);
    $(".weather-description").text(weather);
    $(".weather-description").prepend("<img>");

    $(".weather-description img").attr("src", iconUrl);

    $(".wind").text("Wind " + wind + " " + WindUnit);
    $("div.temp").text(temp + TempUnit);
  };

  $(".nonactive").on("click", function (event) {

    $("ul > li.active").removeClass("active");
    $("ul > li").addClass("nonactive");
    $(event.currentTarget).removeClass("nonactive").addClass("active");

    if ($(event.currentTarget).attr("id") === "fahrenheit") {
      TempUnit = " °F";
      TempUrl = "&units=imperial";
      WindUnit = "miles/hour";
    } else if ($(event.currentTarget).attr("id") === "celsius") {
      TempUnit = " °C";
      TempUrl = "&units=metric";
      WindUnit = "meters/second";
    } else {
      TempUnit = " K";
      TempUrl = '';
      WindUnit = "meters/second";
    }

    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?zip=07670,us&APPID=28c215c3b28d2475777641bc0321dd92" + TempUrl,
      type: "GET",
      dataType: "json",
      success: function(data) {
        console.log(JSON.stringify(data));
        handleData(data);
      }
    });
  });

  var randomUrl = function(arrUrls) {
    var randIdx = Math.floor(Math.random() * arrUrls.length);
    return arrUrls[randIdx];
  }


  var changeBackgroundImg = function () {
    var rainyImgs = ["http://www.bustedracquet.us/ESW/Images/Rain-uploaded-by-zzanigifs-category-tags-rain-rain-gif-water-My-things-2-and-lindos-animation-animacje-moudy-Amazing-pictures-from-others-gifs_large.gif",
      "http://data.whicdn.com/images/80901295/large.gif",
      "https://media.giphy.com/media/2xdzNrPE50WLC/giphy.gif",
      "http://media3.giphy.com/media/rR2AWZ3ip77r2/giphy.gif",
      "http://i.imgur.com/DX4gra9.gif"
    ];
    var sunnyImgs;
    var stormyImgs;
    var snowyImgs;


    if (WeatherType >= 300 && WeatherType <= 531) {

      var imgUrl = randomUrl(rainyImgs);
    }
    if (imgUrl) {
      $("body").css("background-image", 'url(' + imgUrl + ')');
    }



  };

  var WindImgChange = function () {
    var windyImgs = [
      "http://24.media.tumblr.com/b494bf3942d3e9b67d5e7f6d8965ec29/tumblr_mpj82yRvJ31su4x2oo1_500.gif",
      "https://s-media-cache-ak0.pinimg.com/originals/0c/c1/60/0cc160323f215c8239a5185a4e832729.gif"

    ];


    var windUrl = randomUrl(windyImgs);

    if (WindSpeed >= 9 && WindUnit === "miles/hour" || WindSpeed >= 4.3 && WindUnit === "meters/second") {
      $("body").css("background-image", 'url(' + windUrl + ')');
    }

  };
  $("div.weather-description").on("mouseenter", changeBackgroundImg);
  $("div.weather-description").on("mouseout", function () {
    setBackgroundImage(WeatherType);
  });


  $("div.wind").on("mouseenter", WindImgChange);
  $("div.wind").on("mouseout", function () {
    setBackgroundImage(WeatherType);

  });

});
