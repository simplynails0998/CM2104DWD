
// public/js/jsonmap.js

// JS to create Leaflet Map for Munros


// set up map object
var mymap = L.map('mapid').setView([56.8189342,-4.0756789], 6.56);

// base map overlay
var baseMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZHI5OCIsImEiOiJjamRvY3FlZWowMTV6MnFxbGx6d2wzMnM4In0.ZU7d_lasqNE3eRJq3vol2Q'
}).addTo(mymap);


//Icon Class for Custom Pins
var mntIcon = L.Icon.extend({
    options: {
        iconSize: [25,40],
        iconAnchor: [12.5,40]
    }
});

//Custom Pins
var greenIcon = new mntIcon({iconUrl: '/img/greenPin.png'}),
    yellowIcon = new mntIcon({iconUrl: '/img/yellowPin.png'}),
    redIcon = new mntIcon({iconUrl: '/img/redPin.png'}),
    blueIcon = new mntIcon({iconUrl: '/img/bluePin.png'}),
    smrIcon = new mntIcon({iconUrl: '/img/smrPin.png'});


//http://zero-invent.codio.io/Munro-Mountains-Coursework-/%2FMunroMap/%2Fjson/munro.json


//var url = "https://zero-invent.codio.io/Munro-Mountains-Coursework-/%2FMunroMap/%2Fjson/munro.json";

/*
var blue = L.marker([56.79685,-5.003508], {icon:blueIcon});
blue.mName = "Ben Nevis";
blue.addTo(mymap);
*/


//Testing for map pins with JSON

/*
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "json/munro.json",
        success: function(result)
        {
            console.log(result.munros);
            var munros = result.munros;

            for (var i = 0; i < munros.length; i++) {
                var marker = L.marker([munros[i].lat,munros[i].lng], {icon:greenIcon});

                marker.mName = munros[i].name;
                marker.mHeight = munros[i].height;
                marker.mLat = munros[i].lat;
                marker.mLng = munros[i].lng;
                marker.mLocation = munros[i].location;
                marker.mImage = munros[i].image;

                //Test for "Bagged"
                marker.mBag = munros[i].bagged;
                if (munros[i].bagged == "true") {
                    marker.setIcon(blueIcon);
                }

                marker.bindTooltip(munros[i].name,{direction:"top",offset:[0,-40]});

                marker.on('click',openBox);

                marker.addTo(mymap);
            }
        }
    })
})
*/

/* Layer Groups for Pins */
var smrLocations = L.layerGroup([]);
var baggedMunros = L.layerGroup([]); // user 'bagged' munros

var munroEasy = L.layerGroup([]);
var munroMedium = L.layerGroup([]);
var munroHard = L.layerGroup([]);

/* FAILED ATTEMPTS
var uSession = document.getElementById('uS');
console.log(uSession);
var userSession = document.getElementById('uS').innerHTML;
console.log(userSession);

var uSessionB = document.getElementById('uSBoolean');
console.log(uSessionB);
*/

//Session Boolean - SUCCESS
//Session collected using AJAX call & Express route
// var userSession = document.getElementById('uSBoolean').innerHTML;
// console.log(userSession);
// var munros = document.getElementById('munroResult').innerHTML;
// console.log(munros);


/*
//Map markers loaded using JSON
$(document).ready(function() {
    $.ajax({
        // type: "GET",
        url: "/munros",
        success: function(result)
        {
            console.log(result);

            var munros = result;

            for (var i = 0; i < munros.length; i++) {
                // var marker = L.marker([munros[i].latitude,munros[i].longitude], {icon:greenIcon});
                if (munros[i].latitude && munros[i].longitude) {
                    var marker = L.marker([munros[i].latitude, munros[i].longitude]);

                    // console.log(munros[i]);

                    marker.mName = munros[i].name;
                    marker.mHeight = munros[i].height;
                    marker.mLat = munros[i].latitude;
                    marker.mLng = munros[i].longitude;
                    marker.mLocation = munros[i].region;
                    // marker.mImage = munros[i].image;
                    marker.mDiff = munros[i].difficulty;


                    marker.bindTooltip(munros[i].name, {direction: "top", offset: [0, -40]});

                    marker.on('click', openBox);


                    if (marker.mDiff == "Easy") {
                        marker.setIcon(greenIcon);
                        munroEasy.addLayer(marker);
                    }
                    else if (marker.mDiff == "Intermediate") {
                        marker.setIcon(yellowIcon);
                        munroMedium.addLayer(marker);
                    }
                    else if (marker.mDiff == "Hard") {
                        marker.setIcon(redIcon);
                        munroHard.addLayer(marker);
                    }
                    else {
                        if (userSession) {
                            marker.setIcon(blueIcon);
                            munroMountains.addLayer(marker);
                        }
                    }

                }




                // marker.addTo(mymap);
                // munroMountains.addLayer(marker);

            }
        }
    })
});
*/

