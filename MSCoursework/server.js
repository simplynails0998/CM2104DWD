/**
 * Created by 1603232 on 09/04/2018.
 */

// server.js

/*
var express = require('express');
var app = express();
*/

//Required packages
const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
const url = "mongodb://localhost:27017/munrospotter";
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();

//tell express to use sessions
app.use(session({secret: 'example'}));


// Node.js body parsing middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Set folder for static files (css/js/json/img)
app.use(express.static("public"));



var db;

//Connection to MongoDB - sets the variable db as our database
MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    db = database;
    app.listen(8080);
    console.log('listening on 8080');
});


/*
-----
---------- ROUTES ----------
-----
*/

// use res.render to load ejs view file

// index page - root route
app.get('/', function(req,res) {
    res.render('pages/index');
});

// map page
app.get('/munromap', function(req,res) {

    res.render('pages/map');


    // BELOW CODE: TESTING

    /*
    //if user not logged in - don't show "bagged" marker
    if (!req.session.loggedin) {
        res.redirect('')
    }

    */
/*
    db.collection('munros').find().toArray(function(err,result,session) {
        if (err) throw err;
        res.render('pages/map', {
            usession: session
        })
    });
*/

    // session.loggedin = true;
/*
    // db.collection('munros').find().toArray(function(err,result) {
    //     if (err) throw err;
        // console.log(result);
        // res.send(result);
        res.render('pages/map', {
            usession: session
        })
    });
*/

    //db.collection('munros').find({},function(err,result){
     //   res.send(result);
   // });

    /*
    var userSession = req.session;
    userSession.username = "genericuser033";
    */
    // var mTest;
/*
    db.collection('munros').find({"name": "Ben Nevis"}).toArray(function(err,result){
        mTest = JSON.stringify(result);
    });
    */

    // console.log(mTest);

    // db.collection('users').update({"username":userSession.username},{$addToSet: {"bagged": {$each :["Ben Nevis","Ben Hope","Ben Lomond"]}}});


    // userSession.loggedin = true;


    // res.render('pages/map', {
    //     usession: userSession
    // });


    // res.render('pages/map');

    // END TEST CODE

});


// Get session.loggedin value (boolean)
app.get('/getsession', function(req,res) {
    var sess = req.session.loggedin;
    res.send(sess);
});


// Return Munro information from MongoDB as JSON
// To set up Map and List Accordion
app.get('/munros', function(req,res) {
    db.collection('munros').find().toArray(function(err,result) {
        // console.log(result);
        res.send(result);
    });
});



// Get user 'bagged' munros from MongoDB
app.get('/usermunros', function(req,res) {

    // console.log(req.session.username);
    var uName = req.session.username;
    // console.log(uName);

    db.collection('users').findOne({"username":uName},function(err, result) {
        if (err) throw err;
        console.log(result.bagged);
        res.send(result.bagged);
        // console.log(result);
        // console.log(result.username);
        // console.log(result.bagged);
    });

});


// WEATHER API ROUTES
// Client-Side Code (public/weather and public/js/jsonmap)
/*
var key = "key=b02b078d-1b64-44b3-90c7-3caacdbd442b";

app.get('/weather', function(req,res){

});

app.get('/getsitelist',function(req,res){

});
*/






// list page
app.get('/munrolist', function(req,res) {
    res.render('pages/list');
});


// add munro to user list
// get munro id using post - get munro from database - add to user 'bagged' field
app.post('/bagmunro', function(req,res) {
    var mId = parseInt(req.body.id);

    // db.collection('users').update({"username":req.session.username},{$addToSet: {"bagged": {$each :[munro]}}});

    // find munro in db collection
    db.collection('munros').find().toArray(function(err,result) {
        if(err) throw err;
        var munro = result[mId].name;
        // add munro to user 'bagged' array field
        db.collection('users').update({"username":req.session.username},{$addToSet: {"bagged": munro}});
    });

    // console.log(munro);
    res.send("Done");

});

// remove munro from user list
// get munro id using post - get munro from database - remove from user 'bagged' field
app.post('/removemunro', function(req,res) {
    var mId = req.body.id;

    // db.collection('users').update({"username":req.session.username},{$pull: {"bagged": [munro]}});
    // console.log(munro);

    // find munro in db collection
    db.collection('munros').find().toArray(function(err,result) {
        if(err) throw err;
        var munro = result[mId].name;
        // remove from user 'bagged' array field
        db.collection('users').update({"username":req.session.username},{$pull: {"bagged": munro}});
    });

    // send response
    res.send("Done");
});

// info page
app.get('/information', function(req,res) {
    res.render('pages/info');
});

// contact page
app.get('/contact', function(req,res) {
    res.render('pages/contact');
});


