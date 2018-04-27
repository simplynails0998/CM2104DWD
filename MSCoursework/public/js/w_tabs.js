
// public/js/w_tabs.js

// JS for weather forecast tabs on map marker pop-ups


// document.getElementById('tab1').click();

// change class to show selected forecast
function openDay(evt,day) {

    $('.tabcontent').css('display','none');

    $('.tablink').removeClass('active');

    document.getElementById(day).style.display = "block";
    evt.currentTarget.className += " active";
}