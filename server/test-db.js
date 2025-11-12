require('dotenv').config();
const mongoose = require('mongoose');

// Test data
const testUser = {
    name: 'Test User',
    email: `test-${Date.now()}@example.com`,
    password: 'test1234'
};

const testContact = {
    name: 'Test Contact',
    email: 'contact@example.com',
    message: 'This is a test message'
};

async function testDatabase() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected!');

        // Get database info
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('\nCollections in database:');
        console.log(collections.map(c => `- ${c.name}`).join('\n'));

        // Test User model
        const User = mongoose.model('User', new mongoose.Schema({
            name: String,
            email: { type: String, unique: true },
            password: String,
            createdAt: { type: Date, default: Date.now }
        }));

        // Test Contact model
        const Contact = mongoose.model('Contact', new mongoose.Schema({
            name: String,
            email: String,
            message: String,
            createdAt: { type: Date, default: Date.now }
        }));

        // Test user creation
        console.log('\nTesting user creation...');
        const user = new User(testUser);
        await user.save();
        console.log('✅ User created successfully:', user);

        // Test contact creation
        console.log('\nTesting contact creation...');
        const contact = new Contact(testContact);
        await contact.save();
        console.log('✅ Contact created successfully:', contact);

        // Verify data was saved
        console.log('\nVerifying data in database...');
        const users = await User.find();
        const contacts = await Contact.find();
        
        console.log('\nUsers in database:', users.length);
        console.log('Contacts in database:', contacts.length);

    } catch (error) {
        console.error('❌ Error:', error);
        if (error.name === 'MongoServerError') {
            console.error('MongoDB Error Code:', error.code);
            console.error('Error Message:', error.message);
        }
    } finally {
        await mongoose.connection.close();
        console.log('\nConnection closed');
    }
}

testDatabase();
