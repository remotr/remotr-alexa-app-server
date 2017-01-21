var AlexaAppServer = require("../index.js");
AlexaAppServer.start({
		//port:8080,
		app_dir: "./examples/apps",
		server_dir : "./examples/server",
		debug : true,
    // By default, some information is logged with console.log(), which can be disabled
    log : true,
    // This will add verification for alexa requests as require by the alexa certification
    // process. Provied by alexa-verifier
    verify: false,
		httpsEnabled : false,
		server_root:__dirname,     // Path to root
    public_html:"public_html", // Static content
//    app_dir:"apps",            // Where alexa-app modules are stored
    app_root:"/alexa/",        // Service root
    port:80
	// Use preRequest to load user data on each request and add it to the request json.
	// In reality, this data would come from a db or files, etc.
	// 	preRequest: function(json,req,res) {
	// 			console.log("preRequest fired");
	// 			json.userDetails = { "name":"Bob Smith" };
	// 	},
	// // Add a dummy attribute to the response
	// 	postRequest: function(json,req,res) {
	// 			json.dummy = "text";
	// 	}
});
