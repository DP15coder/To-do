require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
// app.use(errorHandler);

app.listen(PORT, () =>{
    connectDB();
  console.log(`Server is listeninmg on port ${PORT}`)
}
);
