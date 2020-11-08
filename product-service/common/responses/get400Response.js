export default error => ({
  statusCode: 400,
  body: JSON.stringify({ error: error && error.message })
});