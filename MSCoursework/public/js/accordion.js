
// public/js/accordion.js

// JS to generate accordion of munros on list page


// Listener Function for check boxes - pass in id number
function listenerEx(i) {
    if($("#checkBox" + i).is(":checked")) { //if checkbox is checked, add munro to user list
        $("#bMount" + i).show();
        bagMunro(i);
    } else { // remove munro from user list
        $("#bMount" + i).hide();
        removeMunro(i);
    }
}

// add munro to user list, by passing id by POST
function bagMunro(i) {
    $.ajax({
        type: "POST",
        url: '/bagmunro',
        data: {
            "id": i
        },
        success: function(response) {
            console.log(response);
        }
    })
}

// remove munro from user list, by passing id by POST
function removeMunro(i) {
    $.ajax({
        type: "POST",
        url: '/removemunro',
        data: {
            "id": i
        },
        success: function(response) {
            console.log(response);
        }
    })
}

/*
function findMunro(i) {
    var x;
    $.ajax({
        type: "GET",
        url: '/munros',
        success: function(munros) {

        }
    })
}
*/



// ATTEMPT AT HANDLING APOSTROPHES IN MUNRO NAME
/*
var entityMap = {
    "'": '&#39;'
};


function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

function returnHtml(string) {
    return String(string).replace('&#39;', function(s) {
        return entityMap[s];
    })
}
*/
// END



// OLD FUNCTION TO GENERATE ACCORDION USING LOCAL JSON FILE
/*
$(document).ready(function() {
    var displayMunros = $('#accordion');

    $.ajax({
      type: "GET",
      url: "/munros",
      success: function(result)
      {
        // console.log(result.munros);
          console.log(result);
        // var munros = result.munros;
          var munros = result;

        for(var i = 0; i < munros.length; i++)
        {
          var output = "<h4 class='munrotitle'>" + munros[i].name + "<img class='bMount' id='bMount" + i + "' src='/img/blueMnt.png' alt='Blue Mountain'>";

          output += "</h4><div class='whiteback'><table><tr><td>Description: </td><td>" + munros[i].description + "</td></tr><tr><td>Region: </td><td>" + munros[i].region + "</td></tr><tr><td>Height: </td><td>" + munros[i].height + "</td></tr><tr><td>Latitude: </td><td>" + munros[i].latitude + "</td></tr><tr><td>Longitude: </td><td>" + munros[i].longitude + "</td></tr><tr><td>Grid Reference: </td><td>" + munros[i].gridReference + "</td></tr><tr><td>Difficulty: </td><td>";

            var height = munros[i].height.substring(0,5);
            if(height.substring(4,5) == "m") {
                height = height.substring(0,4);
            }
            height = parseInt(height);
            
            if (height > 1219) {
                output += "<img src='/img/redMnt.png' alt='Red Mountain'><img src='/img/redMnt.png' alt='Red Mountain'><img src='/img/redMnt.png' alt='Red Mountain'>";
            } else if (height > 1067) {
                output += "<img src='/img/yellowMnt.png' alt='Yellow Mountain'><img src='/img/yellowMnt.png' alt='Yellow Mountain'>";
            } else if (height > 914) {
                output += "<img src='/img/greenMnt.png' alt='Green Mountain'>";
            }

          output += "</td></tr><tr><td>Climbed: </td><td><input type='checkbox' id='checkBox" + i + "' onclick='listenerEx(" + i + ")'></td></tr></table></div>";
            
            currentFunction = function() {
                if($("#checkBox" + i).is(":checked")) {
                    $("#bMount" + i).show();
                    console.log("checked");
                } else {
                    console.log("unchecked");
                    $("#bMount" + i).hide();
                }
            };
            
//            console.log("creating listener for " + i);
            $("#checkBox" + i).click(function() {
                currentFunction();
                console.log(i);
            });
            
          displayMunros.append(output);
        }
        $( "#accordion" ).accordion({collapsible:true, active: false});
        $(".bMount").hide();
      }
  });
});
*/


