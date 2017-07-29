// Author: Alfredo Rodriguez
// File: JS - script.js
// Date: 7/26/2017


$(document).ready(function () {

//Game Page


    $("#searchButton").click(function () {

        var searchItem = $("#searchBox").val();

        console.log(searchItem);

        $("#newButtons").append("<button class= 'fakeButtons btn btn-info btn-sm' data-person= "
            + searchItem.split(" ").join("+") + ">" + searchItem + "</button>");

        $(".fakeButtons").on("click", function () {

            $("#gifBox").empty();

            var person = $(this).attr("data-person");

            console.log(person);

            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
                person + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .done(function (response) {

                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {

                        var gifDiv = $("<div class='gifLocation'>");

                        var personImage = $("<img class='gifs'>");

                        // Storing the result item's rating
                        var rating = results[i].rating;
                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p class='ratings'>").text("Rating: " + rating);

                        personImage.attr("src", results[i].images.fixed_height.url);

                        personImage.attr("data-animate", results[i].images.fixed_height.url);

                        personImage.attr("data-still", results[i].images.fixed_height_still.url);

                        personImage.attr("data-state", "animate");

                        console.log(results);

                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(p);

                        gifDiv.append(personImage);

                        $("#gifBox").prepend(gifDiv);

                    }

                    $(".gifs").click( function() {

                        var state = $(this).attr("data-state");
                        var animateURL = $(this).attr("data-animate");
                        var stillURL = $(this).attr("data-still");

                        if (state === "still") {

                            $(this).attr("src", animateURL);
                            $(this).attr("data-state", "animate");

                        }

                        else if (state === "animate") {
                            $(this).attr("src", stillURL);
                            $(this).attr("data-state", "still");
                        }

                    });


                });




        });

    });

});


