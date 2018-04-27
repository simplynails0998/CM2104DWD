
// public/js/login-header.js

// JS to change navigation dependent on user login status


//If user logged in - show logout and profile nav buttons

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "/getsession",
        success: function(sessdata)
        {
            if (sessdata) { //if user logged in
                //Hide Login button
                $('#nav-login').css("display","none");

                //Show profile and logout buttons
                $('#nav-profile').css("display","flex");
                $('#nav-logout').css("display","flex");
            }
            else { // if no user logged in
                //Show Login button
                $('#nav-login').css("display","flex");

                //Hide profile and logout buttons
                $('#nav-profile').css("display","none");
                $('#nav-logout').css("display","none");
            }
        }
    })
});