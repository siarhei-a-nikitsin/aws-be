export default (response, statusCode = 200) => ({
  statusCode: statusCode,
  body: JSON.stringify(response)
});