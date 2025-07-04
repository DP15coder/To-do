require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

// Get the first frontend host from the env variable
const frontendHosts = process.env.FRONTEND_HOSTS || '';
const host = frontendHosts.split('|')[0].replace(/"/g, '');

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: host,
};

const outputFile = './swagger.json';
const routes = ['./routes/authRouts.js', './routes/todoRoutes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
