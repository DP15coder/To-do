require('dotenv').config(); // Load .env before anything else
const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongo db connected:${conn.connection.host}`);
    }
    catch(eror){
        console.error( `Error ${error.message}`);
        process.exit(1);
    }
}
module.exports = connectDB;