// GENERATE ACCORDION USING MUNRO JSON DATA FROM MONGODB
function getAccordion(list,session) {

    // target accordion element
    var displayMunros = $('#accordion');

    $.ajax({
        type: "GET",
        url: "/munros",
        success: function(result)
        {
            // console.log(result.munros);
            console.log(result);
            // var munros = result.munros;
            var munros = result;

            // for every munro in result
            for(var i = 0; i < munros.length; i++)
            {

                // generate HTML output for Accordion
                var output = "<h4 class='munrotitle'>" + munros[i].name + "<img class='bMount' id='bMount" + i + "' src='/img/blueMnt.png' alt='Blue Mountain'>";

                output += "</h4><div class='whiteback'><table><tr><td>Description: </td><td>" + munros[i].description + "</td></tr><tr><td>Region: </td><td>" + munros[i].region + "</td></tr><tr><td>Height: </td><td>" + munros[i].height + "</td></tr><tr><td>Latitude: </td><td>" + munros[i].latitude + "</td></tr><tr><td>Longitude: </td><td>" + munros[i].longitude + "</td></tr><tr><td>Grid Reference: </td><td>" + munros[i].gridReference + "</td></tr><tr><td>Difficulty: </td><td>";


                // parseInt munro height for categories
                var height = munros[i].height.substring(0,5);
                if(height.substring(4,5) == "m") {
                    height = height.substring(0,4);
                }
                height = parseInt(height);

                if (height > 1219) {
                    output += "<img src='/img/redMnt.png' alt='Red Mountain'><img src='/img/redMnt.png' alt='Red Mountain'><img src='/img/redMnt.png' alt='Red Mountain'>";
                } else if (height > 1067) {
                    output += "<img src='/img/yellowMnt.png' alt='Yellow Mountain'><img src='/img/yellowMnt.png' alt='Yellow Mountain'>";
                } else if (height > 914) {
                    output += "<img src='/img/greenMnt.png' alt='Green Mountain'>";
                }


                // if user logged in, add checkboxes
                if (session) {
                    output += "</td></tr><tr><td>Climbed: </td><td><input type='checkbox' id='checkBox" + i + "' onclick='listenerEx(" + i + ")'></td></tr></table></div>";
                }
                else {
                    // no user, don't show checkboxes
                    output += "</td></tr></table></div>"
                }


                // display blue munro if checkbox checked
                currentFunction = function() {
                    if($("#checkBox" + i).is(":checked")) {
                        $("#bMount" + i).show();
                        console.log("checked");
                    } else {
                        console.log("unchecked");
                        $("#bMount" + i).hide();
                    }
                };

//            console.log("creating listener for " + i);
                $("#checkBox" + i).click(function() {
                    currentFunction();
                    console.log(i);
                });




                // add HTML output to accordion target element
                displayMunros.append(output);

                // if user logged in, get list of bagged munros
                if (session && $.inArray(munros[i].name, list) != -1) { // check munro on user list
                    console.log(munros[i].name);
                    $("#checkBox" + i).attr('checked',true); //checkbox is checked to show
                    // $("#bMount" + i).show();
                    currentFunction();
                }
                else {
                    currentFunction();
                }

            }

            // jQuery Accordion, allow collapsible and default: all closed
            $( "#accordion" ).accordion({collapsible:true, active: false});
            // $(".bMount").hide();
        }
    });
}


// get list of user's bagged munros
function getUserMunros(callback) {
    $.ajax({
        type: "GET",
        url: "/usermunros",
        success: function(result) {
            callback(result);
        }
    });
}

// get session.loggedin boolean value
function getSession(callback) {
    $.ajax({
        type: "GET",
        url: "/getsession",
        success: function(result) {
            console.log(result);
            callback(result);
        }
    });
}

// when page ready, run function
$(document).ready(function() {

    var mBagged;

    // get session boolean
    getSession(function(sessdata) {
        if (sessdata) { // if user logged in, get user munros
            getUserMunros(function(data){
                mBagged = data;

                // generate accordion
                getAccordion(mBagged,sessdata);

            })
        }
        else { // no user
            mBagged = ["unknown"];

            //generate accordion, no checkboxes
            getAccordion(mBagged,sessdata);

        }
    })

});




// Search Bar Function - Accordion Panels Must Be Closed
function myFunction() {
    // Declare variables
    var input, filter, h4, div, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    h4 = document.getElementsByTagName("h4");
//    acc = document.getElementById("accordion");
    div = document.getElementsByClassName("whiteback");
//    table = div.getElementsByTagName("table");
    
    // Loop through all munros, and hide those that don't match the search query
    // DO NOT CHANGE
    for(i = 0; i < h4.length; i++) {
        a = h4[i];
        if(a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            h4[i].style.display = "";
        } else {
            h4[i].style.display = "none";
        }
    }
    // DO NOT CHANGE
}



function addToUserList() {

}