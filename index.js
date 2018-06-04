//Import the necessary libraries/declare the necessary objects
var express = require("express");
var myParser = require("body-parser");
var fs = require("fs");
var app = express();

  app.use(myParser.urlencoded({extended : true}));
  app.post("/yourpath", function(request, response) {
      console.log(request.body); //This prints the JSON document received (if it is a JSON document)
	  fs.writeFileSync("postdata", request.body+"\n", "UTF-8");
});

//Start the server and make it listen for connections on port 8080

app.listen(8443);