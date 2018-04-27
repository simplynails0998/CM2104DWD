/**
 * Created by 1603232 on 25/04/2018.
 */

// public/js/check-login.js

// NOT CURRENTLY IMPLEMENTED

// JS for live/client-side login checks

/*
function checkLogin() {

    var email = document.getElementById('login-username').innerText;
    var pword = document.getElementById('login-password').innerText;

    $.ajax({
        type: "GET",
        url: "/checklogin",
        data: {
            "email": email,
            "password": pword
        },
        success: function(result)
        {
            if(result) {
                document.getElementById('login-message').innerText = result;
            }
            else {
                document.getElementById('login-form').submit();
            }
        }
    })

}
*/

/*
function checkUsername() {
    var uname = document.getElementById('login-username').value;

    var message = document.getElementById('login-message');

    $.ajax({
        type: "POST",
        url: "/checkusername",
        data: {
            "username": uname
        },
        success: function(result) {
            console.log("RESULT:" + result);
            if (result) {
                message.innerHTML = result.toUpperCase();
            }
            else {
                // do nothing ...
            }

        }
    })

}


$('#login-form').submit(function() {
    var uname = document.getElementById('login-username').value;
    var pword = document.getElementById('login-password').value;

    var message = document.getElementById('login-message');

    $.ajax({
        type: "POST",
        url: "/checklogin",
        data: {
            "username": uname,
            "password": pword
        },
        success: function(result) {
            console.log("RESULT:" + result);
            if (result) {
                message.innerHTML = result;
                return false;
            }
            else {
                message.innerHTML = "";
            }

        }
    })
});


function checkLogin() {
    var uname = document.getElementById('login-username').value;
    var pword = document.getElementById('login-password').value;

    var message = document.getElementById('login-message');

    $.ajax({
        type: "POST",
        url: "/checklogin",
        data: {
            "username": uname,
            "password": pword
        },
        success: function(result) {
            console.log("RESULT:" + result);
            if (result) {
                message.innerHTML = result;
            }
            else {
                message.innerHTML = "";
                document.getElementById('login-form').submit();
            }

        }
    })

}
*/