function apiGiphy(queryItem) {
    var queryUrl = "https://api.giphy.com/v1/gifs/search";
    var apiKey = "T9s5q54UZhIGt05xqIqutimqQFUvUbv3";
    var params = "?" + $.param({
        api_key: apiKey,
        q: queryItem,
        limit: 10,
        offset: 0,
        rating: "PG"
    });

    var paramQuery = queryUrl + params;

    $.ajax({
        url: paramQuery,
        method: "GET"
    })
        .then(function (response) {
            var topics = response.data;
            console.log(topics);
            $("#gif-container").empty();
            for (var i = 0; i < topics.length; i++) {
                var animalDiv = $("<div>");
                var p = $("<p>").text("Rating is: " + topics[i].rating);
                var giphImage = $("<img>");
                giphImage.addClass("gif-image");
                giphImage.attr("src", topics[i].images.fixed_height_still.url);
                giphImage.attr("data-still", topics[i].images.fixed_height_still.url);
                giphImage.attr("data-animate", topics[i].images.fixed_height.url);
                giphImage.attr("data-state", "still");
                $("#gif-container").append(giphImage, p);
            } //cant get my giphs to go in a row next to eachother
            //instead they just go down
        });
}

$(document).on("click", ".gif-image", function (e) {
    e.preventDefault();
    var state = $(this).attr("data-state");
    var animateUrl = $(this).attr("data-animate");
    var stillUrl = $(this).attr("data-still");
    if (state === "still") {

        $(this).attr("src", animateUrl);
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", stillUrl);
        $(this).attr("data-state", "still");
    }
});

apiGiphy("dogs");

$(document).on("click", ".gif-button", function (e) {
    e.preventDefault();
    var btnValue = $(this).attr("data-name");
    apiGiphy(btnValue);
});

function renderButtons() {
    $("#buttons-view").empty();
    var btn = $("<button>");
    btn.addClass("gif-button");
    btn.attr("data-name", topics[i]);
    btn.text(topics[i]);
    $("buttons-view").append(btn);
}
// For some reason cannot figure out why the function wont work when 
// I enter in another animal to add to button.
$("#add-giphy").on("click", function (event) {
    event.preventDefault();
    var gifIn = $("#giphy-input").val().trim();
    topics.push(gifIn);
    renderButtons();

$(document).on("click", ".gif-button", apiGiphy(queryItem));
renderButtons();
});