/*
$(document).ready(function () {
    $.ajax({
        url: "/munros"
    }).done(function(data) {
        console.log(data);
    })
});
*/

// function to get user's 'bagged' munros from MongoDB
function getUserMunros(callback) {
    $.ajax({
        type: "GET",
        url: "/usermunros",
        success: function(result) {
            callback(result);
        }
    });
}

// get boolean value - user logged in or not
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

// generate markers on leaflet map using JSON data of munros from MongoDB
function getMunros(list,session) {
    $.ajax({
        type: "GET",
        url: '/munros',
        data: "Unknown",
        context: document.body,
        success: function(result)
        {
            console.log(result);

            //Add munro markers to map
            var munros = result;

            // for every munro
            for (var i = 0; i < munros.length; i++) {


                // Create Marker
                // var marker = L.marker([munros[i].latitude,munros[i].longitude], {icon:greenIcon});
                var marker = L.marker([munros[i].latitude, munros[i].longitude]);

                // console.log(munros[i]);

                // Set up custom attributes on marker
                marker.mName = munros[i].name;
                marker.mHeight = munros[i].height;
                marker.mLat = munros[i].latitude;
                marker.mLng = munros[i].longitude;
                marker.mLocation = munros[i].region;

                // if custom image available, store as attribute
                if (munros[i].image) {
                    marker.mImage = munros[i].image;
                }


                // marker.mDiff = munros[i].difficulty;


                // Add tooltip to marker, using munro name
                marker.bindTooltip(munros[i].name, {direction: "top", offset: [0, -40]});

                marker.on('click', openBox);


                // Determine height, parseInt from String
                var height = marker.mHeight.substring(0, 5);

                if (height.substring(4, 5) == "m") {
                    height = height.substring(0, 4);
                }

                height = parseInt(height);


                // console.log(munros[i].name);


                // if user logged in == true
                //  --  check if munro is in user munro array
                if (session && $.inArray(munros[i].name, list) != -1) {
                    //set all 'bagged' munros to have blue marker
                    marker.setIcon(blueIcon);
                    baggedMunros.addLayer(marker);
                }
                else { // for all other munros / user not logged in
                    //determine marker colour using height and add to correct layer group
                    if (height > 1000) { // tall munros
                        marker.setIcon(redIcon);
                        munroHard.addLayer(marker);
                    }
                    else if (height > 950) { // medium munros
                        marker.setIcon(yellowIcon);
                        munroMedium.addLayer(marker);
                    }
                    else {
                        marker.setIcon(greenIcon); // small munros
                        munroEasy.addLayer(marker);
                    }
                }
            }
        }
    })
}


$(document).ready(function() {

    var mBagged;
    var mapOverlays;

    // get user session boolean value
    getSession(function(sessdata) {
        console.log(sessdata);

        // if user logged in, get user munros and add markers map ( with blue markers )
        if (sessdata) {
            getUserMunros(function(data) {
                console.log(data);
                mBagged = data;
                getMunros(mBagged,sessdata);

                //Add filter features
                mapOverlays = {
                    "SMR Stations": smrLocations.addTo(mymap),
                    "Munros > 914m": munroEasy.addTo(mymap),
                    "Munros > 950m": munroMedium.addTo(mymap),
                    "Munros > 1000m": munroHard.addTo(mymap),
                    "Bagged Munros": baggedMunros.addTo(mymap)
                };
                //Add map filter features overlays to map
                L.control.layers(null,mapOverlays,{collapsed:false}).addTo(mymap);
            })
        }
        else {
            // if user not logged in, add markers to map ( excluding any blue markers )
            mBagged = ["unknown"];
            getMunros(mBagged);

            //Add filter features
            mapOverlays = {
                "SMR Stations": smrLocations.addTo(mymap),
                "Munros > 914m": munroEasy.addTo(mymap),
                "Munros > 950m": munroMedium.addTo(mymap),
                "Munros > 1000m": munroHard.addTo(mymap)

            };
            //Add map filter features overlays to map
            L.control.layers(null,mapOverlays,{collapsed:false}).addTo(mymap);
        }

    });

    // if (userSession == "true") {
    //     getUserMunros(function(data) {
    //         console.log(data);
    //         mBagged = data;
    //         getMunros(mBagged);
    //     })
    // }
    // else {
    //     mBagged = ["unknown"];
    //     getMunros(mBagged);
    // }

});







