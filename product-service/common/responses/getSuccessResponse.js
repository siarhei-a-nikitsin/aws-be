export default (response, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(response),
});
