/**
 * Represents a validation error, typically used when data does not meet specified criteria or requirements.
 *
 * This class extends the native `Error` object and is used to handle validation errors in various contexts, such as form inputs or API request payloads.
 * It sets a custom error type code (`E422`) and includes this in the error name.
 *
 * @class ValidationError
 * @extends {Error}
 */
export default class ValidationError extends Error {
  /**
   * The type of error represented by this class.
   *
   * This error type helps identify validation failures in logs or error handling mechanisms.
   *
   * @type {string}
   * @default "E422"
   */
  public errType: string = "E422";

  /**
   * Creates an instance of the `ErrorValidation` class.
   *
   * @param {string} message - The error message that provides additional context about the validation failure.
   */
  constructor(message: string) {
    super(message);
    this.name = `[${this.errType}]`;
  }
}
