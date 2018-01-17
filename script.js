console.log("Script.js connected")
/*
1) mainpart
2) get information from the form
3) create request
4) get and handle response
5) parse response to a  separate articles
6) create a paragraph (put it to "#mainField")
*/

var api_key = "WHsLyRTv3K8QNH50f3twWFEd2SVPLA8y"
var url = "https://api.giphy.com/v1/gifs/search?";
var searchTerm = "The matrix";
var limit = 10;
var mainResponseObject;

var arrayOfNames = ["Titanic", "Star Wars", "The Matrix", "War", "Space", "Dog", "Trump", "Hillary"];

function retrieveDatafromHTML() {
    $("#search_button").addClass("disabled")
    createButton($("#search_field").val());

}

function startSearch() {

    mainResponseObject = null;

    console.log("startSeact button activated");
    //AJAX request
    $.ajax({
        url: url,
        method: "GET",
        data: {
            q: searchTerm,
            rating: "g",
            limit: limit,
            api_key: api_key
        },

    }).done(function(result) {
        mainResponseObject = result;

        for (var i = 0; i < limit; i++) {
            var newElement = $("<div class='gifElement card'>");
            var newGif = $("<img class='card-image'>");
            newGif.attr("data-state", "still");
            newGif.attr("data-still", mainResponseObject.data[i].images.fixed_height_still.url);
            newGif.attr("data-animate", mainResponseObject.data[i].images.fixed_height.url);
            newGif.attr("src", mainResponseObject.data[i].images.fixed_height_still.url);
            newElement.append(newGif);
           // TODO fix newElement.append($("<p class='center-align'>").text("Rating: " + mainResponseObject.data[i].rating));

            $("#gifField").append(newElement);

        }
    }).fail(function(err) {
        throw err;
    });
    $('.carousel').carousel();
}

function createButton(Name) {
    var button = $("<button class='waves-effect waves-light btn'>").text(Name).attr("data-name", Name);

    $("#buttonsField").append(button)
}

function inputHolder() {
    $("#search_button").removeClass("disabled")
}

$(document).ready(function() {

    $("#search_button").click();
    $("#buttonsField").on("click", "button", function(event) {
        searchTerm = $(event.currentTarget).attr("data-name");
        $("#gifField").html("");
        startSearch();
    });
    //creating buttons
    for (var i = 0; i < arrayOfNames.length; i++) {
        createButton(arrayOfNames[i]);
    }
    //listener for image (still or animate)
    $("#gifField").on("click", "img", function(event) {

        var state = $(event.currentTarget).attr("data-state");
        console.log(state);

        if (state === "still") {
            $(event.currentTarget).attr("src", $(event.currentTarget).attr("data-animate"))
            $(event.currentTarget).attr("data-state", "animate");
        }

        if (state === "animate") {
            $(event.currentTarget).attr("src", $(event.currentTarget).attr("data-still"))
            $(event.currentTarget).attr("data-state", "still");
        }
    });
    console.log("document ready");

    //listener for add new button
    $("#search_button").click(retrieveDatafromHTML);

});
