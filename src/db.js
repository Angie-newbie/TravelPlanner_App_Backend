const mongoose = require('mongoose');

async function connect() { /*...*/ }
async function close() { /*...*/ }

module.exports = { connect, close };

// Connect to MongoDB
export async function connect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/latte_dB')// HERE INTRODUCE THE NAME OF THE DATABASE CREATED IN MONGODB
    console.log(mongoose.connection.readyState == 1 ? 'Mongoose connected' : 'Mongoose failed to connect!')
}

// Disconnect from MongoDB

export async function close() {
    await mongoose.disconnect()
    console.log(mongoose.connection.readyState == 0 ? 'Mongoose disconnected!' : 'Mongoose failed to disconnect!')
}

// Best practice export
module.exports = { connect, close }


