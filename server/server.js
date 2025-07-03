require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

const allowedOrigins = process.env.FRONTEND_HOSTS.split("|")

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
// app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}`)
}
);
