const userObject = { users: {} };

const returnJSON = (request, response, code, content) => {
  // Send content to json string
  const contentString = JSON.stringify(content);

  // Write JSON response
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.write(contentString);
  response.end();
};

const addUser = (request, response, params) => {
  // Breakpoint for missing params
  if (!params.name || !params.age) {
    const badRequestContent = {
      id: 'missingParams',
      message: 'Name and age are both required',
    };

    returnJSON(request, response, 400, badRequestContent);
    return;
  }

  // If user list contains the name given, just update the user
  if (userObject.users[params.name]) {
    userObject.users[params.name].age = params.age;

    response.writeHead(204, { 'Content-Type': 'application/json' });
    response.end();
    return;
  }
  // If the user doesn't exist, create it
  userObject.users[params.name] = {};
  userObject.users[params.name].name = params.name;
  userObject.users[params.name].age = params.age;

  const createdUserContent = {
    message: 'Created successfully',
  };

  returnJSON(request, response, 201, createdUserContent);
};

const getUsers = (request, response) => {
  // Respond 200 with the users object for a GET request
  if (request.method === 'GET') {
    returnJSON(request, response, 200, userObject);
  } else if (request.method === 'HEAD') {
    // Respond 200 with no other content
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end();
  }
};

const notReal = (request, response) => {
  // Respond 404 with a notFound object
  if (request.method === 'GET') {
    const notRealContent = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };

    returnJSON(request, response, 404, notRealContent);
  } else if (request.method === 'HEAD') {
    // Respond 404 with no content
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end();
  }
};

// Export functions
module.exports.addUser = addUser;
module.exports.getUsers = getUsers;
module.exports.notReal = notReal;
