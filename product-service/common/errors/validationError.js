class ValidationError extends Error {
  constructor(message = "bad data") {
    super(message);
  }
}

export default ValidationError;