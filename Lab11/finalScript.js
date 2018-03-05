$(function() {
  //document ready
  alert("document ready");

  $('#searchform').submit(function() {
    //get current value and add to items list
    var searchterms = $("#searchterms").val();
    //call our search youtube function
    getResultsFromOMDB(searchterms);
    return false;
  });
});

function getResultsFromOMDB(searchterms) {
  //call youtube API using ajax//build url for the request
  var url = "http://www.omdbapi.com/?i=tt3896198&apikey=78771ea8&s=" + searchterms;
  //use jquery json shortcut
  $.getJSON(url, function(jsondata) {
    //handle the results
    addResultTitles(jsondata);
  });
}

function addResultTitles(jsondata) {
  //create a string to contain out HTML code to inject
  var htmlstring = "";
  //iterate over the collection of results
  for(var i = 0; i < 10; i++) {
    var title = jsondata.Search[i].Title;
    htmlstring += "<li>" + title + "</li>";
  }
  //inject the HTML into our empty list
  $("#results").html(htmlstring);
}
