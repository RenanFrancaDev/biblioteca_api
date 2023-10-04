const S = require('string');

function errorHandling(res, err) {

//   Mongoose Error
  if (String(err).includes(`ValidationError:`)) {
    return res.status(400).json({
      status: "Error",
      statusMensagem: S(String(err).replace("ValidationError: ", "")).replaceAll(':', '').s,
      response: String(err)
    });
  }

//   Dev Error
  if (String(err).includes(`Error:`)) {
    return res.status(400).json({
      status: "Error",
      statusMensagem: String(err).replace("Error: ", ""),
      response: String(err)
    });
  }

//   Unexpected Error
  console.error(err);
  return res.status(500).json({
    status: "Error",
    statusMensagem: "There was an unexpected problem, please try again later.",
    response: String(err)
  });
}

module.exports = errorHandling;