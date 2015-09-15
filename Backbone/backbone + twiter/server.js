/*
The node.js server source, to make dealing with the Twitter API more straightforward, 
I utilized Tolga Tezel’s node package for Twitter 
(https://github.com/ttezel/twit). 
You can install the package simply by using npm install twit.
*/

/**
 * A simple API hosted under localhost:4040
 */
var express = require('express');
var app = express();

var Twit = require('twit');

var client = null;


//enter your own credentials from twitter where
//to remove in the published version
function connectToTwitter(){
    client = new Twit({
        consumer_key:         '<YOUR CONSUMER KEY>',
        consumer_secret:      '<YOUR CONSUMER SECRET>',
        access_token:         '<YOUR ACCESS TOKEN>',
        access_token_secret:  '<YOUR ACCESS TOKEN SECRET>'
    });
}

//get the app to connect to twitter.
connectToTwitter();



/**
 * Returns the twitter timeline for the current user 
 **/
app.get('/timeline', function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    
    client.get('statuses/home_timeline', { },  function (err, reply) {
        
        if(err){
            console.log('Error: ' + err);
            response.send(404);
        }
        if(reply){
            //console.log('Reply: ' + reply);
            response.json(reply);
        }
    });
    //response.json(books);
});


/**
 * Get the account settings for the user with the id provided.
 **/
app.get('/profile', function(request, response){
     
    response.header('Access-Control-Allow-Origin', '*');
     //send my profile screen name here to user/show api
    client.get('users/show', {screen_name: 'Sovremennik_101'},  function (err, reply) {
        if(err){
            console.log('Error: ' + err);
            response.send(404);
        }
        if(reply){
            // console.log('Reply: ' + reply);
            response.json(reply);
        }
    });
});


/**
 * Get the account settings for the user with the id provided.
 **/
app.get('/profile/:id', function(request, response){
    response.header('Access-Control-Allow-Origin', '*');
    
    client.get('users/show', {screen_name: request.params.id},  function (err, reply) {
        if(err){
            console.log('Error: ' + err);
            response.send(404);
        }
        if(reply){
            /// console.log('Reply: ' + reply);
            response.json(reply);
        }
    });
});

/**
 * Runs a search given a query
 **/
app.get('/search/:query', function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    //search term is
    var searchTerm = request.params.query;
    client.get('search/tweets', { q: searchTerm, count: 100 }, function(err, reply) {
        if(err){
            console.log('Error: ' + err);
            response.send(404);
        }if(reply){
            // console.log('Reply: ' + reply);
            response.json(reply);
        }
    });
});





//additional setup to allow CORS requests 
var allowCrossDomain = function(req, response, next) {
    response.header('Access-Control-Allow-Origin', "http://localhost");
    response.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');

    if ('OPTIONS' == req.method) {
      response.send(200);
    }
    else {
      next();
    }
};

app.configure(function() {
    app.use(allowCrossDomain);
  //Parses the JSON object given in the body request
    app.use(express.bodyParser());
});

//start up the app on port 4040
app.listen(4040);



