var topics = ["GSXR1000", "CBR1000", "CBRF4i", "ZX6R", "H2R", "R1", "R6" ]

function renderButtons () {
  $("#bikes").empty();
  for (i = 0; i<topics.length; i++) {
    $("#bikes").append("<button>" + topics[i] + "</button>");
  }
}

$("#button").on("click", function () {
  event.preventDefault();
  var topic = $("#bikes").val().trim();
  topic.push(topics);
  renderButtons();
  return;
});

$("button").on("click", function () {
  var bike = $(this).attr("data-bike");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    bike + "&api_key=Tg1gRmZCHTSoNpDpVHBxbxP4eWMXtNe4&limit=10"
    })

$.ajax({
    url: queryURL,
    method: "GET"
  }) .then(function(response) {
      var results = response.data;
     $("#bikes").empty();
     for (i =0; i < results.length; i++) {
      var bikeDiv = $("<div>");
      var p = $("<p>").text("Rating: " + results[i].rating);
      var bikeImg = $("<img>");
      bikeImg.attr("src", results[i].images.original_still.url);
      bikeImg.attr("data-still", results[i].images.original_still.url);
      bikeImg.attr("data-animate", results[i].images.original.url);
      bikeImg.attr("data-state", "still");
      bikeImg.attr("class", "gif");
      bikeDiv.append(p);
      bikeDiv.append(bikeImg);
      $("#bikes").append(bikeDiv);
    }
  });

  function changeState(){
    var state = $(this).attr("data-state");
    var animateImg = $(this).attr("data-still");

    if (state == "still") {
      $(this).attr("src", animateImg);
      $(this).attr("data-state", "animate");
      }
      else if (state == "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
      }
    }
    $(document).on("click", "gif", changeState);
  