/*
$(document).ready(function() {
    // var mBagged;
    $.ajax({
        type: "GET",
        url: "/munros",
        context: document.body,
        success: function(result)
        {

            // // Array of user bagged munros
            var mBagged = [];
            // console.log(mBagged);

            // if user logged in, get user munros
            if (userSession == "True") {
/*
                var userAjax = $.ajax({
                    type: "GET",
                    url: "/usermunros",
                    success: function(result)
                    {
                        console.log(result);
                        bagged = result;
                        console.log(bagged);
                        // return bagged;
                    }
                })


                getUserMunros(function(data){
                    console.log(data);
                    mBagged = data;
                    console.log(mBagged);

                })

            }
            else {
                mBagged = ["unknown"];
            }



            console.log(mBagged);



            console.log(result);

            //Add munro markers to map
            var munros = result;

            for (var i = 0; i < munros.length; i++) {


                // var marker = L.marker([munros[i].latitude,munros[i].longitude], {icon:greenIcon});
                var marker = L.marker([munros[i].latitude, munros[i].longitude]);

                // console.log(munros[i]);

                marker.mName = munros[i].name;
                marker.mHeight = munros[i].height;
                marker.mLat = munros[i].latitude;
                marker.mLng = munros[i].longitude;
                marker.mLocation = munros[i].region;
                // marker.mImage = munros[i].image;
                // marker.mDiff = munros[i].difficulty;


                marker.bindTooltip(munros[i].name, {direction: "top", offset: [0, -40]});

                marker.on('click', openBox);


                // Determine height, parseInt from String
                var height = marker.mHeight.substring(0,5);

                if (height.substring(4,5) == "m") {
                    height = height.substring(0,4);
                }

                height = parseInt(height);


                // console.log(munros[i].name);


                if (userSession && $.inArray(munros[i].name,mBagged) != -1) {
                    marker.setIcon(blueIcon);
                    munroMountains.addLayer(marker);
                }
                else {
                    if (height > 1000) {
                        marker.setIcon(redIcon);
                        munroHard.addLayer(marker);
                    }
                    else if (height > 950 ) {
                        marker.setIcon(yellowIcon);
                        munroMedium.addLayer(marker);
                    }
                    else {
                        marker.setIcon(greenIcon);
                        munroEasy.addLayer(marker);
                    }
                }
                */

                // if (height.substring(4,5) == "m") {
                //     height = height.substring(0,4);
                // }

                // height = parseInt(height);
/*
                if (height > 1000) {
                    marker.setIcon(redIcon);
                    munroHard.addLayer(marker);
                }
                else if (height > 950 ) {
                    marker.setIcon(yellowIcon);
                    munroMedium.addLayer(marker);
                }
                else if (height > 914 ) {
                    marker.setIcon(greenIcon);
                    munroEasy.addLayer(marker);
                }
                else {
                    if (userSession) {
                        marker.setIcon(blueIcon);
                        munroMountains.addLayer(marker);
                    }
                    else {
                        // do nothing...
                    }
                }

*/
                // marker.addTo(mymap);
                // munroMountains.addLayer(marker);
/*
            }

        }
    });
    */
/*
    $.ajax({
        type: "GET",
        url: "/usermunros",
        success: function(result)
        {

        }
    });
*/


// });








/*
//Map markers loaded using JSON
$(document).ready(function() {
    $.ajax({
        // type: "GET",
        url: "/munromap",
        context: document.body
    }).done(function () {




        // console.log(result.munros);
        var munros = result;

        for (var i = 0; i < munros.length; i++) {
            // var marker = L.marker([munros[i].latitude,munros[i].longitude], {icon:greenIcon});
            var marker = L.marker([munros[i].latitude, munros[i].longitude]);

            // console.log(munros[i]);

            marker.mName = munros[i].name;
            marker.mHeight = munros[i].height;
            marker.mLat = munros[i].latitude;
            marker.mLng = munros[i].longitude;
            marker.mLocation = munros[i].region;
            // marker.mImage = munros[i].image;
            marker.mDiff = munros[i].difficulty;


            marker.bindTooltip(munros[i].name, {direction: "top", offset: [0, -40]});

            marker.on('click', openBox);


            if (marker.mDiff == "Easy") {
                marker.setIcon(greenIcon);
                munroEasy.addLayer(marker);
            }
            else if (marker.mDiff == "Intermediate") {
                marker.setIcon(yellowIcon);
                munroMedium.addLayer(marker);
            }
            else if (marker.mDiff == "Hard") {
                marker.setIcon(redIcon);
                munroHard.addLayer(marker);
            }
            else {
                if (userSession) {
                    marker.setIcon(blueIcon);
                    munroMountains.addLayer(marker);
                }
            }


            // marker.addTo(mymap);
            // munroMountains.addLayer(marker);

        }
    })
});
*/




