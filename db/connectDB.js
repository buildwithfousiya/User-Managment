const mongoose = require('mongoose');

const connectDb = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Rethrow to let the caller handle it
    }
};

module.exports = connectDb;