const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('MONGO_URL:', process.env.MONGO_URL);
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB Database ${conn.connection.host}`);

        const collections = await conn.connection.db.listCollections().toArray();

        console.log("Collections:");
        collections.forEach(collection => console.log(`- ${collection.name}`));
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`.bgRed.white);
    }
};

export default connectDB;