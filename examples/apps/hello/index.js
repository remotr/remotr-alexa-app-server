// var alexa = require('alexa-app');
var chatskills = require('chatskills');
var readlineSync = require('readline-sync');
var http = require('http');


var is_production = process.env.production === 'true'

// chatskills, ask hello to say hi

// Create a skill.
// var hello = new alexa.app('hello');
var hello = chatskills.app('hello');

// console.log('Calling service');
getResponseFromRemoteService( function (resp) {
  //console.log(require("util").inspect(data,false, 3)); // 3 niveauer
  //console.log(require("util").inspect(data,false, null)); // vis alle underobjekter
    // console.log('service returned with some json: ', resp);
    // console.log(require("util").inspect(resp,false, null)); // vis alle underobjekter
});

// Launch method to run at startup.
hello.launch(function(req,res) {
    res.say("Ask me to say hi!");

    // Keep session open.
    res.shouldEndSession(false);
});

// Create an intent.
hello.intent('hello', {
    'slots': {},
    'utterances': [ '{to |}{say|speak|tell me} {hi|hello|howdy|hi there|hiya|hi ya|hey|hay|heya|dude}' ]
    },
    function(req, res) {
      // var serviceResponse = getResponseFromRemoteService();
        var serviceResponse = callService2();
        res.say('Response from service is here!');
        res.say(serviceResponse);
        res.shouldEndSession(false);
    }
);

module.exports = hello;
/*
// Console client.
var text = ' ';
while (text.length > 0 && text != 'quit') {
  //console.log('hello');
  text = readlineSync.question('> ');

  // Respond to input.
  chatskills.respond(text, function(response) {
    console.log('chat response from service goes here below');
    console.log(response);
  });
}
*/

function callService2() {

    var options = {
    host: 'www.google.com',
    port: 80,
    path: '/index.html'
  };

  http.get(options, function(res) {
    // console.log("Got response: " + res.statusCode);

    res.on("data", function(chunk) {
      // console.log("BODY: " + chunk);
    });
  }).on('error', function(e) {
    // console.log("Got error: " + e.message);
  });
}

function getResponseFromRemoteService(cb) {

    // console.log('Starting getResponseFromRemoteService()');


    var host = 'localhost';
    var port = '5000';
    var path = '/service';

    if (is_production) {
      // console.log('Running in PROD - change config for prod');
      var host = 'remotr-alexa-app-server.herokuapp.com/alexa/hello';
      var port = '443';
    }
    else {
      // console.log('Running in DEV');
    }
    http.get({
        host: host,
        port: port,
        path: path
        // port: config.port,
        // path: config.path
    }, function(res) {
        // console.log('got response');
        //console.log('response', res);
        // explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
        res.setEncoding('utf8');

        // incrementally capture the incoming response body
        var body = '';
        res.on('data', function(d) {
          // console.log('got some data');
            body += d;
        });

        // do whatever we want with the response once it's done
        res.on('end', function() {
            try {
                // console.log('got a response from the service');
                var parsed = JSON.parse(body);
            } catch (err) {
                // console.error('Unable to parse response as JSON', err);
                return cb(err);
            }
            //pass the relevant data back to the callback
            // cb(null, {
            //     menu_title: parsed.menu.value
            //     //password: parsed.pass
            // });
            // console.log('serviceResponse: ', parsed.response);
            cb(parsed.response);
        });
    }).on('error', function(err) {
        // handle errors with the request itself
        // console.error('Error with the request:', err.message);
        cb(err);
    });

}
