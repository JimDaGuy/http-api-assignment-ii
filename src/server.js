const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlHandler.js');
const requestHandler = require('./requestHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/addUser': requestHandler.addUser,
  '/getUsers': requestHandler.getUsers,
  '/notReal': requestHandler.notReal,
};

const onRequest = (request, response) => {
  console.log(request.url);

  //Parse url, grab path and params
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const path = parsedUrl.pathname;

  //Call methods that don't require parans
  if(path === "/" || path === "/style.css" || path === "/getUsers") {
    urlStruct[path](request, response);
    return;
  }

  //Call methods requiring params
  if (urlStruct[path]) {
    urlStruct[path](request, response, params);
  } else {
    urlStruct['/notReal'](request, response);
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
