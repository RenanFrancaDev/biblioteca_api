const mongoose = require('mongoose');
const ErrorHandling = require('../functions/ErrorHandling');

async function conectarBancoDados(req = null, res = null, next = null) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connecting database!');
    try { next(); } catch { };
    return mongoose;
  } catch (error) {
    console.error(error);
    console.log(MONGODB_URI);
    ErrorHandling(res, 'Error: Error connecting to database')
    return error;
  }
}

module.exports = conectarBancoDados;