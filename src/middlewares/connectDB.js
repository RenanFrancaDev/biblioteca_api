const mongoose = require('mongoose');
const errorHandling = require('../functions/errorHandling');

async function connectDatabase(req = null, res = null, next = null) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connecting database!');
    try { next(); } catch { };
    return mongoose;
  } catch (error) {
    console.error(error);
    errorHandling(res, 'Error: Error connecting to database')
    return error;
  }
}

module.exports = connectDatabase;