require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(express.json());
// ################################ CORS setup
const allowedOrigins = process.env.FRONTEND_HOSTS.split('|');
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
// ################################

//################### Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo Builder',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// #################################

// ############################# Routes
const apiV1 = express.Router();
app.use('/api', apiV1);

apiV1.use('/auth', authRoutes);
apiV1.use('/todos', todoRoutes);
// #################################

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}`);
});