// render user profile page
app.get('/profile', function(req,res) {

    var uname = req.session.username;

    // if user is logged in
    if (req.session.loggedin) { // session.loggedin == true
        // find user in db collection
        db.collection('users').findOne({"username":uname}, function(err,result) {
            if (err) throw err;

            // send result from db query to profile page
            res.render('pages/profile', {
                "user": result
            });

        });
    }
    else { // session.loggedin == false
        // redirect user to index
        res.redirect('/');
    }


});


// user logout
app.get('/logout', function(req,res) {
    // set session.loggedin to false
    req.session.loggedin = false;
    // destroy session
    req.session.destroy();
    // redirect to index
    res.redirect('/');
});



// ----- LOGIN -----

app.post('/dologin', function(req,res){


    // console.log(JSON.stringify(req.body));

    // use body-parser to get user login credentials
    var username = req.body.username;
    var pword = req.body.password;

    // console.log(username);
    // console.log(pword);

    // Get user from MongoDB
    db.collection('users').findOne({"username":username}, function(err,result) {

        // throw err if err
        if (err) throw err;


        // if username not found, redirect to index
        if (!result) {
            // openBox('#login');
            // console.log("NOT FOUND");
            res.redirect('/');
            return;
        }

        // if username found, check password
        if (result.password == pword) {
            console.log("FOUND");
            req.session.loggedin = true;
            var sess = req.session;
            sess.username = result.username;

            // if password matches, redirect to profile
            res.redirect('/profile');
        }
        else { // if password doesn't match, redirect to index
            console.log("WRONG PASSWORD ?");
            res.redirect('/');
        }


    });


    /*
    var username = req.body.username;
    var pword = req.body.password;

    req.session.loggedin = true;
    var sess = req.session;
    sess.username = result.username;

    res.redirect('/profile');
    */

});


// LOGIN - CHECK USERNAME LIVE
// NOT IMPLEMENTED - DIDN'T WORK
/*
app.post('/checkusername', function(req,res) {
    var uname = req.body.username;

    console.log(uname);

    db.collection('users').findOne({"username":uname},function(err,result) {
        if (err) throw err;

        if (result) {
            res.send();
        }
        else {
            res.send("USERNAME NOT FOUND");
        }

    });

    // res.send("Printed");

});
*/

// LOGIN - CHECK PASSWORD LIVE
// NOT IMPLEMENTED - DIDN'T WORK
/*
app.post('/checklogin', function(req,res) {
    // use body-parser to get user login credentials
    var username = req.body.username;
    var pword = req.body.password;

    // console.log(username);
    // console.log(pword);

    // Get user from MongoDB
    db.collection('users').findOne({"username":username}, function(err,result) {

        // throw err if err
        if (err) throw err;


        // if username not found, redirect to index
        if (!result) {
            // openBox('#login');
            // console.log("NOT FOUND");
            res.send("USERNAME NOT FOUND");
            return;
        }
        else {
            res.send();
        }

        if (pword) {
            // if username found, check password
            if (result.password == pword) {
                console.log("FOUND");
                req.session.loggedin = true;
                var sess = req.session;
                sess.username = result.username;

                // if password matches, redirect to profile
                res.send();
            }
            else { // if password doesn't match, redirect to index
                console.log("WRONG PASSWORD ?");
                res.send("PASSWORD INCORRECT");
            }
        }


    });

});
*/

// ----- REGISTER NEW USER -----

app.post('/register', function(req,res) {
    // console.log(JSON.stringify(req.body));

    // get user details from form
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var pword = req.body.password;

    // new data variable - to store in database
    var newUserData = {
        "name": name,
        "email": email,
        "username": username,
        "password": pword,
        "bagged": []
    };


    // Check email
        // Already registered
    db.collection('users').findOne({"email":email},function(err,result) {
        if (err) throw err;

        // if email is found, redirect to index
        if (result) {
            console.log("Email already registered");
            res.redirect('/');
        }

    });

    // Check username
        // Username taken

    db.collection('users').findOne({"username":username}, function(err,result) {
        if (err) throw err;

        // if username is already registered, redirect to index
        if (result) {
            console.log("Username taken");
            res.redirect('/');
        }
    });


    // if both email and username are not registered,
    // add new user data to db collection
    db.collection('users').save(newUserData, function(err,result) {
        if (err) throw err;

        // console.log("New User saved to Database");

        // redirect to index once data stored
        res.redirect('/');

    });


});


// ----- FORGOTTEN PASSWORD -----

app.post('/forgotpassword', function(req,res) {
    // NOT IMPLEMENTED
});


//Contact page - submit route
app.post('/send', function (req,res) {
    res.redirect('/submit');
});

app.get('/submit', function(req,res) {
    res.render('pages/submit');
});


/*
// login page
app.get('/login', function(req,res) {
    res.render('pages/login');
});
*/

// app.listen(8080);



















