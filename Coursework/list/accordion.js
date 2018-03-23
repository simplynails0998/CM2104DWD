$(document).ready(function() {
    var displayMunros = $('#accordion');

    $.ajax({
      type: "GET",
      url: "../list/munrodata.json",
      success: function(result)
      {
        console.log(result.munros);
        var munros = result.munros;

        for(var i = 0; i < munros.length; i++)
        {
          var output = "<h4 class='munrotitle'>" + munros[i].name;
            
          output += "</h4><div class='whiteback'><table><tr><td>Description: </td><td>" + munros[i].description + "</td></tr><tr><td>Region: </td><td>" + munros[i].region + "</td></tr><tr><td>Height: </td><td>" + munros[i].height + "</td></tr><tr><td>Latitude: </td><td>" + munros[i].latitude + "</td></tr><tr><td>Longitude: </td><td>" + munros[i].longitude + "</td></tr><tr><td>Grid Reference: </td><td>" + munros[i].gridReference + "</td></tr><tr><td>Difficulty: </td><td>";
            
            if (munros[i].difficulty == "Easy") {
                output += "<img class='mountains' src='Mountain_Pins/greenMnt.png'>";
            } else if (munros[i].difficulty == "Intermediate") {
                output += "<img src='Mountain_Pins/yellowMnt.png'><img src='Mountain_Pins/yellowMnt.png'>";
            } else if (munros[i].difficulty == "Hard") {
                output += "<img src='Mountain_Pins/redMnt.png'><img src='Mountain_Pins/redMnt.png'><img src='Mountain_Pins/redMnt.png'>";
            }
            
          output += "</td></tr><tr><td>Climbed: </td></tr><tr><td><input type='checkbox' id='checkBox' onclick='myFunction()'></td></tr></table></div>";
          displayMunros.append(output);
        }
        $( "#accordion" ).accordion({collapsible:true});
      }
  });
});


// $(function myFunction() {
//     var x = document.getElementById("checkBox");
//     if (x.checked == true) {
//         output += "<img src='Mountain_Pins/blueMnt.png'>";
//         x.style.display = "block";
//     } else {
//         x.style.display = "none";
//     }
// });



// function getSortOrder(prop) {
//   return function(a, b) {
//     if(a[prop] > b[prop]) {
//       return 1;
//     } else if (a[prop] < b[prop]) {
//       return -1;
//     }
//     return 0;
//   }
// }
// $('#height').click(function() {
//   munros.sort(getSortOrder("height"));
//   for(var items in munros) {
//     document.write("<div>" + munros[item].height + "</div>");
//   }
// });