/* Add SMR Pins to Map using JSON data */
$(document).ready(function() {
   $.ajax ({
       type: "GET",
       url: "/json/smr.json",
       success: function(result)
       {
           console.log(result.smr);
           var smr = result.smr;

           // for each station in JSON file
           for (var i = 0; i < smr.length; i++) {

               // create marker
               var marker = L.marker([smr[i].lat,smr[i].long], {icon: smrIcon});

               // give marker a name, using custom attribute
               marker.smrName = smr[i].name;

               // add marker tooltip, displaying name
               marker.bindTooltip(smr[i].name,{direction:"top", offset:[0,-40]});

               // marker.addTo(mymap);
               smrLocations.addLayer(marker);
           }
       }
   })
});


//Add overlays to map

// var baseMaps = {
//     // "Streets": baseMap
// }

/*
var mapOverlays = {
    "SMR": smrLocations.addTo(mymap),
    "Munros": munroMountains.addTo(mymap)
}
*/

/*
var mapOverlays = {
    "SMR Stations": smrLocations.addTo(mymap),
    "Beginner Munros": munroEasy.addTo(mymap),
    "Intermediate Munros": munroMedium.addTo(mymap),
    "Difficult Munros": munroHard.addTo(mymap),
    "Other (Testing)": munroMountains.addTo(mymap)
};
*/



/*
if (session.loggedin) {
    mapOverlays.add("Other (Testing)", munroMountains.addTo(mymap));
}
*/

/*
var mO;
*/

/*
var mapOverlays;

if (userSession) {
    mapOverlays = {
        "SMR Stations": smrLocations.addTo(mymap),
        "Munros > 914m": munroEasy.addTo(mymap),
        "Munros > 950m": munroMedium.addTo(mymap),
        "Munros > 1000m": munroHard.addTo(mymap),
        "Bagged Munros": munroMountains.addTo(mymap)
    }
}
else {
    mapOverlays = {
        "SMR Stations": smrLocations.addTo(mymap),
        "Munros > 914m": munroEasy.addTo(mymap),
        "Munros > 950m": munroMedium.addTo(mymap),
        "Munros > 1000m": munroHard.addTo(mymap)
        // "Other (Testing)": munroMountains.addTo(mymap)
    }
}
*/

// var mapOverlays = mO;




// L.control.layers(null,mapOverlays,{collapsed:false}).addTo(mymap);








/*
//Add Name tooltip to marker
blue.bindTooltip("Ben Nevis", {direction:"top", offset:[0,-40]}).openTooltip();


//Marker on click use function to open info panel
var munro = "Ben Nevis";
blue.on('click',openBox);
*/


//MODAL BOX - OPEN FUNCTION (ON MARKER)

function openBox(e) {

    var m = e.target;

    var munro = document.getElementById("mName");
    munro.innerHTML = m.mName;

// No image urls in JSON file, placeholder image used

    var img = document.getElementById("mImg");

    if (m.mImage) {
        img.src = m.mImage;
    }
    else {
        img.src = "/img/bennevis.jpg";
    }


    var info = document.getElementById("mText");

    // generate HTML for marker popup box
    var output = "<table><tr><td>Height</td><td>" + m.mHeight + "</td></tr>";
    output += "<tr><td>Location</td><td>" + m.mLocation + "</td></tr>";
    output += "<tr><td>Latitude</td><td>" + m.mLat + "</td></tr>";
    output += "<tr><td>Longitude</td><td>" + m.mLng + "</td></tr></table>";

    info.innerHTML = output;

    //Get weather, pass co-ordinates [get-weather.js]
    getWeather(m.mLat,m.mLng);

    //"Today" weather tab active
    document.getElementById('tab1').click();

    var modal = document.getElementById("popup");
    modal.style.display = "flex";
}


//MODAL BOX - CLOSE FUNCTIONS

var modal = document.getElementById("popup");

var span = document.getElementById('close');

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// var listName = "Ben Nevis";
// var listHeight = 1345;

// Show marker of chosen Munro from List - Not Implemented
function getMarker(listM) {

    var m;
    var group;

    //Get correct layerGroup
    getSession(function(sessdata){
        if (sessdata) {
            group = baggedMunros;
        }
        else if (listHeight > 1000) {
            group = munroHard;
        }
        else if (listHeight > 950) {
            group = munroMedium;
        }
        else {
            group = munroEasy;
        }

        //Find correct marker to open tooltip
        group.eachLayer(function(mLayer) {
            if (mLayer.mName == listName) {
                mLayer.openTooltip();
            }
        })

    });
}


// NOTES
/*
List > Map
Munro Link > Map Marker

 */



// Attempt at getting marker attribute - Unsuccessful
/*
$('.leaflet-marker-icon').on('click',function(e) {
    var element = $(e.srcElement || e.target),
        elName = element.attr('mName');

    alert("name: " + elName)
});
    */