require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('Connection string:', process.env.MONGODB_URI);

const testConnection = async () => {
    try {
        console.log('Attempting to connect...');
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        
        console.log('✅ MongoDB Connected!');
        console.log('Host:', conn.connection.host);
        console.log('Database:', conn.connection.name);
        
        // List all collections
        const collections = await conn.connection.db.listCollections().toArray();
        console.log('\nCollections in database:');
        collections.forEach(collection => console.log(`- ${collection.name}`));
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed!');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        
        if (error.name === 'MongoServerSelectionError') {
            console.error('\nThis usually means:');
            console.error('1. Your IP is not whitelisted in MongoDB Atlas');
            console.error('2. The connection string is incorrect');
            console.error('3. There are network connectivity issues');
        }
        
        process.exit(1);
    }
};

testConnection();
