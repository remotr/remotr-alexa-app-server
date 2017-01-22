var alexa = require('alexa-app');
//var chatskills = require('chatskills');
//var readlineSync = require('readline-sync');


// Create a skill.
var hello = new alexa.app('hello');
// var hello = chatskills.app('hello');

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
        res.say('Hello, World!');
        res.shouldEndSession(false);
    }
);

module.exports = hello;

// // Console client.
// var text = ' ';
// while (text.length > 0 && text != 'quit') {
//   //console.log('hello');
//   text = readlineSync.question('> ');
// // “chatskills, ask hello to say hi.”
// // chatskills, ask say hi.
//
//   // Respond to input.
//   chatskills.respond(text, function(response) {
//     console.log(response);
//   });
// }
