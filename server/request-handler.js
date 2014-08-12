/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

var exports = module.exports = {};

var data = {
  results: []
};

// data.results[0] = {
//   createdAt: Date.now(),
//   roomname: "Lobby",
//   text: "Hi there",
//   // updatedAt: "2014-08-12T00:08:27.158Z",
//   username: "hg"
// }

// data.results[1] = {
//   createdAt: Date.now(),
//   roomname: "Lobby",
//   text: "Hi there again",
//   // updatedAt: "2014-08-12T00:08:27.158Z",
//   username: "cw"
// }

exports.handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  var statusCode = 200;
  var headers = exports.defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";


  console.log("Serving request type " + request.method + " for url " + request.url);
  // console.log('Incoming request from: ' + request.connection.remoteAddress)
  var urlCheck = request.url.toString().split("").slice(0, 8).join("");
  console.log( urlCheck );

  if ( (request.method === "GET" || request.method === "OPTIONS") && (urlCheck === "/classes" ) ){
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(data));
  }

  else if (request.method === "POST" && urlCheck === "/classes") {
    console.log("[200] " + request.method + " to " + request.url);

    var final_message = '';

    request.on('data', function( recieved_message_object ) {
      console.log("Received body data:");
      console.log( recieved_message_object );
      final_message += recieved_message_object;
    });

    request.on('end', function() {
      data.results.push( JSON.parse( final_message ) );
      console.log(JSON.parse(final_message));
      response.writeHead(201, headers);
      response.end();
    })
    /* .writeHead() tells our server what HTTP status code to send back */
    // response.end(JSON.stringify(data));

  }

  else if( urlCheck === "/classes" ){
    response.writeHead(200, headers);
    response.end();
  }
  else{
    response.writeHead(404, headers);
    response.end();
  }

};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
exports.defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};





