// error handling for routes
function notFound(res, message = 'Resource not found') {
  return res.status(404).send({ error: message });
};

function badRequest(res, message = 'Bad request') {
  return res.status(400).send({ error: message });
};

function serverError(res, message = 'Something went wrong on the server') {
  return res.status(500).send({ error: message });
};

// format Mongoose validation errors
// the original error was too long
//**Raw Mongoose error**:
`json
{
  "category": {
    "name": "ValidatorError",
    "message": "category field is required",
    "properties": {
      "message": "category field is required",
      "type": "required",
      "path": "category"
    },
    ...
  }
}`

function formatValidationErrors(errors) {
// Create an empty object to store the simplified error messages
  const simplifiedErrors = {};
  // Loop through each key (field name) in the original Mongoose errors object
  for (const field in errors) {
    // we only want 'message' property
    simplifiedErrors[field] = { message: errors[field].message };
  }
  return simplifiedErrors;
};
module.exports = {
  notFound,
  badRequest,
  serverError,
  formatValidationErrors
};