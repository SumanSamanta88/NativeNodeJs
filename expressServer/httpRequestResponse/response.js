function createResponse(statusCode, errorText, body = {}) {
  return {
    statusCode: statusCode,
    errorText: errorText,
    content: body,
  };
}
module.exports = createResponse;
