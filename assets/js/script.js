// Author: Alfredo Rodriguez
// File: JS - script.js
// Date: 7/26/2017


$(document).ready(function () {

//Game Page



    $("#searchButton").click(function () {


        var searchItem = $("#searchBox").val();

        console.log(searchItem);

        $("#newButtons").append("<button class= 'btn btn-info btn-sm' id='Buttons' data-person= " + searchItem + ">" + searchItem + "</button>")
    });


    $("#Buttons").click( function() {

        var person = $(this).attr("data-person");

        console.log(person);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .done(function(response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var personImage = $("<img>");
                    personImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);
                    $("#gifBox").prepend(gifDiv);
                }
            });
    });

});